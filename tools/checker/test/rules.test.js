/** Per-rule behaviour, against fixtures rather than the live tree. */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeRepo, check, findingsOf} from './helpers.js';

import onlyAllowedNames from '../src/rules/files/only-allowed-names.js';
import readmeCanonicalName from '../src/rules/files/readme-canonical-name.js';
import htaccessRequired from '../src/rules/files/htaccess-required.js';
import readmeRequired from '../src/rules/files/readme-required.js';
import noEmptyHtaccess from '../src/rules/files/no-empty-htaccess.js';
import noCaseCollision from '../src/rules/tree/no-case-collision.js';
import noTrailingWhitespace from '../src/rules/format/no-trailing-whitespace.js';
import preferListOverLineBreaks from '../src/rules/markdown/prefer-list-over-line-breaks.js';
import finalNewline from '../src/rules/format/final-newline.js';
import noCrlf from '../src/rules/format/no-crlf.js';
import rewriteEngineRequired from '../src/rules/htaccess/rewrite-engine-required.js';
import validRewriteFlags from '../src/rules/htaccess/valid-rewrite-flags.js';
import uppercaseRewriteFlags from '../src/rules/htaccess/uppercase-rewrite-flags.js';
import noInlineComment from '../src/rules/htaccess/no-inline-comment.js';
import patternNoLeadingSlash from '../src/rules/htaccess/pattern-no-leading-slash.js';
import httpsTarget from '../src/rules/htaccess/https-target.js';
import noOpenRedirect from '../src/rules/htaccess/no-open-redirect.js';
import validCorsHeader from '../src/rules/htaccess/valid-cors-header.js';
import noSelfRedirect from '../src/rules/htaccess/no-self-redirect.js';
import allowedDirectives from '../src/rules/htaccess/allowed-directives.js';
import maintainerGithubUsername from '../src/rules/meta/maintainer-github-username.js';
import minimalCommits from '../src/rules/git/minimal-commits.js';
import noMergeCommits from '../src/rules/git/no-merge-commits.js';
import descriptiveCommitMessage from '../src/rules/git/descriptive-commit-message.js';

/** Build a repo from a map of path -> contents and audit it with one rule. */
function audit(rule, files) {
  const repo = makeRepo();
  repo.write('.w3id-check.yaml', 'idsDir: ids\n');
  for(const [path, content] of Object.entries(files)) {
    repo.write(path, content);
  }
  repo.commit('fixture');
  return check({dir: repo.dir, rules: [rule]});
}

const OK_HTACCESS = 'RewriteEngine on\nRewriteRule ^$ https://example.com/ [R=302,L]\n';
const OK_README = '# thing\n\nBy [octocat](https://github.com/octocat).\n';

test('files/only-allowed-names rejects anything else', () => {
  const r = audit(onlyAllowedNames, {
    'ids/a/.htaccess': OK_HTACCESS,
    'ids/a/README.md': OK_README,
    'ids/a/readme.txt': 'also fine\n',
    'ids/a/index.html': '<p>no</p>\n',
    'ids/a/.gitignore': '.DS_Store\n',
    'ids/a/logo.png': 'x\n'
  });
  assert.deepEqual(findingsOf(r).sort(), [
    'ids/a/.gitignore:1:error',
    'ids/a/index.html:1:error',
    'ids/a/logo.png:1:error'
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

test('files/readme-canonical-name asks for the convention, not a fix', () => {
  const r = audit(readmeCanonicalName, {
    'ids/a/README.md': OK_README,
    'ids/b/readme.md': OK_README,
    'ids/c/README.MD': OK_README
  });
  assert.deepEqual(findingsOf(r).sort(),
    ['ids/b/readme.md:1:warning', 'ids/c/README.MD:1:warning']);
  // These render perfectly well; the rule must not imply they do not.
  for(const f of r.findings) {
    assert.match(f.message, /GitHub recognises other spellings/);
    assert.doesNotMatch(f.message, /verbatim/);
  }
});

test('files/readme-canonical-name spots Markdown without a .md name', () => {
  const r = audit(readmeCanonicalName, {
    // Opens with an ATX heading, so the extension does change what a reader
    // sees.
    'ids/a/README': '# thing\n\nBy @octocat\n',
    // A heading after blank lines still counts.
    'ids/b/readme.txt': '\n\n## Contact\n\nBy @octocat\n',
    // Genuinely plain text: nothing is lost by the extension.
    'ids/c/README.txt': 'Contact: someone@example.com\n'
  });
  const message = Object.fromEntries(r.findings.map(f => [f.file, f.message]));

  assert.match(message['ids/a/README'], /appear as literal punctuation/);
  assert.match(message['ids/b/readme.txt'], /appear as literal punctuation/);
  assert.match(message['ids/c/README.txt'],
    /GitHub recognises other spellings/,
    'plain text loses nothing, so it gets the convention nudge only');
});

test('files/htaccess-required accepts a parent that only groups children', () => {
  const r = audit(htaccessRequired, {
    // `ids/group` has no .htaccess of its own, which is legitimate.
    'ids/group/child/.htaccess': OK_HTACCESS,
    'ids/orphan/README.md': OK_README
  });
  assert.deepEqual(findingsOf(r), ['ids/orphan:-:warning']);
});

test('files/readme-required accepts a README anywhere in the namespace', () => {
  const r = audit(readmeRequired, {
    'ids/a/.htaccess': OK_HTACCESS,
    'ids/a/sub/README.md': OK_README,
    'ids/b/.htaccess': OK_HTACCESS
  });
  assert.deepEqual(findingsOf(r), ['ids/b:-:warning']);
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

test('tree/no-case-collision flags directories differing only in case', () => {
  const r = audit(noCaseCollision, {
    'ids/Widget/.htaccess': OK_HTACCESS,
    'ids/widget/nested/.htaccess': OK_HTACCESS,
    'ids/unique/.htaccess': OK_HTACCESS
  });
  const files = r.findings.map(f => f.file).sort();
  assert.deepEqual(files, ['ids/Widget', 'ids/widget']);
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

test('htaccess/pattern-no-leading-slash allows the optional-slash idiom', () => {
  const r = audit(patternNoLeadingSlash, {
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
    'ids/a/.htaccess': '# GitHub username: bact\n' + OK_HTACCESS,
    'ids/b/README.md': '## Maintainers\n- @44inua\n',
    'ids/c/README.md': 'Maintainer: [Coen](https://github.com/CoenvanG)\n',
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
