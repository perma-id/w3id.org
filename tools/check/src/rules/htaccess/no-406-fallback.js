import {parseFlags} from '../../htaccess.js';

/**
 * A 406 at the end of a content-negotiation chain.
 *
 * Answering "Not Acceptable" is a defensible choice — the identifier genuinely
 * cannot serve what was asked for — and some authors mean it. So this is a
 * question rather than a fault, and never an error.
 *
 * One shape is worse than the rest, and it is the one that gets copied:
 *
 *     RewriteCond %{HTTP_ACCEPT} .+
 *     RewriteRule ^$ - [R=406,L]
 *
 * `.+` matches any non-empty `Accept` header, and every client sends one. So
 * that rule fires for essentially every request reaching it — including
 * browsers whose header did not quite match the `text/html` condition above,
 * and anything sending a wildcard media range. It looks fine while you test
 * the formats you thought of, and returns 406 to everyone else.
 */

// Conditions that any real client satisfies, so a 406 behind one is universal.
const CATCH_ALL = /^\^?\.[+*]\$?$/;

export default {
  id: 'htaccess/no-406-fallback',
  description: 'A content-negotiation chain should not end in 406',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    catchAll:
      'This returns 406 Not Acceptable behind a condition that matches any ' +
      'Accept header at all — and every client sends one. So it fires for ' +
      'essentially every request that reaches it, including browsers whose ' +
      'header did not quite match a condition above, and anything sending ' +
      '"*/*". Replace it with an unconditional last rule pointing at your ' +
      'documentation: a reader who asked for a format you do not publish then ' +
      'learns what you do publish.',
    fallback:
      'This rule answers with 406 Not Acceptable. Anything whose Accept ' +
      'header did not match a condition above gets an error and nothing ' +
      'else. If that is deliberate, keep it; more often a last unconditional ' +
      'redirect to the human-readable documentation is a better answer, and ' +
      'it costs nothing when negotiation did work.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    const directives = parsed.directives;

    for(let i = 0; i < directives.length; ++i) {
      const directive = directives[i];
      if(directive.name.toLowerCase() !== 'rewriterule') {
        continue;
      }
      const flags = parseFlags(directive.args.at(-1));
      const status = flags.get('R') ?? flags.get('REDIRECT');
      if(status === undefined || status.value !== '406') {
        continue;
      }
      report({
        messageId: precededByCatchAll(directives, i) ? 'catchAll' : 'fallback',
        line: directive.line
      });
    }
  }
};

/**
 * Whether any of the conditions attached to this rule matches every request.
 *
 * Conditions apply to the rule that follows them, so this walks back over the
 * unbroken run of `RewriteCond` directives immediately above.
 */
function precededByCatchAll(directives, index) {
  for(let i = index - 1; i >= 0; --i) {
    const directive = directives[i];
    if(directive.name.toLowerCase() !== 'rewritecond') {
      return false;
    }
    const [test, pattern] = directive.args;
    if(/^%\{HTTP:?_?ACCEPT\}$/i.test(test ?? '') &&
      CATCH_ALL.test(pattern ?? '')) {
      return true;
    }
  }
  return false;
}
