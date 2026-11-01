/**
 * An unescaped dot where a literal dot is meant.
 *
 * `^vocab.ttl$` matches `vocab.ttl`, but it also matches `vocabXttl` — `.` is
 * the "any character" wildcard. Usually harmless; occasionally it means a rule
 * fires for a request nobody intended.
 *
 * The detection has to be narrow, because a dot is *usually* a deliberate
 * wildcard in these files. Only a dot that is followed by something that looks
 * like a literal file extension is reported: not one followed by a quantifier
 * (`.*`, `.+`, `.?`, `.{2}`), not one inside a character class, and not one in
 * the substitution, where dots have no special meaning at all.
 */

// A dot, then two to six lowercase letters or digits, then the end of the
// pattern or a boundary. This is the extension shape and little else.
const LITERAL_DOT = /(?<!\\)\.(?=[a-z0-9]{2,6}(?:\$|\)|$))/i;

export default {
  id: 'htaccess/escape-literal-dots',
  description: 'Escape a dot that is meant literally',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    unescaped:
      'The dot in {{pattern}} is a wildcard, not a literal dot -- it matches ' +
      'any character, so this rule also fires for requests you did not mean ' +
      'it to. Escape it as \\. when you mean a full stop: {{suggestion}}'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const rule of parsed.rewriteRules()) {
      const suggestion = escapeLiteralDots(rule.pattern);
      // Deciding from the suggestion rather than from a separate test keeps
      // the two in step: a finding whose "fix" changes nothing would be
      // advice the reader cannot act on.
      if(suggestion === rule.pattern) {
        continue;
      }
      report({
        messageId: 'unescaped',
        line: rule.line,
        data: {pattern: rule.pattern, suggestion}
      });
    }
  }
};

function escapeLiteralDots(pattern) {
  // Rebuild rather than replace globally, so dots inside a class are left be.
  let out = '';
  let inClass = false;
  for(let i = 0; i < pattern.length; ++i) {
    const c = pattern[i];
    if(c === '\\') {
      out += c + (pattern[i + 1] ?? '');
      ++i;
      continue;
    }
    if(c === '[') {
      inClass = true;
    } else if(c === ']') {
      inClass = false;
    }
    if(c === '.' && !inClass &&
      LITERAL_DOT.test('.' + pattern.slice(i + 1))) {
      out += '\\.';
      continue;
    }
    out += c;
  }
  return out;
}
