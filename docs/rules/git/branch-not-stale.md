---
id: git/branch-not-stale
title: Start from a recent master
severity: notice
status: enforced
applies-to: "**"
---

# `git/branch-not-stale`

**Severity:** notice · **Status:** enforced · **Applies to:** repository-wide

## What

A branch should start from a reasonably recent `master`.

## Why

A fork that was cloned once and never updated diverges quietly. The change
itself is usually still fine — identifier directories rarely conflict with each
other — but two things go wrong:

- the pull request is harder to review, because the diff is computed against a
  base nobody is looking at any more;
- the contributor reaches for "Sync fork", which merges rather than rebases and
  drags a merge commit plus everything since into the pull request. See
  [`git/no-merge-commits`](./no-merge-commits).

This is a notice, not a warning. Being behind is not itself a mistake, and it
never blocks anything — it is here because it is the step before the mistake.

## Wrong

Nothing, exactly. This is advice.

## Right

```sh
$ git fetch upstream
$ git rev-list --count HEAD..upstream/master
3
```

## How to fix

```sh
git fetch upstream
git rebase upstream/master
```

For a fork you have not touched in a long time, it is often quicker to delete
the local branch and start again from `upstream/master`.

## Checked by

`git/branch-not-stale`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js --base origin/master
```

The threshold is configurable in `.w3id-check.yaml` under
`options.git/branch-not-stale.maxBehind`.

## See also

- [`git/no-merge-commits`](./no-merge-commits)
