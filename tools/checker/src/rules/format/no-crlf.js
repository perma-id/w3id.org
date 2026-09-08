export default {
  id: 'format/no-crlf',
  description: 'Files must use Unix (LF) line endings',
  tags: ['format', 'style'],
  severity: 'warning',
  fixable: true,
  scope: 'file',
  files: ['**/.htaccess', '**/*.md', '**/*.txt'],
  messages: {
    crlf:
      'This file uses Windows (CRLF) line endings on {{count}} of {{total}} ' +
      'lines. Mixed with the Unix (LF) endings used elsewhere, that makes ' +
      'every line of the file show as changed in a diff -- including the ' +
      'ones you did not touch. Convert it to LF endings, or run: ' +
      'git config core.autocrlf input'
  },
  check(ctx, report) {
    const text = ctx.read(ctx.file);
    if(text === null) {
      return;
    }
    const lines = text.split('\n');
    const crlf = [];
    for(let i = 0; i < lines.length; ++i) {
      if(lines[i].endsWith('\r')) {
        crlf.push(i + 1);
      }
    }
    if(crlf.length === 0) {
      return;
    }
    // One finding per file rather than per line: a CRLF file is CRLF
    // throughout, and hundreds of identical annotations help nobody.
    report({
      messageId: 'crlf',
      line: crlf[0],
      data: {count: crlf.length, total: lines.length}
    });
  }
};
