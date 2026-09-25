/**
 * `^(.+)/?$` and its relatives.
 *
 * The capture is greedy, so it takes as much as it can before the optional
 * `/?` gets a chance at anything. A request for `vocab/` puts `vocab/` in `$1`,
 * not `vocab` -- and substituting that into a URL that supplies its own
 * separator produces a doubled slash and a path that does not resolve.
 *
 * Only this exact shape is reported. `(.*)` passing a whole path straight
 * through is correct and common, and deciding that some other `(.+)` "should
 * have been" `([^/]+)` needs to know what the author meant.
 */

// ^(.+)/?$ or ^(.*)/?$, with or without the surrounding quotes Apache allows.
const GREEDY_OPTIONAL_SLASH = /^\^\((\.[+*])\)\/\?\$$/;

export default {
  id: 'htaccess/no-greedy-capture',
  description:
    'A greedy capture followed by an optional slash swallows the slash',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    greedy:
      'In {{pattern}} the capture is greedy, so it takes the trailing slash ' +
      'too: a request for "vocab/" puts "vocab/" in $1, not "vocab". If the ' +
      'substitution then adds its own slash you get a doubled separator and a ' +
      'path that does not resolve. Write ^([^/]+)/?$ to capture one segment, ' +
      'or ^(.*)$ if you meant to pass the whole path through unchanged.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const rule of parsed.rewriteRules()) {
      if(!GREEDY_OPTIONAL_SLASH.test(rule.pattern)) {
        continue;
      }
      report({
        messageId: 'greedy',
        line: rule.line,
        data: {pattern: rule.pattern}
      });
    }
  }
};
