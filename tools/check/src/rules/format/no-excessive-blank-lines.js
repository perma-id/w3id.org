import {TEXT_FILE_PATTERNS} from '../../paths.js';

/**
 * Blank lines beyond what any of them could be doing.
 *
 * A blank line or two between groups of directives helps; a screen of them
 * does not, and the file is then longer than the window it is read in. Three
 * is the allowance -- enough to separate groups emphatically -- and past that
 * the only effect is scrolling.
 *
 * The two edges are different from the middle, because there is nothing on the
 * far side of them to separate. A leading blank line is a whole line of
 * nothing before the file has begun, so one is already too many. At the end,
 * the file is *supposed* to finish with a newline, so `\n\n` is a single
 * character of overshoot and not worth a word; two blank lines is somebody
 * having left a gap.
 *
 * Deliberately not a ratio test. Sorting the tree by proportion of blank
 * lines puts correct short READMEs at the top -- Markdown requires a blank
 * line between blocks, so a seven-line README can be half blank and have
 * nothing wrong with it.
 */

// Up to three blank lines can group related directives; past that they are
// only making the file longer.
const MAX_RUN = 3;

// A fenced code block is quoted content, not this file's own layout: a README
// showing an example `.htaccess`, or this rule's own documentation page
// showing what it reports, contains whatever it is quoting. Checked in every
// file rather than only in Markdown -- an `.htaccess` will not contain a fence
// marker, and an extension list is one more thing to go stale.
const FENCE = /^\s*(?:```|~~~)/;

export default {
  id: 'format/no-excessive-blank-lines',
  description: 'Files must not contain long runs of blank lines',
  tags: ['format', 'style'],
  severity: 'warning',
  fixable: true,
  scope: 'file',
  files: TEXT_FILE_PATTERNS,
  messages: {
    run:
      '{{count}} blank lines in a row. Up to three can separate groups of ' +
      'directives, which is worth having; past that they only make the file ' +
      'longer to read and scroll through. Delete the extra ones.',
    leading:
      'This file starts with {{count}} blank {{lines}}. There is nothing ' +
      'above the first line to be separated from, so the space is not doing ' +
      'anything -- it only pushes the first real line out of view. Delete it.',
    trailing:
      'This file ends with {{count}} blank lines. The file should finish ' +
      'with a single newline after its last line and nothing else; anything ' +
      'further down separates nothing. Delete them.'
  },
  check(ctx, report) {
    const text = ctx.read(ctx.file);
    if(text === null || text === '') {
      return;
    }

    const lines = text.split('\n');
    // A file that ends in a newline -- as it should, see format/final-newline
    // -- splits with a trailing empty element that is not a line of the file.
    if(lines[lines.length - 1] === '') {
      lines.pop();
    }

    // Whitespace-only counts as blank, so a run of "   " lines is one run
    // rather than invisible. format/no-trailing-whitespace separately reports
    // the whitespace itself, which is a different complaint about the same
    // lines rather than the same complaint twice.
    const isBlank = line => line.trim() === '';

    let leading = 0;
    while(leading < lines.length && isBlank(lines[leading])) {
      ++leading;
    }
    // A wholly blank file is one finding, not three overlapping ones: there is
    // no interior and no end to speak of once the start has eaten everything.
    if(leading === lines.length) {
      report({
        messageId: 'leading',
        line: 1,
        data: {count: leading, lines: leading === 1 ? 'line' : 'lines'}
      });
      return;
    }

    let trailing = 0;
    while(isBlank(lines[lines.length - 1 - trailing])) {
      ++trailing;
    }

    if(leading > 0) {
      report({
        messageId: 'leading',
        line: 1,
        data: {count: leading, lines: leading === 1 ? 'line' : 'lines'}
      });
    }

    // One finding per run, at its first line, so that a run of eight does not
    // become eight annotations saying the same thing. A fence line ends a run
    // the same way a line of content does, so no run starts inside a quoted
    // block or spans one.
    let start = -1;
    let quoted = false;
    for(let i = leading; i < lines.length - trailing; ++i) {
      if(FENCE.test(lines[i])) {
        quoted = !quoted;
      } else if(!quoted && isBlank(lines[i])) {
        if(start === -1) {
          start = i;
        }
        continue;
      }
      reportRun(start, i);
      start = -1;
    }
    reportRun(start, lines.length - trailing);

    if(trailing > 1) {
      report({
        messageId: 'trailing',
        line: lines.length - trailing + 1,
        data: {count: trailing}
      });
    }

    function reportRun(from, until) {
      if(from === -1 || until - from <= MAX_RUN) {
        return;
      }
      report({
        messageId: 'run',
        line: from + 1,
        endLine: until,
        data: {count: until - from}
      });
    }
  }
};
