---
id: tree/only-own-identifier
title: Keep a change to one identifier
severity: warning
status: enforced
applies-to: "**"
---

# `tree/only-own-identifier`

**Severity:** warning · **Status:** enforced · **Applies to:** repository-wide

## What

A change that adds or updates an identifier should touch only that
identifier's directory under `ids/`.

Three things are reported, none of them fatal:

- editing **shared infrastructure** — `ids/.htaccess`, `ids/index.html`,
  `ids/.utils/` — alongside an identifier;
- touching **more than one identifier** in the same change;
- touching files **outside `ids/`**, which is only a notice.

## Why

Three failure modes, all of which have happened here.

**Overwriting the repository README.** A project's own README gets uploaded
over the repository's, replacing the service documentation with a project
description. This is easy to do by accident with GitHub's "Add files via
upload", easy to miss in review, and has to be reverted.

**Changing someone else's identifier.** Another project's `.htaccess` gets
replaced wholesale with an unrelated redirect. From the diff alone that is
indistinguishable from a namespace hijack, and the affected maintainer has no
warning.

**Editing shared infrastructure.** `ids/.htaccess` applies to the entire
service and `ids/index.html` is the public homepage. A change there affects
every identifier and belongs in its own pull request, reviewed on its own
terms.

This rule reports rather than blocks, because all three are sometimes
deliberate: maintainers edit the rest of the repository as a matter of course,
and a documentation fix alongside a redirect is reasonable. The case worth
catching is the unintentional one, and the answer to that is visibility.

## Wrong

```
 README.md                        | 164 +++-----------------
 ids/my-project/.htaccess         |   8 ++
```

```
 ids/other-project/.htaccess      |  12 +--
 ids/my-project/.htaccess         |   8 ++
```

## Right

```
 ids/my-project/.htaccess         |   8 ++
 ids/my-project/README.md         |  14 ++
```

## How to fix

Check what your change actually touches before opening the pull request:

```sh
git diff --stat origin/master
```

Everything listed should be under your own directory. If something else
appears, revert it:

```sh
git checkout origin/master -- README.md
```

**If you genuinely need to change a directory you do not maintain**, that is
allowed — open it as its own pull request, say why, and tag one of the
maintainers listed in that directory to approve it.

**If you want to change the service documentation**, edit `docs/` and say so.
That is a separate pull request too.

## How to check

Run `w3id-check` with `--rule tree/only-own-identifier` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.
This rule looks at your commits rather than your files, so it needs a base to
compare against; narrowing it to a path would not change what it reports.

```sh
node tools/check/bin/w3id-check.js --rule tree/only-own-identifier --base origin/master
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`tree/no-case-collision`](./no-case-collision)
- [`git/minimal-commits`](../git/minimal-commits)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
