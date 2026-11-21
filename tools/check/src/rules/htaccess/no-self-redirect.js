export default {
  id: 'htaccess/no-self-redirect',
  description: 'Redirect targets should not point back at w3id.org',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    selfTarget:
      'This redirect sends visitors back to {{target}}, so the request ' +
      'makes a second trip through w3id.org. Point at the final destination ' +
      'instead; if the identifier has genuinely moved within w3id.org, a ' +
      'relative target such as "/{{suggestion}}" avoids the extra round trip.',
    selfLoop:
      'This redirect targets {{target}}, the identifier it is defined in, ' +
      'so a request for it redirects to itself and loops until the browser ' +
      'gives up.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    const own = ctx.file.slice(ctx.idsDir.length + 1)
      .replace(/\/?\.htaccess$/, '');

    for(const redirect of parsed.redirects()) {
      const m = /^https?:\/\/(?:www\.)?w3id\.org\/(.*)$/i.exec(redirect.target);
      if(m === null) {
        continue;
      }
      const targetId = m[1].replace(/[?#].*$/, '').replace(/\/$/, '');
      // A target with no backreferences that names this very identifier is an
      // unconditional loop, which is worse than a mere double hop.
      if(targetId === own && !/\$\d/.test(redirect.target)) {
        report({
          messageId: 'selfLoop',
          line: redirect.line,
          data: {target: redirect.target}
        });
        continue;
      }
      report({
        messageId: 'selfTarget',
        line: redirect.line,
        data: {target: redirect.target, suggestion: targetId}
      });
    }
  }
};
