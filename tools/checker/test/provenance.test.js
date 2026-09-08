/**
 * The provenance ratchet is the reason a contributor is not shown the
 * repository's legacy backlog. These tests pin that behaviour down.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeRepo, check, goodNamespace} from './helpers.js';
import {rules} from '../src/rules/index.js';
import formatNoTrailingWhitespace from '../src/rules/format/no-trailing-whitespace.js';
import htaccessRewriteEngineRequired from '../src/rules/htaccess/rewrite-engine-required.js';

// A repository whose existing content already violates several rules, matching
// the real one.
function repoWithBacklog() {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/legacy/.htaccess',
    'RewriteEngine on   \nRewriteRule ^$ https://example.com/ [R=302,L]   \n');
  repo.write('ids/legacy/README.md', '# legacy   \n\nBy @octocat\n');
  repo.commit('Add legacy identifier');
  return repo;
}

test('a clean change reports nothing despite a backlog', () => {
  const repo = repoWithBacklog();
  const base = repo.git(['rev-parse', 'HEAD']).trim();
  repo.branch('feature');
  goodNamespace(repo, 'brand-new');
  const head = repo.commit('Add redirect for brand-new');

  const result = check({dir: repo.dir, rules, base, head, auditAll: false});
  assert.deepEqual(result.findings, [],
    'a clean addition must not be blamed for pre-existing problems');
});

test('a whole-tree audit does report the backlog', () => {
  const repo = repoWithBacklog();
  const result = check({dir: repo.dir, rules: [formatNoTrailingWhitespace]});
  assert.ok(result.findings.length >= 3,
    'the backlog is visible to --all');
  assert.ok(result.findings.every(f => f.provenance === 'introduced'));
});

test('a problem on a newly added line is introduced and blocks', () => {
  const repo = repoWithBacklog();
  const base = repo.git(['rev-parse', 'HEAD']).trim();
  repo.branch('feature');
  repo.write('ids/broken/.htaccess',
    'RewriteRule ^$ https://example.com/ [R=302,L]\n');
  repo.write('ids/broken/README.md', '# broken\n\nBy @octocat\n');
  const head = repo.commit('Add redirect for broken');

  const result = check({
    dir: repo.dir, rules: [htaccessRewriteEngineRequired],
    base, head, auditAll: false
  });
  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].provenance, 'introduced');
  assert.equal(result.findings[0].severity, 'error');
});

test('an untouched line in a touched file is demoted, not silenced', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  // Line 2 has trailing whitespace from the start.
  repo.write('ids/thing/.htaccess',
    'RewriteEngine on\nRewriteRule ^$ https://example.com/ [R=302,L]   \n');
  repo.write('ids/thing/README.md', '# thing\n\nBy @octocat\n');
  const base = repo.commit('Add thing');

  repo.branch('feature');
  // Append a clean line; line 2 is untouched.
  repo.write('ids/thing/.htaccess',
    'RewriteEngine on\nRewriteRule ^$ https://example.com/ [R=302,L]   \n' +
    'RewriteRule ^v1$ https://example.com/v1 [R=302,L]\n');
  const head = repo.commit('Add v1 redirect for thing');

  const result = check({
    dir: repo.dir, rules: [formatNoTrailingWhitespace],
    base, head, auditAll: false
  });
  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].line, 2);
  assert.equal(result.findings[0].provenance, 'touched');
  // policy.touched is `warning`, so it informs without blocking.
  assert.equal(result.findings[0].severity, 'warning');
});

test('a critical problem in a touched namespace surfaces as a notice', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  // The redirect is dead: no RewriteEngine, so Apache ignores the rule.
  repo.write('ids/dead/.htaccess',
    'RewriteRule ^$ https://example.com/ [R=302,L]\n');
  repo.write('ids/dead/README.md', '# dead\n\nBy @octocat\n');
  const base = repo.commit('Add dead identifier');

  repo.branch('feature');
  // Touch the namespace without touching the broken file.
  repo.write('ids/dead/README.md', '# dead\n\nBy @octocat and @hubot\n');
  const head = repo.commit('Add second maintainer for dead');

  const result = check({
    dir: repo.dir, rules: [htaccessRewriteEngineRequired],
    base, head, auditAll: false
  });
  assert.equal(result.findings.length, 1,
    'someone editing this identifier should be told it does not resolve');
  assert.equal(result.findings[0].file, 'ids/dead/.htaccess');
  // The file itself is unchanged, but its namespace is in the change.
  assert.equal(result.findings[0].provenance, 'touched');
  assert.equal(result.findings[0].severity, 'notice',
    'but as a notice: they did not break it, so it must not block them');
});

test('a critical problem in an untouched namespace stays out of the way', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/dead/.htaccess',
    'RewriteRule ^$ https://example.com/ [R=302,L]\n');
  repo.write('ids/dead/README.md', '# dead\n\nBy @octocat\n');
  const base = repo.commit('Add dead identifier');

  repo.branch('feature');
  goodNamespace(repo, 'unrelated');
  const head = repo.commit('Add redirect for unrelated');

  const result = check({
    dir: repo.dir, rules: [htaccessRewriteEngineRequired],
    base, head, auditAll: false
  });
  assert.deepEqual(result.findings, [],
    'an unrelated broken identifier is triage work, not this author\'s problem');
});

test('a non-critical problem elsewhere is silenced entirely', () => {
  const repo = repoWithBacklog();
  const base = repo.git(['rev-parse', 'HEAD']).trim();
  repo.branch('feature');
  goodNamespace(repo, 'unrelated');
  const head = repo.commit('Add redirect for unrelated');

  const result = check({
    dir: repo.dir, rules: [formatNoTrailingWhitespace],
    base, head, auditAll: false
  });
  assert.deepEqual(result.findings, []);
});
