import {TEXT_FILE_PATTERNS} from '../../paths.js';

/**
 * A byte order mark at the start of a file.
 *
 * Three invisible bytes. Apache reads them as part of the first directive,
 * which usually makes that directive unparseable -- and an unparseable
 * `.htaccess` returns 500 for every URL under the directory. The symptom is an
 * identifier that is completely broken while the file looks perfect in every
 * editor.
 *
 * No file in the tree currently has one, so this rule is preventive. It is
 * still worth having: some Windows editors add a BOM silently, and this is the
 * only whitespace-adjacent problem in the repository that takes an identifier
 * off the air.
 */
export default {
  id: 'format/no-bom',
  description: 'Files must not begin with a byte order mark',
  tags: ['format', 'correctness'],
  severity: 'error',
  critical: true,
  fixable: true,
  scope: 'file',
  files: TEXT_FILE_PATTERNS,
  messages: {
    htaccess:
      'This file starts with a byte order mark -- three invisible bytes ' +
      'before the first character. Apache reads them as part of the first ' +
      'directive, which usually makes the file unparseable, and every URL ' +
      'under this identifier then returns 500. Remove it with: ' +
      'sed -i \'1s/^\\xef\\xbb\\xbf//\' {{file}}',
    other:
      'This file starts with a byte order mark -- three invisible bytes ' +
      'before the first character. Some tools read them as content. Remove ' +
      'it with: sed -i \'1s/^\\xef\\xbb\\xbf//\' {{file}}'
  },
  check(ctx, report) {
    const text = ctx.read(ctx.file);
    // Node does not strip a BOM when decoding UTF-8, so it survives as
    // U+FEFF at the head of the string.
    if(text === null || text.charCodeAt(0) !== 0xfeff) {
      return;
    }
    report({
      messageId: ctx.file.endsWith('.htaccess') ? 'htaccess' : 'other',
      line: 1,
      column: 1,
      data: {file: ctx.file}
    });
  }
};
