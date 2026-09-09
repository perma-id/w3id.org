---
id: files/htaccess-required
title: An identifier directory needs an .htaccess
severity: warning
status: enforced
applies-to: "ids/**"
---

# `files/htaccess-required`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

A directory under `ids/` must contain an `.htaccess`, or contain a
sub-directory that does.

## Why

The `.htaccess` is the only thing that makes an identifier resolve. Without
one — anywhere in the directory or below it — `https://w3id.org/my-project/`
returns 404, and the directory is doing nothing but occupying a name.

A directory that exists only to group sub-identifiers is fine and is not
reported:

```
ids/my-org/
├── project-a/.htaccess
└── project-b/.htaccess
```

`ids/my-org/` has no rules of its own, but everything under it resolves.

## Wrong

```
ids/my-project/
└── README.md
```

Nothing here answers a request.

## Right

```
ids/my-project/
├── .htaccess
└── README.md
```

## How to fix

Add the file. The smallest useful one:

```apache
RewriteEngine on
RewriteRule ^$ https://example.org/my-project/ [R=302,L]
```

If the directory was left behind by a change that removed its rules, remove
the directory too.

## Checked by

`files/htaccess-required`, in this repository's checker:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```

## See also

- [`files/no-empty-htaccess`](./no-empty-htaccess)
- [`htaccess/rewrite-engine-required`](../htaccess/rewrite-engine-required)
