/**
 * The rules have to survive the real repository.
 *
 * 2860 `.htaccess` files written by more than a thousand people over a
 * decade contain shapes no fixture anticipates. A rule that throws on one of
 * them fails every pull request until somebody works out why, so running all
 * of them over the whole tree is worth the second it costs.
 *
 * **Finding counts are deliberately not asserted.** The obvious way to do
 * that is a per-rule upper bound, and it does not work here: a bound is an
 * exact number and the identifier tree grows about 30% a year. 25 of 28
 * rules gained findings over the last twelve months and the fastest doubled,
 * so a bound tight enough to notice a rule over-matching is exceeded within
 * weeks by ordinary growth -- failing CI for something no contributor did.
 * Loosening it enough to survive that removes the detection it existed for.
 * Neither setting is worth having, and both need an edit every few weeks.
 *
 * Counts are reported instead, by `bin/w3id-check-trend.js`, weekly from
 * `.github/workflows/audit.yaml`. It computes its comparison points from
 * dates and stores no numbers, so nothing about it goes stale, and it
 * separates the two questions one count runs together: whether the backlog
 * is shrinking, and whether new contributions are still making the mistake.
 *
 * A consequence to know about: no test here notices a rule that silently
 * stops matching. The trend report names a rule whose count has reached
 * zero, because a cleared backlog and a broken rule look identical from
 * there -- but that is somebody reading a report, not CI failing.
 *
 * Does not run by default -- the tree is ~5200 files:
 *
 *   W3ID_CHECK_CORPUS=1 npm test
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

describe('corpus', {skip: enabled ? false : 'set W3ID_CHECK_CORPUS=1 to run'},
  () => {
    test('every rule runs against the real tree without throwing', () => {
      // `includeWorkingTree: false` so a maintainer running this with edits
      // in progress sees the same thing CI does.
      const result = check({dir: root, rules, includeWorkingTree: false});
      assert.deepEqual(result.errors.map(e => e.ruleId), []);
      // A run that produced nothing at all satisfies the line above while
      // having examined nothing -- a rule set that fails to load, or a tree
      // that is not there. "No errors" and "nothing ran" are the same
      // result from outside, so say which one this was.
      assert.ok(result.findings.length > 0,
        'expected the real tree to produce findings; did the rules run?');
    });
  });
