---
id: files/no-empty-htaccess
title: An .htaccess must contain at least one directive
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `files/no-empty-htaccess`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

An `.htaccess` that is empty, or contains only comments, does not configure
anything.

## Why

An identifier whose rules file says nothing resolves to a 404. To anyone using
the identifier that is indistinguishable from an identifier that was never
created — except that the directory is there, so the name is taken.

This usually happens one of two ways: a file created as a placeholder and never
filled in, or a file whose rules were commented out during debugging and never
restored.

There are files in this repository in this state today.

## Wrong

```apache
# tbd
```

```apache
# Redirects for my-project
#RewriteEngine on
#RewriteRule ^$ https://example.org/ [R=302,L]
```

## Right

```apache
# Redirects for my-project
RewriteEngine on
RewriteRule ^$ https://example.org/ [R=302,L]
```

## The exception: a directory that only groups sub-identifiers

A directory may exist only to hold sub-identifiers that each resolve on their
own, and then it has no redirect of its own to carry:

```
ids/my-project/
├── .htaccess              ← comments only, and correct
├── v1/.htaccess           ← resolves
└── v2/.htaccess           ← resolves
```

Comments there are the recommended way to claim the root of such an identifier
— see [`meta/document-identifier-root`](../meta/document-identifier-root) — so
this rule stays quiet when a descendant `.htaccess` carries directives.
`files/htaccess-required` makes the same exception.

The check is for a *descendant that resolves*, not for comments that look
purposeful. A comments-only `.htaccess` with nothing below it is still an
error, because nothing under that name resolves at all. An empty file is
always an error: a zero-byte placeholder claims a name and serves nothing.

## How to fix

Write the redirect, or remove the directory so the name is free for somebody
who will use it.

## How to check

Run `w3id-check` with `--rule files/no-empty-htaccess` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule files/no-empty-htaccess ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`files/htaccess-required`](./htaccess-required)
- [`htaccess/rewrite-engine-required`](../htaccess/rewrite-engine-required)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
