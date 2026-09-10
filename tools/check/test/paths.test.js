/**
 * Path scoping and working-tree checking.
 *
 * These two features exist for the same reason: somebody halfway through
 * editing a namespace wants to know what is wrong with it, and before this the
 * tool would look only at committed content and report success.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {makeRepo, check, findingsOf, goodNamespace} from './helpers.js';
import {resolveScope, ScopeError} from '../src/paths.js';
import {loadConfig} from '../src/config.js';
import {rules} from '../src/rules/index.js';
import {main, EXIT} from '../src/cli.js';
import rewriteEngineRequired from '../src/rules/htaccess/rewrite-engine-required.js';
import noTrailingWhitespace from '../src/rules/format/no-trailing-whitespace.js';
import noCaseCollision from '../src/rules/tree/no-case-collision.js';
import documentIdentifierRoot
  from '../src/rules/meta/document-identifier-root.js';
import onlyOwnIdentifier from '../src/rules/tree/only-own-identifier.js';

const BROKEN = 'RewriteRule ^$ https://example.com/ [R=302,L]\n';
const OK = 'RewriteEngine on\nRewriteRule ^$ https://example.com/ [R=302,L]\n';

// A repository with two committed namespaces, each with a dead redirect.
function twoBrokenNamespaces() {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/foo/.htaccess', BROKEN);
  repo.write('ids/foo/README.md', '# foo\n\nBy @octocat\n');
  repo.write('ids/bar/.htaccess', BROKEN);
  repo.write('ids/bar/README.md', '# bar\n\nBy @octocat\n');
  repo.commit('Add foo and bar');
  return repo;
}

// Capture what the CLI writes, so exit codes and messages can be asserted.
function captureRun(argv, cwd) {
  const out = [];
  const err = [];
  const sink = target => ({write: chunk => target.push(chunk)});
  return main(argv, {stdout: sink(out), stderr: sink(err), cwd})
    .then(code => ({code, stdout: out.join(''), stderr: err.join('')}));
}

test('a scope reports the named directory and not its siblings', () => {
  const repo = twoBrokenNamespaces();
  const result = check({
    dir: repo.dir, rules: [rewriteEngineRequired], scope: ['ids/foo']
  });
  assert.deepEqual(findingsOf(result), ['ids/foo/.htaccess:1:error']);
});

test('several scopes may be given at once', () => {
  const repo = twoBrokenNamespaces();
  repo.write('ids/baz/.htaccess', BROKEN);
  repo.commit('Add baz');
  const result = check({
    dir: repo.dir,
    rules: [rewriteEngineRequired],
    scope: ['ids/bar', 'ids/foo']
  });
  assert.deepEqual(findingsOf(result).sort(),
    ['ids/bar/.htaccess:1:error', 'ids/foo/.htaccess:1:error']);
});

test('a single file works as a scope', () => {
  const repo = twoBrokenNamespaces();
  const result = check({
    dir: repo.dir,
    rules: [rewriteEngineRequired],
    scope: ['ids/foo/.htaccess']
  });
  assert.deepEqual(findingsOf(result), ['ids/foo/.htaccess:1:error']);
});

test('an untracked file is checked -- the work-in-progress case', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  goodNamespace(repo, 'existing');
  repo.commit('Add existing');

  // Written but never committed: this is what the feature is for.
  repo.write('ids/wip/.htaccess', BROKEN);

  const withWorkingTree = check({
    dir: repo.dir,
    rules: [rewriteEngineRequired],
    scope: ['ids/wip'],
    includeWorkingTree: true
  });
  assert.deepEqual(findingsOf(withWorkingTree),
    ['ids/wip/.htaccess:1:error']);

  const committedOnly = check({
    dir: repo.dir,
    rules: [rewriteEngineRequired],
    scope: ['ids/wip'],
    includeWorkingTree: false
  });
  assert.deepEqual(findingsOf(committedOnly), [],
    'committed-only must not see a file that was never committed');
});

test('a line edited on disk counts as introduced and blocks', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/thing/.htaccess', OK);
  repo.write('ids/thing/README.md', '# thing\n\nBy @octocat\n');
  const base = repo.commit('Add thing');

  // Append a line with trailing whitespace, without committing it.
  repo.write('ids/thing/.htaccess',
    OK + 'RewriteRule ^v1$ https://example.com/v1 [R=302,L]   \n');

  const result = check({
    dir: repo.dir,
    rules: [noTrailingWhitespace],
    base,
    head: 'HEAD',
    auditAll: false,
    includeWorkingTree: true
  });
  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].line, 3);
  assert.equal(result.findings[0].provenance, 'introduced',
    'an uncommitted edit is still the author\'s own work');
  assert.equal(result.findings[0].severity, 'warning');
});

test('a scope does not blind a tree rule to the rest of the tree', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/widget/.htaccess', OK);
  repo.commit('Add widget');

  // A new namespace colliding with the committed one, only on disk.
  repo.write('ids/Widget/.htaccess', OK);

  const result = check({
    dir: repo.dir,
    rules: [noCaseCollision],
    scope: ['ids/Widget'],
    includeWorkingTree: true
  });
  // The collision is only detectable by looking outside the scope, but is
  // reported against the path inside it.
  assert.deepEqual(result.findings.map(f => f.file), ['ids/Widget']);
  assert.match(result.findings[0].message, /ids\/widget/);
});

test('a tree rule finding outside the scope is suppressed', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  // Neither namespace has a README.
  repo.write('ids/foo/.htaccess', OK);
  repo.write('ids/bar/.htaccess', OK);
  repo.commit('Add foo and bar');

  const scoped = check({
    dir: repo.dir, rules: [documentIdentifierRoot], scope: ['ids/foo']
  });
  assert.deepEqual(scoped.findings.map(f => f.file), ['ids/foo']);

  const unscoped = check({dir: repo.dir, rules: [documentIdentifierRoot]});
  assert.deepEqual(unscoped.findings.map(f => f.file).sort(),
    ['ids/bar', 'ids/foo']);

  // Suppressed rather than never computed, and `--why` distinguishes the two.
  assert.deepEqual(
    scoped.suppressed.map(f => `${f.file}:${f.reason}`),
    ['ids/bar:out-of-scope']);
  assert.deepEqual(unscoped.suppressed, []);
});

test('resolveScope: paths resolve against the working directory', () => {
  const repo = twoBrokenNamespaces();
  assert.deepEqual(
    resolveScope(['foo'], {root: repo.dir, cwd: path.join(repo.dir, 'ids')}),
    ['ids/foo'],
    'cd ids && w3id-check foo must mean ids/foo');
});

test('resolveScope: normalises separators, slashes and duplicates', () => {
  const repo = twoBrokenNamespaces();
  const at = args => resolveScope(args, {root: repo.dir, cwd: repo.dir});

  assert.deepEqual(at(['ids/foo/']), ['ids/foo'], 'trailing slash');
  assert.deepEqual(at(['./ids/foo']), ['ids/foo'], 'leading dot');
  assert.deepEqual(at([path.join(repo.dir, 'ids', 'foo')]), ['ids/foo'],
    'absolute path');
  assert.deepEqual(at(['ids/foo', 'ids/foo']), ['ids/foo'], 'duplicate');
  assert.deepEqual(at(['ids/foo', 'ids/foo/.htaccess']), ['ids/foo'],
    'a path already covered by another is redundant');
});

test('resolveScope: no arguments and the repository root both mean no scope',
  () => {
    const repo = twoBrokenNamespaces();
    const at = args => resolveScope(args, {root: repo.dir, cwd: repo.dir});
    assert.equal(at([]), null);
    assert.equal(at(['.']), null, '"." is the whole repository, not nothing');
    assert.equal(at([repo.dir]), null);
    assert.equal(at(['ids/foo', '.']), null);
  });

test('resolveScope: a bad path is an error, never an empty scope', () => {
  const repo = twoBrokenNamespaces();
  const at = args => resolveScope(args, {root: repo.dir, cwd: repo.dir});

  assert.throws(() => at(['ids/nope']), ScopeError,
    'a typo must not silently check nothing');
  assert.throws(() => at(['ids/nope']), /does not exist/);
  assert.throws(() => at(['../elsewhere']), ScopeError);
  assert.throws(() => at(['/etc']), /outside the repository/);
});

test('the CLI accepts paths and rejects a bad one with exit 2', async () => {
  const repo = twoBrokenNamespaces();

  const scoped = await captureRun(['ids/foo'], repo.dir);
  assert.equal(scoped.code, EXIT.findings, 'ids/foo has a dead redirect');
  assert.match(scoped.stdout, /ids\/foo\/\.htaccess/);
  assert.doesNotMatch(scoped.stdout, /ids\/bar/,
    'a scoped run must not discuss other namespaces');
  assert.match(scoped.stdout, /Checked ids\/foo \(\d+ file/,
    'the summary should say what was checked');

  const typo = await captureRun(['ids/fooo'], repo.dir);
  assert.equal(typo.code, EXIT.usage);
  assert.match(typo.stderr, /"ids\/fooo" does not exist/);
  assert.equal(typo.stdout, '', 'a bad path must produce no report at all');
});

test('the CLI reports uncommitted work with no arguments at all', async () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  goodNamespace(repo, 'existing');
  repo.commit('Add existing');

  repo.write('ids/wip/.htaccess', BROKEN);

  const dirty = await captureRun([], repo.dir);
  assert.equal(dirty.code, EXIT.findings,
    'the whole point: uncommitted work must not pass silently');
  assert.match(dirty.stdout, /ids\/wip\/\.htaccess/);
  assert.match(dirty.stdout, /not yet committed/,
    'the summary should say some of what it checked is uncommitted');

  const committed = await captureRun(['--committed-only'], repo.dir);
  assert.equal(committed.code, EXIT.ok);
  assert.doesNotMatch(committed.stdout, /ids\/wip/);
});

test('paths narrow --all rather than conflicting with it', async () => {
  const repo = twoBrokenNamespaces();
  const result = await captureRun(['--all', 'ids/bar'], repo.dir);
  assert.equal(result.code, EXIT.findings);
  assert.match(result.stdout, /ids\/bar/);
  assert.doesNotMatch(result.stdout, /ids\/foo/);
});

test('paths narrow --triage, which still exits 0', async () => {
  const repo = twoBrokenNamespaces();
  const result = await captureRun(['--triage', 'ids/foo'], repo.dir);
  assert.equal(result.code, EXIT.ok, 'reports never gate');
  assert.match(result.stdout, /ids\/foo/);
  assert.doesNotMatch(result.stdout, /ids\/bar/);
});

test('paths combined with --base narrow the comparison', () => {
  const repo = twoBrokenNamespaces();
  const base = repo.git(['rev-parse', 'HEAD']).trim();
  repo.branch('feature');
  repo.write('ids/foo/.htaccess', BROKEN + '# touched\n');
  repo.write('ids/bar/.htaccess', BROKEN + '# touched\n');
  const head = repo.commit('Adjust foo and bar');

  const result = check({
    dir: repo.dir,
    rules: [rewriteEngineRequired],
    base,
    head,
    auditAll: false,
    scope: ['ids/foo']
  });
  assert.deepEqual(result.findings.map(f => f.file), ['ids/foo/.htaccess']);
});

test('a deleted file drops out of the tree', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/doomed/.htaccess', BROKEN);
  repo.commit('Add doomed');

  const before = check({
    dir: repo.dir, rules: [rewriteEngineRequired], includeWorkingTree: true
  });
  assert.equal(before.findings.length, 1);

  repo.remove('ids/doomed/.htaccess');

  const after = check({
    dir: repo.dir, rules: [rewriteEngineRequired], includeWorkingTree: true
  });
  assert.deepEqual(after.findings, [],
    'a file deleted on disk should not still be reported');
});

test('all rules survive a scoped working-tree run', () => {
  const repo = twoBrokenNamespaces();
  repo.write('ids/wip/.htaccess', BROKEN);
  // No throwing, and nothing reported outside the scope.
  const result = check({
    dir: repo.dir, rules, scope: ['ids/wip'], includeWorkingTree: true
  });
  assert.deepEqual(result.errors.map(e => e.ruleId), []);
  const strays = result.findings
    .filter(f => f.file !== null && !f.file.startsWith('ids/wip'));
  assert.deepEqual(strays.map(f => `${f.ruleId} ${f.file}`), []);
});

// tree/only-own-identifier reports rather than gates, so what matters is which
// of its three messages fires -- and that ordinary work does not trip it.
function identifierChange(build) {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/existing/.htaccess', OK);
  repo.write('ids/.htaccess', '# global rewrites\nRewriteEngine on\n');
  repo.write('ids/index.html', '<p>home</p>\n');
  repo.write('README.md', '# repo\n');
  const base = repo.commit('base');
  repo.branch('feature');
  build(repo);
  const head = repo.commit('change');
  return check({
    dir: repo.dir, rules: [onlyOwnIdentifier], base, head, auditAll: false
  });
}

test('only-own-identifier is silent on a self-contained contribution', () => {
  const r = identifierChange(repo => repo.write('ids/mine/.htaccess', OK));
  assert.deepEqual(r.findings, []);
});

test('only-own-identifier warns on shared infrastructure', () => {
  for(const [what, file, contents] of [
    ['the global rewrites', 'ids/.htaccess', '# global\nRewriteEngine on\nRewriteRule ^a$ /b\n'],
    ['the homepage', 'ids/index.html', '<p>home</p>\n<p>more</p>\n']
  ]) {
    const r = identifierChange(repo => {
      repo.write('ids/mine/.htaccess', OK);
      repo.write(file, contents);
    });
    assert.equal(r.findings.length, 1, what);
    assert.equal(r.findings[0].severity, 'warning', what);
    assert.match(r.findings[0].message, /shared by every identifier/, what);
    assert.match(r.findings[0].message, new RegExp(file.replace('.', '\\.')));
  }
});

test('only-own-identifier flags a second identifier', () => {
  const r = identifierChange(repo => {
    repo.write('ids/mine/.htaccess', OK);
    repo.write('ids/existing/.htaccess', OK + 'RewriteRule ^v1$ https://x/ [R=302,L]\n');
  });
  assert.equal(r.findings.length, 1);
  assert.equal(r.findings[0].severity, 'warning');
  assert.match(r.findings[0].message, /touches 2 identifiers/);
});

test('only-own-identifier only notices work outside ids/', () => {
  const r = identifierChange(repo => {
    repo.write('ids/mine/.htaccess', OK);
    repo.write('docs/guides/thing.md', '# thing\n');
  });
  assert.equal(r.findings.length, 1);
  assert.equal(r.findings[0].severity, 'notice',
    'a docs fix alongside a redirect is often deliberate');
  assert.match(r.findings[0].message, /docs\/guides\/thing\.md/);
});

test('only-own-identifier ignores work that touches no identifier', () => {
  const r = identifierChange(repo => {
    repo.write('tools/check/src/thing.js', 'export default {};\n');
    repo.write('README.md', '# repo\n\nedited\n');
  });
  assert.deepEqual(r.findings, [],
    'tooling and docs work is not what this rule is looking at');
});

test('config: a rule id naming no rule is an error, not a no-op', () => {
  // Severities are looked up by rule id, so a stale key is simply never
  // consulted. Renaming a rule would then turn a deliberate "off" quietly
  // back on. This is the one file naming rule ids that meta/rule-docs-exist
  // does not cover, so the check has to live here.
  const repo = makeRepo();
  repo.write('.w3id-check.yaml',
    'rules:\n  files/prefer-readme-md: off\n  files/no-such-rule: off\n');
  repo.commit('fixture');
  assert.throws(() => loadConfig(repo.dir), /names no rule/);
});

test('config: every rule id in the shipped config still exists', () => {
  // The repository's own .w3id-check.yaml, loaded the way the CLI loads it.
  assert.doesNotThrow(() => loadConfig(path.resolve(
    path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')));
});
