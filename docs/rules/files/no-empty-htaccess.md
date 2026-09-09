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

## How to fix

Write the redirect, or remove the directory so the name is free for somebody
who will use it.

## Checked by

`files/no-empty-htaccess`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```

## See also

- [`files/htaccess-required`](./htaccess-required)
- [`htaccess/rewrite-engine-required`](../htaccess/rewrite-engine-required)
