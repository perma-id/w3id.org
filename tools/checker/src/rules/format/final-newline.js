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
      'No newline at end of file. The repository\'s .editorconfig sets ' +
      'insert_final_newline = true. Without it, git shows a "\\ No newline ' +
      'at end of file" marker and the last line collides with whatever a ' +
      'later change appends.'
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
