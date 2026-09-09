import {CANONICAL_README, isReadme, readmeFormat} from '../../paths.js';

/**
 * GitHub renders a README under a long list of names and markup formats, so a
 * differently named one is not broken and the rule must not pretend otherwise.
 * What it asks for is the convention: this repository keeps its identifier
 * documentation as Markdown in a file called `README.md`.
 *
 * How far that is from where a file already stands varies, and the rule says
 * which:
 *
 * - another Markdown spelling is a rename;
 * - another markup format is a conversion, because the syntax differs;
 * - a plain-text README is a conversion too, unless it is Markdown already and
 *   only the name is keeping GitHub from rendering it.
 */

// A file is treated as Markdown only if its first non-blank line is an ATX
// heading. Deliberately narrow: acting on a false positive means telling
// somebody to convert a file that needs nothing of the sort.
const MARKDOWN_HEADING = /^#{1,6}\s+\S/;

export default {
  id: 'files/prefer-readme-md',
  description: 'READMEs should be Markdown named README.md',
  tags: ['files', 'style'],
  severity: 'warning',
  scope: 'file',
  // A coarse filter so the engine only visits candidates; `isReadme` below is
  // the precise test.
  files: ['**/[Rr][Ee][Aa][Dd][Mm][Ee]*'],
  messages: {
    rename:
      'Rename {{name}} to README.md. GitHub renders the other spellings just ' +
      'the same, so nothing is broken -- README.md is the convention here.',
    convertMarkup:
      '{{name}} is {{format}}. GitHub renders it, so nothing is broken, but ' +
      'the convention here is Markdown in a file named README.md. That is ' +
      'more than a rename: the syntax differs, so headings, links and ' +
      'emphasis all have to be rewritten.',
    convertPlainText:
      'GitHub shows {{name}} verbatim, as plain text. The convention here is ' +
      'Markdown in a file named README.md, which means converting the ' +
      'content -- headings, links and emphasis -- and not only renaming the ' +
      'file.',
    renameMarkdown:
      '{{name}} is written as Markdown -- it opens with a "#" heading -- but ' +
      'its name does not end in .md, so GitHub shows it verbatim and those ' +
      'headings and links appear as literal punctuation. Rename it to ' +
      'README.md.'
  },
  check(ctx, report) {
    if(!ctx.file.startsWith(ctx.idsDir + '/')) {
      return;
    }
    const name = ctx.file.split('/').pop();
    if(name === CANONICAL_README || !isReadme(ctx.file)) {
      return;
    }

    const {kind, format} = readmeFormat(name);
    let messageId;
    if(kind === 'markdown') {
      // Any Markdown extension renders as Markdown whatever the casing, so
      // the only thing left to say is which spelling is the agreed one.
      messageId = 'rename';
    } else if(kind === 'markup') {
      messageId = 'convertMarkup';
    } else {
      messageId = looksLikeMarkdown(ctx.read(ctx.file)) ?
        'renameMarkdown' : 'convertPlainText';
    }
    report({messageId, line: 1, data: {name, format}});
  }
};

function looksLikeMarkdown(text) {
  if(text === null) {
    return false;
  }
  for(const line of text.split('\n')) {
    const trimmed = line.trim();
    if(trimmed === '') {
      continue;
    }
    return MARKDOWN_HEADING.test(trimmed);
  }
  return false;
}
