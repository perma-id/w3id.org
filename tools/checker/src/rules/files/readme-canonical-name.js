import {CANONICAL_README, README_PATTERNS} from '../../paths.js';

/**
 * GitHub recognises a README under many names and extensions, so a differently
 * spelled one is not broken and the rule must not pretend otherwise. What it
 * asks for is the convention: the contributor instructions say to add a
 * `README.md`, and that is the name tooling looks for.
 *
 * The one case where the name does change what a reader sees is a file written
 * as Markdown but not named `.md` -- GitHub shows that verbatim, so the
 * headings and links appear as literal punctuation.
 */

// A file is treated as Markdown only if its first non-blank line is an ATX
// heading. Deliberately narrow: acting on a false positive means telling
// somebody to rename a file for a reason that does not hold.
const MARKDOWN_HEADING = /^#{1,6}\s+\S/;
const MARKDOWN_EXTENSION = /\.md$/i;

export default {
  id: 'files/readme-canonical-name',
  description: 'READMEs should be named README.md',
  tags: ['files', 'style'],
  severity: 'warning',
  scope: 'file',
  files: README_PATTERNS,
  messages: {
    convention:
      'Rename {{name}} to README.md. GitHub recognises other spellings, so ' +
      'nothing is broken -- README.md is simply the name the contributor ' +
      'instructions ask for, and the one tooling looks for.',
    markdownExtension:
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
    if(name === CANONICAL_README) {
      return;
    }
    // A Markdown extension renders as Markdown whatever the casing, so the
    // only thing left to say is which spelling is the agreed one.
    if(MARKDOWN_EXTENSION.test(name)) {
      report({messageId: 'convention', line: 1, data: {name}});
      return;
    }
    report({
      messageId: looksLikeMarkdown(ctx.read(ctx.file)) ?
        'markdownExtension' : 'convention',
      line: 1,
      data: {name}
    });
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
