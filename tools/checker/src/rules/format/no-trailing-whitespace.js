export default {
  id: 'format/no-trailing-whitespace',
  description: 'Lines must not end with spaces or tabs',
  tags: ['format', 'style'],
  severity: 'warning',
  fixable: true,
  scope: 'file',
  files: ['**/.htaccess', '**/*.md', '**/*.txt'],
  messages: {
    trailing:
      'Trailing whitespace. The repository\'s .editorconfig sets ' +
      'trim_trailing_whitespace = true; most editors will strip it for you.'
  },
  check(ctx, report) {
    const text = ctx.read(ctx.file);
    if(text === null) {
      return;
    }
    const lines = text.split('\n');
    for(let i = 0; i < lines.length; ++i) {
      // Strip a CR first so that a CRLF file is not reported here as well;
      // format/no-crlf owns that problem.
      const line = lines[i].replace(/\r$/, '');
      const stripped = line.replace(/[ \t]+$/, '');
      if(stripped !== line) {
        report({
          messageId: 'trailing',
          line: i + 1,
          column: stripped.length + 1,
          endLine: i + 1
        });
      }
    }
  }
};
