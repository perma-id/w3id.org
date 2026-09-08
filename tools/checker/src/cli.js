/** Command line interface. */
import {parseArgs} from 'node:util';
import {writeFileSync} from 'node:fs';
import * as git from './git.js';
import {loadConfig} from './config.js';
import {Context} from './context.js';
import {rules as allRules, ruleIds, ruleTags} from './rules/index.js';
import {resolveScope, ScopeError} from './paths.js';
import {selectRules, run} from './engine.js';
import {buildStats, renderStats, buildTriage, renderTriage} from './report.js';
import stylish, {renderSummary} from './formatters/stylish.js';
import githubFormatter from './formatters/github.js';
import markdownFormatter from './formatters/markdown.js';
import jsonFormatter from './formatters/json.js';

const FORMATTERS = {
  stylish,
  github: githubFormatter,
  markdown: markdownFormatter,
  json: jsonFormatter
};

export const EXIT = {ok: 0, findings: 1, usage: 2, internal: 3};

const OPTIONS = {
  base: {type: 'string'},
  head: {type: 'string'},
  all: {type: 'boolean', default: false},
  triage: {type: 'boolean', default: false},
  'committed-only': {type: 'boolean', default: false},
  stats: {type: 'boolean', default: false},
  format: {type: 'string', default: 'stylish'},
  output: {type: 'string'},
  quiet: {type: 'boolean', short: 'q', default: false},
  rule: {type: 'string', multiple: true, default: []},
  tag: {type: 'string', multiple: true, default: []},
  'skip-rule': {type: 'string', multiple: true, default: []},
  'max-annotations': {type: 'string', default: '10'},
  'list-rules': {type: 'boolean', default: false},
  help: {type: 'boolean', short: 'h', default: false}
};

export async function main(argv, {stdout = process.stdout,
  stderr = process.stderr, cwd = process.cwd()} = {}) {
  let values;
  let positionals;
  try {
    ({values, positionals} =
      parseArgs({args: argv, options: OPTIONS, allowPositionals: true}));
  } catch(e) {
    stderr.write(`w3id-check: ${e.message}\n\nTry --help.\n`);
    return EXIT.usage;
  }

  if(values.help) {
    stdout.write(usage());
    return EXIT.ok;
  }
  if(values['list-rules']) {
    stdout.write(listRules());
    return EXIT.ok;
  }

  const root = git.repoRoot(cwd);
  if(root === null) {
    stderr.write('w3id-check: not inside a git repository.\n');
    return EXIT.usage;
  }

  let config;
  try {
    config = loadConfig(root);
  } catch(e) {
    stderr.write(`w3id-check: ${e.message}\n`);
    return EXIT.usage;
  }

  let scope;
  try {
    scope = resolveScope(positionals, {root, cwd});
  } catch(e) {
    if(!(e instanceof ScopeError)) {
      throw e;
    }
    stderr.write(`w3id-check: ${e.message}\n`);
    return EXIT.usage;
  }

  // `--triage` and `--stats` are whole-tree reports by nature.
  const auditAll = values.all || values.triage;
  let range;
  try {
    range = resolveRange(values, root, auditAll, positionals.length > 0);
  } catch(e) {
    stderr.write(`w3id-check: ${e.message}\n`);
    return EXIT.usage;
  }

  const ctx = new Context({
    root,
    config,
    ...range,
    scope,
    includeWorkingTree: !values['committed-only']
  });
  ctx.allRuleIds = ruleIds;

  let selected;
  try {
    selected = selectRules(allRules, {
      only: values.rule,
      tags: values.tag,
      skip: values['skip-rule']
    });
  } catch(e) {
    stderr.write(`w3id-check: ${e.message}\n`);
    return EXIT.usage;
  }
  if(selected.length === 0) {
    stderr.write('w3id-check: no rules selected.\n');
    return EXIT.usage;
  }

  let result;
  try {
    result = run({rules: selected, ctx, config, auditAll});
  } catch(e) {
    stderr.write(`w3id-check: ${e.stack ?? e.message}\n`);
    return EXIT.internal;
  }

  for(const {ruleId, error} of result.errors) {
    stderr.write(`w3id-check: rule ${ruleId} failed: ` +
      `${error.stack ?? error.message}\n`);
  }

  const visible = values.quiet ?
    result.findings.filter(f => f.severity === 'error') : result.findings;

  const summary = buildSummary({result, ctx, range, selected});
  const payload = {findings: visible, summary, ran: result.ran};

  if(values.stats) {
    payload.stats = buildStats(result.findings);
  }
  if(values.triage) {
    payload.triage = buildTriage(result.findings, ctx);
  }

  const formatter = FORMATTERS[values.format];
  if(formatter === undefined) {
    stderr.write(`w3id-check: unknown format "${values.format}"; expected ` +
      `one of ${Object.keys(FORMATTERS).join(', ')}.\n`);
    return EXIT.usage;
  }

  const text = renderOutput({values, payload, formatter});
  if(values.output === undefined) {
    stdout.write(text.endsWith('\n') || text === '' ? text : text + '\n');
  } else {
    writeFileSync(values.output, text.endsWith('\n') ? text : text + '\n');
    // Still say something on the terminal, so a run with --output is not
    // silent about whether it passed.
    if(values.format !== 'stylish') {
      stdout.write(renderSummary(summary, {quiet: values.quiet}) + '\n');
    }
  }

  // Reports never gate; they exist to be read.
  if(values.stats || values.triage) {
    return result.errors.length > 0 ? EXIT.internal : EXIT.ok;
  }
  if(result.errors.length > 0) {
    return EXIT.internal;
  }
  return result.findings.some(f => f.severity === 'error') ?
    EXIT.findings : EXIT.ok;
}

function renderOutput({values, payload, formatter}) {
  const sections = [];

  // A stats or triage run replaces the finding list rather than appending to
  // it: the point is the aggregate, not 4000 individual lines.
  if(values.format === 'json') {
    return formatter(payload);
  }
  if(values.triage) {
    sections.push(renderTriage(payload.triage));
  }
  if(values.stats) {
    sections.push(renderStats(payload.stats));
  }
  if(sections.length === 0) {
    sections.push(formatter(payload, {
      quiet: values.quiet,
      maxAnnotations: Number.parseInt(values['max-annotations'], 10) || 10
    }));
  }
  return sections.filter(s => s !== '').join('\n\n');
}

function buildSummary({result, ctx, range, selected}) {
  const counts = {error: 0, warning: 0, notice: 0};
  for(const f of result.findings) {
    counts[f.severity] += 1;
  }
  const considered = ctx.hasRange ? [...ctx.changedPaths] : ctx.tree;
  const inScope = considered.filter(p => ctx.inScope(p));
  return {
    mode: range.base === null ? 'all' : 'range',
    base: range.base,
    head: range.head,
    counts,
    critical: result.findings.filter(f => f.critical).length,
    rulesRun: result.ran.length,
    ruleIds: result.ran.map(r => r.id),
    scope: ctx.scope,
    filesChecked: inScope.length,
    uncommitted: inScope.filter(p => ctx.uncommittedPaths.has(p)).length,
    namespaces: countNamespaces(ctx),
    failedRules: result.errors.map(e => e.ruleId)
  };
}

function countNamespaces(ctx) {
  const seen = new Set();
  for(const p of ctx.idPaths) {
    const ns = ctx.namespaceOf(p);
    if(ns !== null && ns !== ctx.idsDir && !ns.slice(ctx.idsDir.length + 1)
      .startsWith('.')) {
      seen.add(ns);
    }
  }
  return seen.size;
}

/**
 * Work out which commits to compare.
 *
 * With no arguments the tool compares the working branch against the upstream
 * default branch, which is what a contributor wants locally and what CI wants
 * for a pull request.
 */
function resolveRange(values, root, auditAll, hasPaths) {
  if(auditAll) {
    if(values.base !== undefined || values.head !== undefined) {
      throw new Error('--base and --head cannot be combined with --all or ' +
        '--triage.');
    }
    return {base: null, head: null};
  }

  // Paths on their own mean "check these as they stand", not "compare them
  // with master": work in progress usually has nothing committed yet, so a
  // comparison would have nothing to show. Passing --base asks for the
  // comparison explicitly, and then the paths only narrow it.
  if(hasPaths && values.base === undefined && values.head === undefined) {
    return {base: null, head: null};
  }

  const head = values.head ?? 'HEAD';
  const headSha = git.resolve(head, root);
  if(headSha === null) {
    throw new Error(`cannot resolve --head "${head}".`);
  }

  let base = values.base;
  if(base === undefined) {
    base = ['origin/master', 'origin/main', 'master', 'main']
      .find(ref => git.resolve(ref, root) !== null);
    if(base === undefined) {
      throw new Error(
        'no base branch found. Pass --base <ref>, or --all to check the ' +
        'whole tree.');
    }
  }
  const baseSha = git.resolve(base, root);
  if(baseSha === null) {
    throw new Error(`cannot resolve --base "${base}".`);
  }

  // Compare against the point the branch diverged, not the tip of master, so
  // that commits made on master since do not appear as this change's work.
  const mergeBase = git.mergeBase(baseSha, headSha, root);
  if(mergeBase === null) {
    throw new Error(
      `"${base}" and "${head}" have no common ancestor. If this is a shallow ` +
      'clone, fetch more history.');
  }
  if(mergeBase === headSha) {
    // The branch is an ancestor of master: there is nothing to review.
    return {base: mergeBase, head: headSha};
  }
  return {base: mergeBase, head: headSha};
}

function listRules() {
  const lines = ['Rules:', ''];
  for(const rule of allRules) {
    const marks = [rule.severity];
    if(rule.critical) {
      marks.push('critical');
    }
    if(rule.fixable) {
      marks.push('fixable');
    }
    lines.push(`  ${rule.id}`);
    lines.push(`    ${rule.description}`);
    lines.push(`    ${marks.join(', ')}  [${(rule.tags ?? []).join(' ')}]`);
    lines.push('');
  }
  lines.push(`Tags: ${ruleTags.join(', ')}`, '');
  return lines.join('\n');
}

function usage() {
  return `w3id-check -- check a w3id.org contribution against the repository rules

Usage:
  w3id-check [options] [path...]

By default the tool compares your branch against the upstream default branch,
counts anything you have not committed yet as part of that change, and reports
only what the change is answerable for. Problems that were already in the
files you touched are shown as information, and the rest of the repository's
backlog is not shown at all.

Give one or more paths to look at just those. On their own, paths mean "check
these as they stand on disk", which is what you want for work in progress;
combined with --base or --all they narrow that run instead.

Scope:
  --base <ref>          Commit to compare against (default: origin/master).
  --head <ref>          Commit to check (default: HEAD).
  --all                 Check the whole tree at each rule's own severity,
                        ignoring the provenance policy. For maintainers.
  --committed-only      Ignore uncommitted edits and untracked files. Use for
                        a reproducible audit.

Reports (these never fail the run):
  --stats               Counts by severity, provenance, rule and namespace.
  --triage              Every critical finding in the tree, grouped by
                        namespace with the maintainers who can fix it.

Selection:
  --rule <id>           Run only this rule. Repeatable.
  --tag <tag>           Run only rules with this tag. Repeatable.
  --skip-rule <id>      Do not run this rule. Repeatable.
  --list-rules          Print every rule and exit.

Output:
  --format <name>       stylish (default), github, markdown or json.
  --output <file>       Write the report to a file instead of stdout.
  -q, --quiet           Show errors only.
  --max-annotations <n> Inline annotations to emit with --format github
                        (default 10; GitHub renders no more per step).
  -h, --help            Show this message.

Exit status:
  0  no errors
  1  at least one error
  2  bad usage
  3  the checker itself failed

Examples:
  w3id-check                        check your branch, committed or not
  w3id-check ids/my-project         check one directory as it stands
  w3id-check ids/foo ids/bar        check several
  w3id-check --quiet                only what blocks the pull request
  w3id-check --all --stats          size of the repository's backlog
  w3id-check --triage               what should be fixed out of band
  w3id-check --triage ids/my-project  ... in one namespace
  w3id-check --rule htaccess/https-target --all
`;
}
