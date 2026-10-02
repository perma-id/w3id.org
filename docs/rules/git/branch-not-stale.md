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
other — but three things go wrong:

- the pull request is harder to review, because the diff is computed against a
  base nobody is looking at any more;
- the contributor reaches for "Sync fork", which merges rather than rebases and
  drags a merge commit plus everything since into the pull request. See
  [`git/no-merge-commits`](./no-merge-commits);
- the checks can miss things. The pull request's own checks run on the change
  merged into the current `master`, so they use the current rules however old
  the branch is — but GitHub runs no checks at all on a pull request with a
  merge conflict, and the checker you run yourself is whatever version your
  branch has.

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

From the command line:

```sh
git fetch upstream
git rebase upstream/master
```

For a fork you have not touched in a long time, it is often quicker to delete
the local branch and start again from `upstream/master`.

In the browser:

- **Before you start a change**, open your fork on GitHub and use **Sync
  fork**, then make your edit. If you have not committed to your fork's
  default branch, this only catches it up.
- **Once the pull request is open**, use the **Update branch** button in the
  merge section near the bottom of the pull request, and choose **Update with
  rebase** from its dropdown. GitHub shows the button when there are no merge
  conflicts and the branch is behind. The plain **Update branch** and **Update
  with merge commit** add a merge commit, which
  [`git/no-merge-commits`](./no-merge-commits) reports.

## How to check

Run `w3id-check` with `--rule git/branch-not-stale` to check this rule on its
own; without it the tool runs every rule, as the pull request checks do. This
rule looks at your commits rather than your files, so it needs a base to
compare against; narrowing it to a path would not change what it reports.

```sh
node tools/check/bin/w3id-check.js --rule git/branch-not-stale
```

The threshold is configurable in `.w3id-check.yaml` under
`options.git/branch-not-stale.maxBehind`.

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`git/no-merge-commits`](./no-merge-commits)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
