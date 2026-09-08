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
      'else has no effect.'
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
    report({
      messageId: 'notAllowed',
      line: 1,
      data: {name: ctx.file.split('/').pop()}
    });
  }
};
