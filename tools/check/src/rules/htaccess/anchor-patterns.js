/**
 * A required trailing-path group.
 *
 * `^vocab(/.*)$` matches `vocab/` and `vocab/thing`, but not `vocab` — the
 * group is required, so the bare identifier falls past the rule and 404s. That
 * bare form is usually the one people actually share. Making the group optional
 * with `?` fixes it without changing anything else.
 *
 * The other half of the documented rule — that patterns should be anchored with
 * `$` — is not checked. An unanchored prefix match is often exactly what the
 * author wanted, and a rule cannot tell the deliberate ones from the accidents.
 */
const REQUIRED_TRAILING_PATH = /\((\/\.[*+])\)\$$/;

export default {
  id: 'htaccess/anchor-patterns',
  description: 'A trailing-path group should be optional',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    requiredGroup:
      'In {{pattern}} the trailing group is required, so this rule matches ' +
      '"{{withSlash}}" but not the bare "{{bare}}" — which is usually the ' +
      'form people share. Make the group optional: {{suggestion}}'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const rule of parsed.rewriteRules()) {
      if(!REQUIRED_TRAILING_PATH.test(rule.pattern)) {
        continue;
      }
      // The literal text before the group, for a readable example.
      const prefix = rule.pattern
        .replace(/^\^/, '')
        .replace(REQUIRED_TRAILING_PATH, '')
        .replace(/[\\^$]/g, '') || 'the identifier';
      report({
        messageId: 'requiredGroup',
        line: rule.line,
        data: {
          pattern: rule.pattern,
          bare: prefix,
          withSlash: prefix + '/thing',
          suggestion: rule.pattern.replace(REQUIRED_TRAILING_PATH, '($1)?$')
        }
      });
    }
  }
};
