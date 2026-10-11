import {FLAGS, isHttpStatus} from '../../rewrite-flags.js';

/**
 * Only a name that is not a flag at all is an error; non-canonical casing is
 * a readability problem, reported separately by
 * `htaccess/uppercase-rewrite-flags`.
 *
 * The flag vocabulary itself lives in `src/rewrite-flags.js`, because more
 * than one rule needs it.
 */

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
