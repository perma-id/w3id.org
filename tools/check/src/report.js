/**
 * Aggregate reports: `--stats`, `--triage` and `--why`.
 *
 * Both exist because the default policy suppresses the legacy backlog. That
 * keeps pull requests quiet, so these are how the backlog stays visible: stats
 * for tracking whether it is shrinking, triage for the standing worklist of
 * problems that should be fixed regardless of who introduced them, and why
 * for the question a quiet run cannot otherwise answer -- what did it find
 * and decide not to tell me?
 */
import pc from 'picocolors';
import {namespaceMaintainers} from './maintainers.js';
import {isReadme, isHtaccess} from './paths.js';

/** Counts by severity, provenance, rule and namespace. */
export function buildStats(findings, {topNamespaces = 15} = {}) {
  const bySeverity = tally(findings, f => f.severity);
  const byProvenance = tally(findings, f => f.provenance);
  const byRule = tally(findings, f => f.ruleId);
  const byNamespace = tally(
    findings.filter(f => f.namespace !== null), f => f.namespace);

  const critical = findings.filter(f => f.critical);

  return {
    total: findings.length,
    bySeverity,
    byProvenance,
    byRule: sortEntries(byRule),
    byNamespace: sortEntries(byNamespace, topNamespaces),
    namespacesAffected: Object.keys(byNamespace).length,
    critical: {
      total: critical.length,
      namespaces: new Set(
        critical.map(f => f.namespace).filter(n => n !== null)).size,
      byRule: sortEntries(tally(critical, f => f.ruleId))
    }
  };
}

export function renderStats(stats) {
  const out = [];
  out.push(pc.bold('Findings'), '');
  out.push('  by severity   ' + inline(stats.bySeverity,
    ['error', 'warning', 'notice']));
  out.push('  by provenance ' + inline(stats.byProvenance,
    ['introduced', 'touched', 'preexisting']));
  out.push('');

  out.push(pc.bold('By rule'), '');
  for(const [id, count] of Object.entries(stats.byRule)) {
    out.push(`  ${String(count).padStart(6)}  ${id}`);
  }
  out.push('');

  if(Object.keys(stats.byNamespace).length > 0) {
    out.push(pc.bold(
      `Most affected namespaces (of ${stats.namespacesAffected})`), '');
    for(const [ns, count] of Object.entries(stats.byNamespace)) {
      out.push(`  ${String(count).padStart(6)}  ${ns}`);
    }
    out.push('');
  }

  out.push(pc.bold('Critical'), '');
  if(stats.critical.total === 0) {
    out.push('  none');
  } else {
    out.push(`  ${stats.critical.total} findings across ` +
      `${stats.critical.namespaces} namespaces`);
    for(const [id, count] of Object.entries(stats.critical.byRule)) {
      out.push(`  ${String(count).padStart(6)}  ${id}`);
    }
  }
  return out.join('\n');
}

/**
 * How each reason reads to somebody who did not write the policy.
 *
 * `preexisting-off` is the one that matters: it is the whole legacy backlog,
 * and the answer a contributor needs is "this is the repository's, not
 * yours". Anything not named here renders as its raw reason rather than
 * being dropped, so a reason added later is visible before it is pretty.
 */
const REASONS = {
  'preexisting-off':
    'already in the tree, and not something this change touched',
  'touched-off': 'in a file this change touches, but on a line it did not',
  'introduced-off': 'suppressed by policy for introduced findings',
  'critical-preexisting':
    'a problem with the identifier itself, elsewhere in the tree (--triage)',
  'rule-off': 'the rule is switched off in .w3id-check.yaml',
  'out-of-scope': 'outside the paths this run was asked about'
};

/**
 * What the run computed, what it showed, and why the rest is not on screen.
 *
 * The counts come from the engine's own record of each drop rather than from
 * re-deriving the policy here, so this cannot disagree with what the run did.
 *
 * @param {object} result - as returned by `run()`.
 * @param {string[]} [allRuleIds] - every rule in the registry, so that rules
 *   left out by --rule/--tag/--skip-rule can be named as not run.
 * @param {number|null} [examined] - in a run with a commit range, how many
 *   paths the file-scope rules were given. Null for a whole-tree run.
 */
export function buildWhy(result, {allRuleIds = [], examined = null} = {}) {
  const {findings, suppressed: allSuppressed = [], notRun = [], ran = [],
    errors = []} = result;

  // Out-of-scope findings are held apart from everything else. They are the
  // rest of the repository, which the reader excluded by asking about a
  // path; folding them in buries the answer under the tree. Kept as a count
  // so the arithmetic still balances -- computed = shown + hidden + elsewhere
  // -- because a total that does not add up is worse than one that is large.
  const suppressed = allSuppressed.filter(f => f.reason !== 'out-of-scope');
  const elsewhere = allSuppressed.length - suppressed.length;

  const accounted = new Set([
    ...ran.map(r => r.id), ...notRun.map(r => r.ruleId),
    ...errors.map(e => e.ruleId)
  ]);
  const idle = [
    ...notRun,
    ...allRuleIds.filter(id => !accounted.has(id))
      .map(id => ({ruleId: id, reason: 'deselected'}))
  ].sort((a, b) => a.ruleId.localeCompare(b.ruleId));

  const shownByRule = tally(findings, f => f.ruleId);
  const hiddenByRule = tally(suppressed, f => f.ruleId);
  const byRule = [...new Set([
    ...Object.keys(shownByRule), ...Object.keys(hiddenByRule)
  ])]
    .map(id => ({
      ruleId: id,
      shown: shownByRule[id] ?? 0,
      hidden: hiddenByRule[id] ?? 0
    }))
    .sort((a, b) => b.hidden - a.hidden || b.shown - a.shown ||
      a.ruleId.localeCompare(b.ruleId));

  return {
    computed: findings.length + suppressed.length,
    shown: findings.length,
    hidden: suppressed.length,
    elsewhere,
    examined,
    byReason: sortEntries(tally(suppressed, f => f.reason)),
    byRule,
    notRun: idle,
    suppressed
  };
}

/** @param {number} [perRule] - suppressed findings to list for each rule. */
export function renderWhy(why, {perRule = 5} = {}) {
  const out = [];
  out.push(pc.bold('What this run did not show'), '');

  if(why.computed === 0) {
    out.push('  Nothing was found here, so nothing was suppressed.');
  } else {
    out.push(`  ${why.computed} computed, ${why.shown} shown, ` +
      `${why.hidden} suppressed`);
  }
  if(why.elsewhere > 0) {
    out.push(`  ${why.elsewhere} more elsewhere in the tree, outside the ` +
      'paths this run was asked about.');
  }
  // The most important thing this report can say, and the easiest to leave
  // out. With a commit range, rules that work file by file are only given
  // the files the change touches -- so for everything else the answer is not
  // "suppressed" but "never read", and a report that omitted this would
  // imply a clean bill of health for a tree it never opened.
  if(why.examined !== null) {
    out.push('', `  Rules that work file by file were given only the ` +
      `${why.examined} path(s) this change touches; the rest of the tree ` +
      'was not read. Use --all to check everything.');
  }
  out.push('');

  // The reason breakdown leads, because it is the answer. The per-rule table
  // below says where, which is only interesting once you know why.
  if(why.hidden > 0) {
    for(const [reason, count] of Object.entries(why.byReason)) {
      out.push(`  ${String(count).padStart(6)}  ` +
        pc.bold(reason) + ' -- ' + (REASONS[reason] ?? reason));
    }
    out.push('');
  }

  if(why.byRule.length > 0) {
    out.push(pc.bold('By rule'), '');
    out.push(`  ${'shown'.padStart(6)}  ${'hidden'.padStart(6)}  rule`);
    for(const {ruleId, shown, hidden} of why.byRule) {
      out.push(`  ${String(shown).padStart(6)}  ` +
        `${String(hidden).padStart(6)}  ${ruleId}`);
    }
    out.push('');
  }

  if(why.notRun.length > 0) {
    out.push(pc.bold('Rules that did not run'), '');
    for(const {ruleId, reason} of why.notRun) {
      out.push(`  ${ruleId} -- ${REASONS[reason] ?? reason}`);
    }
    out.push('');
  }

  if(why.hidden > 0) {
    out.push(pc.bold('Suppressed'), '');
    const seen = {};
    for(const f of why.suppressed) {
      seen[f.ruleId] = (seen[f.ruleId] ?? 0) + 1;
      if(seen[f.ruleId] > perRule) {
        continue;
      }
      const where = f.file === null ? '(the change itself)' :
        f.file + (f.line === null ? '' : ':' + f.line);
      out.push(`  ${where}  ${pc.dim(f.reason)}`);
      out.push(`    ${f.ruleId}`);
    }
    const elided = Object.values(seen)
      .reduce((n, c) => n + Math.max(0, c - perRule), 0);
    if(elided > 0) {
      // Say what is missing rather than trailing off: an unscoped run hides
      // thousands, and a list that just stops reads as the whole answer.
      out.push('', `  ... ${elided} more not listed. ` +
        'Narrow with a path, or use --format json for all of them.');
    }
  }
  return out.join('\n').replace(/\n+$/, '');
}

/**
 * The standing worklist: every critical finding in the tree, grouped by
 * namespace, with whatever maintainer usernames could be recovered so the
 * work can be handed out or the owners contacted.
 */
export function buildTriage(findings, ctx) {
  const critical = findings.filter(f => f.critical);
  const byNamespace = new Map();

  for(const f of critical) {
    const ns = f.namespace ?? f.file ?? '(repository)';
    if(!byNamespace.has(ns)) {
      byNamespace.set(ns, []);
    }
    byNamespace.get(ns).push(f);
  }

  const entries = [];
  for(const [namespace, group] of [...byNamespace].sort()) {
    entries.push({
      namespace,
      maintainers: maintainersFor(ctx, namespace),
      findings: group.map(f => ({
        ruleId: f.ruleId,
        file: f.file,
        line: f.line,
        message: f.message
      }))
    });
  }

  // Most-broken namespaces first: that is the order the work should be done.
  entries.sort((a, b) => b.findings.length - a.findings.length ||
    a.namespace.localeCompare(b.namespace));

  return {
    total: critical.length,
    namespaces: entries.length,
    entries
  };
}

export function renderTriage(triage) {
  const out = [];
  if(triage.total === 0) {
    return pc.green('No critical findings. Nothing needs fixing out of band.');
  }
  out.push(pc.bold(
    `${triage.total} critical findings across ${triage.namespaces} ` +
    'namespaces'), '');
  out.push(pc.dim(
    'These affect whether an identifier resolves, or are security ' +
    'problems. They are reported regardless of who introduced them.'), '');

  for(const entry of triage.entries) {
    const who = entry.maintainers.length > 0 ?
      entry.maintainers.map(m => '@' + m).join(' ') :
      pc.dim('no maintainer username recorded');
    out.push(`${pc.underline(entry.namespace)}  ${who}`);
    for(const f of entry.findings) {
      const where = f.line === null ? f.file : `${f.file}:${f.line}`;
      out.push(`  ${pc.dim(where)}`);
      out.push(`    ${f.message}`);
      out.push(`    ${pc.dim(f.ruleId)}`);
    }
    out.push('');
  }
  return out.join('\n');
}

function maintainersFor(ctx, namespace) {
  if(!namespace.startsWith(ctx.idsDir + '/')) {
    return [];
  }
  const paths = ctx.idPaths.filter(
    p => (p === namespace || p.startsWith(namespace + '/')) &&
      (isReadme(p) || isHtaccess(p)));
  return [...namespaceMaintainers(ctx, namespace, paths).usernames].sort();
}

function tally(items, key) {
  const counts = {};
  for(const item of items) {
    const k = key(item);
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts;
}

// Descending by count, then by name, so output is stable run to run.
function sortEntries(counts, limit = Infinity) {
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return Object.fromEntries(sorted.slice(0, limit));
}

function inline(counts, order) {
  return order.map(k => `${k} ${counts[k] ?? 0}`).join(' · ');
}
