/**
 * Whether this .htaccess sits above sub-identifiers that resolve on their own.
 *
 * A directory may legitimately exist only to group them -- the same exception
 * `files/htaccess-required` already makes -- and then its own .htaccess has
 * no redirect to carry. Comments are the recommended way to claim such a
 * root, so reporting them here would block the fix
 * `meta/document-identifier-root` asks for.
 */
function groupsSubIdentifiers(ctx) {
  const dir = ctx.file.slice(0, -'/.htaccess'.length) + '/';
  return ctx.idPaths.some(p =>
    p !== ctx.file && p.startsWith(dir) && p.endsWith('/.htaccess') &&
    (ctx.htaccess(p)?.directives.length ?? 0) > 0);
}

export default {
  id: 'files/no-empty-htaccess',
  description: 'An .htaccess file must contain at least one directive',
  tags: ['files', 'htaccess', 'correctness'],
  severity: 'error',
  // An identifier whose .htaccess does nothing resolves to a 404. It is
  // indistinguishable from a broken identifier to anyone using it.
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    empty:
      'This .htaccess is empty, so https://w3id.org/{{id}} does not resolve. ' +
      'Add a redirect, or remove the directory.',
    commentsOnly:
      'This .htaccess contains only comments, so https://w3id.org/{{id}} ' +
      'does not resolve. Add a redirect, or remove the directory.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    const id = ctx.file.slice(ctx.idsDir.length + 1).replace(/\/?\.htaccess$/, '');
    if(parsed.text.trim() === '') {
      report({messageId: 'empty', line: 1, data: {id}});
      return;
    }
    if(parsed.directives.length === 0 && !groupsSubIdentifiers(ctx)) {
      report({messageId: 'commentsOnly', line: 1, data: {id}});
    }
  }
};
