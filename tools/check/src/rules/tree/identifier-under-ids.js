/**
 * An identifier's .htaccess placed outside the identifier tree.
 *
 * Only `ids/` is served, so `my-project/.htaccess` at the repository root is
 * never read and the identifier it describes never resolves. Nothing else
 * reports it: the rules about identifiers look under `ids/`, and a change that
 * touches nothing there reads as tooling or documentation work. Forks from
 * before the tree moved, and instructions written then, keep producing it.
 */
export default {
  id: 'tree/identifier-under-ids',
  description: 'Identifier directories must be under ids/',
  tags: ['tree', 'correctness'],
  severity: 'error',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    outside:
      'This .htaccess is outside {{idsDir}}/, and only {{idsDir}}/ is ' +
      'served, so it will never be read. Identifier directories go under ' +
      '{{idsDir}}/: move this directory to {{suggestion}}.'
  },
  check(ctx, report) {
    if(ctx.file.startsWith(ctx.idsDir + '/')) {
      return;
    }
    const dir = ctx.file.replace(/\/?\.htaccess$/, '');
    report({
      messageId: 'outside',
      // Line 1, so the annotation lands on the file in the diff.
      line: 1,
      data: {
        idsDir: ctx.idsDir,
        suggestion: dir === '' ? `${ctx.idsDir}/<name>/` : `${ctx.idsDir}/${dir}/`
      }
    });
  }
};
