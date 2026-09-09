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
add no content, make the change hard to read, and are what the pull request
template means when it asks for a minimal number of commits.

Rebasing puts your work on top of the current master instead, so the pull
request contains your commits and nothing else.

## Wrong

```
$ git log --oneline origin/master..HEAD
9f3c1a2  Merge branch 'perma-id:master' into my-branch
7b2d4e8  Add redirect for my-project
```

## Right

```
$ git log --oneline origin/master..HEAD
7b2d4e8  Add redirect for my-project
```

## How to fix

```sh
git fetch upstream
git rebase upstream/master
git push --force-with-lease
```

If you have not added the upstream remote:

```sh
git remote add upstream https://github.com/perma-id/w3id.org.git
```

If a rebase goes wrong, the simplest recovery is often to start a fresh branch
from `upstream/master` and re-apply your change by hand — it is usually two
files.

## Checked by

`git/no-merge-commits`, in this repository's checker:

```sh
node tools/check/bin/w3id-check.js --base origin/master
```

## See also

- [`git/branch-not-stale`](./branch-not-stale)
- [`git/minimal-commits`](./minimal-commits)
