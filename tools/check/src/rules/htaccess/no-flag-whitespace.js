/**
 * Whitespace inside a rewrite flag list.
 *
 * `[R=302, L]` is not a flag list with a space in it -- Apache cannot parse the
 * directive at all, and an unparseable `.htaccess` returns 500 for every URL
 * under the directory. The identifier is completely dead while the file looks
 * almost right.
 *
 * Detected through the tokenizer rather than by scanning the line, because a
 * line-level search for whitespace between brackets matches prose in comments
 * (`[+ on]`, `[- off]`, a bracketed author name) and character classes in
 * patterns (`[^\ ]`). Once tokenized, the signature is exact: the space split
 * the flag list into two arguments, so the one that opens with `[` never
 * closes.
 */
const FLAGGED_DIRECTIVES = new Set(['rewriterule', 'rewritecond']);

// RewriteRule pattern substitution [flags]; RewriteCond test condition [flags].
// In both, a flag list can only appear from the third argument onward.
const FIRST_FLAG_INDEX = 2;

export default {
  id: 'htaccess/no-flag-whitespace',
  description: 'A rewrite flag list must not contain whitespace',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  // Apache refuses to parse the file, so every URL under the directory
  // returns 500 -- not just the rule that is wrong.
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    whitespace:
      'There is a space inside the flag list on this {{directive}}. Apache ' +
      'cannot parse a flag list containing whitespace, and one unparseable ' +
      'directive makes the whole file unparseable -- every URL under this ' +
      'identifier then returns 500, not just this rule. Close the list up: ' +
      'write {{expected}}.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const directive of parsed.directives) {
      if(!FLAGGED_DIRECTIVES.has(directive.name.toLowerCase())) {
        continue;
      }
      const opensAt = directive.args.findIndex(
        (arg, i) => i >= FIRST_FLAG_INDEX && arg.startsWith('['));
      if(opensAt === -1) {
        continue;
      }
      const rest = directive.args.slice(opensAt);
      // A well-formed list is one argument that both opens and closes.
      if(rest.length === 1 && rest[0].endsWith(']')) {
        continue;
      }
      // Anything else means the space broke it apart. Ignore a list that was
      // never closed at all -- that is a different mistake, and Apache reports
      // it differently.
      if(!rest.at(-1).endsWith(']')) {
        continue;
      }
      report({
        messageId: 'whitespace',
        line: directive.line,
        data: {
          directive: directive.name,
          expected: rest.join('').replace(/\s+/g, '')
        }
      });
    }
  }
};
