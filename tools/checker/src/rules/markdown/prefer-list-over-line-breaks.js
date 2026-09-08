/**
 * Blocks of manually broken lines that would read better as a list.
 *
 * Maintainer and contact blocks are overwhelmingly written as a stack of lines
 * held apart by a hard line break -- two trailing spaces, a trailing
 * backslash, or a trailing `<br>`:
 *
 *     Some Person<br>
 *     Email: someone@example.com<br>
 *     GitHub: https://github.com/someone<br>
 *
 * That renders correctly, so this is a suggestion rather than a fault. It is
 * worth making because the markup is invisible: the next person to edit the
 * block cannot see what is holding it together, and losing a marker silently
 * reflows the stack into one paragraph. A list survives editing.
 *
 * Judged per block rather than per line, because whether a list is the better
 * shape is a property of the whole block. A block that is already a list is
 * left alone even when its items end in break markers -- the author has
 * already made the choice this rule would ask for.
 */

// Ordered: a line ending in `<br>` usually carries no trailing spaces, and a
// backslash cannot be confused with either of the others.
const MARKERS = [
  {pattern: /<br\s*\/?>[ \t]*$/i, name: 'a trailing <br>'},
  {pattern: /\\$/, name: 'a trailing backslash'},
  {pattern: / {2,}$/, name: 'two or more trailing spaces'}
];

const FENCE = /^\s{0,3}(```|~~~)/;
const HEADING = /^\s{0,3}#{1,6}\s/;
// Includes the bullet characters people reach for when they do not know the
// Markdown syntax: a block using those is already a list.
const LIST_ITEM = /^\s*([-*+•◦‣▪·]|\d+[.)])\s/;
const TABLE_ROW = /^\s*\|/;
const INDENTED_CODE = /^(?: {4,}|\t)/;

export default {
  id: 'markdown/prefer-list-over-line-breaks',
  description:
    'A block of manual line breaks usually wants to be a bulleted list',
  tags: ['markdown', 'style'],
  severity: 'notice',
  scope: 'file',
  files: ['**/*.md'],
  messages: {
    preferList:
      'These {{count}} lines are held apart by {{marker}} to force line ' +
      'breaks. That works, but the markup is invisible in an editor, so the ' +
      'next person to touch this block cannot see what is holding it ' +
      'together. A bulleted list is easier to read and to maintain: put ' +
      '"- " in front of each line and drop {{marker}}.'
  },
  check(ctx, report) {
    const text = ctx.read(ctx.file);
    if(text === null) {
      return;
    }
    const {minBreaks = 2} = ctx.options;
    const lines = text.split('\n').map(l => l.replace(/\r$/, ''));

    for(const block of blocksOf(lines)) {
      const finding = suggestion(block, minBreaks);
      if(finding !== null) {
        report({messageId: 'preferList', line: finding.line, data: finding.data});
      }
    }
  }
};

/**
 * Split into blocks of consecutive lines that could form one list.
 *
 * Blank lines and headings separate blocks; fenced code is skipped outright so
 * that a trailing backslash in a shell example is not read as markup.
 */
function blocksOf(lines) {
  const blocks = [];
  let current = [];
  let inFence = false;

  const end = () => {
    if(current.length > 0) {
      blocks.push(current);
      current = [];
    }
  };

  for(let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if(FENCE.test(line)) {
      end();
      inFence = !inFence;
      continue;
    }
    if(inFence) {
      continue;
    }
    if(line.trim() === '' || HEADING.test(line)) {
      end();
      continue;
    }
    current.push({line: i + 1, text: line});
  }
  end();
  return blocks;
}

function suggestion(block, minBreaks) {
  // A block that is already a list, a table, or indented code is not one to
  // rewrite as a list.
  if(block.some(({text}) => LIST_ITEM.test(text) || TABLE_ROW.test(text) ||
    INDENTED_CODE.test(text))) {
    return null;
  }

  // A break whose next line carries on in lower case is a wrapped sentence,
  // not the end of an item -- "This runs on  / and on and on". Items in these
  // stacks start with a capital, a link, a tag or a label.
  const broken = block
    .map((entry, i) => ({
      ...entry,
      marker: markerOf(entry.text),
      wrapsSentence: continuesSentence(block[i + 1])
    }))
    .filter(entry => entry.marker !== null && !entry.wrapsSentence);
  if(broken.length === 0) {
    return null;
  }

  // Either several broken lines, or a complete stack: every line but the last
  // is broken, which is what a two-item stack looks like since the final item
  // needs no trailing break.
  const isStack = block.length > 1 && broken.length === block.length - 1;
  if(broken.length < minBreaks && !isStack) {
    return null;
  }

  return {
    line: broken[0].line,
    data: {
      // The line count is what the reader sees, not the marker count.
      count: block.length,
      marker: mostCommon(broken.map(entry => entry.marker))
    }
  };
}

// The final line of a block has nothing after it, so a marker there is a
// trailing one rather than a wrap.
function continuesSentence(next) {
  return next !== undefined && /^[a-z]/.test(next.text.trim());
}

function markerOf(line) {
  for(const {pattern, name} of MARKERS) {
    if(pattern.test(line)) {
      return name;
    }
  }
  return null;
}

function mostCommon(values) {
  const counts = new Map();
  for(const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}
