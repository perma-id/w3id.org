import {matchesAny} from '../../glob.js';

/**
 * A change to an identifier that also reaches outside it.
 *
 * Maintainers edit the rest of the repository as a matter of course, and an
 * ordinary contribution may legitimately come with a documentation fix, so this
 * cannot be a gate. The case worth catching is the unintentional one: nobody
 * means to modify the global rewrite file, the homepage, or somebody else's
 * identifier while adding their own, and those edits are easy to make by
 * accident and easy to miss in review.
 *
 * So the rule reports rather than blocks, and stays quiet entirely when a
 * change touches no identifier at all -- tooling and documentation work is not
 * what it is looking at.
 */

// Shared files under the identifier tree. None of these is part of adding or
// updating an identifier.
const SHARED_INFRASTRUCTURE = [
  'ids/.htaccess',
  'ids/index.html',
  'ids/.assets/**',
  'ids/.utils/**'
];

export default {
  id: 'tree/only-own-identifier',
  description:
    'A change to an identifier should not also change shared files',
  tags: ['tree', 'pr'],
  severity: 'warning',
  scope: 'git',
  messages: {
    sharedInfrastructure:
      'This change edits {{paths}} as well as {{identifiers}}. Those files ' +
      'are shared by every identifier on the service -- the global rewrite ' +
      'rules, the homepage, the site assets -- and are not part of adding or ' +
      'updating one. If you did not mean to touch them, revert that part; if ' +
      'you did, say why in the pull request so a maintainer knows it was ' +
      'deliberate.',
    otherIdentifiers:
      'This change touches {{count}} identifiers: {{identifiers}}. That is ' +
      'allowed, but it is usually accidental -- a stray edit to somebody ' +
      'else\'s directory. If each is deliberate, they are easier to review ' +
      'as separate pull requests.',
    outsideIds:
      'This change also edits {{paths}}, outside the identifier tree. Often ' +
      'deliberate -- a documentation fix alongside a redirect, say -- so this ' +
      'is only here so a reviewer sees it rather than has to notice it.'
  },
  check(ctx, report) {
    if(!ctx.hasRange) {
      return;
    }

    const shared = [];
    const outside = [];
    const identifiers = new Set();

    for(const path of [...ctx.changedPaths].sort()) {
      if(matchesAny(path, SHARED_INFRASTRUCTURE)) {
        shared.push(path);
        continue;
      }
      if(!path.startsWith(ctx.idsDir + '/')) {
        outside.push(path);
        continue;
      }
      const namespace = ctx.namespaceOf(path);
      if(namespace !== null && namespace !== ctx.idsDir) {
        identifiers.add(namespace);
      }
    }

    // Not an identifier contribution, so none of this applies.
    if(identifiers.size === 0) {
      return;
    }

    const named = [...identifiers].sort();
    if(shared.length > 0) {
      report({
        messageId: 'sharedInfrastructure',
        data: {paths: list(shared), identifiers: list(named)}
      });
    }
    if(identifiers.size > 1) {
      report({
        messageId: 'otherIdentifiers',
        data: {count: identifiers.size, identifiers: list(named)}
      });
    }
    if(outside.length > 0) {
      report({
        messageId: 'outsideIds',
        // Softer than the other two: this is genuinely often deliberate, so
        // it is surfaced rather than complained about.
        severity: 'notice',
        // A tooling change can touch dozens of files; naming them all would
        // bury the point.
        data: {paths: list(outside)}
      });
    }
  }
};

function list(paths, max = 5) {
  if(paths.length <= max) {
    return paths.join(', ');
  }
  return `${paths.slice(0, max).join(', ')} and ${paths.length - max} more`;
}
