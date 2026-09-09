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
const TEST_DIR = 'tools/checker/test/';

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
