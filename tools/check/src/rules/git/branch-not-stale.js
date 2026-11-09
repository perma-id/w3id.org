export default {
  id: 'git/branch-not-stale',
  description: 'A pull request should be based on a recent master',
  tags: ['git', 'pr'],
  severity: 'notice',
  scope: 'git',
  messages: {
    stale:
      'This branch starts from a commit that {{ref}} is {{count}} commits ' +
      'ahead of. A branch this far behind is likely to conflict, and any ' +
      'merge you do to catch up will pull those commits into the pull ' +
      'request. Rebase instead: git fetch upstream && ' +
      'git rebase upstream/master'
  },
  check(ctx, report) {
    if(!ctx.hasRange) {
      return;
    }
    const {maxBehind = 500} = ctx.options;
    const behind = ctx.behindUpstream;
    // A shallow or detached checkout has nothing to compare against; that is
    // normal in CI and is not the contributor's problem.
    if(behind === null || behind.count <= maxBehind) {
      return;
    }
    report({
      messageId: 'stale',
      data: {ref: behind.ref, count: behind.count}
    });
  }
};
