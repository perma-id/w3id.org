export default {
  id: 'htaccess/no-inline-comment',
  description: 'Apache has no inline comment syntax',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    inline:
      'Apache has no inline comments: everything after "{{text}}" on this ' +
      'line is passed to {{directive}} as extra arguments, not ignored. ' +
      'Move the comment to its own line beginning with "#".'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const directive of parsed.directives) {
      if(directive.inlineComment === null) {
        continue;
      }
      report({
        messageId: 'inline',
        line: directive.line,
        data: {
          directive: directive.name,
          text: truncate(directive.inlineComment.text)
        }
      });
    }
  }
};

function truncate(value, max = 40) {
  return value.length <= max ? value : value.slice(0, max - 1) + '…';
}
