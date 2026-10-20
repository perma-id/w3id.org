export default {
  id: 'htaccess/rewrite-engine-required',
  description: 'RewriteRule has no effect without RewriteEngine on',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  // Without this directive Apache ignores every rewrite rule in the file. The
  // identifier looks configured but returns 404 to everyone who uses it.
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    missing:
      'This file has {{count}} RewriteRule directive(s) but no ' +
      '"RewriteEngine on", so Apache ignores all of them and ' +
      'https://w3id.org/{{id}} returns 404. Add "RewriteEngine on" before ' +
      'the first rule.',
    switchedOff:
      '"RewriteEngine off" disables the {{count}} RewriteRule directive(s) ' +
      'in this file, so https://w3id.org/{{id}} returns 404. Change it to ' +
      '"RewriteEngine on".'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    const rules = parsed.rewriteRules();
    if(rules.length === 0) {
      return;
    }
    if(parsed.rewriteEnabled()) {
      return;
    }
    const id = ctx.file.slice(ctx.idsDir.length + 1)
      .replace(/\/?\.htaccess$/, '');
    const present = parsed.find('RewriteEngine');
    report({
      messageId: present.length > 0 ? 'switchedOff' : 'missing',
      // Point at the RewriteEngine line when there is one, so the fix is
      // visible; otherwise at the first rule that will not run.
      line: present.length > 0 ? present.at(-1).line : rules[0].line,
      data: {count: rules.length, id}
    });
  }
};
