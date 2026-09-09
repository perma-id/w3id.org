/**
 * Ratchet test against the real repository.
 *
 * The numbers below were established by hand before the rules were written,
 * and are treated as upper bounds rather than exact counts. A count that goes
 * up means a rule started matching something it should not, or the tree got
 * worse; a count that goes down is someone fixing the backlog, which must not
 * fail. When a count drops, lower the bound here so the ground stays gained.
 *
 * This does not run by default. Contributor pull requests are judged by the
 * rules themselves, not by whether they move a repository-wide total, and a
 * pull request that fixes an identifier should not have to edit this file.
 * Maintainers run it with:
 *
 *   W3ID_CHECK_CORPUS=1 npm test
 *
 * and CI runs it on pushes to master.
 */
import {test, describe} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {check} from './helpers.js';
import {rules} from '../src/rules/index.js';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

const enabled = process.env.W3ID_CHECK_CORPUS === '1' &&
  existsSync(path.join(root, 'ids', '.htaccess'));

// Highest acceptable count for each rule over the whole tree.
const BOUNDS = {
  'format/no-trailing-whitespace': 2404,
  'format/no-excessive-blank-lines': 287,
  'htaccess/escape-literal-dots': 1199,
  'htaccess/https-target': 1621,
  'htaccess/avoid-permanent-redirect': 458,
  'htaccess/github-raw-target': 457,
  'htaccess/no-406-fallback': 264,
  'htaccess/no-double-slash': 86,
  'htaccess/anchor-patterns': 21,
  'htaccess/no-greedy-capture': 7,
  'htaccess/no-flag-whitespace': 2,
  'format/no-bom': 0,
  'format/final-newline': 819,
  'meta/maintainer-github-username': 645,
  'files/prefer-readme-md': 377,
  'markdown/prefer-list-over-line-breaks': 340,
  'htaccess/valid-cors-header': 223,
  'htaccess/no-self-redirect': 215,
  'files/readme-required': 129,
  'format/no-crlf': 113,
  'htaccess/pattern-relative-to-dir': 107,
  'htaccess/no-inline-comment': 40,
  'htaccess/rewrite-engine-required': 25,
  'htaccess/no-open-redirect': 17,
  'htaccess/uppercase-rewrite-flags': 15,
  'files/only-allowed-names': 4,
  'files/htaccess-required': 3,
  'files/no-empty-htaccess': 2,
  'htaccess/valid-rewrite-flags': 2,
  'tree/no-case-collision': 2
};

describe('corpus', {skip: enabled ? false : 'set W3ID_CHECK_CORPUS=1 to run'},
  () => {
    // `includeWorkingTree: false` keeps these counts reproducible: they are
    // bounds on committed content, and a maintainer running this with edits in
    // progress must not see them move.
    const result = enabled ?
      check({dir: root, rules, includeWorkingTree: false}) :
      {findings: [], errors: []};
    const counts = {};
    for(const f of result.findings) {
      counts[f.ruleId] = (counts[f.ruleId] ?? 0) + 1;
    }

    test('every rule runs against the real tree without throwing', () => {
      assert.deepEqual(result.errors.map(e => e.ruleId), []);
    });

    test('every rule that fires is accounted for', () => {
      const unlisted = Object.keys(counts).filter(id => !(id in BOUNDS));
      assert.deepEqual(unlisted, [],
        'these rules now report findings but have no bound; add them');
    });

    for(const [ruleId, bound] of Object.entries(BOUNDS)) {
      test(`${ruleId} at most ${bound}`, () => {
        const actual = counts[ruleId] ?? 0;
        assert.ok(actual <= bound,
          `${ruleId} found ${actual}, above the bound of ${bound}. Either a ` +
          'change made the tree worse, or the rule started over-matching.');
        if(actual < bound) {
          // Not a failure: someone fixed something. Say so, so the bound gets
          // lowered and the improvement cannot silently regress later.
          console.log(`  ratchet: ${ruleId} is down to ${actual} ` +
            `(bound ${bound}); lower the bound in test/corpus.test.js`);
        }
      });
    }

    test('no rule has gone blind against the real tree', () => {
      // The bounds above only catch a rule that matches too much. A rule that
      // silently stops matching anything would pass them, so it is caught
      // here: every rule with a nonzero bound found something when the bounds
      // were set. One that now finds nothing has either broken, or had its
      // backlog cleared -- and in that case its bound should go to 0 in the
      // same change.
      const silent = Object.entries(BOUNDS)
        .filter(([ruleId, bound]) => bound > 0 && (counts[ruleId] ?? 0) === 0)
        .map(([ruleId]) => ruleId);
      assert.deepEqual(silent, [],
        'these rules found nothing: fix the rule, or set its bound to 0');
    });
  });
