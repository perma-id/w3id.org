import {namespaceMaintainers} from '../../maintainers.js';
import {isInfrastructure, isReadme, isHtaccess} from '../../paths.js';

export default {
  id: 'meta/maintainer-github-username',
  description:
    'A namespace must record a maintainer GitHub username',
  tags: ['meta', 'metadata'],
  severity: 'warning',
  scope: 'tree',
  messages: {
    // The suggestion differs by file: `#` starts a comment in .htaccess but a
    // heading in Markdown.
    missingReadme:
      'No maintainer GitHub username found for {{id}}. Identifiers here are ' +
      'meant to outlive their contributors, so the service maintainers need ' +
      'to know who to ask before changing one -- and who may approve a later ' +
      'change to it. Add a line to {{where}} such as: ' +
      '"Maintainer: [your-username](https://github.com/your-username)".',
    missingHtaccess:
      'No maintainer GitHub username found for {{id}}. Identifiers here are ' +
      'meant to outlive their contributors, so the service maintainers need ' +
      'to know who to ask before changing one -- and who may approve a later ' +
      'change to it. Add a comment to {{where}} such as: ' +
      '"# GitHub username: your-username".',
    missingBoth:
      'No maintainer GitHub username found for {{id}}, and it has neither a ' +
      'README nor an .htaccess to record one in. Add a README.md naming the ' +
      'maintainer and their GitHub username.'
  },
  check(ctx, report) {
    const byNamespace = new Map();
    for(const p of ctx.idPaths) {
      if(isInfrastructure(p, ctx.idsDir)) {
        continue;
      }
      // Only these two file kinds carry maintainer information.
      if(!isReadme(p) && !isHtaccess(p)) {
        continue;
      }
      const ns = ctx.namespaceOf(p);
      if(ns === null || ns === ctx.idsDir) {
        continue;
      }
      if(!byNamespace.has(ns)) {
        byNamespace.set(ns, []);
      }
      byNamespace.get(ns).push(p);
    }

    for(const [ns, paths] of [...byNamespace].sort()) {
      const {usernames} = namespaceMaintainers(ctx, ns, paths);
      if(usernames.size > 0) {
        continue;
      }
      // Point at the file the contributor is most likely to be editing, and
      // suggest the syntax that file actually uses.
      const readme = paths.find(isReadme);
      const htaccess = paths.find(isHtaccess);
      const where = readme ?? htaccess;
      report({
        file: where ?? ns,
        line: 1,
        messageId: where === undefined ? 'missingBoth' :
          readme === undefined ? 'missingHtaccess' : 'missingReadme',
        data: {id: ns.slice(ctx.idsDir.length + 1), where}
      });
    }
  }
};
