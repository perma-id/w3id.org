/**
 * Patterns that can never match because they are not relative to the directory.
 *
 * In a per-directory `.htaccess`, Apache strips the directory prefix — and its
 * leading slash — before matching. So the path a rule sees for
 * `https://w3id.org/my-project/vocab` is `vocab`: not `/vocab`, and not
 * `my-project/vocab`. Both of those forms look right and never match, so the
 * request falls past every rule in the file and 404s.
 *
 * These are two spellings of one mistake, which is why they are one rule.
 */
export default {
  id: 'htaccess/pattern-relative-to-dir',
  description:
    'A per-directory pattern must not start with a slash or repeat its ' +
    'directory name',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  // The rule is dead: requests fall through it and the identifier 404s.
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    leadingSlash:
      'The pattern {{pattern}} can never match. In an .htaccess file Apache ' +
      'strips the directory prefix and its leading slash before matching, so ' +
      'the path this rule sees never starts with "/". Remove the leading ' +
      'slash, or write "^/?" if you meant it to be optional.',
    directoryPrefix:
      'The pattern {{pattern}} repeats this directory\'s own name. Apache has ' +
      'already stripped "{{directory}}/" by the time the rule is matched, so ' +
      'the path it sees is "{{seen}}" and this never matches. Drop the ' +
      'prefix: {{suggestion}}'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    // The directory this file governs, e.g. `my-project` for
    // ids/my-project/.htaccess.
    const directory = ctx.file.split('/').at(-2) ?? '';

    for(const rule of parsed.rewriteRules()) {
      // A negated pattern matches when the path does *not* match, so a
      // leading slash there is deliberate and harmless.
      if(rule.pattern.startsWith('!')) {
        continue;
      }
      const body = rule.pattern.replace(/^\^/, '');

      // `/?` and `/*` make the slash optional, which is the correct idiom;
      // only a mandatory slash is a bug.
      if(/^\\?\/(?![?*])/.test(body)) {
        report({
          messageId: 'leadingSlash',
          line: rule.line,
          data: {pattern: rule.pattern}
        });
        continue;
      }

      if(directory === '' || !startsWithDirectory(body, directory)) {
        continue;
      }
      const withoutPrefix = '^' + body.slice(directory.length + 1);
      report({
        messageId: 'directoryPrefix',
        line: rule.line,
        data: {
          pattern: rule.pattern,
          directory,
          seen: body.slice(directory.length + 1).replace(/[\\$]/g, '') ||
            'the empty string',
          suggestion: withoutPrefix
        }
      });
    }
  }
};

/**
 * Whether a pattern body opens with this directory's literal name followed by
 * a slash.
 *
 * Only a literal match counts. A pattern that merely begins with the same
 * letters -- `^my-project\.owl$` in `ids/my-project/` -- is a filename, not a
 * repeated directory prefix, and reporting it would be wrong.
 */
function startsWithDirectory(body, directory) {
  if(!body.startsWith(directory)) {
    return false;
  }
  const next = body.slice(directory.length);
  return next.startsWith('/') || next.startsWith('\\/');
}
