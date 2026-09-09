---
id: htaccess/no-flag-whitespace
title: No whitespace inside the flag list
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-flag-whitespace`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

The `[...]` flag list at the end of a `RewriteRule` or `RewriteCond` must not
contain whitespace. Flags are separated by commas and nothing else.

## Why

Apache does not tolerate spaces in the flag list. It fails to parse the
directive, and an unparseable `.htaccess` makes the server return **500 Internal
Server Error for every URL under that directory** — not just for the rule that
contains the mistake.

So a single space takes the whole identifier offline, including sub-paths that
have nothing to do with the broken rule.

This has needed corrective commits in this repository on several separate
occasions, and instances are still present in the tree.

## Wrong

```apache
RewriteRule ^ https://example.org/ [R=302, L]
RewriteRule ^(.*)$ https://example.org/$1 [NC ,R=302,L]
RewriteRule ^vocab$ https://example.org/vocab [R=303, L]
```

## Right

```apache
RewriteRule ^ https://example.org/ [R=302,L]
RewriteRule ^(.*)$ https://example.org/$1 [NC,R=302,L]
RewriteRule ^vocab$ https://example.org/vocab [R=303,L]
```

## How to fix

Remove every space and tab between `[` and `]`.

If your identifier is returning 500 for everything, this is the first thing to
check.

## Checked by

`htaccess/no-flag-whitespace`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


Note that a plain search for whitespace between brackets is noisy — it matches
prose in comments and character classes in patterns. The check reads the parsed
flag argument instead, so it reports only genuine flag lists.

## See also

- [`htaccess/valid-rewrite-flags`](./valid-rewrite-flags)
- [`format/no-bom`](../format/no-bom)
