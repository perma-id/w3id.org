import {matchesAny} from '../../glob.js';

/**
 * The service serves redirects, not content. A namespace therefore needs only
 * an `.htaccess` telling Apache where to send requests and a README telling
 * humans who to ask about it. Anything else either does nothing or is being
 * served in a way the service does not support.
 */
const ALLOWED = [
  '**/.htaccess',
  '**/[Rr][Ee][Aa][Dd][Mm][Ee]',
  '**/[Rr][Ee][Aa][Dd][Mm][Ee].[Mm][Dd]',
  '**/[Rr][Ee][Aa][Dd][Mm][Ee].[Tt][Xx][Tt]'
];

export default {
  id: 'files/only-allowed-names',
  description:
    'Identifier directories may contain only .htaccess and README files',
  tags: ['files', 'structure'],
  severity: 'error',
  scope: 'file',
  files: ['**/*'],
  messages: {
    notAllowed:
      '{{name}} is not allowed here. An identifier directory may contain ' +
      'only .htaccess and a README (README.md, readme.md or README.txt). ' +
      'w3id.org redirects requests; it does not serve files, so anything ' +
      'else has no effect.',
    misnamedHtaccess:
      '{{name}} looks like it was meant to be .htaccess, and Apache will not ' +
      'read it under that name -- the identifier does not resolve at all. ' +
      'This usually happens because GitHub\'s web editor refuses a filename ' +
      'beginning with a dot when the name box is empty; type ".htaccess/" ' +
      'first and it will let you, or rename the file after committing.'
  },
  check(ctx, report) {
    // Only the hosted identifier tree is constrained; the repository's own
    // files are not identifier content.
    if(!ctx.file.startsWith(ctx.idsDir + '/')) {
      return;
    }
    // Service infrastructure -- the homepage, shared assets, the update hook.
    if(matchesAny(ctx.file, ctx.config.allowedPaths)) {
      return;
    }
    if(matchesAny(ctx.file, ALLOWED)) {
      return;
    }
    const name = ctx.file.split('/').pop();
    report({
      messageId: looksLikeHtaccess(name) ? 'misnamedHtaccess' : 'notAllowed',
      line: 1,
      data: {name}
    });
  }
};

/**
 * Whether a filename is a near-miss for `.htaccess`.
 *
 * Every one of these shapes has appeared in the repository: `htaccess.txt`,
 * `.htaccess.txt`, a bare `htaccess`, and `<project>.htaccess`.
 */
function looksLikeHtaccess(name) {
  return /(^|\.)htaccess(\.|$)/i.test(name) && name !== '.htaccess';
}
