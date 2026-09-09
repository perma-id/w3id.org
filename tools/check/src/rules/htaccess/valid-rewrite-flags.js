/**
 * mod_rewrite accepts both a short and a long spelling for most flags, and
 * matches them case-insensitively, so `[R=302,L]`, `[redirect=302,last]` and
 * `[r=302,l]` all work. Only a name that is not a flag at all is an error;
 * non-canonical casing is a readability problem, reported separately.
 */
const FLAGS = new Set([
  'B', 'BNP', 'BACKREFNOPLUS', 'BCTLS', 'C', 'CHAIN', 'CO', 'COOKIE',
  'DPI', 'DISCARDPATH', 'END', 'E', 'ENV', 'F', 'FORBIDDEN', 'G', 'GONE',
  'H', 'HANDLER', 'L', 'LAST', 'N', 'NEXT', 'NC', 'NOCASE', 'NE', 'NOESCAPE',
  'NS', 'NOSUBREQ', 'P', 'PROXY', 'PT', 'PASSTHROUGH', 'QSA', 'QSAPPEND',
  'QSD', 'QSDISCARD', 'QSL', 'QSLAST', 'R', 'REDIRECT', 'S', 'SKIP',
  'T', 'TYPE', 'MB', 'UNSAFE_PREFIX_STAT', 'UNSAFE_ALLOW3F'
]);

/**
 * `[R=...]` accepts any HTTP status code, not only the 3xx family: given a
 * code outside 300-399 mod_rewrite drops the substitution and ends the
 * request with that status. Content negotiation in this repository relies on
 * that -- `[R=406]` is used 278 times to reject an unsatisfiable Accept
 * header -- so only a value that is not an HTTP status at all is an error.
 */
const STATUS_WORD = new Set(['temp', 'permanent', 'seeother']);

function isHttpStatus(value) {
  if(STATUS_WORD.has(value.toLowerCase())) {
    return true;
  }
  return /^[1-5]\d\d$/.test(value);
}

export default {
  id: 'htaccess/valid-rewrite-flags',
  description: 'RewriteRule flags must be names mod_rewrite recognises',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    unknown:
      '"{{flag}}" is not a mod_rewrite flag. Apache fails to start, or ' +
      'rejects this file, when it cannot parse a flag list. Check the ' +
      'spelling against the RewriteRule flag documentation.',
    badStatus:
      '[R={{value}}] is not an HTTP status code. Use 301 for a permanent ' +
      'move, 302 for a temporary one, or 303 to send clients to a ' +
      'representation of the identifier.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const rule of parsed.rewriteRules()) {
      for(const [normalized, flag] of rule.flags) {
        if(!FLAGS.has(normalized)) {
          report({
            messageId: 'unknown', line: rule.line, data: {flag: flag.raw}
          });
          continue;
        }
        if((normalized === 'R' || normalized === 'REDIRECT') &&
          typeof flag.value === 'string' &&
          !isHttpStatus(flag.value)) {
          report({
            messageId: 'badStatus', line: rule.line, data: {value: flag.value}
          });
        }
      }
    }
  }
};
