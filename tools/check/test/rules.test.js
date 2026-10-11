/** Per-rule behaviour, against fixtures rather than the live tree. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeRepo, check, findingsOf} from './helpers.js';

import onlyAllowedNames from '../src/rules/files/only-allowed-names.js';
import preferReadmeMd from '../src/rules/files/prefer-readme-md.js';
import htaccessRequired from '../src/rules/files/htaccess-required.js';
import documentIdentifierRoot
  from '../src/rules/meta/document-identifier-root.js';
import noEmptyHtaccess from '../src/rules/files/no-empty-htaccess.js';
import noExecutableBit from '../src/rules/files/no-executable-bit.js';
import noCaseCollision from '../src/rules/tree/no-case-collision.js';
import noTrailingWhitespace from '../src/rules/format/no-trailing-whitespace.js';
import noExcessiveBlankLines
  from '../src/rules/format/no-excessive-blank-lines.js';
import preferListOverLineBreaks from '../src/rules/markdown/prefer-list-over-line-breaks.js';
import noFlagWhitespace from '../src/rules/htaccess/no-flag-whitespace.js';
import spaceBeforeFlags from '../src/rules/htaccess/space-before-flags.js';
import noBom from '../src/rules/format/no-bom.js';
import avoidPermanentRedirect from '../src/rules/htaccess/avoid-permanent-redirect.js';
import githubRawTarget from '../src/rules/htaccess/github-raw-target.js';
import noDoubleSlash from '../src/rules/htaccess/no-double-slash.js';
import noGreedyCapture from '../src/rules/htaccess/no-greedy-capture.js';
import anchorPatterns from '../src/rules/htaccess/anchor-patterns.js';
import no406Fallback from '../src/rules/htaccess/no-406-fallback.js';
import escapeLiteralDots from '../src/rules/htaccess/escape-literal-dots.js';
import finalNewline from '../src/rules/format/final-newline.js';
import noCrlf from '../src/rules/format/no-crlf.js';
import rewriteEngineRequired from '../src/rules/htaccess/rewrite-engine-required.js';
import validRewriteFlags from '../src/rules/htaccess/valid-rewrite-flags.js';
import uppercaseRewriteFlags from '../src/rules/htaccess/uppercase-rewrite-flags.js';
import noInlineComment from '../src/rules/htaccess/no-inline-comment.js';
import patternRelativeToDir from '../src/rules/htaccess/pattern-relative-to-dir.js';
import httpsTarget from '../src/rules/htaccess/https-target.js';
import noOpenRedirect from '../src/rules/htaccess/no-open-redirect.js';
import validCorsHeader from '../src/rules/htaccess/valid-cors-header.js';
import noSelfRedirect from '../src/rules/htaccess/no-self-redirect.js';
import allowedDirectives from '../src/rules/htaccess/allowed-directives.js';
import maintainerGithubUsername from '../src/rules/meta/maintainer-github-username.js';
import minimalCommits from '../src/rules/git/minimal-commits.js';
import noMergeCommits from '../src/rules/git/no-merge-commits.js';
import descriptiveCommitMessage from '../src/rules/git/descriptive-commit-message.js';
import identifierUnderIds from '../src/rules/tree/identifier-under-ids.js';
import noRawgit from '../src/rules/htaccess/no-rawgit.js';

/** Build a repo from a map of path -> contents and audit it with one rule. */
function audit(rule, files, config = {}) {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  for(const [path, content] of Object.entries(files)) {
    repo.write(path, content);
  }
  repo.commit('fixture');
  return check({dir: repo.dir, rules: [rule], config});
}

const OK_HTACCESS = 'RewriteEngine on\nRewriteRule ^$ https://example.com/ [R=302,L]\n';
const OK_README = '# thing\n\nBy [octocat](https://github.com/octocat).\n';

test('files/only-allowed-names rejects anything else', () => {
  const r = audit(onlyAllowedNames, {
    'ids/a/.htaccess': OK_HTACCESS,
    'ids/a/README.md': OK_README,
    'ids/a/readme.txt': 'also fine\n',
    // GitHub renders these as the directory README, so they are not errors
    // however much the repository would rather they were Markdown.
    'ids/a/README.adoc': '= a\n',
    'ids/b/README.rst': 'a\n=\n',
    'ids/a/index.html': '<p>no</p>\n',
    'ids/a/.gitignore': '.DS_Store\n',
    'ids/a/logo.png': 'x\n',
    // Near-misses GitHub will not render as a README either.
    'ids/c/README.me': 'x\n',
    'ids/d/README..md': 'x\n',
    'ids/e/_readme.md': 'x\n'
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/a/.gitignore:1:error',
    'ids/a/index.html:1:error',
    'ids/a/logo.png:1:error',
    'ids/c/README.me:1:error',
    'ids/d/README..md:1:error',
    'ids/e/_readme.md:1:error'
  ]);
});

test('files/only-allowed-names exempts configured infrastructure paths', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml',
    'idsDir: ids\nallowedPaths:\n  - ids/index.html\n  - ids/.utils/**\n');
  repo.write('ids/index.html', '<p>home</p>\n');
  repo.write('ids/.utils/git.php', '<?php ?>\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  repo.commit('fixture');
  assert.deepEqual(findingsOf(check({dir: repo.dir, rules: [onlyAllowedNames]})), []);
});

/** Build a repo from a map of path -> [contents, mode] and audit it. */
function auditModes(rule, files, opts = {}) {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  for(const [path, [content, mode]] of Object.entries(files)) {
    repo.write(path, content, mode);
  }
  repo.commit('fixture');
  return {repo, result: check({dir: repo.dir, rules: [rule], ...opts})};
}

test('files/no-executable-bit reports the bit anywhere under ids/', () => {
  const {result} = auditModes(noExecutableBit, {
    'ids/a/.htaccess': [OK_HTACCESS, 0o755],
    'ids/a/README.md': [OK_README, 0o755],
    'ids/b/.htaccess': [OK_HTACCESS, 0o644],
    // A shebang buys nothing inside the identifier tree: nothing there is
    // ever run, and this pins the ids/ branch as the one that short-circuits.
    'ids/c/.htaccess': ['#!/bin/sh\n' + OK_HTACCESS, 0o755]
  });
  assert.deepEqual(findingsOf(result).sort(), [
    'ids/a/.htaccess:1:error',
    'ids/a/README.md:1:error',
    'ids/c/.htaccess:1:error'
  ]);
});

test('files/no-executable-bit spares a real script outside ids/', () => {
  const {result} = auditModes(noExecutableBit, {
    'ids/a/.htaccess': [OK_HTACCESS, 0o644],
    'tools/x/run': ['#!/bin/sh\necho hi\n', 0o755],
    'tools/x/notes.md': ['# notes\n', 0o755],
    // A shebang without the bit is not this rule's business.
    'tools/x/plain.js': ['#!/usr/bin/env node\n', 0o644]
  });
  assert.deepEqual(findingsOf(result), ['tools/x/notes.md:1:error']);
});

test('files/no-executable-bit names both ways to clear the bit', () => {
  const {result} = auditModes(noExecutableBit, {
    'ids/a/.htaccess': [OK_HTACCESS, 0o755]
  });
  const {message} = result.findings[0];
  assert.match(message, /chmod 644 ids\/a\/\.htaccess/);
  assert.match(message, /git update-index --chmod=-x ids\/a\/\.htaccess/);
});

test('files/no-executable-bit sees a bit set but not yet staged', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  repo.commit('fixture');
  repo.write('ids/a/.htaccess', OK_HTACCESS, 0o755);

  const rules = [noExecutableBit];
  assert.deepEqual(
    findingsOf(check({dir: repo.dir, rules, includeWorkingTree: true})),
    ['ids/a/.htaccess:1:error']);
  // An audit of committed content only must not see the working tree.
  assert.deepEqual(
    findingsOf(check({dir: repo.dir, rules, includeWorkingTree: false})), []);
});

test('files/no-executable-bit sees an untracked file carrying the bit', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  repo.commit('fixture');
  repo.write('ids/z/.htaccess', OK_HTACCESS, 0o755);

  const rules = [noExecutableBit];
  assert.deepEqual(
    findingsOf(check({dir: repo.dir, rules, includeWorkingTree: true})),
    ['ids/z/.htaccess:1:error']);
  assert.deepEqual(
    findingsOf(check({dir: repo.dir, rules, includeWorkingTree: false})), []);
});

test('files/no-executable-bit ignores a bit git does not record', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  repo.commit('fixture');
  // Windows, FAT, some network mounts. The bit on disk cannot be committed
  // and no command a contributor runs will clear it, so reporting it would
  // be a finding with no fix.
  repo.git(['config', 'core.fileMode', 'false']);
  repo.write('ids/z/.htaccess', OK_HTACCESS, 0o755);

  assert.deepEqual(findingsOf(check({
    dir: repo.dir, rules: [noExecutableBit], includeWorkingTree: true
  })), []);
});

test('htaccess/no-flag-whitespace ignores brackets that are not flag lists', () => {
  const r = audit(noFlagWhitespace, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      '# Options [+ on] and [- off] are discussed in [Some Paper, 2019]\n' +
      'RewriteRule ^[a-z ]+$ https://x/ [R=302,L]\n' +
      'RewriteRule ^b$ https://x/ [R=302,L]\n' +
      'RewriteRule ^c$ https://x/ [R=302, L]\n' +
      'RewriteCond %{HTTP_ACCEPT} text/html [NC ,OR]\n' +
      'RewriteRule ^d$ https://x/ [R=302,L]\n'
  });
  // Only the two genuine flag lists, not the prose or the character class.
  assert.deepEqual(findingsOf(r), [
    'ids/a/.htaccess:5:error', 'ids/a/.htaccess:6:error'
  ]);
  assert.match(r.findings[0].message, /\[R=302,L\]/);
});

test('htaccess/space-before-flags finds a flag list with no space', () => {
  const r = audit(spaceBeforeFlags, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      // The two shapes that occur in this repository.
      'RewriteRule ^a$ https://example.org/a[R=303,L]\n' +
      'RewriteRule ^b$ https://example.org/b.ttl[R=302,NE,L]\n' +
      // Long and lower-case spellings are the same flags to Apache.
      'RewriteRule ^c$ https://example.org/c[redirect=302,last]\n' +
      'RewriteRule ^d$ https://example.org/d[r=302,l]\n' +
      // A relative substitution: nothing redirects at all.
      'RewriteRule ^e$ /local/e[R=302,L]\n' +
      // RewriteCond takes flags too, though the tree has no instance.
      'RewriteCond %{HTTP_ACCEPT} text/turtle[NC,OR]\n' +
      'RewriteRule ^f$ https://example.org/f [R=303,L]\n'
  });
  assert.deepEqual(findingsOf(r), [
    'ids/a/.htaccess:2:error', 'ids/a/.htaccess:3:error',
    'ids/a/.htaccess:4:error', 'ids/a/.htaccess:5:error',
    'ids/a/.htaccess:6:error', 'ids/a/.htaccess:7:error'
  ]);
});

test('htaccess/space-before-flags leaves real brackets alone', () => {
  const r = audit(spaceBeforeFlags, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      // From the tree: the bracket is a negated character class in the
      // *pattern*, and [S=28] is a genuine, correctly separated flag list.
      'RewriteRule ![A-Z] - [S=28]\n' +
      // A character class ending a pattern.
      'RewriteRule ^v[0-9]$ https://example.org/v [R=302,L]\n' +
      // Brackets that belong to the URL.
      'RewriteRule ^g$ https://example.org/g?filter[]=1 [R=302,L]\n' +
      // A trailing bracket group whose contents are not flag names.
      'RewriteRule ^h$ https://example.org/h[0-9] [R=302,L]\n' +
      'RewriteRule ^i$ https://example.org/i[0-9]\n' +
      // An argument that *is* a flag list means a missing substitution,
      // which is a different mistake and not this rule's.
      'RewriteRule ^j$ [R=302,L]\n' +
      // Whitespace inside the list belongs to htaccess/no-flag-whitespace.
      'RewriteRule ^k$ https://example.org/k [R=302, L]\n' +
      'RewriteCond %{HTTP_ACCEPT} text/html [NC]\n' +
      'RewriteRule ^l$ https://example.org/l [R=303,L]\n'
  });
  assert.deepEqual(findingsOf(r), []);
});

test('htaccess/space-before-flags names the invisible character', () => {
  const r = audit(spaceBeforeFlags, {
    // From the tree. This line looks correct in every editor and diff.
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^$ https://example.org/x [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:error']);
  const {message} = r.findings[0];
  assert.match(message, /no-break space \(U\+00A0\)/);
  // The suggested fix drops the invisible character rather than adding a
  // space after it. One that still contained it would be useless.
  assert.match(message, /https:\/\/example\.org\/x \[R=302,L\]/);
  assert.ok(!message.includes(' '),
    'the repaired line must not carry the character it tells you to delete');
});

test('htaccess/space-before-flags is honest about what still happens', () => {
  const r = audit(spaceBeforeFlags, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ https://example.org/a[R=303,L]\n' +
      'RewriteRule ^b$ /local/b[R=303,L]\n'
  });
  // An absolute target still redirects, at the wrong status to a wrong URL.
  assert.match(r.findings[0].message, /still redirected/);
  assert.match(r.findings[0].message, /default 302/);
  // A relative one does not redirect at all, and the message must not say it
  // does.
  assert.match(r.findings[1].message, /returns 404 instead of redirecting/);
  assert.ok(!/still redirected/.test(r.findings[1].message));
});

test('htaccess: the flag rules cannot see a fused flag list', () => {
  // Why the rule above has to exist. Apache parses no flag list here, so
  // rewriteRules() reports none, so the three rules that judge flags have
  // nothing to judge. If this starts failing, the parser has begun modelling
  // what the author meant rather than what the server does, and several
  // other rules are now reporting on flags that never apply.
  const files = {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ https://example.org/a[R=303,L]\n' +
      'RewriteRule ^b$ https://example.org/b [r=302,l]\n'
  };
  assert.deepEqual(findingsOf(audit(validRewriteFlags, files)), []);
  assert.deepEqual(findingsOf(audit(uppercaseRewriteFlags, files)), []);
  assert.deepEqual(findingsOf(audit(noFlagWhitespace, files)), []);
});

test('format/no-bom finds a byte order mark', () => {
  const r = audit(noBom, {
    'ids/a/.htaccess': '﻿RewriteEngine on\n',
    'ids/b/README.md': '﻿# thing\n',
    'ids/c/.htaccess': 'RewriteEngine on\n'
  });
  assert.deepEqual(findingsOf(r).sort(),
    ['ids/a/.htaccess:1:error', 'ids/b/README.md:1:error']);
  assert.match(r.findings.find(f => f.file === 'ids/a/.htaccess').message,
    /returns 500/);
});

test('htaccess/avoid-permanent-redirect covers both directive families', () => {
  const r = audit(avoidPermanentRedirect, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ https://x/ [R=301,L]\n' +
      'RewriteRule ^b$ https://x/ [R=308,L]\n' +
      'RewriteRule ^c$ https://x/ [R=302,L]\n' +
      'RewriteRule ^d$ https://x/ [R=303,L]\n',
    'ids/b/.htaccess': 'Redirect 301 /b https://x/\n',
    'ids/c/.htaccess': 'Redirect permanent /c https://x/\n',
    'ids/d/.htaccess': 'Redirect 302 /d https://x/\n'
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/a/.htaccess:2:warning',
    'ids/a/.htaccess:3:warning',
    'ids/b/.htaccess:1:warning',
    'ids/c/.htaccess:1:warning'
  ]);
});

test('tree/identifier-under-ids reports an .htaccess outside ids/', () => {
  const r = audit(identifierUnderIds, {
    'ids/a/.htaccess': OK_HTACCESS,
    'histact/.htaccess': OK_HTACCESS,
    'histact/README.md': OK_README,
    'cdisc/cosmos/.htaccess': OK_HTACCESS,
    'docs/guide.md': '# guide\n'
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'cdisc/cosmos/.htaccess:1:error',
    'histact/.htaccess:1:error'
  ]);
  assert.match(r.findings.find(f => f.file === 'histact/.htaccess').message,
    /move this directory to ids\/histact\//);
});

test('tree/identifier-under-ids blocks a change that adds nothing under ids/',
  () => {
    // The shape that slipped through: a whole identifier at the root, and
    // so no change under ids/ for the identifier rules to look at.
    const repo = makeRepo();
    repo.write('.w3id-check.yaml', 'idsDir: ids\n');
    repo.write('ids/a/.htaccess', OK_HTACCESS);
    const base = repo.commit('base');
    repo.write('histact/.htaccess', OK_HTACCESS);
    repo.write('histact/README.md', OK_README);
    repo.commit('Add histact');
    const r = check({dir: repo.dir, rules: [identifierUnderIds], base,
      head: 'HEAD'});
    assert.deepEqual(findingsOf(r), ['histact/.htaccess:1:error']);
  });

test('htaccess/no-rawgit reports both hosts and names the jsDelivr URL', () => {
  const r = audit(noRawgit, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ https://rawgit.com/u/r/master/v.ttl [R=303,L]\n' +
      'RewriteRule ^b$ https://cdn.rawgit.com/u/r/gh-pages/d/v.owl [R=303,L]\n' +
      // Inside a longer target, as a documentation service's argument.
      'RewriteRule ^c$ http://x/lode/https://rawgit.com/u/r/v1/v.owl [R=303,L]\n' +
      'RewriteRule ^d$ https://rawgit.com/u/r/master/doc/index.html [R=303,L]\n' +
      'RewriteRule ^e$ https://cdn.jsdelivr.net/gh/u/r@master/v.ttl [R=303,L]\n' +
      '# https://rawgit.com/u/r/master/old.ttl in a comment is not a target\n'
  });
  assert.deepEqual(findingsOf(r), [
    'ids/a/.htaccess:2:error',
    'ids/a/.htaccess:3:error',
    'ids/a/.htaccess:4:error',
    'ids/a/.htaccess:5:error'
  ]);
  const [dead, forwarded, embedded, page] = r.findings.map(f => f.message);
  assert.match(dead, /returns 404/);
  assert.match(dead, /https:\/\/cdn\.jsdelivr\.net\/gh\/u\/r@master\/v\.ttl/);
  assert.match(forwarded, /still forwards/);
  assert.match(forwarded,
    /https:\/\/cdn\.jsdelivr\.net\/gh\/u\/r@gh-pages\/d\/v\.owl/);
  assert.match(embedded,
    /http:\/\/x\/lode\/https:\/\/cdn\.jsdelivr\.net\/gh\/u\/r@v1\/v\.owl/);
  assert.match(page, /GitHub Pages/);
  assert.equal(noRawgit.critical, true);
});

test('htaccess/github-raw-target separates breakage from redundancy', () => {
  const r = audit(githubRawTarget, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ https://github.com/u/r/blob/main/v.ttl [R=302,L]\n' +
      'RewriteRule ^b$ https://raw.githubusercontent.com/u/r/refs/heads/main/v.ttl [R=302,L]\n' +
      // A branch target is acceptable when it is what you want; not flagged.
      'RewriteRule ^c$ https://raw.githubusercontent.com/u/r/main/v.ttl [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r),
    ['ids/a/.htaccess:2:warning', 'ids/a/.htaccess:3:warning']);
  const blob = r.findings[0];
  assert.match(blob.message, /HTML page/);
  assert.match(blob.message, /raw\.githubusercontent\.com\/u\/r\/main\/v\.ttl/);
  // Redundant, not broken -- the wording matters.
  assert.match(r.findings[1].message, /It works, but/);
});

test('htaccess/github-raw-target leaves rendered documentation alone', () => {
  const r = audit(githubRawTarget, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      // A page for people: raw would show them unrendered markup.
      'RewriteRule ^a$ https://github.com/u/r/blob/main/docs/v.md [R=302,L]\n' +
      'RewriteRule ^b$ https://github.com/u/r/blob/main/README.MD#use [R=302,L]\n' +
      'RewriteRule ^c$ https://github.com/u/r/blob/main/guide.adoc?plain=0 [R=302,L]\n' +
      // A file for machines is still reported, whatever it is called.
      'RewriteRule ^d$ https://github.com/u/r/blob/main/v.ttl [R=302,L]\n' +
      'RewriteRule ^e$ https://github.com/u/r/blob/main/v.md.ttl [R=302,L]\n' +
      // `.asc` is AsciiDoc to GitHub, but in a redirect more likely a key.
      'RewriteRule ^f$ https://github.com/u/r/blob/main/key.asc [R=302,L]\n' +
      'RewriteRule ^g$ https://github.com/u/r/blob/main/$1 [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r), [
    'ids/a/.htaccess:5:warning',
    'ids/a/.htaccess:6:warning',
    'ids/a/.htaccess:7:warning',
    'ids/a/.htaccess:8:warning'
  ]);
});

test('htaccess/no-double-slash ignores the scheme separator', () => {
  const r = audit(noDoubleSlash, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ https://example.com/data//v.ttl [R=302,L]\n' +
      'RewriteRule ^b$ https://example.com/data/v.ttl [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:warning']);
});

test('htaccess/no-greedy-capture reports only the swallowing shape', () => {
  const r = audit(noGreedyCapture, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^(.+)/?$ https://x/$1/v.ttl [R=303,L]\n' +
      'RewriteRule ^(.*)/?$ https://x/$1/v.ttl [R=303,L]\n' +
      // Passing the whole path through is correct and must not be flagged.
      'RewriteRule ^(.*)$ https://x/$1 [R=302,L]\n' +
      'RewriteRule ^([^/]+)/?$ https://x/$1/v.ttl [R=303,L]\n'
  });
  assert.deepEqual(findingsOf(r),
    ['ids/a/.htaccess:2:warning', 'ids/a/.htaccess:3:warning']);
});

test('htaccess/anchor-patterns wants the trailing group optional', () => {
  const r = audit(anchorPatterns, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^vocab(/.*)$ https://x/vocab$1 [R=303,L]\n' +
      'RewriteRule ^other(/.*)?$ https://x/other$1 [R=303,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:warning']);
  assert.match(r.findings[0].message, /\^vocab\(\/\.\*\)\?\$/);
});

test('htaccess/no-406-fallback asks rather than accuses', () => {
  const r = audit(no406Fallback, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^$ https://x/406.html [R=406,L]\n' +
      'RewriteRule ^b$ https://x/ [R=303,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:warning']);
  assert.match(r.findings[0].message, /If that is deliberate, keep it/);
});

test('htaccess/no-406-fallback singles out the catch-all shape', () => {
  const r = audit(no406Fallback, {
    // The copied template: `.+` matches any Accept header a client sends, so
    // the 406 behind it fires for essentially everything.
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteCond %{HTTP_ACCEPT} text/turtle\n' +
      'RewriteRule ^$ https://x/v.ttl [R=303,L]\n' +
      'RewriteCond %{HTTP_ACCEPT} .+\n' +
      'RewriteRule ^$ - [R=406,L]\n',
    // A 406 behind a specific condition is a narrower, considered choice.
    'ids/b/.htaccess':
      'RewriteEngine on\n' +
      'RewriteCond %{HTTP_ACCEPT} application/pdf\n' +
      'RewriteRule ^$ - [R=406,L]\n'
  });
  const message = Object.fromEntries(r.findings.map(f => [f.file, f.message]));
  assert.match(message['ids/a/.htaccess'], /matches any Accept header at all/);
  assert.match(message['ids/b/.htaccess'], /If that is deliberate, keep it/);
  // Neither is an error: answering 406 is a choice, not a fault.
  assert.deepEqual([...new Set(r.findings.map(f => f.severity))], ['warning']);
});

test('htaccess/escape-literal-dots leaves deliberate wildcards alone', () => {
  const r = audit(escapeLiteralDots, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^vocab.ttl$ https://x/vocab.ttl [R=303,L]\n' +
      // Wildcards followed by a quantifier: not literal dots.
      'RewriteRule ^(.*)$ https://x/$1 [R=302,L]\n' +
      'RewriteRule ^(.+)$ https://x/$1 [R=302,L]\n' +
      'RewriteRule ^a.?$ https://x/ [R=302,L]\n' +
      // Already escaped.
      'RewriteRule ^other\\.ttl$ https://x/other.ttl [R=303,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:warning']);
  assert.match(r.findings[0].message, /\^vocab\\\.ttl\$/);
});

test('htaccess/pattern-relative-to-dir catches a repeated directory name', () => {
  const r = audit(patternRelativeToDir, {
    'ids/my-project/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^my-project/vocab$ https://x/v [R=303,L]\n' +
      'RewriteRule ^vocab$ https://x/v [R=303,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/my-project/.htaccess:2:error']);
  assert.match(r.findings[0].message, /repeats this directory/);
});

test('htaccess/pattern-relative-to-dir spares a filename that shares the name',
  () => {
    // ids/my-project/ holding ^my-project\.owl$ is a filename, not a repeated
    // prefix.
    const r = audit(patternRelativeToDir, {
      'ids/my-project/.htaccess':
        'RewriteEngine on\n' +
        'RewriteRule ^my-project\\.owl$ https://x/my-project.owl [R=303,L]\n'
    });
    assert.deepEqual(findingsOf(r), []);
  });

test('files/only-allowed-names names the misnamed .htaccess case', () => {
  const r = audit(onlyAllowedNames, {
    'ids/a/.htaccess': OK_HTACCESS,
    'ids/b/htaccess.txt': OK_HTACCESS,
    'ids/c/.htaccess.txt': OK_HTACCESS,
    'ids/d/my-project.htaccess': OK_HTACCESS,
    'ids/e/notes.txt': 'notes\n'
  });
  const message = Object.fromEntries(r.findings.map(f => [f.file, f.message]));
  for(const f of ['ids/b/htaccess.txt', 'ids/c/.htaccess.txt',
    'ids/d/my-project.htaccess']) {
    assert.match(message[f], /meant to be \.htaccess/, f);
    assert.match(message[f], /web editor refuses a filename/, f);
  }
  assert.match(message['ids/e/notes.txt'], /is not allowed here/);
});

test('files/prefer-readme-md asks for the convention, not a fix', () => {
  const r = audit(preferReadmeMd, {
    'ids/a/README.md': OK_README,
    'ids/b/readme.md': OK_README,
    'ids/c/README.MD': OK_README,
    'ids/d/README.markdown': OK_README
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/b/readme.md:1:warning',
    'ids/c/README.MD:1:warning',
    'ids/d/README.markdown:1:warning'
  ]);
  // These render as Markdown already; the rule must not imply otherwise, and
  // must not ask for work beyond the rename.
  for(const f of r.findings) {
    assert.match(f.message, /GitHub renders the other spellings/);
    assert.doesNotMatch(f.message, /verbatim|rewritten/);
  }
});

test('files/prefer-readme-md asks for a conversion, not a rename', () => {
  const r = audit(preferReadmeMd, {
    'ids/a/README.adoc': '= /a/\n\nSomething.\n',
    'ids/b/README.rst': 'Title\n=====\n',
    // Plain text: converting it is work too, even without a markup syntax to
    // translate out of.
    'ids/c/README.txt': 'Contact: someone@example.com\n'
  });
  const message = Object.fromEntries(r.findings.map(f => [f.file, f.message]));

  assert.match(message['ids/a/README.adoc'], /is AsciiDoc/);
  assert.match(message['ids/a/README.adoc'], /more than a rename/);
  assert.match(message['ids/b/README.rst'], /is reStructuredText/);
  assert.match(message['ids/c/README.txt'], /verbatim, as plain text/);
  assert.match(message['ids/c/README.txt'], /not only renaming/);
});

test('files/prefer-readme-md spots Markdown without a .md name', () => {
  const r = audit(preferReadmeMd, {
    // Opens with an ATX heading, so the extension does change what a reader
    // sees -- and nothing but the name needs to change.
    'ids/a/README': '# thing\n\nBy @octocat\n',
    // A heading after blank lines still counts.
    'ids/b/readme.txt': '\n\n## Contact\n\nBy @octocat\n'
  });
  const message = Object.fromEntries(r.findings.map(f => [f.file, f.message]));

  assert.match(message['ids/a/README'], /appear as literal punctuation/);
  assert.match(message['ids/b/readme.txt'], /appear as literal punctuation/);
  for(const f of r.findings) {
    assert.doesNotMatch(f.message, /rewritten/,
      'it is already Markdown, so only the name is wrong');
  }
});

test('files/prefer-readme-md leaves names GitHub will not render alone', () => {
  // `files/only-allowed-names` reports these as errors; two rules saying
  // different things about one file would only confuse.
  const r = audit(preferReadmeMd, {
    'ids/a/README.me': '# x\n',
    'ids/b/README..md': '# x\n',
    'ids/c/_readme.md': '# x\n'
  });
  assert.deepEqual(findingsOf(r), []);
});

test('files/htaccess-required accepts a parent that only groups children', () => {
  const r = audit(htaccessRequired, {
    // `ids/group` has no .htaccess of its own, which is legitimate.
    'ids/group/child/.htaccess': OK_HTACCESS,
    'ids/orphan/README.md': OK_README
  });
  assert.deepEqual(findingsOf(r), ['ids/orphan/README.md:1:warning']);
});

test('meta/document-identifier-root ignores files sitting directly in ids/',
  () => {
    // The homepage and the global rewrite rules are not identifiers, so they
    // have no maintainer of their own. `namespaceOf` works from the path
    // string alone and hands back the file itself for these, which is what
    // made them look like namespaces.
    const r = audit(documentIdentifierRoot, {
      'ids/index.html': '<p>the service homepage</p>\n',
      'ids/.htaccess': '# global rewrites\nRewriteEngine on\n',
      'ids/real-identifier/.htaccess': OK_HTACCESS
    });
    assert.deepEqual(findingsOf(r), ['ids/real-identifier/.htaccess:1:warning']);
  });

test('meta/document-identifier-root: a README below the root does not claim it',
  () => {
    const r = audit(documentIdentifierRoot, {
      'ids/a/.htaccess': OK_HTACCESS,
      'ids/a/sub/README.md': OK_README,
      'ids/b/.htaccess': OK_HTACCESS
    });
    assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:1:warning', 'ids/b/.htaccess:1:warning']);
    // The deeper file is named, and the message says to leave it alone: the
    // obvious misreading is "your README is in the wrong place", and acting
    // on it would delete a sub-tree's own maintainer record.
    const [a, b] = r.findings;
    assert.match(a.message, /ids\/a\/sub\/README\.md records a maintainer/);
    assert.match(a.message, /Keep ids\/a\/sub\/README\.md as it is/);
    assert.match(b.message, /Nothing in ids\/b/);
  });

test('meta/document-identifier-root: root .htaccess comments claim the root',
  () => {
    const r = audit(documentIdentifierRoot, {
      // A GitHub handle, as most of the tree records it.
      'ids/a/.htaccess': '# Widgets\n# maintainers:\n# - @octocat\n' +
        OK_HTACCESS,
      // A name and an email, with no GitHub account attached.
      'ids/b/.htaccess': '# Maintainer: Ada Lovelace (ada@example.org)\n' +
        OK_HTACCESS,
      // Commented-out directives are not an ownership claim.
      'ids/c/.htaccess': '#RewriteRule ^$ https://example.org/old [R=302,L]\n' +
        OK_HTACCESS
    });
    assert.deepEqual(findingsOf(r), ['ids/c/.htaccess:1:warning']);
  });

test('meta/document-identifier-root: a sub-directory may add maintainers',
  () => {
    // Additional maintainers for part of a tree are a supported pattern, not
    // a defect. A claimed root must stay silent however deep the extras go.
    const r = audit(documentIdentifierRoot, {
      'ids/a/.htaccess': OK_HTACCESS,
      'ids/a/README.md': OK_README,
      'ids/a/sub/README.md':
        '# sub\n\nAlso maintained by [hubot](https://github.com/hubot).\n',
      'ids/a/sub/deeper/README.md':
        '# deeper\n\nAnd by [monalisa](https://github.com/monalisa).\n'
    });
    assert.deepEqual(findingsOf(r), []);
  });

test('meta/document-identifier-root: a shared namespace is exempt', () => {
  // ids/people maps sub-names to one person each, so no single maintainer
  // can be recorded at its root.
  const files = {
    'ids/shared/.htaccess': OK_HTACCESS,
    'ids/shared/someone/README.md': OK_README,
    'ids/other/.htaccess': OK_HTACCESS
  };
  assert.deepEqual(findingsOf(audit(documentIdentifierRoot, files)),
    ['ids/other/.htaccess:1:warning', 'ids/shared/.htaccess:1:warning']);
  const exempt = audit(documentIdentifierRoot, files, {
    options: {
      'meta/document-identifier-root': {sharedNamespaces: ['ids/shared']}
    }
  });
  assert.deepEqual(findingsOf(exempt), ['ids/other/.htaccess:1:warning']);
});

test('a rule switched off in config is recorded as not run', () => {
  // "Found nothing" and "never ran" are different answers to "why did it not
  // complain about this", and only one of them is true here.
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', '');
  repo.commit('fixture');
  const r = check({
    dir: repo.dir, rules: [noEmptyHtaccess], auditAll: false,
    config: {rules: {'files/no-empty-htaccess': 'off'}}
  });
  assert.deepEqual(r.findings, []);
  assert.deepEqual(r.notRun,
    [{ruleId: 'files/no-empty-htaccess', reason: 'rule-off'}]);
  assert.deepEqual(r.ran, [], 'and it really did not run');
});

test('files/no-empty-htaccess flags empty and comment-only files', () => {
  const r = audit(noEmptyHtaccess, {
    'ids/a/.htaccess': '',
    'ids/b/.htaccess': '# tbd\n',
    'ids/c/.htaccess': OK_HTACCESS
  });
  assert.deepEqual(findingsOf(r).sort(),
    ['ids/a/.htaccess:1:error', 'ids/b/.htaccess:1:error']);
});

test('files/no-empty-htaccess spares a root that only groups sub-identifiers',
  () => {
    const r = audit(noEmptyHtaccess, {
      // Comments only, but everything below it resolves -- so this claims the
      // identifier rather than breaking it.
      'ids/a/.htaccess': '# a -- see the versions below\n# maintainer: @octocat\n',
      'ids/a/v1/.htaccess': OK_HTACCESS,
      'ids/a/v2/.htaccess': OK_HTACCESS,
      // Comments only with nothing below: still an error, nothing resolves.
      'ids/b/.htaccess': '# maintainer: @octocat\n',
      // A sub-directory that does not resolve either cannot rescue the root.
      'ids/c/.htaccess': '# maintainer: @octocat\n',
      'ids/c/sub/.htaccess': '# also nothing\n'
    });
    assert.deepEqual(findingsOf(r).sort(),
      ['ids/b/.htaccess:1:error', 'ids/c/.htaccess:1:error',
        'ids/c/sub/.htaccess:1:error']);
  });

test('files/no-empty-htaccess still flags an empty file above sub-identifiers',
  () => {
    // The grouping exception is for comments, which say something. A
    // zero-byte file claims a name and says nothing.
    const r = audit(noEmptyHtaccess, {
      'ids/a/.htaccess': '',
      'ids/a/v1/.htaccess': OK_HTACCESS
    });
    assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:1:error']);
  });

test('tree/no-case-collision flags directories differing only in case', () => {
  const r = audit(noCaseCollision, {
    'ids/Widget/.htaccess': OK_HTACCESS,
    'ids/widget/nested/.htaccess': OK_HTACCESS,
    'ids/unique/.htaccess': OK_HTACCESS
  });
  // The colliding paths are directories, and an annotation naming a directory
  // never reaches the "files changed" view. Each finding is therefore hung on
  // a file inside -- the root .htaccess where there is one, the only file in
  // the subtree where there is not.
  const files = r.findings.map(f => f.file).sort();
  assert.deepEqual(files,
    ['ids/Widget/.htaccess', 'ids/widget/nested/.htaccess']);
  // The message still names the directory, which is what collides.
  for(const f of r.findings) {
    assert.match(f.message, /ids\/(Widget|widget) differs from/);
    assert.equal(f.line, 1, 'a line is what makes it render in the diff');
  }
});

test('findings about a namespace land on a file, not the directory', () => {
  // A directory is not somewhere GitHub can draw an annotation, so a finding
  // naming one is absent from the "files changed" view -- the one place a
  // contributor reliably reads them. Every rule that has something to say
  // about a namespace has to say it against a file inside.
  const r = audit(documentIdentifierRoot, {
    // The shape that prompted this: a new identifier with no maintainer
    // recorded anywhere.
    'ids/testdir/.htaccess': OK_HTACCESS,
    // No file at the root at all, so the anchor comes from below it.
    'ids/grouper/sub/.htaccess': OK_HTACCESS
  });
  // The README case cannot arise here -- a README at the root is itself the
  // claim this rule asks for -- and is covered by the files/htaccess-required
  // test above, which anchors on `ids/orphan/README.md`.
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/grouper/sub/.htaccess:1:warning',
    'ids/testdir/.htaccess:1:warning'
  ]);
  // The directory is still what the message is about.
  const testdir = r.findings.find(f => f.file.startsWith('ids/testdir'));
  assert.match(testdir.message, /ids\/testdir/);
});

test('format/no-trailing-whitespace reports all of it outside Markdown', () => {
  // Apache has no line-break idiom, so every one of these is dead weight.
  const r = audit(noTrailingWhitespace, {
    'ids/a/.htaccess': 'RewriteEngine on \n' +
      'RewriteRule ^a$ https://x/ [R=302,L]  \n' +
      'RewriteRule ^b$ https://x/ [R=302,L]   \n' +
      '\t\n' +
      'RewriteRule ^c$ https://x/ [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r), [
    'ids/a/.htaccess:1:warning',
    'ids/a/.htaccess:2:warning',
    'ids/a/.htaccess:3:warning',
    'ids/a/.htaccess:4:warning'
  ]);
});

test('format/no-excessive-blank-lines finds the boundary in both directions',
  () => {
    const rule = 'RewriteRule ^a$ https://x/ [R=302,L]\n';
    const r = audit(noExcessiveBlankLines, {
      // Three is the allowance, so this is silent.
      'ids/a/.htaccess': 'RewriteEngine on\n\n\n\n' + rule,
      // Four is one past it.
      'ids/b/.htaccess': 'RewriteEngine on\n\n\n\n\n' + rule
    });
    assert.deepEqual(findingsOf(r), ['ids/b/.htaccess:2:warning']);
    assert.match(r.findings[0].message, /^4 blank lines in a row/);
  });

test('format/no-excessive-blank-lines treats the two edges differently', () => {
  const rule = 'RewriteEngine on\nRewriteRule ^a$ https://x/ [R=302,L]\n';
  const r = audit(noExcessiveBlankLines, {
    // Nothing above the first line needs separating, so one is already too
    // many.
    'ids/a/.htaccess': '\n' + rule,
    // The file is meant to end in a newline, so one blank line at the end is
    // a single character of overshoot and not worth saying anything about.
    'ids/b/.htaccess': rule + '\n',
    // Two is somebody having left a gap.
    'ids/c/.htaccess': rule + '\n\n',
    'ids/d/.htaccess': rule
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/a/.htaccess:1:warning',
    'ids/c/.htaccess:3:warning'
  ]);
  const message = Object.fromEntries(r.findings.map(f => [f.file, f.message]));
  assert.match(message['ids/a/.htaccess'], /starts with 1 blank line\b/,
    'singular, because "1 blank lines" reads as a bug in the tool');
  assert.match(message['ids/c/.htaccess'], /ends with 2 blank lines/);
});

test('format/no-excessive-blank-lines reports a run once, not per line', () => {
  const r = audit(noExcessiveBlankLines, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' + '\n'.repeat(8) +
      'RewriteRule ^a$ https://x/ [R=302,L]\n',
    // A file of nothing but blank lines is one complaint, not three
    // overlapping ones: once the start has eaten everything there is no
    // interior and no end left to describe.
    'ids/b/README.md': '\n\n\n\n\n'
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/a/.htaccess:2:warning',
    'ids/b/README.md:1:warning'
  ]);
  assert.match(r.findings.find(f => f.file === 'ids/a/.htaccess').message,
    /^8 blank lines/);
});

test('format/no-excessive-blank-lines leaves ordinary Markdown alone', () => {
  // Markdown needs a blank line between blocks, so a short README is
  // legitimately close to half blank. Anything counting the proportion rather
  // than the run would report every one of these.
  const r = audit(noExcessiveBlankLines, {
    'ids/a/README.md':
      '# thing\n\nWhat it is.\n\n## Contact\n\nBy @octocat\n',
    'ids/b/README.md': '# thing\n\n\nWhat it is.\n',
    'ids/c/.htaccess':
      'RewriteEngine on\n\nRewriteRule ^a$ https://x/ [R=302,L]\n\n' +
      'RewriteRule ^b$ https://x/ [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r), []);
});

test('format/no-excessive-blank-lines does not read quoted content', () => {
  // A README showing an example .htaccess contains whatever it is quoting,
  // and this rule is about the file's own layout. Found by the rule reporting
  // its own documentation page, whose "Wrong" example is four blank lines.
  const r = audit(noExcessiveBlankLines, {
    'ids/a/README.md':
      '# thing\n\nBefore:\n\n```apache\nRewriteEngine on\n' +
      '\n\n\n\n\nRewriteRule ^a$ https://x/ [R=302,L]\n```\n\nAfter.\n',
    // A run outside the fence is still reported, and one is not allowed to
    // start inside a fence and finish outside it.
    'ids/b/README.md':
      '# thing\n\n```\nquoted\n```\n\n\n\n\nAfter.\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/b/README.md:6:warning']);
  assert.match(r.findings[0].message, /^4 blank lines/);
});

test('blank lines and trailing whitespace are separate complaints', () => {
  // A run of whitespace-only lines is one run here and one finding per line
  // in format/no-trailing-whitespace. Those are different things to say about
  // the same region -- what would be wrong is saying either of them twice.
  const files = {
    'ids/a/.htaccess':
      'RewriteEngine on\n' + '   \n'.repeat(5) +
      'RewriteRule ^a$ https://x/ [R=302,L]\n'
  };
  assert.deepEqual(findingsOf(audit(noExcessiveBlankLines, files)),
    ['ids/a/.htaccess:2:warning'],
    'one finding for the run, at its first line');
  assert.deepEqual(findingsOf(audit(noTrailingWhitespace, files)), [
    'ids/a/.htaccess:2:warning',
    'ids/a/.htaccess:3:warning',
    'ids/a/.htaccess:4:warning',
    'ids/a/.htaccess:5:warning',
    'ids/a/.htaccess:6:warning'
  ], 'the whitespace itself is still reported per line');
});

test('format/no-trailing-whitespace leaves a Markdown line break alone', () => {
  const r = audit(noTrailingWhitespace, {
    // One space is too few to break a line, so it does nothing.
    'ids/a/README.md': 'Contacts: \n\nsomebody\n',
    // Two or more is the working idiom; markdown/prefer-list-over-line-breaks
    // decides whether it should be a list, and this rule must not call it an
    // error of hygiene.
    'ids/b/README.md': 'Name  \nEmail: a@b.example\n',
    'ids/c/README.md': 'Name   \nEmail: a@b.example\n',
    // A tab never produces a break, and a blank line has nothing to break.
    'ids/d/README.md': 'Name\t\nEmail: a@b.example\n',
    'ids/e/README.md': 'Name\n  \nEmail: a@b.example\n'
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/a/README.md:1:warning',
    'ids/d/README.md:1:warning',
    'ids/e/README.md:2:warning'
  ]);
  assert.match(r.findings.find(f => f.file === 'ids/a/README.md').message,
    /needs two or more spaces/);
});

test('format/no-trailing-whitespace explains itself without .editorconfig',
  () => {
    const r = audit(noTrailingWhitespace, {
      'ids/a/.htaccess': 'RewriteEngine on \n',
      'ids/b/README.md': 'Contacts: \n'
    });
    for(const f of r.findings) {
      assert.doesNotMatch(f.message, /editorconfig/i,
        'a contributor who has never heard of the tool learns nothing from it');
      assert.match(f.message, /Delete it/);
    }
  });

test('markdown/prefer-list-over-line-breaks finds every marker', () => {
  const r = audit(preferListOverLineBreaks, {
    'ids/a/README.md': 'Name  \nEmail: a@b.example  \nGitHub: someone\n',
    'ids/b/README.md': 'Name \\\nEmail: a@b.example \\\nGitHub: someone\n',
    'ids/c/README.md': 'Name<br>\nEmail: a@b.example<br>\nGitHub: someone\n',
    'ids/d/README.md': 'Name<br />\nEmail: a@b.example<br />\nGitHub: x\n'
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/a/README.md:1:notice',
    'ids/b/README.md:1:notice',
    'ids/c/README.md:1:notice',
    'ids/d/README.md:1:notice'
  ]);
  assert.match(r.findings.find(f => f.file === 'ids/c/README.md').message,
    /a trailing <br>/);
  assert.match(r.findings.find(f => f.file === 'ids/b/README.md').message,
    /a trailing backslash/);
});

test('markdown/prefer-list-over-line-breaks needs a stack, not one break',
  () => {
    const r = audit(preferListOverLineBreaks, {
      // A single break inside a paragraph is a typographic choice, and a list
      // would be the wrong suggestion.
      'ids/a/README.md':
        'This sentence runs on  \nand on and on and on and on and on.\n' +
        '\nAnother paragraph entirely, unbroken.\n',
      // Two lines where the first breaks is a two-item stack: the last item
      // needs no trailing marker.
      'ids/b/README.md': 'GitHub: someone  \nHomepage: example.com\n'
    });
    assert.deepEqual(findingsOf(r), ['ids/b/README.md:1:notice']);
  });

test('markdown/prefer-list-over-line-breaks leaves existing lists alone', () => {
  const r = audit(preferListOverLineBreaks, {
    // Already a list, even though the items carry break markers.
    'ids/a/README.md': '- Name  \n- Email: a@b.example  \n- GitHub: x\n',
    // A list written with a bullet character rather than Markdown syntax,
    // with indented continuation lines. Still a list.
    'ids/b/README.md':
      '\u25e6 First item, which wraps\n  onto a second line.  \n' +
      '\u25e6 Second item, which also wraps\n  onto a second line.  \n',
    // A table cell has no list equivalent.
    'ids/c/README.md':
      '| Who | How |\n| --- | --- |\n| Name | a@b.example<br>x@y.example |\n',
    // Headings separate blocks rather than joining them.
    'ids/d/README.md': '## Contact  \n\nsomebody\n'
  });
  assert.deepEqual(findingsOf(r), []);
});

test('markdown/prefer-list-over-line-breaks ignores fenced code', () => {
  const r = audit(preferListOverLineBreaks, {
    'ids/a/README.md':
      'Run this:\n\n```sh\n' +
      'curl https://example.com/a \\\n' +
      '  --header "Accept: text/turtle" \\\n' +
      '  --output out.ttl\n' +
      '```\n'
  });
  assert.deepEqual(findingsOf(r), [],
    'a line continuation in a shell example is code, not markup');
});

test('format/final-newline ignores an empty file', () => {
  const r = audit(finalNewline, {
    'ids/a/.htaccess': '',
    'ids/b/.htaccess': 'RewriteEngine on',
    'ids/c/.htaccess': OK_HTACCESS
  });
  assert.deepEqual(findingsOf(r), ['ids/b/.htaccess:1:warning']);
});

test('format/no-crlf reports once per file, not once per line', () => {
  const r = audit(noCrlf, {
    'ids/a/.htaccess': 'RewriteEngine on\r\nRewriteRule ^$ https://x/ [R=302,L]\r\n'
  });
  assert.equal(r.findings.length, 1);
  assert.match(r.findings[0].message, /2 of 3 lines/);
});

test('htaccess/rewrite-engine-required distinguishes missing from off', () => {
  const missing = audit(rewriteEngineRequired, {
    'ids/a/.htaccess': 'RewriteRule ^$ https://example.com/ [R=302,L]\n'
  });
  assert.match(missing.findings[0].message, /no "RewriteEngine on"/);

  const off = audit(rewriteEngineRequired, {
    'ids/a/.htaccess': 'RewriteEngine off\nRewriteRule ^$ https://x/ [R=302,L]\n'
  });
  assert.match(off.findings[0].message, /disables/);

  const fine = audit(rewriteEngineRequired, {'ids/a/.htaccess': OK_HTACCESS});
  assert.deepEqual(findingsOf(fine), []);
});

test('htaccess/valid-rewrite-flags accepts long forms and any HTTP status', () => {
  // [R=406] aborts with 406, which content negotiation relies on; [last] and
  // [skip=1] are documented long spellings.
  const r = audit(validRewriteFlags, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ https://x/ [R=406,L]\n' +
      'RewriteRule ^b$ https://x/ [R=302,last]\n' +
      'RewriteRule ^c$ https://x/ [NC,skip=1]\n' +
      'RewriteRule ^d$ https://x/ [R=3-7,L]\n' +
      'RewriteRule ^e$ https://x/ [R=302,Q]\n'
  });
  assert.deepEqual(findingsOf(r).sort(),
    ['ids/a/.htaccess:5:error', 'ids/a/.htaccess:6:error']);
});

test('htaccess/uppercase-rewrite-flags is style only', () => {
  const r = audit(uppercaseRewriteFlags, {
    'ids/a/.htaccess':
      'RewriteEngine on\nRewriteRule ^$ https://x/ [r=302,l]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:warning']);
});

test('htaccess/no-inline-comment ignores # inside patterns and URLs', () => {
  const r = audit(noInlineComment, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^ont[/-]?prof(#[^/]+)?$ https://x/ [R=302,L]\n' +
      'RewriteRule ^b$ https://x/page#frag [R=302,L]\n' +
      'RewriteRule ^c$ https://x/ [R=302,L] # this is swallowed\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:4:error']);
});

test('htaccess/pattern-relative-to-dir allows the optional-slash idiom', () => {
  const r = audit(patternRelativeToDir, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^/?(.*)$ https://x/$1 [R=302,L]\n' +
      'RewriteRule ^/tokens/?$ https://x/t [R=302,L]\n' +
      'RewriteRule ^\\/$ https://x/ [R=301,L]\n'
  });
  assert.deepEqual(findingsOf(r).sort(),
    ['ids/a/.htaccess:3:error', 'ids/a/.htaccess:4:error']);
});

test('htaccess/https-target flags only http targets', () => {
  const r = audit(httpsTarget, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'RewriteRule ^a$ http://example.com/ [R=302,L]\n' +
      'RewriteRule ^b$ https://example.com/ [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:warning']);
});

test('htaccess/no-open-redirect judges by capture group and position', () => {
  const r = audit(noOpenRedirect, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      // Requester picks the parent domain.
      'RewriteRule ^([^/]+)/s/(.*)$ https://service.$1/t/$2 [R=302,L]\n' +
      // Constrained charset: only ever a subdomain label of example.com.
      'RewriteRule ^([a-z-]{1,50})$ https://$1.example.com/ [R=301,L]\n' +
      // Group must start with a slash, so it stays in the path.
      'RewriteRule ^labs(/.*)?$ https://labs.example.com$1 [R=302,L]\n' +
      // Backreference is only in the path.
      'RewriteRule ^p/(.*)$ https://example.com/$1 [R=302,L]\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:2:error']);
});

test('htaccess/valid-cors-header catches the truncated template', () => {
  const r = audit(validCorsHeader, {
    'ids/a/.htaccess':
      'Header set Access-Control-Allow-Headers DNT,User-Agent,If-Modified$\n' +
      'RewriteEngine on\n',
    'ids/b/.htaccess':
      'Header set Access-Control-Allow-Headers DNT,If-Modified-Since\n' +
      'RewriteEngine on\n'
  });
  assert.deepEqual(findingsOf(r), ['ids/a/.htaccess:1:warning']);
  assert.match(r.findings[0].message, /If-Modified-Since/);
});

test('htaccess/no-self-redirect separates a loop from a double hop', () => {
  const r = audit(noSelfRedirect, {
    'ids/a/.htaccess':
      'RewriteEngine on\nRewriteRule ^$ https://w3id.org/a [R=302,L]\n',
    'ids/b/.htaccess':
      'RewriteEngine on\nRewriteRule ^$ https://w3id.org/other [R=302,L]\n'
  });
  assert.match(
    r.findings.find(f => f.file === 'ids/a/.htaccess').message, /loops/);
  assert.match(
    r.findings.find(f => f.file === 'ids/b/.htaccess').message, /second trip/);
});

test('htaccess/allowed-directives refuses execution and proxying', () => {
  const r = audit(allowedDirectives, {
    'ids/a/.htaccess':
      'RewriteEngine on\n' +
      'Options +FollowSymLinks -MultiViews\n' +
      'AddType text/turtle .ttl\n' +
      'Header set Access-Control-Allow-Origin *\n' +
      'RewriteRule ^$ https://example.com/ [R=302,L]\n',
    'ids/b/.htaccess':
      'RewriteEngine on\n' +
      'Options +ExecCGI\n' +
      'AddHandler cgi-script .cgi\n' +
      'RewriteRule ^p$ https://example.com/ [P]\n'
  });
  assert.deepEqual(findingsOf(r, 'htaccess/allowed-directives')
    .filter(f => f.startsWith('ids/a')), [],
    'ordinary redirect directives must be left alone');
  assert.equal(r.findings.filter(f => f.file === 'ids/b/.htaccess').length, 3);
});

test('meta/maintainer-github-username reads the ad hoc formats', () => {
  const r = audit(maintainerGithubUsername, {
    'ids/a/.htaccess': '# GitHub username: exampleuser\n' + OK_HTACCESS,
    'ids/b/README.md': '## Maintainers\n- @someone\n',
    'ids/c/README.md':
      'Maintainer: [Firstname](https://github.com/ExampleUser)\n',
    'ids/d/.htaccess': '# Maintainer: Someone <a@b.example>\n' + OK_HTACCESS,
    'ids/e/README.md': '# e\n\nNo contact details at all.\n'
  });
  assert.deepEqual(findingsOf(r).map(f => f.split('/')[1]).sort(), ['d', 'e']);
});

test('git/no-merge-commits singles out the fork-sync merge', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  const base = repo.commit('Add a');

  repo.branch('feature');
  repo.write('ids/b/.htaccess', OK_HTACCESS);
  repo.commit('Add redirect for b');

  repo.checkout('master');
  repo.write('ids/c/.htaccess', OK_HTACCESS);
  repo.commit('Add redirect for c');

  repo.checkout('feature');
  repo.git(['merge', '-q', '--no-ff', 'master', '-m',
    "Merge branch 'perma-id:master' into feature"]);
  const head = repo.git(['rev-parse', 'HEAD']).trim();

  const r = check({
    dir: repo.dir, rules: [noMergeCommits], base, head, auditAll: false
  });
  assert.equal(r.findings.length, 1);
  assert.match(r.findings[0].message, /Sync fork/);
  assert.match(r.findings[0].message, /rebase/);
});

test('git/minimal-commits counts commits per file', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  const base = repo.commit('Add a');

  repo.branch('feature');
  let head;
  for(let i = 1; i <= 4; ++i) {
    repo.write('ids/b/.htaccess', OK_HTACCESS + `# revision ${i}\n`);
    head = repo.commit(`Adjust redirect for b, take ${i}`);
  }

  const r = check({
    dir: repo.dir, rules: [minimalCommits], base, head, auditAll: false
  });
  assert.equal(r.findings.length, 1);
  assert.equal(r.findings[0].file, 'ids/b/.htaccess');
  assert.match(r.findings[0].message, /4 separate commits/);
});

test('git/minimal-commits ignores commits that touch no identifier', () => {
  // Maintainer work on docs and tooling: the history is the useful artifact,
  // and telling somebody to squash it is telling them to undo a decision they
  // made on purpose.
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  const base = repo.commit('Add a');

  repo.branch('feature');
  let head;
  for(let i = 1; i <= 8; ++i) {
    repo.write('docs/guide.md', `# Guide\n\nRevision ${i}\n`);
    head = repo.commit(`Explain the ${i}th thing`);
  }

  const r = check({
    dir: repo.dir, rules: [minimalCommits], base, head, auditAll: false
  });
  assert.deepEqual(findingsOf(r), [],
    'eight commits, none touching an identifier');
});

test('git/minimal-commits still counts a change that mixes in docs', () => {
  // The identifier commits are what matters; editing a guide alongside must
  // neither trigger the rule nor mask it.
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  const base = repo.commit('Add a');

  repo.branch('feature');
  let head;
  for(let i = 1; i <= 4; ++i) {
    repo.write('ids/b/.htaccess', OK_HTACCESS + `# revision ${i}\n`);
    head = repo.commit(`Adjust redirect for b, take ${i}`);
  }
  for(let i = 1; i <= 6; ++i) {
    repo.write('docs/guide.md', `# Guide\n\nRevision ${i}\n`);
    head = repo.commit(`Explain the ${i}th thing`);
  }

  const r = check({
    dir: repo.dir, rules: [minimalCommits], base, head, auditAll: false
  });
  assert.equal(r.findings.length, 1);
  assert.equal(r.findings[0].file, 'ids/b/.htaccess');
  assert.match(r.findings[0].message, /4 separate commits/,
    'the six docs commits must not be counted against the file');
});

test('git/descriptive-commit-message spares a message that names the id', () => {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  repo.write('ids/a/.htaccess', OK_HTACCESS);
  const base = repo.commit('Add a');

  repo.branch('feature');
  repo.write('ids/b/.htaccess', OK_HTACCESS);
  repo.commit('Create .htaccess');
  repo.write('ids/b/README.md', OK_README);
  const head = repo.commit('Add redirect for the b vocabulary');

  const r = check({
    dir: repo.dir, rules: [descriptiveCommitMessage],
    base, head, auditAll: false
  });
  assert.equal(r.findings.length, 1);
  assert.match(r.findings[0].message, /Create \.htaccess/);
  assert.match(r.findings[0].message, /Add redirect for b/);
});
