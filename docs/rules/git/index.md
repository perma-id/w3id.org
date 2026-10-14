---
title: Pull request shape rules
---

# Pull request shape rules

These look at the commits rather than the files. They only run when there is a
range to compare against, so they are reported on a pull request and not by a
run scoped to a directory.

| Rule | Severity | What |
| --- | --- | --- |
| [`git/minimal-commits`](./minimal-commits) | warning | One identifier change should be one commit |
| [`git/no-merge-commits`](./no-merge-commits) | warning | Rebase; do not merge master into your branch |
| [`git/descriptive-commit-message`](./descriptive-commit-message) | warning | Name the identifier, not the filename |
| [`git/no-session-link`](./no-session-link) | warning | No links to a private agent session |
| [`git/branch-not-stale`](./branch-not-stale) | notice | Start from a recent master |

Back to the [rule catalog](../).
