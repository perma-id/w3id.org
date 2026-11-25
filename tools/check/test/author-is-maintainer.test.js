/**
 * meta/author-is-maintainer: whether whoever opened a change is recorded as
 * a maintainer of the directories it touches.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {makeRepo, check, findingsOf} from './helpers.js';
import {main} from '../src/cli.js';
import authorIsMaintainer from '../src/rules/meta/author-is-maintainer.js';

const OK = 'RewriteEngine on\nRewriteRule ^$ https://example.com/ [R=302,L]\n';
const MORE = OK + 'RewriteRule ^a$ https://example.com/a [R=302,L]\n';

// A namespace with a maintainer at the root and others further down, as
// large shared namespaces are organised.
function namespace() {
  const repo = makeRepo();
  repo.write('ids/it/README.md',
    '# it\n\nMaintainer: [Root](https://github.com/root-maint)\n');
  repo.write('ids/it/.htaccess', OK);
  repo.write('ids/it/env/README.md', '# env\n\nGitHub username: env-maint\n');
  repo.write('ids/it/env/vocab/.htaccess', OK);
  repo.write('ids/it/other/README.md',
    '# other\n\nGitHub username: other-maint\n');
  repo.write('ids/it/other/.htaccess', OK);
  const base = repo.commit('base');
  return {repo, base};
}

function changeVocab(author, opts = {}) {
  const {repo, base} = namespace();
  repo.write('ids/it/env/vocab/.htaccess', MORE);
  repo.commit('Add a redirect to it/env/vocab');
  return check({dir: repo.dir, rules: [authorIsMaintainer], base,
    head: 'HEAD', author, ...opts});
}

test('author-is-maintainer: a maintainer of a directory above passes', () => {
  assert.deepEqual(findingsOf(changeVocab('env-maint')), []);
  assert.deepEqual(findingsOf(changeVocab('root-maint')), []);
});

test('author-is-maintainer: usernames compare without case', () => {
  assert.deepEqual(findingsOf(changeVocab('Env-Maint')), []);
});

test('author-is-maintainer: anyone else is reported on the added line', () => {
  const r = changeVocab('stranger');
  assert.deepEqual(findingsOf(r), ['ids/it/env/vocab/.htaccess:3:warning']);
});

test('author-is-maintainer: the message names the nearest maintainers first',
  () => {
    const {message} = changeVocab('stranger').findings[0];
    // Mentions, so that a comment posted from the report notifies them.
    assert.match(message, /^@stranger, who opened/);
    assert.match(message,
      /ids\/it\/env lists @env-maint.*ids\/it lists @root-maint/);
    // Maintainers of a sibling directory have no say over this one.
    assert.doesNotMatch(message, /other-maint/);
  });

test('author-is-maintainer: a sibling directory\'s maintainer is reported',
  () => {
    assert.deepEqual(findingsOf(changeVocab('other-maint')),
      ['ids/it/env/vocab/.htaccess:3:warning']);
  });

test('author-is-maintainer: adding yourself to a README does not count', () => {
  const {repo, base} = namespace();
  repo.write('ids/it/env/README.md',
    '# env\n\nGitHub username: env-maint\nGitHub username: stranger\n');
  repo.commit('Add stranger as a maintainer of it/env');
  const r = check({dir: repo.dir, rules: [authorIsMaintainer], base,
    head: 'HEAD', author: 'stranger'});
  assert.deepEqual(findingsOf(r), ['ids/it/env/README.md:4:warning']);
});

test('author-is-maintainer: maintainers are read from the target branch',
  () => {
    // Somebody added to master after the change forked is a maintainer now.
    const {repo, base} = namespace();
    repo.branch('change');
    repo.write('ids/it/env/vocab/.htaccess', MORE);
    repo.commit('Add a redirect to it/env/vocab');
    repo.checkout('master');
    repo.write('ids/it/env/README.md',
      '# env\n\nGitHub username: env-maint\nGitHub username: newcomer\n');
    const target = repo.commit('Add newcomer as a maintainer of it/env');
    repo.checkout('change');
    const run = t => check({dir: repo.dir, rules: [authorIsMaintainer], base,
      head: 'HEAD', author: 'newcomer', target: t});
    assert.deepEqual(findingsOf(run(null)),
      ['ids/it/env/vocab/.htaccess:3:warning']);
    assert.deepEqual(findingsOf(run(target)), []);
  });

test('author-is-maintainer: a new identifier has nobody to ask', () => {
  const {repo, base} = namespace();
  repo.write('ids/fresh/.htaccess', OK);
  repo.write('ids/fresh/README.md', '# fresh\n\nGitHub username: stranger\n');
  repo.commit('Add fresh');
  const r = check({dir: repo.dir, rules: [authorIsMaintainer], base,
    head: 'HEAD', author: 'stranger'});
  assert.deepEqual(findingsOf(r), []);
});

test('author-is-maintainer: a new sub-directory answers to the levels above',
  () => {
    const {repo, base} = namespace();
    repo.write('ids/it/fresh/.htaccess', OK);
    repo.write('ids/it/fresh/README.md',
      '# fresh\n\nGitHub username: stranger\n');
    repo.commit('Add it/fresh');
    const r = check({dir: repo.dir, rules: [authorIsMaintainer], base,
      head: 'HEAD', author: 'stranger'});
    assert.deepEqual(findingsOf(r), ['ids/it/fresh/.htaccess:1:warning']);
    assert.match(r.findings[0].message, /ids\/it lists @root-maint/);
  });

test('author-is-maintainer: without an author the rule says nothing', () => {
  assert.deepEqual(findingsOf(changeVocab(null)), []);
});

test('author-is-maintainer: a deletion is still reported, with no line', () => {
  const {repo, base} = namespace();
  repo.remove('ids/it/env/vocab/.htaccess');
  repo.commit('Remove it/env/vocab');
  const r = check({dir: repo.dir, rules: [authorIsMaintainer], base,
    head: 'HEAD', author: 'stranger'});
  assert.deepEqual(findingsOf(r), ['-:-:warning']);
  assert.match(r.findings[0].message, /ids\/it\/env\/vocab/);
});

// What the CLI reports when GitHub Actions has written `event` for the run.
async function runInActions(event) {
  const {repo, base} = namespace();
  repo.write('ids/it/env/vocab/.htaccess', MORE);
  repo.commit('Add a redirect to it/env/vocab');
  const env = {};
  if(event !== undefined) {
    env.GITHUB_EVENT_PATH =
      path.join(mkdtempSync(path.join(tmpdir(), 'w3id-event-')), 'event.json');
    writeFileSync(env.GITHUB_EVENT_PATH, JSON.stringify(event));
  }
  const out = [];
  const sink = {write: chunk => out.push(chunk)};
  await main(['--base', base, '--rule', 'meta/author-is-maintainer',
    '--format', 'json'], {stdout: sink, stderr: sink, cwd: repo.dir, env});
  return JSON.parse(out.join('')).findings
    .map(f => `${f.file}:${f.line}:${f.severity}`);
}

test('author-is-maintainer: the CLI reads the author from the event', async() => {
  assert.deepEqual(
    await runInActions({pull_request: {user: {login: 'stranger'}}}),
    ['ids/it/env/vocab/.htaccess:3:warning']);
});

test('author-is-maintainer: no pull request event, no author', async() => {
  assert.deepEqual(await runInActions({ref: 'refs/heads/master'}), []);
  assert.deepEqual(await runInActions(undefined), []);
});
