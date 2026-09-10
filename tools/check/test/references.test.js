/**
 * Every rule id written down in the repository must name a rule that still
 * exists.
 *
 * `meta/rule-docs-exist` keeps the checker's rules and their documentation
 * pages in step, and `.w3id-check.yaml` is validated when it loads. Neither
 * covers the other places a rule id is written: this tool's README, the
 * contributor instructions, the workflow files, an `.editorconfig` comment,
 * the checker's own output format. A rename leaves those describing rules
 * that no longer exist, and nothing says so -- prose does not fail to
 * compile.
 *
 * That has to be a test rather than a rule. Contributors never edit these
 * files, so making every pull request pay to scan them would buy nothing;
 * this runs in CI on pushes to master, where renames actually happen.
 *
 * The membership set here is the documentation pages, not the rule registry.
 * A page may legitimately describe a rule that has no check yet -- `status:
 * proposed` -- and prose is entitled to reference it. It is only
 * `.w3id-check.yaml` that needs the stricter set, because a key naming a
 * proposed rule really would be dead.
 *
 * If you change what this detects, delete a rule page and watch it fail
 * before trusting it to pass. A test like this one is green both when
 * everything resolves and when it has quietly stopped looking, and the two
 * are indistinguishable from the outside. Every fault found in it so far --
 * a pattern that matched one convention and missed two others, a crash on a
 * page deleted but not yet committed, which is the exact state a
 * half-finished rename leaves behind -- was found that way and by no other
 * means.
 */
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readdirSync, readFileSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {listFiles} from '../src/git.js';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const rulesDir = path.join(root, 'docs', 'rules');

// The rule namespaces, so that the patterns below cannot match arbitrary
// two-segment paths.
const NAMESPACES = readdirSync(rulesDir)
  .filter(name => statSync(path.join(rulesDir, name)).isDirectory());
const ID = `(?:${NAMESPACES.join('|')})/[a-z0-9][a-z0-9-]*`;

/**
 * The two ways a rule id is written here, which are genuinely different
 * detection problems.
 *
 * Bare -- `htaccess/https-target` -- is the documentation convention, because
 * a page writes ``[`id`](./id)`` and the link text is bare. It is also the
 * ambiguous one: a two-segment token is indistinguishable from a path or URL
 * fragment, so it counts only where nothing path-like precedes it, and only
 * outside `ids/`, where redirect targets contain real paths such as
 * `files/docs` that collide with the namespace words.
 *
 * Qualified -- `docs/rules/htaccess/https-target` -- is anchored on a literal
 * prefix, so it cannot collide with anything and is safe to look for
 * everywhere, `ids/` included. One pattern covers both shapes this takes,
 * because the URL the checker prints and that an `.htaccess` or
 * `.editorconfig` comment cites contains the path the contributor
 * instructions use. Those instructions keep the bare path deliberately, so
 * the link still resolves for someone reading a fork offline.
 */
const PATTERNS = [
  {form: 'bare', re: new RegExp(String.raw`(?<![./\w-])${ID}`, 'g'),
    skipIds: true},
  {form: 'qualified', re: new RegExp(String.raw`docs/rules/(${ID})`, 'g'),
    skipIds: false}
];

// Text a person writes and a rename would silently invalidate.
const SCANNED = new Set([
  '.md', '.yaml', '.yml', '.js', '.json', '.editorconfig', '.htaccess'
]);

// Tests name rules by import, so a rename breaks them loudly, and they hold
// deliberately invalid ids as fixtures.
const TEST_DIR = 'tools/check/test/';

test('references: every rule id written down still names a rule', () => {
  const pages = new Set();
  for(const file of walk(rulesDir)) {
    if(file.endsWith('.md') && path.basename(file) !== 'index.md') {
      pages.add(path.relative(rulesDir, file).split(path.sep).join('/')
        .replace(/\.md$/, ''));
    }
  }
  assert.ok(pages.size > 30, 'expected to find the rule pages');

  const stale = new Set();
  // Tracked files only. Build output is not repository content, and walking
  // it would bury a real failure under hundreds of duplicates from
  // `docs/.vitepress/dist` for anyone who had run a build before the tests.
  for(const relative of listFiles(root)) {
    if(relative.startsWith(TEST_DIR)) {
      continue;
    }
    if(!SCANNED.has(path.extname(relative)) &&
      !SCANNED.has(path.basename(relative))) {
      continue;
    }
    const inIds = relative === 'ids' || relative.startsWith('ids/');
    // Tracked but not on disk: deleted and not yet committed, which is
    // exactly the state a half-finished rename leaves behind. Reporting the
    // stale references is the useful thing to do here, not crashing.
    const text = read(path.join(root, relative));
    if(text === null) {
      continue;
    }
    for(const {form, re, skipIds} of PATTERNS) {
      if(skipIds && inIds) {
        continue;
      }
      for(const match of text.matchAll(re)) {
        // The capture for the anchored forms, the whole match for the bare
        // one, which has no group.
        const id = match[1] ?? match[0];
        if(!pages.has(id)) {
          stale.add(`${relative}: ${id} (${form})`);
        }
      }
    }
  }

  assert.deepEqual([...stale].sort(), [],
    'these name no rule page; a rule was probably renamed');
});

/**
 * Repository paths as they are written down, in the two forms that occur.
 *
 * Bare or relative -- `tools/check/bin/w3id-check.js` -- is what a command in
 * a code block or a link in prose looks like. The lookbehind is the whole
 * difficulty: without it the same shape matches the tail of any URL, so
 * `httpd.apache.org/docs/current/mod/mod_rewrite.html` and every redirect
 * target under `ids/` come back as broken repository paths.
 *
 * The second form is this repository's own file links on GitHub, which the
 * first deliberately skips because a slash precedes them. Anchoring on the
 * repository slug keeps third-party `blob/` URLs -- of which the identifier
 * tree has many -- out of it.
 */
const REPO_DIRS = 'tools|docs';
const SEGMENT = '[A-Za-z0-9._-]+';
const PATH_PATTERNS = [
  new RegExp(
    String.raw`(?<![/\w.-])(?:${REPO_DIRS})/${SEGMENT}(?:/${SEGMENT})*`, 'g'),
  new RegExp(
    String.raw`perma-id/w3id\.org/blob/[^/\s)]+/` +
    String.raw`((?:${REPO_DIRS})/${SEGMENT}(?:/${SEGMENT})*)`, 'g')
];

/**
 * A rule page tells the reader how to run the rule it documents. Nothing else
 * checks that the command it gives runs *that* rule.
 *
 * The test above catches a `--rule` argument naming no page at all, which is
 * what a rename leaves behind. It cannot catch a command naming the wrong
 * page, because that id resolves perfectly well -- and the pages are 38 near
 * copies of one another, edited together, which is exactly the shape that
 * produces a pasted-in neighbour's id.
 *
 * A page with no check yet is exempt from having a command, and the exemption
 * comes from its own frontmatter rather than from a list of filenames here.
 */
test('references: every rule page checks the rule it documents', () => {
  const COMMAND = /^node tools\/check\/bin\/w3id-check\.js.*$/gm;
  const wrong = [];

  for(const file of walk(rulesDir)) {
    if(!file.endsWith('.md') || path.basename(file) === 'index.md') {
      continue;
    }
    const id = path.relative(rulesDir, file).split(path.sep).join('/')
      .replace(/\.md$/, '');
    const text = read(file);
    if(text === null) {
      continue;
    }
    const commands = [...text.matchAll(COMMAND)].map(m => m[0]);
    if(commands.length === 0) {
      if(!/^status:\s*proposed\s*$/m.test(text)) {
        wrong.push(`${id}: no example command, and not status: proposed`);
      }
      continue;
    }
    for(const command of commands) {
      const named = /--rule\s+(\S+)/.exec(command);
      if(named === null) {
        wrong.push(
          `${id}: example command has no --rule, so it runs all of them`);
      } else if(named[1] !== id) {
        wrong.push(`${id}: example command runs --rule ${named[1]}`);
      }
    }
  }

  assert.deepEqual(wrong.sort(), [],
    'these pages document one rule and tell the reader to run another');
});

test('references: every repository path written down still exists', () => {
  // A rename moves the directory and the references separately, and nothing
  // else notices when the second half is missed. Three times this week a
  // reference went stale in a file nobody renders, so nobody reread it.
  const missing = new Set();
  let found = 0;

  // Tracked files, so this first fires on the commit that adds a file rather
  // than while it is being written -- which makes "something was renamed" the
  // wrong first guess when it goes off. The other cause is a path that is
  // generated at runtime: write those relative to a working directory the
  // reader has been told to `cd` into, so no `tools/...` token names a file
  // that only exists after somebody runs a command.
  for(const relative of listFiles(root)) {
    // Identifier content is the data, not a description of it, and its
    // redirect targets are full of URLs whose tails look like paths.
    if(relative.startsWith('ids/') || relative.startsWith(TEST_DIR)) {
      continue;
    }
    if(!SCANNED.has(path.extname(relative)) &&
      !SCANNED.has(path.basename(relative))) {
      continue;
    }
    const text = read(path.join(root, relative));
    if(text === null) {
      continue;
    }
    for(const re of PATH_PATTERNS) {
      for(const match of text.matchAll(re)) {
        // A path ending a sentence picks up the full stop; a trailing dot is
        // never part of a filename here.
        const referenced = (match[1] ?? match[0]).replace(/\.+$/, '');
        ++found;
        if(!statSync(path.join(root, referenced), {throwIfNoEntry: false})) {
          missing.add(`${relative}: ${referenced}`);
        }
      }
    }
  }

  // A detector that quietly stops matching would otherwise pass forever.
  assert.ok(found > 20, `expected to find repository paths, saw ${found}`);
  assert.deepEqual([...missing].sort(), [],
    'these paths are written down but do not exist. Either something was ' +
    'renamed, or a new file cites a path that is generated, gitignored or ' +
    'not written yet');
});

/**
 * Namespaces the repository documents about itself, and so may name.
 *
 * Each is infrastructure or a shared space, not somebody's identifier:
 * `w3id` holds the service's own pages and is listed in `allowedPaths`;
 * `examples` is the sanctioned place to look at worked examples; `people` is
 * documented as a shared namespace rather than as anyone's.
 */
const DOCUMENTED_NAMESPACES = new Set(['w3id', 'examples', 'people']);

test('references: documentation does not name a real identifier', () => {
  // Prose that names a live namespace singles out whoever owns it, and goes
  // wrong the moment they rename it -- and identifiers here do get renamed.
  // Placeholders (`ids/my-project`, `ids/foo`) are invented, so the property
  // to check is not how a name looks but whether it resolves.
  const named = new Map();
  for(const relative of listFiles(root)) {
    // Identifier content is the data being described, not a description of
    // it: an `.htaccess` names its own directory as a matter of course.
    if(relative.startsWith('ids/')) {
      continue;
    }
    if(!SCANNED.has(path.extname(relative)) &&
      !SCANNED.has(path.basename(relative))) {
      continue;
    }
    const text = read(path.join(root, relative));
    if(text === null) {
      continue;
    }
    for(const [, name] of
      text.matchAll(/ids\/([A-Za-z0-9][A-Za-z0-9._-]*)/g)) {
      if(!named.has(name)) {
        named.set(name, relative);
      }
    }
  }
  assert.ok(named.size > 5, 'expected to find the placeholder names');

  const real = [];
  for(const [name, where] of [...named].sort()) {
    if(DOCUMENTED_NAMESPACES.has(name)) {
      continue;
    }
    if(statSync(path.join(root, 'ids', name), {throwIfNoEntry: false})
      ?.isDirectory()) {
      real.push(`${where}: ids/${name}`);
    }
  }

  assert.deepEqual(real, [],
    'these name a live identifier; use ids/my-project instead');
});

// The site home, which VitePress serves from `docs/index.md`. Nothing links
// to it from the sidebar because the site title in the header already does.
const IMPLICIT_ROUTES = new Set(['/']);

test('references: every documentation page is reachable from the site nav',
  () => {
  // The sidebar enumerates every page by hand, so it can disagree with the
  // filesystem in both directions and VitePress reports neither: it does not
  // resolve sidebar links, and a site with a dead entry builds clean.
  //
  //   page with no entry  -- reachable by URL, but a reader browsing the
  //                          site never sees it. Happens when a page is
  //                          added and the sidebar is not.
  //   entry with no page  -- a dead link in the sidebar of every page on
  //                          the site. Happens when a page is deleted or
  //                          moved.
  //
  // A rename is both at once, which is why this checks both. Only the first
  // was checked at first, and a rule rename duly left a dead entry behind
  // that this test watched go past.
  //
  // Silent when the site is absent, the way meta/rule-docs-exist is silent
  // without docs/rules/. The two halves of this repository were written
  // separately and either can be checked out without the other.
  //
  // Note what that costs when reading the output: this returning early is a
  // pass, not a skip, so "the test passed" and "the test ran" look the same
  // here. In a tree with no docs/.vitepress/ it has checked nothing. If you
  // change what it detects, prove it against a checkout that has the site.
  const config = read(path.join(root, 'docs', '.vitepress', 'config.js'));
  if(config === null) {
    return;
  }

  // Single quotes only, which is how every entry is written. A rules link in
  // double quotes would be invisible here, and the page it names would stop
  // being checked -- the exact failure this exists to catch.
  const linked = new Set(
    [...config.matchAll(/link:\s*'([^']+)'/g)].map(([, link]) => link));
  assert.ok([...linked].some(link => link.startsWith('/rules/')),
    'expected the sidebar to link to rule pages at all');

  // Both directions collect into one report rather than asserting
  // separately. A rename trips both at once, and two asserts would abort on
  // the first -- telling a reader about the page they added and nothing
  // about the dead link they left behind, so they fix one, re-run, and only
  // then learn about the other.
  const problems = [];

  const docsDir = path.join(root, 'docs');
  for(const file of walk(docsDir)) {
    if(!file.endsWith('.md')) {
      continue;
    }
    const relative = path.relative(docsDir, file).split(path.sep).join('/');
    // Neither VitePress's own directory nor its installed dependencies are
    // pages of the site.
    if(relative.startsWith('.vitepress/') ||
      relative.includes('node_modules/')) {
      continue;
    }
    // An index page is its directory: `rules/files/index.md` is
    // `/rules/files/`, and `rules/index.md` is `/rules/`.
    const route = '/' +
      relative.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
    if(!linked.has(route) && !IMPLICIT_ROUTES.has(route)) {
      problems.push(`no sidebar entry for ${relative} (${route})`);
    }
  }

  // The reverse: every rule link in the sidebar must name a page that is
  // really there. Restricted to /rules/, the only routes whose file layout
  // this repository owns -- the rest of the site is the docs worktree's.
  for(const link of [...linked].filter(l => l.startsWith('/rules/'))) {
    const base = path.join(docsDir, link.replace(/^\//, ''));
    const page = link.endsWith('/') ? path.join(base, 'index.md') : base + '.md';
    if(read(page) === null) {
      problems.push(`no page for sidebar entry ${link}`);
    }
  }

  assert.deepEqual(problems.sort(), [],
    'the sidebar and the pages disagree; fix docs/.vitepress/config.js. ' +
    'A rename shows up here as both kinds at once -- a page nothing links ' +
    'to, and a link to no page.');
});

function read(file) {
  try {
    return readFileSync(file, 'utf8');
  } catch(e) {
    if(e.code === 'ENOENT') {
      return null;
    }
    throw e;
  }
}

function* walk(dir) {
  for(const entry of readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if(entry.isDirectory()) {
      yield* walk(full);
    } else if(entry.isFile()) {
      yield full;
    }
  }
}
