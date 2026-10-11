export default {
  id: 'htaccess/https-target',
  description: 'Redirect targets should use https',
  tags: ['htaccess', 'security'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    insecure:
      'This redirect sends visitors to {{target}} over plain http. w3id.org ' +
      'is served over https, so this downgrades the connection and browsers ' +
      'may warn or block it. Use https:// if the destination supports it.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const redirect of parsed.redirects()) {
      if(!/^http:\/\//i.test(redirect.target)) {
        continue;
      }
      report({
        messageId: 'insecure',
        line: redirect.line,
        data: {target: truncate(redirect.target)}
      });
    }
  }
};

function truncate(value, max = 80) {
  return value.length <= max ? value : value.slice(0, max - 1) + '…';
}
