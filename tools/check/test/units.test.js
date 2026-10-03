/** Unit tests for the pieces the rules are built out of. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {minimatch, matchesAny} from '../src/glob.js';
import {parse, parseFlags} from '../src/htaccess.js';
import {findUsernames} from '../src/maintainers.js';
import {analyse, captureGroups} from '../src/rules/htaccess/no-open-redirect.js';
import {resolveSeverity, explainSeverity} from '../src/config.js';
import {buildWhy} from '../src/report.js';
import {isReadme, TEXT_FILE_PATTERNS} from '../src/paths.js';
import {FLAGS, looksLikeFlagList} from '../src/rewrite-flags.js';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {listFileModes} from '../src/git.js';
import {makeRepo} from './helpers.js';

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
  assert.ok(minimatch('ids/.utils/css/x.css', 'ids/.utils/**'));
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

test('htaccess: a no-break space does not separate arguments', () => {
  // Apache splits a directive on ASCII space and tab. A file in the tree puts
  // a U+00A0 before its flag list, and reading that as a separator would show
  // a well-formed directive where Apache sees a broken one -- three arguments
  // and working flags, instead of two arguments and none.
  const h = parse('RewriteRule ^$ https://x/a [R=302,L]\n');
  assert.deepEqual(h.directives[0].args,
    ['^$', 'https://x/a [R=302,L]']);
  const rule = h.rewriteRules()[0];
  assert.equal(rule.substitution, 'https://x/a [R=302,L]');
  assert.equal(rule.flags.size, 0,
    'Apache applies no flags here, so neither may the parser');
});

test('htaccess: a tab still separates arguments', () => {
  const h = parse('RewriteRule\t^$\thttps://x/\t[R=302,L]\n');
  assert.deepEqual(h.directives[0].args, ['^$', 'https://x/', '[R=302,L]']);
});

test('htaccess: only ASCII whitespace may follow a continuation backslash',
  () => {
    // apr_isspace does not count U+00A0 either, so Apache does not trim it and
    // the backslash is then not the last character on the line.
    const joined = parse('RewriteRule ^a$ \\  \nhttps://x/ [R=302,L]\n');
    assert.equal(joined.directives.length, 1);
    assert.deepEqual(joined.continuationLines, [1]);

    const separate = parse('RewriteRule ^a$ \\ \nhttps://x/ [R=302,L]\n');
    assert.equal(separate.directives.length, 2);
    assert.deepEqual(separate.continuationLines, []);
  });

test('htaccess: a comment indented with a no-break space is still a comment',
  () => {
    // Blank and comment classification trims with `\s` on purpose, and stays
    // that way: it decides nothing about arguments, and files in the tree
    // carry U+00A0 inside their comments.
    const h = parse(' # a note\n \nRewriteEngine on\n');
    assert.equal(h.directives.length, 1);
    assert.equal(h.comments.length, 1);
  });

test('rewrite flags: a bracket group is a flag list only if its names are',
  () => {
    assert.ok(looksLikeFlagList('[R=302,NE,L]'));
    // Long and lower-case spellings are the same flags to Apache.
    assert.ok(looksLikeFlagList('[redirect=302,last]'));
    assert.ok(looksLikeFlagList('[r=302,l]'));
    // A bad status is still a flag list. Saying so is what lets
    // valid-rewrite-flags report the status once the space is back.
    assert.ok(looksLikeFlagList('[R=30,L]'));
    // Character classes and empty groups are not.
    assert.ok(!looksLikeFlagList('[0-9]'));
    assert.ok(!looksLikeFlagList('[A-Z]'));
    assert.ok(!looksLikeFlagList('[]'));
    assert.ok(!looksLikeFlagList('[,]'));
    assert.ok(!looksLikeFlagList('not-brackets'));
    // A RewriteCond flag list is a flag list too. [OR] is deliberately absent
    // from FLAGS, because it is an error on a RewriteRule and
    // valid-rewrite-flags must go on saying so -- merging the two sets to
    // make this line pass would break that.
    assert.ok(looksLikeFlagList('[NC,OR]'));
    assert.ok(!FLAGS.has('OR'));
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
    ['# GitHub user: Example-Org', ['example-org']],
    // A bare "Username:" label, with no "GitHub" on the line.
    ['Username: exampleuser', ['exampleuser']],
    ['# Username: Example-User3', ['example-user3']],
    ['**Username:** exampleuser', ['exampleuser']],
    ['# Project\n\nA vocabulary.\nUsername: exampleuser\nContact: a@b.example',
      ['exampleuser']]
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
    'See https://github.com/orgs/perma-id/teams',
    // Another service's account is not a GitHub one.
    'Twitter username: someone',
    // An email address must not be cut down to its local part.
    'Username: someone@example.org'
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

test('why: everything computed is accounted for', () => {
  const result = {
    findings: [{ruleId: 'a/one', severity: 'error'}],
    suppressed: [
      {ruleId: 'a/one', reason: 'preexisting-off'},
      {ruleId: 'b/two', reason: 'preexisting-off'},
      {ruleId: 'b/two', reason: 'out-of-scope'}
    ],
    notRun: [{ruleId: 'c/three', reason: 'rule-off'}],
    ran: [{id: 'a/one'}, {id: 'b/two'}],
    errors: []
  };
  const why = buildWhy(result,
    {allRuleIds: ['a/one', 'b/two', 'c/three', 'd/four']});

  // The invariant worth pinning: a report whose numbers do not add up is
  // worse than no report, because it is read as complete.
  assert.equal(why.computed, why.shown + why.hidden);
  assert.deepEqual(
    {computed: why.computed, shown: why.shown, hidden: why.hidden},
    {computed: 3, shown: 1, hidden: 2});
  assert.equal(why.elsewhere, 1,
    'out-of-scope is held apart: the reader excluded it by asking');
  assert.deepEqual(why.byReason, {'preexisting-off': 2});
  // Ordered by hidden, then shown, then id -- so the ordering is stable
  // across runs rather than following object insertion.
  assert.deepEqual(why.byRule, [
    {ruleId: 'a/one', shown: 1, hidden: 1},
    {ruleId: 'b/two', shown: 0, hidden: 1}
  ]);
  // A rule switched off and a rule left out by --rule are both "did not
  // run", and saying so beats implying either one looked and found nothing.
  assert.deepEqual(why.notRun, [
    {ruleId: 'c/three', reason: 'rule-off'},
    {ruleId: 'd/four', reason: 'deselected'}
  ]);
});

test('severity: every suppression names which one it was', () => {
  // `--why` reports these strings. They come from the function that makes the
  // decision, so that an explanation cannot drift from the behaviour -- a
  // second copy of this policy would be right only on the day it was written.
  const config = {
    rules: {'off/rule': 'off'},
    policy: {introduced: 'as-declared', touched: 'warning', preexisting: 'off'}
  };
  const plain = {id: 'x/y', severity: 'error'};
  const critical = {id: 'x/z', severity: 'error', critical: true};
  const reasonFor = (rule, provenance, auditAll) =>
    explainSeverity({rule, provenance, config, auditAll}).reason;

  assert.equal(reasonFor(plain, 'introduced'), 'shown');
  assert.equal(reasonFor(plain, 'touched'), 'shown');
  assert.equal(reasonFor(plain, 'preexisting'), 'preexisting-off',
    'the legacy backlog, which is what a quiet run usually hides');
  assert.equal(reasonFor(critical, 'touched'), 'shown');
  assert.equal(reasonFor(critical, 'preexisting'), 'critical-preexisting',
    'suppressed for a different reason, and surfaced by --triage instead');
  assert.equal(reasonFor({id: 'off/rule', severity: 'error'}, 'introduced'),
    'rule-off');
  assert.equal(reasonFor(plain, 'preexisting', true), 'shown',
    '--all suppresses nothing, so there is nothing to explain');
});

test('severity: explaining and resolving cannot disagree', () => {
  // resolveSeverity is now a wrapper. If it ever stops being one, this fails
  // rather than letting the two answers drift apart unnoticed.
  const config = {
    rules: {'off/rule': 'off'},
    policy: {introduced: 'as-declared', touched: 'warning', preexisting: 'off'}
  };
  for(const rule of [{id: 'x/y', severity: 'notice'},
    {id: 'x/z', severity: 'error', critical: true},
    {id: 'off/rule', severity: 'error'}]) {
    for(const provenance of ['introduced', 'touched', 'preexisting']) {
      for(const auditAll of [false, true]) {
        const args = {rule, provenance, config, auditAll};
        assert.equal(resolveSeverity(args), explainSeverity(args).severity,
          `${rule.id} ${provenance} auditAll=${auditAll}`);
      }
    }
  }
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

/**
 * `ls-files -s -z` writes the path verbatim after a tab, with none of the
 * quoting `core.quotePath` applies to unusual bytes. A parser that split on
 * whitespace, or that trusted the field count, would lose exactly the paths
 * least likely to be noticed -- so the awkward ones are the test.
 */
test('git: index modes are read back for paths of any shape', () => {
  const repo = makeRepo();
  repo.write('ids/a b/.htaccess', 'RewriteEngine on\n', 0o755);
  repo.write('ids/née/README.md', '# née\n');
  repo.write('ids/plain/.htaccess', 'RewriteEngine on\n');
  repo.commit('fixture');

  const modes = listFileModes(repo.dir);
  assert.equal(modes.get('ids/a b/.htaccess'), '100755');
  assert.equal(modes.get('ids/née/README.md'), '100644');
  assert.equal(modes.get('ids/plain/.htaccess'), '100644');
  // Absent rather than guessed: a caller must be able to tell "not recorded"
  // from "not executable".
  assert.equal(modes.get('ids/nothing/.htaccess'), undefined);
});

test('git: modes outside a repository are unknown, not an error', () => {
  // Nothing to read is not a failure to report: the map comes back empty and
  // every lookup says "not established", which is what keeps a rule silent
  // rather than throwing into result.errors.
  const outside = mkdtempSync(path.join(tmpdir(), 'w3id-check-bare-'));
  try {
    assert.equal(listFileModes(outside).size, 0);
  } finally {
    rmSync(outside, {recursive: true, force: true});
  }
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
