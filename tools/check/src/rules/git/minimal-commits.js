/**
 * This rule is about identifier contributions, and counts only the commits
 * that touch one.
 *
 * Adding a redirect through the GitHub web editor produces a commit per save,
 * and a reviewer then has to reconstruct the final state of one `.htaccess`
 * from four partial edits. That is the problem worth reporting.
 *
 * Maintainer work on `docs/` or `tools/` is not that. There the history is the
 * useful artifact -- what changed and why, in order -- and flattening it loses
 * something. Counting those commits told a maintainer to undo a decision they
 * had deliberately made, which is worse than saying nothing: a checker that is
 * wrong about the one thing you already know is wrong is one people start
 * skimming.
 */

export default {
  id: 'git/minimal-commits',
  description: 'A pull request should contain as few commits as possible',
  tags: ['git', 'pr'],
  severity: 'warning',
  scope: 'git',
  messages: {
    tooMany:
      'This pull request changes identifiers across {{count}} commits. ' +
      'Squash them into one before it is reviewed: git rebase -i ' +
      'origin/master, then mark all but the first as "squash".',
    tooManyPerFile:
      '{{file}} is changed by {{count}} separate commits ({{subjects}}). ' +
      'Editing a file through the GitHub web interface makes one commit per ' +
      'save; squash them into a single change to that file.'
  },
  check(ctx, report) {
    if(!ctx.hasRange) {
      return;
    }
    const {maxCommits = 5, maxCommitsPerFile = 3} = ctx.options;

    const prefix = ctx.idsDir + '/';
    const touchesIdentifier = file => file.startsWith(prefix);

    // Merge commits are git/no-merge-commits' business, and counting them
    // here would report the same problem twice. Commits that touch no
    // identifier are not this rule's business at all -- see above.
    const real = ctx.commits.filter(c => c.parents.length < 2 &&
      c.files.some(touchesIdentifier));
    if(real.length === 0) {
      return;
    }

    if(real.length > maxCommits) {
      report({messageId: 'tooMany', data: {count: real.length}});
      return;
    }

    const byFile = new Map();
    for(const commit of real) {
      for(const file of commit.files.filter(touchesIdentifier)) {
        if(!byFile.has(file)) {
          byFile.set(file, []);
        }
        byFile.get(file).push(commit);
      }
    }

    for(const [file, touching] of [...byFile].sort()) {
      if(touching.length <= maxCommitsPerFile) {
        continue;
      }
      report({
        file,
        messageId: 'tooManyPerFile',
        data: {
          file,
          count: touching.length,
          subjects: touching.map(c => `"${c.subject}"`).join(', ')
        }
      });
    }
  }
};
