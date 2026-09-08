/**
 * Permanent redirects.
 *
 * A 301 tells every cache along the way that the answer will never change, and
 * caches are entitled to honour that indefinitely. A mistake in a 301 cannot be
 * retracted: browsers that saw it keep following the old target long after the
 * rule is corrected, and there is nothing this service can do about it.
 *
 * 302 keeps the identifier correctable. 303 is the right answer for a
 * content-negotiated ontology IRI, where the redirect means "here is a
 * representation" rather than "this has moved".
 */
const PERMANENT_STATUS = new Set(['301', '308', 'permanent']);

export default {
  id: 'htaccess/avoid-permanent-redirect',
  description: 'Prefer a temporary redirect over a permanent one',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    permanent:
      'This is a permanent redirect ({{status}}). Caches may honour it for as ' +
      'long as they like, so if the target turns out to be wrong you cannot ' +
      'take it back -- clients that saw it keep going to the old place. Use ' +
      '302 for an ordinary redirect, or 303 when the identifier names a thing ' +
      'and the target is a representation of it.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }

    for(const rule of parsed.rewriteRules()) {
      const flag = rule.flags.get('R') ?? rule.flags.get('REDIRECT');
      if(flag === undefined || typeof flag.value !== 'string') {
        continue;
      }
      if(PERMANENT_STATUS.has(flag.value.toLowerCase())) {
        report({
          messageId: 'permanent',
          line: rule.line,
          data: {status: flag.value}
        });
      }
    }

    // Redirect and RedirectMatch carry the status as an argument instead, and
    // default to 302 when it is left out.
    for(const directive of parsed.directives) {
      const name = directive.name.toLowerCase();
      if(name === 'redirectpermanent') {
        report({
          messageId: 'permanent',
          line: directive.line,
          data: {status: 'RedirectPermanent'}
        });
        continue;
      }
      if(name !== 'redirect' && name !== 'redirectmatch') {
        continue;
      }
      const status = directive.args[0] ?? '';
      if(PERMANENT_STATUS.has(status.toLowerCase())) {
        report({
          messageId: 'permanent',
          line: directive.line,
          data: {status}
        });
      }
    }
  }
};
