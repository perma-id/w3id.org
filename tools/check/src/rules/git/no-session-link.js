/**
 * A commit message that links to the agent session it was written in.
 *
 * Claude Code adds `Claude-Session: https://claude.ai/code/session_...` to
 * the commits it makes. The page is private to the session's author, so for
 * everyone else -- reviewers, and whoever reads the history later -- it is a
 * link that does not open, and once merged it stays in the public history for
 * good. A pull request description is a better place for it: it can be edited
 * or removed later.
 *
 * The `Co-Authored-By` line beside it is not reported, nor an `Assisted-by`
 * line in the Linux kernel's style. They say how the change was made, which
 * is worth knowing; the link does not add to it.
 */
const SESSION_LINK = /https?:\/\/claude\.ai\/code\/session_\S+/i;

export default {
  id: 'git/no-session-link',
  description: 'Commit messages should not link to an agent session',
  tags: ['git', 'pr'],
  severity: 'warning',
  scope: 'git',
  messages: {
    sessionLink:
      'Commit {{sha}} links to a Claude Code session ({{url}}). The session ' +
      'is private to whoever ran it, so for reviewers and later readers it ' +
      'is a link that does not open, and once merged it stays in the public ' +
      'history. Remove that line from the commit message; a Co-Authored-By ' +
      'or Assisted-by line can stay.'
  },
  check(ctx, report) {
    if(!ctx.hasRange) {
      return;
    }
    for(const commit of ctx.commits) {
      const match = SESSION_LINK.exec(ctx.commitMessages.get(commit.sha) ?? '');
      if(match === null) {
        continue;
      }
      report({
        messageId: 'sessionLink',
        data: {sha: commit.sha.slice(0, 8), url: match[0]}
      });
    }
  }
};
