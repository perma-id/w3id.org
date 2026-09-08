---
id: htaccess/uppercase-rewrite-flags
title: Write rewrite flags in upper case
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/uppercase-rewrite-flags`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

Write flags as `[R=302,L]`, not `[r=302,l]`.

## Why

Apache accepts either spelling, so nothing is broken. Upper case is what the
mod_rewrite documentation uses, and it is what a reviewer reading the file
expects — a lower-case flag list reads as a typo and costs a moment's
double-take every time somebody looks at it.

This is the mildest rule in the set. It is here because it is free to fix.

## Wrong

```apache
RewriteRule ^$ https://example.org/ [r=302,l]
```

## Right

```apache
RewriteRule ^$ https://example.org/ [R=302,L]
```

## How to fix

Upper-case the flag names. Values keep their own case where they have one.

## Checked by

`htaccess/uppercase-rewrite-flags`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


## See also

- [`htaccess/valid-rewrite-flags`](./valid-rewrite-flags)
