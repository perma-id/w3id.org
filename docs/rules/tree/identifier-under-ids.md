---
id: tree/identifier-under-ids
title: Identifier directories must be under ids/
severity: error
status: enforced
applies-to: "**/.htaccess"
---

# `tree/identifier-under-ids`

**Severity:** error · **Status:** enforced · **Applies to:** `**/.htaccess`

## What

An identifier's directory goes under `ids/`. An `.htaccess` anywhere else in
the repository is reported.

## Why

Only `ids/` is served. `my-project/.htaccess` at the repository root is never
read by the server, so `https://w3id.org/my-project/` does not resolve, however
correct the rules inside it are.

Nothing else catches it. The other identifier rules look under `ids/`, and a
change that touches nothing there looks like documentation or tooling work. Pull
requests in this shape have been merged and then had to be reverted.

It usually comes from a fork made before identifiers moved into `ids/`, or from
instructions written before then, including generated ones.

## Wrong

```
my-project/.htaccess
my-project/README.md
```

## Right

```
ids/my-project/.htaccess
ids/my-project/README.md
```

## How to fix

Move the directory under `ids/`:

```sh
git mv my-project ids/my-project
```

In the GitHub web interface, edit each file and change its path at the top of
the editor from `my-project/.htaccess` to `ids/my-project/.htaccess`.

If your fork predates the move, update it first, or the move will collide with
other changes: see [`git/branch-not-stale`](../git/branch-not-stale).

## How to check

Run `w3id-check` with `--rule tree/identifier-under-ids` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule tree/identifier-under-ids
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`tree/only-own-identifier`](./only-own-identifier)
- [Creating an identifier](/guides/create-an-id)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
