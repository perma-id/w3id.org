import {hasMaintainerSignal, namespaceMaintainers} from '../../maintainers.js';
import {isReadme, isHtaccess, isInfrastructure, identifierNamespaces}
  from '../../paths.js';

export default {
  id: 'meta/document-identifier-root',
  description: 'The root of an identifier should record who maintains it',
  tags: ['meta', 'metadata', 'structure'],
  severity: 'warning',
  scope: 'tree',
  messages: {
    // Both messages have to survive being read by somebody who wants the
    // warning gone with the least work. For `deeper` that means saying, in
    // the message itself, that the deeper file stays: the obvious reading of
    // "documented at X but not at the root" is "X is in the wrong place",
    // and acting on it deletes a sub-tree's own maintainer record.
    deeper:
      '{{where}} records a maintainer, but nothing at {{dir}} claims the ' +
      'identifier itself. Ownership is inherited downward, so a claim at the ' +
      'root covers the whole tree; without one, nothing marks the rest of it ' +
      'as taken. Keep {{where}} as it is and add a README.md at {{dir}}, or ' +
      'maintainer comments to an .htaccess there.',
    undocumented:
      'Nothing in {{dir}} says what https://w3id.org/{{id}} is for or who ' +
      'maintains it. Add a README.md at the root of the identifier saying ' +
      'what it is for and who looks after it, including their GitHub ' +
      'username -- or record the same in .htaccess comments there. That is ' +
      'how the service maintainers know who may approve later changes.'
  },
  check(ctx, report) {
    const {sharedNamespaces = []} = ctx.options;
    const shared = new Set(sharedNamespaces);

    // Only files that carry metadata, grouped by the namespace they are in.
    const byNamespace = new Map();
    for(const p of ctx.idPaths) {
      if(isInfrastructure(p, ctx.idsDir)) {
        continue;
      }
      if(!isReadme(p) && !isHtaccess(p)) {
        continue;
      }
      const ns = ctx.namespaceOf(p);
      if(ns === null || ns === ctx.idsDir || ns === p) {
        continue;
      }
      if(!byNamespace.has(ns)) {
        byNamespace.set(ns, []);
      }
      byNamespace.get(ns).push(p);
    }

    for(const dir of [...identifierNamespaces(ctx)].sort()) {
      if(shared.has(dir)) {
        continue;
      }
      const paths = byNamespace.get(dir) ?? [];
      // Sub-directories are never checked. A claim at the root covers
      // everything beneath it, and a sub-directory that records additional
      // maintainers for its own part of the tree is a supported pattern --
      // this rule asks only whether the root itself is claimed.
      const atRoot = p => !p.slice(dir.length + 1).includes('/');
      const rootPaths = paths.filter(atRoot);

      if(rootPaths.some(isReadme)) {
        continue;
      }
      // Only comments count, not directives: a redirect target such as
      // https://github.com/someone/repo names a repository owner, who need
      // not be responsible for the identifier. `namespaceMaintainers` already
      // draws that line, so reuse it and check the comments the same way.
      const rootHtaccess = rootPaths.find(isHtaccess);
      const comments = rootHtaccess === undefined ? '' :
        (ctx.htaccess(rootHtaccess)?.comments ?? [])
          .map(c => c.text).join('\n');
      if(hasMaintainerSignal(comments)) {
        continue;
      }

      // Point at the deepest evidence there is, so the message can name the
      // file whose author is being asked not to move it.
      const where = paths.filter(p => !atRoot(p)).find(
        p => isReadme(p) || namespaceMaintainers(ctx, dir, [p]).usernames.size > 0);
      report({
        file: dir,
        messageId: where === undefined ? 'undocumented' : 'deeper',
        data: {dir, where, id: dir.slice(ctx.idsDir.length + 1)}
      });
    }
  }
};
