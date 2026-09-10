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

## How to check

Run `w3id-check` with `--rule htaccess/uppercase-rewrite-flags` to check this
rule on its own; without it the tool runs every rule, as the pull request
checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/uppercase-rewrite-flags ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/valid-rewrite-flags`](./valid-rewrite-flags)
