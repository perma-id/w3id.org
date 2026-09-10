/** Rule selection, execution and finding classification. */
import {minimatch} from './glob.js';
import {explainSeverity, ruleOptions} from './config.js';
import {classify} from './provenance.js';

const SEVERITY_RANK = {error: 0, warning: 1, notice: 2};

/** Select the rules to run for this invocation. */
export function selectRules(rules, {only = [], tags = [], skip = []} = {}) {
  let selected = rules;
  if(only.length > 0) {
    const wanted = new Set(only);
    selected = selected.filter(r => wanted.has(r.id));
    const missing = only.filter(id => !rules.some(r => r.id === id));
    if(missing.length > 0) {
      throw new Error(`unknown rule: ${missing.join(', ')}`);
    }
  }
  if(tags.length > 0) {
    selected = selected.filter(r => r.tags?.some(t => tags.includes(t)));
  }
  if(skip.length > 0) {
    const unwanted = new Set(skip);
    selected = selected.filter(r => !unwanted.has(r.id));
  }
  return selected;
}

/**
 * Run every selected rule and return classified findings.
 *
 * Rules are pure with respect to each other: each is handed the shared context
 * and a `report` callback, and may not see another rule's findings.
 */
export function run({rules, ctx, config, auditAll = false}) {
  const findings = [];
  const ran = [];
  const errors = [];
  // Everything computed and then dropped, with the reason. `--why` reports
  // this; nothing else reads it. Collected unconditionally, because a flag
  // that changed what the engine computed would make `--why` explain a run
  // that did not happen. The ceiling is the whole corpus -- a few thousand
  // small objects -- so it is not worth a switch.
  const suppressed = [];
  const notRun = [];

  for(const rule of rules) {
    // A rule configured off never runs, so it costs nothing. `--why` has to
    // say that rather than imply the rule looked and found nothing.
    if(config.rules[rule.id] === 'off' && !auditAll) {
      notRun.push({ruleId: rule.id, reason: 'rule-off'});
      continue;
    }

    const collected = [];
    const report = raw => {
      const message = raw.message ?? renderMessage(rule, raw);
      collected.push({...raw, message});
    };

    try {
      const ruleCtx = contextFor(ctx, rule, config);
      if(rule.scope === 'file') {
        for(const file of filesFor(rule, ctx)) {
          // Derive rather than spread: the context's data is exposed through
          // prototype getters, which a spread would flatten and drop.
          const fileCtx = Object.create(ruleCtx, {
            file: {value: file, enumerable: true}
          });
          rule.check(fileCtx, entry => report({file, ...entry}));
        }
      } else {
        rule.check(ruleCtx, report);
      }
    } catch(e) {
      errors.push({ruleId: rule.id, error: e});
      continue;
    }

    ran.push(rule);
    for(const raw of collected) {
      const file = raw.file ?? null;
      const provenance = classify(raw, ctx);
      // What every dropped finding is recorded as, so that `--why` can say
      // what was computed as well as what survived.
      const dropped = {
        ruleId: rule.id,
        message: raw.message,
        file,
        line: raw.line ?? null,
        provenance,
        namespace: file ? ctx.namespaceOf(file) : null
      };
      // A scope narrows which files are discussed. Findings that carry no
      // file are about the commits themselves -- whether the branch needs a
      // rebase does not stop being true because the reader asked about one
      // directory -- so those are not scoped away.
      if(file !== null && !ctx.inScope(file)) {
        suppressed.push({...dropped, reason: 'out-of-scope'});
        continue;
      }
      // A rule may declare a different severity for one of its messages, when
      // it reports on more than one kind of thing. Configuration and the
      // provenance policy still apply on top, so this only sets the starting
      // point.
      const declared = raw.severity === undefined ?
        rule : {...rule, severity: raw.severity};
      const {severity, reason} = explainSeverity({
        rule: declared, provenance, config, auditAll
      });
      if(severity === null) {
        suppressed.push({...dropped, reason});
        continue;
      }
      findings.push({
        ruleId: rule.id,
        severity,
        provenance,
        critical: rule.critical === true,
        message: raw.message,
        file: raw.file ?? null,
        line: raw.line ?? null,
        column: raw.column ?? null,
        endLine: raw.endLine ?? null,
        docsUrl: config.docsBaseUrl + rule.id,
        namespace: raw.file ? ctx.namespaceOf(raw.file) : null
      });
    }
  }

  findings.sort(compareFindings);
  return {findings, suppressed, notRun, ran, errors};
}

/** Order findings by severity, then by location, for stable output. */
export function compareFindings(a, b) {
  const bySeverity = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
  if(bySeverity !== 0) {
    return bySeverity;
  }
  const byFile = (a.file ?? '').localeCompare(b.file ?? '');
  if(byFile !== 0) {
    return byFile;
  }
  const byLine = (a.line ?? 0) - (b.line ?? 0);
  return byLine !== 0 ? byLine : a.ruleId.localeCompare(b.ruleId);
}

// Expose per-rule options without letting a rule reach another rule's config.
function contextFor(ctx, rule, config) {
  return Object.create(ctx, {
    options: {value: ruleOptions(config, rule.id), enumerable: true}
  });
}

/**
 * Files a file-scope rule runs against.
 *
 * A whole-tree run visits everything. A range run visits only what the change
 * touches, which keeps a pull request from paying to parse 2860 `.htaccess`
 * files -- except for critical rules, which also visit the rest of every
 * namespace the change touches. A contributor editing an identifier should be
 * told that identifier is broken even if they did not break it; they should
 * not be told about the rest of the tree, which is what `--triage` is
 * for.
 */
function filesFor(rule, ctx) {
  const patterns = rule.files ?? ['**/*'];
  return candidatesFor(rule, ctx)
    .filter(p => patterns.some(pattern => minimatch(p, pattern)))
    .sort();
}

function candidatesFor(rule, ctx) {
  const candidates = unscopedCandidatesFor(rule, ctx);
  // Narrowing to the scope here is purely a saving: findings outside it are
  // dropped anyway, and this avoids parsing thousands of files to produce
  // them.
  return ctx.scope === null ? candidates :
    candidates.filter(p => ctx.inScope(p));
}

function unscopedCandidatesFor(rule, ctx) {
  if(!ctx.hasRange) {
    return ctx.tree;
  }
  if(!rule.critical) {
    return [...ctx.changedPaths];
  }
  const candidates = new Set(ctx.changedPaths);
  for(const p of ctx.tree) {
    const ns = ctx.namespaceOf(p);
    if(ns !== null && ctx.changedNamespaces.has(ns)) {
      candidates.add(p);
    }
  }
  return [...candidates];
}

/** Fill `{{name}}` placeholders in a rule's message template. */
function renderMessage(rule, raw) {
  const template = rule.messages?.[raw.messageId];
  if(template === undefined) {
    throw new Error(
      `rule ${rule.id} reported unknown messageId "${raw.messageId}"`);
  }
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    Object.hasOwn(raw.data ?? {}, key) ? String(raw.data[key]) : match);
}
