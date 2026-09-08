export default {
  id: 'format/final-newline',
  description: 'Files must end with a newline',
  tags: ['format', 'style'],
  severity: 'warning',
  fixable: true,
  scope: 'file',
  files: ['**/.htaccess', '**/*.md', '**/*.txt'],
  messages: {
    missing:
      'No newline at the end of this file. Git marks it "\\ No newline at ' +
      'end of file", and the next change that appends a line will show your ' +
      'last line as modified too, because the newline has to be added to ' +
      'it first. Add one now.'
  },
  check(ctx, report) {
    const text = ctx.read(ctx.file);
    // An empty file has no last line to terminate; files/no-empty-htaccess
    // is the rule that cares about emptiness.
    if(text === null || text === '') {
      return;
    }
    if(text.endsWith('\n')) {
      return;
    }
    report({messageId: 'missing', line: text.split('\n').length});
  }
};
