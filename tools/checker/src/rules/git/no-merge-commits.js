/**
 * 672 merge commits made inside contributor branches have reached master, 501
 * of them "Merge branch 'perma-id:master' into ...". They add no content, make
 * the change hard to read, and are what the pull request template is asking to
 * avoid when it says to keep the number of commits minimal.
 */

// The shape GitHub's "Sync fork" button and the web editor produce.
const FORK_SYNC = /^Merge branch '[^']*(?::|\/)?(master|main)'/i;
const UPSTREAM_SYNC = /^Merge (remote-tracking )?branch '(upstream|origin)\//i;

export default {
  id: 'git/no-merge-commits',
  description: 'A pull request should not contain merge commits',
  tags: ['git', 'pr'],
  severity: 'warning',
  scope: 'git',
  messages: {
    forkSync:
      'Commit {{sha}} ("{{subject}}") merges master into your branch. That ' +
      'is what GitHub\'s "Sync fork" button does, and it puts every commit ' +
      'it pulled in into this pull request. Rebase instead: ' +
      'git fetch upstream && git rebase upstream/master',
    merge:
      'Commit {{sha}} ("{{subject}}") is a merge commit. Pull requests here ' +
      'should be a short, linear series of changes. Rebase your branch onto ' +
      'master rather than merging into it.'
  },
  check(ctx, report) {
    if(!ctx.hasRange) {
      return;
    }
    for(const commit of ctx.commits) {
      if(commit.parents.length < 2) {
        continue;
      }
      const isSync = FORK_SYNC.test(commit.subject) ||
        UPSTREAM_SYNC.test(commit.subject);
      report({
        messageId: isSync ? 'forkSync' : 'merge',
        data: {sha: commit.sha.slice(0, 8), subject: commit.subject}
      });
    }
  }
};
