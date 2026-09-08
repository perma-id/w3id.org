export default {
  id: 'git/minimal-commits',
  description: 'A pull request should contain as few commits as possible',
  tags: ['git', 'pr'],
  severity: 'warning',
  scope: 'git',
  messages: {
    tooMany:
      'This pull request has {{count}} commits. Squash them into one before ' +
      'it is reviewed: git rebase -i origin/master, then mark all but the ' +
      'first as "squash".',
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

    // Merge commits are git/no-merge-commits' business, and counting them
    // here would report the same problem twice.
    const real = ctx.commits.filter(c => c.parents.length < 2);
    if(real.length === 0) {
      return;
    }

    if(real.length > maxCommits) {
      report({messageId: 'tooMany', data: {count: real.length}});
      return;
    }

    const byFile = new Map();
    for(const commit of real) {
      for(const file of commit.files) {
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
