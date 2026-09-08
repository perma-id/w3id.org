---
id: git/minimal-commits
title: Keep the number of commits small
severity: warning
status: enforced
applies-to: "**"
---

# `git/minimal-commits`

**Severity:** warning · **Status:** enforced · **Applies to:** repository-wide

## What

A pull request should be a short series of commits — ideally one. In
particular, one file should not be changed by several commits in a row.

## Why

Adding an identifier is one change. Split across six commits it is six things
to read, and the reviewer has to reconstruct what the final state is before
they can judge it.

The usual cause is the GitHub web editor, which commits once per save. A
contributor adding a directory through the browser produces "Add initial
README", "Create .htaccess", "Update repository links in README.md", "Fix
contact email format" — four commits for one small change, three of which are
corrections to the first.

Squashing is not about tidiness. It is about the reviewer being able to see
what you are actually asking for.

## Wrong

```
$ git log --oneline origin/master..HEAD
87738437 Fix contact email format in README
ee4102a0 Update repository links in README.md
d3389e3a Create .htaccess with URL rewrite rules
c885985a Add initial README
```

## Right

```
$ git log --oneline origin/master..HEAD
a1b2c3d4 Add redirect for my-project
```

## How to fix

```sh
git rebase -i origin/master
```

Mark every commit after the first as `squash`, save, and write one message for
the combined change. Then force-push your branch:

```sh
git push --force-with-lease
```

If you would rather a maintainer did it, say so in the pull request — the
template has a checkbox for exactly that.

## Checked by

`git/minimal-commits`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js --base origin/master
```

## See also

- [`git/no-merge-commits`](./no-merge-commits)
- [`git/descriptive-commit-message`](./descriptive-commit-message)
