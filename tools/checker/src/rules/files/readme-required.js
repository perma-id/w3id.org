import {isReadme, isInfrastructure} from '../../paths.js';

export default {
  id: 'files/readme-required',
  description: 'A top-level identifier directory must contain a README',
  tags: ['files', 'structure', 'metadata'],
  severity: 'warning',
  scope: 'tree',
  messages: {
    missing:
      '{{dir}} has no README. Add a README.md saying what ' +
      'https://w3id.org/{{id}} is for and who maintains it, including their ' +
      'GitHub username -- that is how the service maintainers know who may ' +
      'approve later changes to it.'
  },
  check(ctx, report) {
    const prefix = ctx.idsDir + '/';
    const topLevel = new Set();
    const withReadme = new Set();

    for(const p of ctx.idPaths) {
      if(isInfrastructure(p, ctx.idsDir)) {
        continue;
      }
      const ns = ctx.namespaceOf(p);
      if(ns === null || ns === ctx.idsDir) {
        continue;
      }
      topLevel.add(ns);
      // A README anywhere in the namespace documents it; requiring one in
      // every sub-directory would be noise.
      if(isReadme(p)) {
        withReadme.add(ns);
      }
    }

    for(const dir of [...topLevel].sort()) {
      if(withReadme.has(dir)) {
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
