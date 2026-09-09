/**
 * Every rule id named in repository prose or configuration must name a rule
 * that still exists.
 *
 * `meta/rule-docs-exist` keeps the checker's rules and their documentation
 * pages in step, and `.w3id-check.yaml` is validated when it loads. Neither
 * covers the other places a rule id is written down: this tool's README, the
 * contributor instructions, the workflow files, an `.editorconfig` comment.
 * A rename leaves those describing rules that no longer exist, and nothing
 * says so -- prose does not fail to compile.
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

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const rulesDir = path.join(root, 'docs', 'rules');

// The rule namespaces, so that the pattern below cannot match arbitrary
// two-segment paths.
const NAMESPACES = readdirSync(rulesDir)
  .filter(name => statSync(path.join(rulesDir, name)).isDirectory());

/**
 * A rule id as it is written in prose: `htaccess/https-target`.
 *
 * Not preceded by `.`, `/` or a word character, which is what separates an id
 * from a path or URL fragment that happens to end the same way --
 * `.git/config`, `github.com/perma-id/w3id.org/tree/master`, and the example
 * paths `docs/rules/htaccess/new-thing.md` on the rule-docs-exist page.
 */
const RULE_ID = new RegExp(
  String.raw`(?<![./\w-])(?:${NAMESPACES.join('|')})/[a-z0-9][a-z0-9-]*`, 'g');

// Text a person writes and a rename would silently invalidate.
const SCANNED = new Set([
  '.md', '.yaml', '.yml', '.js', '.json', '.editorconfig', '.htaccess'
]);

const SKIP = new Set([
  'node_modules', '.git',
  // Identifier redirect rules, whose URL paths collide with the namespace
  // words: `files/docs` and `files/redox` are real targets, not rule ids.
  'ids',
  // Tests name rules by import, so a rename breaks them loudly. They also
  // hold deliberately invalid ids as fixtures.
  'test'
]);

test('references: every rule id written down still names a rule', () => {
  const pages = new Set();
  for(const file of walk(rulesDir)) {
    if(file.endsWith('.md') && path.basename(file) !== 'index.md') {
      pages.add(path.relative(rulesDir, file).split(path.sep).join('/')
        .replace(/\.md$/, ''));
    }
  }
  assert.ok(pages.size > 30, 'expected to find the rule pages');

  const stale = [];
  for(const file of walk(root)) {
    const name = path.basename(file);
    if(!SCANNED.has(path.extname(file)) && !SCANNED.has(name)) {
      continue;
    }
    const relative = path.relative(root, file).split(path.sep).join('/');
    for(const id of readFileSync(file, 'utf8').match(RULE_ID) ?? []) {
      if(!pages.has(id)) {
        stale.push(`${relative}: ${id}`);
      }
    }
  }

  assert.deepEqual(stale, [],
    'these name no rule page; a rule was probably renamed');
});

function* walk(dir) {
  for(const entry of readdirSync(dir, {withFileTypes: true})) {
    if(SKIP.has(entry.name)) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if(entry.isDirectory()) {
      yield* walk(full);
    } else if(entry.isFile()) {
      yield full;
    }
  }
}
