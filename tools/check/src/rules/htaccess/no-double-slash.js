/**
 * A doubled slash in the redirect target.
 *
 * Usually the result of a substitution that supplies a separator the captured
 * value already carries. `https://example.org/data//vocab.ttl` is a different
 * path from `.../data/vocab.ttl` as far as many servers are concerned, and it
 * is a different IRI as far as every RDF tool is concerned.
 */
export default {
  id: 'htaccess/no-double-slash',
  description: 'Redirect targets must not contain a doubled slash',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    doubled:
      'The target {{target}} contains a doubled slash. That is a different ' +
      'path from the single-slash form, and a different IRI to anything ' +
      'consuming it. Usually one of the two slashes comes from the captured ' +
      'value and the other from the text around it -- remove whichever is ' +
      'redundant.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const redirect of parsed.redirects()) {
      // Drop the scheme's own `//` before looking, and stop at a query or
      // fragment where a doubled slash may be deliberate.
      const withoutScheme = redirect.target.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '');
      const path = withoutScheme.split(/[?#]/)[0];
      if(!path.includes('//')) {
        continue;
      }
      report({
        messageId: 'doubled',
        line: redirect.line,
        data: {target: truncate(redirect.target)}
      });
    }
  }
};

function truncate(value, max = 70) {
  return value.length <= max ? value : value.slice(0, max - 1) + '…';
}
