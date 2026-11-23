export default {
  id: 'htaccess/uppercase-rewrite-flags',
  description: 'Rewrite flags should be written in upper case',
  tags: ['htaccess', 'style'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    casing:
      'Write rewrite flags in upper case: [{{expected}}] rather than ' +
      '[{{actual}}]. Apache accepts either spelling; upper case is what the ' +
      'mod_rewrite documentation uses, so it is what a reviewer reading this ' +
      'file will expect.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const rule of parsed.rewriteRules()) {
      const lowered = [...rule.flags.values()]
        .filter(flag => flag.name !== flag.name.toUpperCase());
      if(lowered.length === 0) {
        continue;
      }
      // One finding per rule: a rule written in lower case is usually written
      // that way throughout.
      const actual = [...rule.flags.values()].map(f => f.raw).join(',');
      report({
        messageId: 'casing',
        line: rule.line,
        data: {
          actual,
          expected: [...rule.flags.values()]
            .map(f => f.raw.replace(f.name, f.name.toUpperCase()))
            .join(',')
        }
      });
    }
  }
};
