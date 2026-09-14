#!/usr/bin/env node
/**
 * How the backlog is moving: today's rules against the tree as it was.
 *
 * Reports, and stores nothing: the comparison points are dates computed when
 * it runs, so no number in the repository can go out of date. That is the
 * point of it. Bounding each rule's count instead -- an upper bound per rule,
 * failing CI when exceeded -- cannot work in a tree growing about 30% a year,
 * because ordinary growth exceeds any useful bound within weeks.
 *
 * The **current** rules run against **historical** trees. That holds the
 * checker fixed, so a count moves only when the tree does -- which is the
 * question a maintainer is asking. It cannot answer the other question, "did
 * a change to the checker make a rule over-match": for that, run two
 * checkers against one tree and diff them.
 *
 * Two columns, because they say different things and want different
 * responses. The count answers "is the backlog shrinking". The rate --
 * findings per thousand files -- answers "are new contributions still making
 * this mistake". A rule can easily grow in count while falling in rate,
 * which is a backlog being diluted by a tree that is getting better.
 *
 * Reports; never fails. Exit status is 0 unless the tool itself broke.
 */
import {execFileSync, spawnSync} from 'node:child_process';
import {mkdtempSync, rmSync, mkdirSync, copyFileSync, existsSync}
  from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const CHECKER = path.join(here, 'w3id-check.js');

// The commit that moved the identifiers into ids/. Trees older than this are
// re-rooted; see reRoot below.
const MOVE = '94ed72fc';

const POINTS = [
  {label: 'now', days: 0},
  {label: '1 week', days: 7},
  {label: '1 month', days: 30},
  {label: '3 months', days: 91},
  {label: '6 months', days: 182},
  {label: '1 year', days: 365}
];

function git(args, cwd) {
  return execFileSync('git', args, {cwd, encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024}).trim();
}

/**
 * Top-level entries that are not the identifier tree.
 *
 * Read from the tree just after the move rather than listed here: everything
 * at the top level except `ids` itself stayed put, so the same names are what
 * has to be removed when an older tree is re-rooted. A hand-written list
 * would be correct today and wrong the first time somebody adds a directory.
 */
function notIdentifiers(root) {
  return new Set(git(['ls-tree', '--name-only', MOVE], root)
    .split('\n').filter(name => name !== '' && name !== 'ids'));
}

/**
 * Put the tree at `sha` on disk in the layout the checker expects.
 *
 * `git archive | tar` rather than one `git show` per file: the tree is ~2900
 * files and the per-file version dominated the runtime.
 *
 * @returns {boolean} whether the tree had to be re-rooted.
 */
function materialise(sha, into, root, exclude) {
  const top = git(['ls-tree', '--name-only', sha], root).split('\n');
  if(top.includes('ids')) {
    execFileSync('/bin/sh', ['-c',
      `git archive ${sha} ids | tar -x -C ${JSON.stringify(into)}`],
    {cwd: root});
    return false;
  }
  // Before the move, an identifier was a directory at the top level. Extract
  // everything under ids/ and then drop what never moved.
  const ids = path.join(into, 'ids');
  mkdirSync(ids, {recursive: true});
  execFileSync('/bin/sh', ['-c',
    `git archive ${sha} | tar -x -C ${JSON.stringify(ids)}`], {cwd: root});
  for(const name of exclude) {
    rmSync(path.join(ids, name), {recursive: true, force: true});
  }
  return true;
}

/** Per-rule counts, and the file total, for one tree. */
function measure(sha, root, exclude) {
  const dir = mkdtempSync(path.join(tmpdir(), 'w3id-trend-'));
  try {
    const reRooted = materialise(sha, dir, root, exclude);
    // The repository's own configuration, not a synthetic one: allowedPaths
    // and ignorePaths change what several rules report, and a stand-in
    // silently inflates them.
    copyFileSync(path.join(root, '.w3id-check.yaml'),
      path.join(dir, '.w3id-check.yaml'));
    git(['init', '-q', '-b', 'master'], dir);
    git(['add', '-A'], dir);
    git(['-c', 'user.email=trend@example.invalid', '-c', 'user.name=Trend',
      'commit', '-qm', 'tree'], dir);

    // spawnSync, not execFileSync: the checker exits 1 when it finds an
    // error, which is its normal answer over a real tree and not a failure
    // of this tool. Only an unparseable payload is a failure.
    const run = spawnSync('node',
      [CHECKER, '--all', '--committed-only', '--format', 'json'],
      {cwd: dir, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024});
    if(run.status === null || run.status > 1 || run.stdout === '') {
      throw new Error(`checker exited ${run.status} for ${sha.slice(0, 9)}: ` +
        (run.stderr || '(no output)').trim().slice(0, 300));
    }
    const payload = JSON.parse(run.stdout);
    const counts = {};
    for(const finding of payload.findings) {
      counts[finding.ruleId] = (counts[finding.ruleId] ?? 0) + 1;
    }
    return {counts, files: payload.summary.filesChecked, reRooted};
  } finally {
    rmSync(dir, {recursive: true, force: true});
  }
}

function main(argv) {
  const root = git(['rev-parse', '--show-toplevel'], process.cwd());
  if(!existsSync(path.join(root, 'ids'))) {
    process.stderr.write('w3id-check-trend: no ids/ directory here.\n');
    return 2;
  }
  const ref = argv[0] ?? 'HEAD';
  const exclude = notIdentifiers(root);
  const asJson = argv.includes('--format=json');

  const columns = [];
  for(const {label, days} of POINTS) {
    const when = new Date(Date.now() - days * 86400000).toISOString();
    // --first-parent matters, and its absence is not a subtle bug. Without
    // it, `rev-list -1 --before` returns the newest commit whose *committer
    // date* is before the cutoff, and a pull request authored months ago but
    // merged last week is exactly such a commit -- its tree is missing
    // everything merged in between. Measured: the three-month point came
    // back with 3460 files against 4822 on the mainline, and the report
    // showed rules swinging by a factor of three.
    const sha = days === 0 ? git(['rev-parse', ref], root) :
      git(['rev-list', '-1', '--first-parent', `--before=${when}`, ref], root);
    if(sha === '') {
      continue;                       // history does not reach back this far
    }
    if(columns.some(c => c.sha === sha)) {
      continue;                       // two points landing on one commit
    }
    const date = git(['show', '-s', '--format=%ad', '--date=short', sha], root);
    columns.push({label, date, sha, ...measure(sha, root, exclude)});
  }
  // Oldest first, so a row reads left to right as time passing.
  columns.reverse();

  if(columns.length < 2) {
    // A shallow clone reaches back one commit, and every historical point
    // then resolves to nothing. Silence here would look like a tidy report
    // of a tree with no history rather than a checkout with none.
    process.stderr.write(
      'w3id-check-trend: only one point in range. A shallow clone cannot ' +
      'reach the past; fetch the full history (actions/checkout with ' +
      'fetch-depth: 0).\n');
    return 2;
  }

  if(asJson) {
    process.stdout.write(JSON.stringify({version: 1, columns}, null, 2) + '\n');
    return 0;
  }
  process.stdout.write(render(columns));
  return 0;
}

function render(columns) {
  const out = [];
  const newest = columns.at(-1);
  const oldest = columns[0];

  out.push('## Backlog trend', '');
  out.push("Today's rules, run against the tree as it was. " +
    'Nothing here gates anything.', '');

  out.push('| Point | Date | Commit | Files | Findings |');
  out.push('| --- | --- | --- | --- | --- |');
  for(const c of columns) {
    const total = Object.values(c.counts).reduce((a, b) => a + b, 0);
    out.push(`| ${c.label}${c.reRooted ? ' *' : ''} | ${c.date} | ` +
      `\`${c.sha.slice(0, 9)}\` | ${c.files} | ${total} |`);
  }
  out.push('');
  // A safeguard against the bug above rather than a remark about the tree.
  // Identifiers are occasionally removed, so a small dip is real; a large one
  // means a point landed on a commit that is not the mainline, and every
  // rule count in that column is then meaningless.
  for(let i = 1; i < columns.length; ++i) {
    const before = columns[i - 1];
    const after = columns[i];
    if(after.files < before.files * 0.95) {
      out.push(`> **The tree shrank by more than 5% between ${before.label} ` +
        `and ${after.label}** (${before.files} to ${after.files} files). ` +
        'That is usually a commit off the mainline rather than a real ' +
        'change; treat the counts either side as unrelated.', '');
    }
  }
  if(columns.some(c => c.reRooted)) {
    out.push('\\* Before `ids/` existed. The tree is re-rooted to compare, ' +
      'so the layout differs from the files as they were committed.', '');
  }

  // Rules that say nothing anywhere are noise. `git`-scope rules are the
  // bulk of these: they judge a pull request, and a materialised tree has no
  // pull request to judge.
  const ruleIds = [...new Set(columns.flatMap(c => Object.keys(c.counts)))]
    .filter(id => columns.some(c => (c.counts[id] ?? 0) > 0))
    .sort((a, b) => (newest.counts[b] ?? 0) - (newest.counts[a] ?? 0) ||
      a.localeCompare(b));

  out.push('### Count, and findings per 1000 files', '');
  out.push('The count says whether the backlog is shrinking. The rate says ' +
    'whether new contributions are still making the mistake -- a count can ' +
    'rise while the rate falls, which is a fixed proportion of a growing ' +
    'tree.', '');
  out.push('| Rule | ' + columns.map(c => c.label).join(' | ') +
    ' | count | rate |');
  out.push('| --- |' + columns.map(() => ' --- |').join('') + ' --- | --- |');

  for(const id of ruleIds) {
    const cells = columns.map(c => String(c.counts[id] ?? 0));
    const first = oldest.counts[id] ?? 0;
    const last = newest.counts[id] ?? 0;
    out.push(`| \`${id}\` | ${cells.join(' | ')} | ` +
      `${change(first, last)} | ` +
      `${change(rate(first, oldest.files), rate(last, newest.files))} |`);
  }
  out.push('');

  const gone = ruleIds.filter(id => (oldest.counts[id] ?? 0) > 0 &&
    (newest.counts[id] ?? 0) === 0);
  if(gone.length > 0) {
    // Worth its own line rather than a zero in a wide table. Either the
    // backlog was cleared, which is news, or the rule has quietly stopped
    // matching, which is a bug -- and both look identical here.
    out.push('### Now reporting nothing', '');
    out.push('Either the backlog was cleared, or the rule stopped matching. ' +
      'These look the same from here; check the rule.', '');
    for(const id of gone) {
      out.push(`- \`${id}\` — was ${oldest.counts[id]} at ${oldest.date}`);
    }
    out.push('');
  }
  return out.join('\n') + '\n';
}

function rate(count, files) {
  return files > 0 ? count * 1000 / files : 0;
}

function change(from, to) {
  if(from === 0) {
    return to === 0 ? '—' : 'new';
  }
  const pct = (to / from - 1) * 100;
  const sign = pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(0)}%`;
}

try {
  process.exit(main(process.argv.slice(2)));
} catch(e) {
  process.stderr.write(`w3id-check-trend: ${e.message}\n`);
  process.exit(3);
}
