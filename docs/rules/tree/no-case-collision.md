---
id: tree/no-case-collision
title: Directory names must not collide on case
severity: error
status: enforced
applies-to: "ids/**"
---

# `tree/no-case-collision`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**`

## What

An identifier directory name must not differ from an existing one only by
letter case.

## Why

macOS and Windows use case-insensitive filesystems by default. If `ids/Foo/`
and `ids/foo/` both exist, the repository **cannot be checked out** on those
platforms — Git either merges them into one directory or fails outright. That
breaks the working copy for a large share of contributors and maintainers, and
the failure is confusing because it has nothing to do with the file they were
editing.

Linux, where the production server runs, is case-sensitive, so the collision is
invisible until somebody clones the repository on a laptop.

The repository still contains one such pair, and the global `ids/.htaccess`
carries three rules that exist for no reason other than papering over past
collisions. Several identifiers have had to be renamed after the fact.

Lowercase names are preferred beyond just avoiding collisions — they remove the
question of which capitalisation a user should type — but that preference is
not mechanically checked.

## Wrong

Given that `ids/gcdfo/` already exists:

```
ids/GCDFO/       ← collides
ids/Gcdfo/       ← collides
```

## Right

```
ids/gcdfo-extended/
ids/my-project/
```

Lowercase letters, digits, and hyphens.

## How to fix

**Before you choose a name**, check case-insensitively for existing variants:

```sh
ls ids/ | grep -i '^my-project$'
```

**If you need to rename** a directory you already committed, do it in two steps
so Git records the change on case-insensitive filesystems too:

```sh
git mv ids/MyProject ids/myproject-tmp
git mv ids/myproject-tmp ids/my-project
```

**If you need both capitalisations to resolve** — an existing IRI used a
capitalised form and you are standardising on lowercase — do not create two
directories. Keep one, and ask a maintainer about adding a redirect rule for
the other form. Those rules live in the global `ids/.htaccess`, which is not a
file contributors edit themselves — see
[`tree/only-own-identifier`](./only-own-identifier).

## Checked by

`tree/no-case-collision`, in this repository's checker. The check needs the
whole tree to see a collision, so it works from a full checkout even when you
scope it to one directory:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```

## See also

- [`tree/only-own-identifier`](./only-own-identifier)
- [`files/readme-canonical-name`](../files/readme-canonical-name)
