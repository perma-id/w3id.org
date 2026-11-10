import {htaccessNearMiss, misplacedIdentifierDir} from '../../paths.js';

/**
 * An identifier placed outside the identifier tree.
 *
 * Only `ids/` is served, so `my-project/.htaccess` at the repository root is
 * never read and the identifier it describes never resolves. Nothing else
 * reports it: the rules about identifiers look under `ids/`, and a change that
 * touches nothing there reads as tooling or documentation work. Forks from
 * before the tree moved, and instructions written then, keep producing it.
 *
 * An `.htaccess` is reported wherever it is. A file only named like one, such
 * as `my-project/.htcaccess`, is reported when it is in a top-level directory
 * the change created, because the repository's own files include
 * `htaccess.md` and `htaccess.js`.
 */
export default {
  id: 'tree/identifier-under-ids',
  description: 'Identifier directories must be under ids/',
  tags: ['tree', 'correctness'],
  severity: 'error',
  scope: 'file',
  files: ['**/*'],
  messages: {
    outside:
      '{{name}} is outside {{idsDir}}/, and only {{idsDir}}/ is served, so ' +
      'it will never be read. Identifier directories go under {{idsDir}}/: ' +
      'move this directory to {{suggestion}}.'
  },
  check(ctx, report) {
    if(ctx.file.startsWith(ctx.idsDir + '/')) {
      return;
    }
    const slash = ctx.file.lastIndexOf('/');
    const name = ctx.file.slice(slash + 1);
    if(name !== '.htaccess' && (htaccessNearMiss(name) === null ||
      misplacedIdentifierDir(ctx, ctx.file) === null)) {
      return;
    }
    const dir = slash === -1 ? '' : ctx.file.slice(0, slash);
    report({
      messageId: 'outside',
      // Line 1, so the annotation lands on the file in the diff.
      line: 1,
      data: {
        name,
        idsDir: ctx.idsDir,
        suggestion: dir === '' ? `${ctx.idsDir}/<name>/` : `${ctx.idsDir}/${dir}/`
      }
    });
  }
};
