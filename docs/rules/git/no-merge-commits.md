---
id: git/no-merge-commits
title: Rebase rather than merging master into your branch
severity: warning
status: enforced
applies-to: "**"
---

# `git/no-merge-commits`

**Severity:** warning · **Status:** enforced · **Applies to:** repository-wide

## What

A pull request should not contain merge commits.

## Why

GitHub's "Sync fork" button merges the upstream branch into yours. That pulls
every commit it caught up on into your pull request, so a one-line redirect
change arrives carrying a hundred unrelated commits and a merge commit on top.

Hundreds of such merges have reached `master` in this repository, most of them
the `Merge branch 'perma-id:master' into ...` shape that button produces. They
add no content and make the change hard to read.

Rebasing puts your work on top of the current master instead, so the pull
request contains your commits and nothing else.

## Wrong

```
$ git log --oneline upstream/master..HEAD
9f3c1a2  Merge branch 'perma-id:master' into my-branch
7b2d4e8  Add redirect for my-project
```

## Right

```
$ git log --oneline upstream/master..HEAD
7b2d4e8  Add redirect for my-project
```

## How to fix

```sh
git fetch upstream
git branch backup-my-change   # a copy to go back to if this goes wrong
git rebase upstream/master
git push --force-with-lease
```

If you have not added the upstream remote:

```sh
git remote add upstream https://github.com/perma-id/w3id.org.git
```

If a rebase goes wrong partway through, `git rebase --abort` returns to where
you started. Your original commits are still on `backup-my-change` afterwards.
Often the simplest recovery is to start a fresh branch from `upstream/master`
and re-apply your change by hand — it is usually two files. Delete the copy
with `git branch -D backup-my-change` once the pull request is merged.

## How to check

Run `w3id-check` with `--rule git/no-merge-commits` to check this rule on its
own; without it the tool runs every rule, as the pull request checks do. This
rule looks at your commits rather than your files, so it needs a base to
compare against; narrowing it to a path would not change what it reports.

```sh
node tools/check/bin/w3id-check.js --rule git/no-merge-commits
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`git/branch-not-stale`](./branch-not-stale)
- [`git/minimal-commits`](./minimal-commits)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
