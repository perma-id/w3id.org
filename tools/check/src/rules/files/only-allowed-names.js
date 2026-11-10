import {htaccessNearMiss, isHtaccess, isReadme, misplacedIdentifierDir}
  from '../../paths.js';
import {matchesAny} from '../../glob.js';

/**
 * The service serves redirects, not content. A namespace therefore needs only
 * an `.htaccess` telling Apache where to send requests and a README telling
 * humans who to ask about it. Anything else either does nothing or is being
 * served in a way the service does not support.
 *
 * "README" here means any name GitHub will render as the directory's README,
 * not only `README.md`: an AsciiDoc one works, and calling a working file an
 * error would be wrong. Preferring Markdown is a separate, softer matter --
 * see `files/prefer-readme-md`.
 *
 * Outside the identifier tree, the same applies to a top-level directory the
 * change created to hold an identifier: `tree/identifier-under-ids` reports
 * where it is, and this rule what is in it.
 */

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
      'only .htaccess and a README -- by convention README.md. w3id.org ' +
      'redirects requests; it does not serve files, so anything else has no ' +
      'effect.',
    misnamedHtaccess:
      '{{name}} looks like it was meant to be .htaccess, and Apache will not ' +
      'read it under that name -- the identifier does not resolve at all. ' +
      'This usually happens because GitHub\'s web editor refuses a filename ' +
      'beginning with a dot when the name box is empty; type ".htaccess/" ' +
      'first and it will let you, or rename the file after committing.',
    misspelledHtaccess:
      '{{name}} looks like a misspelling of .htaccess. Apache reads only ' +
      'that exact name, so the identifier does not resolve at all. Rename ' +
      'the file to .htaccess.'
  },
  check(ctx, report) {
    // Only identifier content is constrained: the hosted tree, and an
    // identifier misplaced outside it. The repository's own files are not.
    if(!ctx.file.startsWith(ctx.idsDir + '/') &&
      misplacedIdentifierDir(ctx, ctx.file) === null) {
      return;
    }
    // Service infrastructure -- the homepage, the update hook, the error pages.
    if(matchesAny(ctx.file, ctx.config.allowedPaths)) {
      return;
    }
    if(isHtaccess(ctx.file) || isReadme(ctx.file)) {
      return;
    }
    const name = ctx.file.split('/').pop();
    const nearMiss = htaccessNearMiss(name);
    report({
      messageId: nearMiss === 'wrapped' ? 'misnamedHtaccess' :
        nearMiss === 'misspelled' ? 'misspelledHtaccess' : 'notAllowed',
      line: 1,
      data: {name}
    });
  }
};
