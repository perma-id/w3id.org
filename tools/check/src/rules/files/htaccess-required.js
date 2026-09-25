import {isHtaccess, isInfrastructure} from '../../paths.js';

export default {
  id: 'files/htaccess-required',
  description: 'An identifier directory must contain an .htaccess',
  tags: ['files', 'structure'],
  severity: 'warning',
  scope: 'tree',
  messages: {
    missing:
      '{{dir}} has no .htaccess and no sub-directory that provides one, so ' +
      'https://w3id.org/{{id}} does not resolve. Add an .htaccess with the ' +
      'redirect for this identifier.'
  },
  check(ctx, report) {
    const prefix = ctx.idsDir + '/';
    const dirs = new Set();
    // Directories that hold, or contain something that holds, an .htaccess.
    const covered = new Set();

    for(const p of ctx.idPaths) {
      if(isInfrastructure(p, ctx.idsDir)) {
        continue;
      }
      const segments = p.split('/');
      // Every ancestor directory of this file, excluding the file itself.
      for(let i = 1; i < segments.length; ++i) {
        dirs.add(segments.slice(0, i).join('/'));
      }
      if(!isHtaccess(p)) {
        continue;
      }
      // The .htaccess covers its own directory and every ancestor, since a
      // parent may legitimately exist only to group sub-identifiers.
      for(let i = 1; i < segments.length; ++i) {
        covered.add(segments.slice(0, i).join('/'));
      }
    }

    for(const dir of [...dirs].sort()) {
      // `ids` itself is the tree root, not an identifier.
      if(dir === ctx.idsDir || covered.has(dir)) {
        continue;
      }
      report({
        file: dir,
        messageId: 'missing',
        data: {dir, id: dir.slice(prefix.length)}
      });
    }
  }
};
