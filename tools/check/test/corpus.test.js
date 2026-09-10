/**
 * The one thing worth asserting about the real repository: that the rules
 * survive it.
 *
 * This file used to hold thirty upper bounds, one per rule, each set to the
 * exact count at the time it was written, and CI failed if any was exceeded.
 * The instrument was wrong. The identifier tree grows about 30% a year, so 25
 * of 28 counts rose within twelve months and four bounds were already
 * exceeded on master -- by one or two findings each. A table of exact counts
 * against a corpus growing a third per year needs editing every few weeks,
 * and no amount of headroom fixes it: the fastest-growing rule doubles
 * annually, so even tripling its bound buys about a year.
 *
 * The header used to say "when a count drops, lower the bound here so the
 * ground stays gained". That line is what put all thirty bounds at zero
 * headroom, and it is why this note is longer than the test.
 *
 * What replaced them is `bin/w3id-check-trend.js`, run weekly by
 * `.github/workflows/audit.yaml`: today's rules against the tree as it was a
 * week, a month, a year ago. It stores nothing, so there is no number here to
 * go stale, and it separates the two questions a single count conflates --
 * whether the backlog is shrinking, and whether new contributions are still
 * making the mistake.
 *
 * Nothing gates on a count any more. What is left below needs no numbers and
 * cannot go out of date: 2860 real `.htaccess` files find crashes that
 * fixtures do not.
 *
 * Note what this no longer catches. A rule that silently stops matching used
 * to fail here, because every rule had a nonzero bound to fall below. The
 * trend report now names such a rule in a section of its own, but that is a
 * person reading a weekly report rather than a test failing, and the
 * difference is deliberate rather than accidental.
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
      // A run that produced nothing at all would pass the line above while
      // having checked nothing, which is the failure this whole file's
      // history is made of.
      assert.ok(result.findings.length > 0,
        'expected the real tree to produce findings; did the rules run?');
    });
  });
