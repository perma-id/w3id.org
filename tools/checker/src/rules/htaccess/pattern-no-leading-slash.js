export default {
  id: 'htaccess/pattern-no-leading-slash',
  description:
    'A per-directory RewriteRule pattern must not require a leading slash',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  // In a per-directory context Apache strips the directory prefix, including
  // the leading slash, before matching. A pattern that requires one can never
  // match, so the rule is dead.
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    leadingSlash:
      'The pattern {{pattern}} can never match. In an .htaccess file Apache ' +
      'strips the directory prefix and its leading slash before matching, so ' +
      'the path this rule sees never starts with "/". Remove the leading ' +
      'slash, or write "^/?" if you meant it to be optional.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const rule of parsed.rewriteRules()) {
      // A negated pattern matches when the path does *not* match, so a
      // leading slash there is deliberate and harmless.
      if(rule.pattern.startsWith('!')) {
        continue;
      }
      const body = rule.pattern.replace(/^\^/, '');
      // `/?` and `/*` make the slash optional, which is the common and
      // correct idiom; only a mandatory slash is a bug.
      if(!/^\\?\/(?![?*])/.test(body)) {
        continue;
      }
      report({
        messageId: 'leadingSlash',
        line: rule.line,
        data: {pattern: rule.pattern}
      });
    }
  }
};
