/**
 * A widely copied template carries a truncated header value:
 *
 *   Header set Access-Control-Allow-Headers DNT,...,If-Modified$
 *
 * The name was cut off mid-word -- it should be `If-Modified-Since` -- and the
 * stray `$` has been pasted into hundreds of files since. Apache sends the
 * broken value verbatim, so browsers reject preflight requests that ask for
 * `If-Modified-Since`.
 *
 * Note that `$` is a legal character in an HTTP field name, so a syntax check
 * alone does not catch this; the trailing `$` is recognised specifically.
 */

// Field-name syntax per RFC 9110 (tchar).
const TOKEN = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;

export default {
  id: 'htaccess/valid-cors-header',
  description: 'CORS header values must list well-formed header names',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    truncated:
      'The Access-Control-Allow-Headers value lists "{{name}}", a header ' +
      'name cut off mid-word by a stray "$"; it should read ' +
      '"If-Modified-Since". Browsers will reject preflight requests that ask ' +
      'for that header. This has been copied from file to file for years, so ' +
      'finding it here does not mean it is correct.',
    malformed:
      '"{{name}}" is not a valid HTTP header name, so this ' +
      'Access-Control-Allow-Headers value will not do what it looks like.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const directive of parsed.find('Header')) {
      // Header [always] <action> <header-name> <value>
      const nameIndex = directive.args.findIndex(
        a => a.toLowerCase() === 'access-control-allow-headers');
      if(nameIndex === -1) {
        continue;
      }
      const value = directive.args[nameIndex + 1];
      if(value === undefined) {
        continue;
      }
      for(const raw of value.split(',')) {
        const name = raw.trim();
        if(name === '') {
          continue;
        }
        // A trailing `$` is never intentional in a header name; it is the
        // signature of the truncated template.
        if(name.endsWith('$')) {
          report({messageId: 'truncated', line: directive.line, data: {name}});
          continue;
        }
        if(!TOKEN.test(name)) {
          report({messageId: 'malformed', line: directive.line, data: {name}});
        }
      }
    }
  }
};
