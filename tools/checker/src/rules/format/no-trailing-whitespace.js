/**
 * Trailing whitespace that cannot be doing anything.
 *
 * In Markdown, two or more trailing spaces is the hard-line-break idiom, so
 * that case is deliberately *not* reported here -- it works, and whether it
 * would read better as a list is `markdown/prefer-list-over-line-breaks`'
 * question. Everything else is dead weight: a single space is too few to
 * break a line, a tab never breaks one, and nothing on a blank line can.
 *
 * Outside Markdown there is no line-break idiom at all -- Apache has none and
 * neither does plain text -- so every trailing space and tab is reported.
 */
const MARKDOWN = /\.md$/i;

export default {
  id: 'format/no-trailing-whitespace',
  description: 'Lines must not end in whitespace that does nothing',
  tags: ['format', 'style'],
  severity: 'warning',
  fixable: true,
  scope: 'file',
  files: ['**/.htaccess', '**/*.md', '**/*.txt'],
  messages: {
    trailing:
      'Trailing whitespace at the end of this line. Nothing reads it, it is ' +
      'invisible in most editors, and it shows up as a change in every later ' +
      'diff. Delete it.',
    singleSpace:
      'A single trailing space at the end of this line. A line break in ' +
      'Markdown needs two or more spaces, so one on its own does nothing at ' +
      'all. Delete it.',
    tab:
      'This line ends in a tab. A tab never produces a line break in ' +
      'Markdown, so it has no effect. Delete it.',
    blankLine:
      'Whitespace on an otherwise-empty line. There is nothing here for it ' +
      'to break or space out. Delete it.'
  },
  check(ctx, report) {
    const text = ctx.read(ctx.file);
    if(text === null) {
      return;
    }
    const markdown = MARKDOWN.test(ctx.file);
    const lines = text.split('\n');

    for(let i = 0; i < lines.length; ++i) {
      // Strip a CR first so a CRLF file is not reported here as well;
      // format/no-crlf owns that problem.
      const line = lines[i].replace(/\r$/, '');
      const found = /[ \t]+$/.exec(line);
      if(found === null) {
        continue;
      }
      const messageId = markdown ?
        markdownMessage(line, found[0]) : 'trailing';
      // A working Markdown line break; not this rule's business.
      if(messageId === null) {
        continue;
      }
      report({
        messageId,
        line: i + 1,
        column: line.length - found[0].length + 1,
        endLine: i + 1
      });
    }
  }
};

function markdownMessage(line, whitespace) {
  if(line.trim() === '') {
    return 'blankLine';
  }
  if(whitespace.includes('\t')) {
    return 'tab';
  }
  return whitespace.length === 1 ? 'singleSpace' : null;
}
