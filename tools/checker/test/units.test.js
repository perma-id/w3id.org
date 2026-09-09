/** Unit tests for the pieces the rules are built out of. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {minimatch, matchesAny} from '../src/glob.js';
import {parse, parseFlags} from '../src/htaccess.js';
import {findUsernames} from '../src/maintainers.js';
import {analyse, captureGroups} from '../src/rules/htaccess/no-open-redirect.js';
import {resolveSeverity} from '../src/config.js';
import {isReadme, TEXT_FILE_PATTERNS} from '../src/paths.js';

test('glob: ** spans zero or more segments', () => {
  for(const p of ['.htaccess', 'ids/.htaccess', 'ids/a/b/c/.htaccess']) {
    assert.ok(minimatch(p, '**/.htaccess'), p);
  }
  assert.ok(!minimatch('ids/a/README.md', '**/.htaccess'));
});

test('glob: * does not cross a separator', () => {
  assert.ok(minimatch('ids/w3id/404.html', 'ids/w3id/*.html'));
  assert.ok(!minimatch('ids/w3id/a/404.html', 'ids/w3id/*.html'));
});

test('glob: dotfiles are not hidden', () => {
  // Every interesting file in this repository starts with a dot.
  assert.ok(minimatch('ids/a/.htaccess', '**/*'));
  assert.ok(minimatch('ids/.assets/css/x.css', 'ids/.assets/**'));
});

test('glob: character classes match case variants', () => {
  const pattern = '**/[Rr][Ee][Aa][Dd][Mm][Ee].md';
  assert.ok(minimatch('ids/a/README.md', pattern));
  assert.ok(minimatch('ids/a/readme.md', pattern));
  assert.ok(!minimatch('ids/a/README.txt', pattern));
});

test('htaccess: CRLF is stripped but recorded', () => {
  const h = parse('RewriteEngine on\r\nRewriteRule ^$ https://x/ [R=302,L]\r\n');
  assert.deepEqual(h.crlfLines, [1, 2]);
  assert.equal(h.directives[0].name, 'RewriteEngine');
  assert.equal(h.rewriteRules()[0].pattern, '^$');
});

test('htaccess: backslash continuations are joined', () => {
  const h = parse('RewriteRule \\\n\t^a$ \\\n\thttps://x/ \\\n\t[R=302,L]\n');
  assert.equal(h.directives.length, 1);
  assert.equal(h.directives[0].line, 1);
  assert.equal(h.directives[0].endLine, 4);
  assert.deepEqual(h.continuationLines, [1, 2, 3]);
  assert.equal(h.rewriteRules()[0].substitution, 'https://x/');
});

test('htaccess: quoted arguments keep their spaces and hashes', () => {
  const h = parse('RewriteRule "^a b$" "https://x/#frag" [R=302,L]\n');
  const rule = h.rewriteRules()[0];
  assert.equal(rule.pattern, '^a b$');
  assert.equal(rule.substitution, 'https://x/#frag');
  assert.equal(h.directives[0].inlineComment, null);
});

test('htaccess: a # after arguments is not a comment', () => {
  const h = parse('RewriteRule ^a$ https://x/ [R=302,L] # nope\n');
  assert.notEqual(h.directives[0].inlineComment, null);
  assert.match(h.directives[0].inlineComment.text, /nope/);
});

test('htaccess: RewriteEngine off does not count as enabled', () => {
  assert.equal(parse('RewriteEngine on\n').rewriteEnabled(), true);
  assert.equal(parse('RewriteEngine On\n').rewriteEnabled(), true);
  assert.equal(parse('RewriteEngine off\n').rewriteEnabled(), false);
  assert.equal(parse('').rewriteEnabled(), false);
  // The last occurrence wins, as in Apache.
  assert.equal(parse('RewriteEngine off\nRewriteEngine on\n').rewriteEnabled(),
    true);
});

test('htaccess: mixed-case directive names are matched', () => {
  // Apache matches directive names case-insensitively, and files in the tree
  // use spellings such as ReWriteRule.
  const h = parse('RewriteEngine on\nReWriteRule ^a$ https://x/ [R=302,L]\n');
  assert.equal(h.rewriteRules().length, 1);
});

test('htaccess: Redirect and RedirectMatch expose their target', () => {
  const h = parse(
    'Redirect 301 /a https://x/a\n' +
    'RedirectMatch 302 ^/b/?$ https://x/b\n' +
    'Redirect permanent /c https://x/c\n');
  assert.deepEqual(h.redirects().map(r => r.target),
    ['https://x/a', 'https://x/b', 'https://x/c']);
});

test('htaccess: flags parse names, values and raw spelling', () => {
  const flags = parseFlags('[R=302,NE,L]');
  assert.equal(flags.get('R').value, '302');
  assert.equal(flags.get('NE').value, true);
  assert.ok(flags.has('L'));
  assert.equal(parseFlags('not-a-flag-list').size, 0);
  assert.equal(parseFlags(undefined).size, 0);
  // Casing is normalised for lookup but the original is kept for messages.
  assert.equal(parseFlags('[r=302]').get('R').raw, 'r=302');
});

test('maintainers: the recorded formats are all recognised', () => {
  // Every shape below is one that occurs in the tree. The names are invented:
  // what each case pins is the *format*, and a real maintainer's handle is not
  // needed to pin a format.
  const cases = [
    ['# GitHub username: exampleuser', ['exampleuser']],
    ['# Maintainer: X (https://github.com/example-user)', ['example-user']],
    ['# Maintainer: X (GitHub: exampleuser)', ['exampleuser']],
    // Scheme-less URL, and digits in the handle.
    ['# Maintainer: X (github.com/exampleuser1)', ['exampleuser1']],
    ['# maintainer: @a-one @b-two', ['a-one', 'b-two']],
    ['# maintainers:\n# - @someone\n# - @someone-else',
      ['someone', 'someone-else']],
    // A Markdown link, whose handle is capitalised and must come back
    // lowercased.
    ['- [Firstname Lastname](https://github.com/Example-User)',
      ['example-user']],
    // A hyphenated human name next to a handle: the name must not be read as
    // one.
    ['Firstname Lastname-Hyphenated @someone', ['someone']],
    ['(Maintainer; GitHub: exampleuser2)', ['exampleuser2']],
    ['# GitHub user: Example-Org', ['example-org']]
  ];
  for(const [text, expected] of cases) {
    assert.deepEqual([...findUsernames(text)].sort(), [...expected].sort(),
      text);
  }
});

test('maintainers: label words are not mistaken for usernames', () => {
  for(const text of [
    '# Maintainer: Someone <a@b.example>',
    '# Maintainer: X (ORCID: 0000-0000-0000-0000)',
    '# Maintainer: A Community Group',
    '# Maintainer:',
    'See https://github.com/orgs/perma-id/teams'
  ]) {
    assert.deepEqual([...findUsernames(text)], [], text);
  }
});

test('open redirect: an unconstrained group ending the host is unsafe', () => {
  assert.notEqual(analyse('https://service.$1/t', '^([^/]+)/s/(.*)$'), null);
  assert.notEqual(analyse('https://$1/$2', '^x/([^/]*)/(.*)$'), null);
  assert.notEqual(analyse('https://data.example.com$1', '^data(.*)$'), null);
});

test('open redirect: a constrained group is safe', () => {
  // Cannot emit a dot or a slash, so it is only ever a subdomain label.
  assert.equal(analyse('https://$1.example.com/', '^([a-z-]{1,50})$'), null);
  // Must begin with a slash, so it lands in the path.
  assert.equal(analyse('https://labs.example.com$1', '^labs(/.*)?$'), null);
  // Cannot emit a slash, so the fixed suffix survives.
  assert.equal(analyse('https://$1.github.io/$2', '^([^/]+)[/#](.*)$'), null);
});

test('open redirect: a backreference in the path is safe', () => {
  assert.equal(analyse('https://example.com/$1', '^(.*)$'), null);
  assert.equal(analyse('/local/$1', '^(.*)$'), null);
  assert.equal(analyse('https://example.com/', '^$'), null);
});

test('open redirect: capture groups are numbered as Apache numbers them', () => {
  assert.deepEqual(captureGroups('^([^/]+)/s/(.*)$'), ['[^/]+', '.*']);
  // Non-capturing groups take no number.
  assert.deepEqual(captureGroups('^(?:foo)([a-z]+)$'), ['[a-z]+']);
  // A bracket inside a character class is a literal, not a group delimiter.
  assert.deepEqual(captureGroups('^([)])(x)$'), ['[)]', 'x']);
});

test('severity: the provenance policy decides what is reported', () => {
  const config = {
    rules: {},
    policy: {introduced: 'as-declared', touched: 'warning', preexisting: 'off'}
  };
  const rule = {id: 'x/y', severity: 'error'};

  assert.equal(
    resolveSeverity({rule, provenance: 'introduced', config}), 'error');
  assert.equal(
    resolveSeverity({rule, provenance: 'touched', config}), 'warning');
  assert.equal(
    resolveSeverity({rule, provenance: 'preexisting', config}), null);
});

test('severity: --all ignores the policy', () => {
  const config = {rules: {}, policy: {preexisting: 'off'}};
  const rule = {id: 'x/y', severity: 'error'};
  assert.equal(
    resolveSeverity({rule, provenance: 'preexisting', config, auditAll: true}),
    'error');
});

test('severity: a critical rule outlives preexisting: off when touched', () => {
  const config = {rules: {}, policy: {preexisting: 'off', touched: 'warning'}};
  const rule = {id: 'x/y', severity: 'error', critical: true};

  assert.equal(
    resolveSeverity({rule, provenance: 'introduced', config}), 'error',
    'still blocks whoever introduces it');
  assert.equal(
    resolveSeverity({rule, provenance: 'touched', config}), 'notice',
    'informs whoever is editing the identifier, without blocking them');
  assert.equal(
    resolveSeverity({rule, provenance: 'preexisting', config}), null,
    'but a broken identifier elsewhere is triage work, not their problem');
});

test('severity: a rule turned off in config stays off even for --all', () => {
  const config = {rules: {'x/y': 'off'}, policy: {}};
  const rule = {id: 'x/y', severity: 'error', critical: true};
  assert.equal(
    resolveSeverity({rule, provenance: 'introduced', config}), null);
  assert.equal(
    resolveSeverity({rule, provenance: 'introduced', config, auditAll: true}),
    null);
});

test('severity: the policy softens findings but never sharpens them', () => {
  const config = {rules: {}, policy: {touched: 'warning'}};

  // An error a contributor did not cause is demoted, which is the point.
  assert.equal(
    resolveSeverity({
      rule: {id: 'x/y', severity: 'error'}, provenance: 'touched', config
    }), 'warning');

  // A rule that declares itself a notice is a suggestion. It must not become
  // a warning merely because it landed on a line somebody touched.
  assert.equal(
    resolveSeverity({
      rule: {id: 'x/y', severity: 'notice'}, provenance: 'touched', config
    }), 'notice');
});

test('paths: every accepted README is a file the format rules inspect', () => {
  // These two sets drifted apart once already: widening what counts as a
  // README left `README.adoc` accepted by `files/only-allowed-names` but
  // invisible to every format rule, so a BOM or CRLF in it went unreported.
  // Anything the repository is willing to keep is held to the same standard.
  const readmes = [
    'ids/a/README.md', 'ids/a/readme.md', 'ids/a/README.MD',
    'ids/a/README.markdown', 'ids/a/README.adoc', 'ids/a/README.rst',
    'ids/a/README.textile', 'ids/a/README.pod',
    'ids/a/README', 'ids/a/readme', 'ids/a/README.txt', 'ids/a/readme.TXT'
  ];
  for(const p of readmes) {
    assert.ok(isReadme(p), `${p} should be an accepted README`);
    assert.ok(matchesAny(p, TEXT_FILE_PATTERNS),
      `${p} is accepted, so the format rules must inspect it`);
  }
});

test('paths: the format rules still cover .htaccess and plain Markdown', () => {
  for(const p of ['ids/a/.htaccess', 'docs/rules/index.md', 'README.md']) {
    assert.ok(matchesAny(p, TEXT_FILE_PATTERNS), p);
  }
  // Not text a person edits here, and not accepted anywhere in ids/.
  for(const p of ['ids/a/logo.png', 'ids/a/vocab.ttl', 'tools/x/a.js']) {
    assert.ok(!matchesAny(p, TEXT_FILE_PATTERNS), p);
  }
});
