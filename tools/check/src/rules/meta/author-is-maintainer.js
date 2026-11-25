import path from 'node:path';
import {findUsernames} from '../../maintainers.js';
import {parse as parseHtaccess} from '../../htaccess.js';
import {isInfrastructure, isReadme, isHtaccess} from '../../paths.js';

/**
 * A change to a directory made by somebody not recorded as maintaining it.
 *
 * Ownership is inherited downward (see meta/document-identifier-root), so the
 * author may be listed at the directory itself or at any directory above it,
 * up to the root of the identifier.
 *
 * Maintainers are read from the branch the change is going into, never from
 * the change itself: otherwise adding yourself to a README would be enough to
 * pass.
 *
 */
export default {
  id: 'meta/author-is-maintainer',
  description:
    'A change to an identifier should come from one of its maintainers',
  tags: ['meta', 'pr'],
  severity: 'warning',
  scope: 'git',
  messages: {
    notListed:
      '{{author}}, who opened this pull request, is not listed as a ' +
      'maintainer of {{dir}} or of any directory above it. {{listed}}. ' +
      'One of them should approve this change before it is merged.'
  },
  check(ctx, report) {
    if(!ctx.hasRange || !ctx.author) {
      return;
    }
    const author = ctx.author.toLowerCase();
    const records = recordsByDirectory(ctx);

    for(const [dir, paths] of changedDirectories(ctx)) {
      const levels = maintainersAbove(ctx, records, dir);
      if(levels.length === 0 || levels.some(l => l.usernames.has(author))) {
        continue;
      }
      report({
        ...anchor(ctx, paths),
        messageId: 'notListed',
        // Mentions: the report is what a comment on the pull request will be
        // posted from, and the people named are the ones to ask.
        data: {
          author: '@' + ctx.author,
          dir,
          listed: levels.map(l => `${l.dir} lists ` +
            [...l.usernames].sort().map(u => '@' + u).join(', ')).join('; ')
        }
      });
    }
  }
};

/** Directories under an identifier that the change reaches, with its paths. */
function changedDirectories(ctx) {
  const byDir = new Map();
  for(const {path: p} of ctx.changes) {
    const ns = ctx.namespaceOf(p);
    if(ns === null || ns === ctx.idsDir || ns === p ||
      isInfrastructure(p, ctx.idsDir)) {
      continue;
    }
    const dir = path.posix.dirname(p);
    if(!byDir.has(dir)) {
      byDir.set(dir, []);
    }
    byDir.get(dir).push(p);
  }
  return [...byDir].sort(([a], [b]) => a.localeCompare(b));
}

/** Target-branch files that can record a maintainer, by directory. */
function recordsByDirectory(ctx) {
  const byDir = new Map();
  for(const p of ctx.targetTree) {
    if(!p.startsWith(ctx.idsDir + '/') || !(isReadme(p) || isHtaccess(p))) {
      continue;
    }
    const dir = path.posix.dirname(p);
    if(!byDir.has(dir)) {
      byDir.set(dir, []);
    }
    byDir.get(dir).push(p);
  }
  return byDir;
}

/**
 * Maintainers recorded in the target branch at `dir` and each directory above
 * it up to the identifier root, nearest first. Levels recording nobody are
 * left out.
 */
function maintainersAbove(ctx, records, dir) {
  const root = ctx.namespaceOf(dir);
  const levels = [];
  for(let d = dir; ; d = path.posix.dirname(d)) {
    const usernames = new Set();
    for(const p of records.get(d) ?? []) {
      for(const name of findUsernames(recordText(ctx, p))) {
        usernames.add(name);
      }
    }
    if(usernames.size > 0) {
      levels.push({dir: d, usernames});
    }
    if(d === root) {
      return levels;
    }
  }
}

// Only `.htaccess` comments, as in namespaceMaintainers: a directive says
// where the identifier points, not who is responsible for it.
function recordText(ctx, p) {
  const text = ctx.readTarget(p) ?? '';
  return isHtaccess(p) ?
    parseHtaccess(text).comments.map(c => c.text).join('\n') : text;
}

/**
 * The first line the change added in these paths. The finding is about the
 * pull request rather than any line, but GitHub shows an annotation inline
 * only on a line of the diff. A change that only deletes has no such line,
 * so its finding carries no file: it is listed on the run and in the job
 * summary instead of in the diff.
 */
function anchor(ctx, paths) {
  for(const p of [...paths].sort()) {
    const lines = ctx.addedLines.get(p);
    if(lines !== undefined && lines.size > 0) {
      return {file: p, line: Math.min(...lines)};
    }
  }
  return {};
}
