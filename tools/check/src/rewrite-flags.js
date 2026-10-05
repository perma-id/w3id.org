/**
 * What mod_rewrite accepts inside a `[...]` flag list.
 *
 * Deliberately not in `htaccess.js`: that module is a tokenizer, and its
 * `parseFlags` accepts any name on purpose so that the rules, not the parser,
 * decide which names are real. This is the vocabulary those decisions read.
 * It lives here rather than inside one rule because two rules need it, and no
 * rule in this tree imports from another.
 */
import {parseFlags} from './htaccess.js';

/**
 * mod_rewrite accepts both a short and a long spelling for most flags, and
 * matches them case-insensitively, so `[R=302,L]`, `[redirect=302,last]` and
 * `[r=302,l]` all work.
 */
export const FLAGS = new Set([
  'B', 'BNP', 'BACKREFNOPLUS', 'BCTLS', 'C', 'CHAIN', 'CO', 'COOKIE',
  'DPI', 'DISCARDPATH', 'END', 'E', 'ENV', 'F', 'FORBIDDEN', 'G', 'GONE',
  'H', 'HANDLER', 'L', 'LAST', 'N', 'NEXT', 'NC', 'NOCASE', 'NE', 'NOESCAPE',
  'NS', 'NOSUBREQ', 'P', 'PROXY', 'PT', 'PASSTHROUGH', 'QSA', 'QSAPPEND',
  'QSD', 'QSDISCARD', 'QSL', 'QSLAST', 'R', 'REDIRECT', 'S', 'SKIP',
  'T', 'TYPE', 'MB', 'UNSAFE_PREFIX_STAT', 'UNSAFE_ALLOW3F'
]);

/**
 * The flags a `RewriteCond` takes, which are not the ones a `RewriteRule`
 * takes.
 *
 * Kept apart rather than folded into the set above, because the difference is
 * load-bearing: `[OR]` on a `RewriteRule` is an error, and merging the two
 * would make `htaccess/valid-rewrite-flags` accept it. `NC` is in both and is
 * listed once, above.
 */
export const COND_FLAGS = new Set(['OR', 'ORNEXT', 'NV', 'NOVARY']);

/**
 * `[R=...]` accepts any HTTP status code, not only the 3xx family: given a
 * code outside 300-399 mod_rewrite drops the substitution and ends the
 * request with that status. Content negotiation in this repository relies on
 * that -- `[R=406]` is used 278 times to reject an unsatisfiable Accept
 * header -- so only a value that is not an HTTP status at all is an error.
 */
const STATUS_WORD = new Set(['temp', 'permanent', 'seeother']);

export function isHttpStatus(value) {
  if(STATUS_WORD.has(value.toLowerCase())) {
    return true;
  }
  return /^[1-5]\d\d$/.test(value);
}

/**
 * Whether a bracketed string is a flag list, rather than bracketed text that
 * happens to end an argument.
 *
 * Every comma-separated name has to be one mod_rewrite knows, so a trailing
 * `[0-9]` fails on `0-9`. Both vocabularies are accepted, because the
 * question here is "did somebody mean flags", not "are these the right flags
 * for this directive" -- that second question is
 * `htaccess/valid-rewrite-flags`, and it can only ask it once the flag list
 * is a flag list. The value of `R=` is deliberately not checked here:
 * `[R=30,L]` is still a flag list, and saying so is what lets
 * `htaccess/valid-rewrite-flags` go on to report the bad status once the
 * directive is otherwise repaired. A directive with two mistakes should not
 * be silent about both.
 *
 * Nothing in the tree currently reaches this test and fails it: the
 * structural checks in `htaccess/space-before-flags` already exclude every
 * bracket in the corpus that is not a flag list. It is here against the
 * target URL that ends in `[0-9]` one day, not because it is carrying weight
 * today.
 */
export function looksLikeFlagList(group) {
  const flags = parseFlags(group);
  return flags.size > 0 && [...flags.keys()].every(
    name => FLAGS.has(name) || COND_FLAGS.has(name));
}
