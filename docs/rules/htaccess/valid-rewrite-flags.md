---
id: htaccess/valid-rewrite-flags
title: Rewrite flags must be names mod_rewrite recognises
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/valid-rewrite-flags`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

Every name in a flag list must be a mod_rewrite flag, and `[R=...]` must carry
an HTTP status code.

## Why

Apache rejects a flag list it cannot parse, and a rejected directive makes the
whole file unparseable — 500 for every URL under the directory.

The failure mode worth knowing about is a typo in the status code. This is real,
and currently in the repository:

```apache
RewriteRule ^(.*)$ https://example.org/$1 [R=3-7,L]
```

`3-7` was meant to be `307`.

## Wrong

```apache
RewriteRule ^a$ https://example.org/ [R=3-7,L]
RewriteRule ^b$ https://example.org/ [R=302,Q]
```

## Right

```apache
RewriteRule ^a$ https://example.org/ [R=307,L]
RewriteRule ^b$ https://example.org/ [R=302,L]
```

## How to fix

Check the flag names against the
[mod_rewrite flag documentation](https://httpd.apache.org/docs/current/rewrite/flags.html).
Both the short and long spellings are valid — `[L]` and `[last]`, `[R=302]` and
`[redirect=302]` — and Apache matches them case-insensitively, so
[`htaccess/uppercase-rewrite-flags`](./uppercase-rewrite-flags) is style rather
than correctness.

`[R=...]` accepts any HTTP status, not only the 3xx family: given a code outside
300–399, mod_rewrite drops the substitution and ends the request with that
status. That is how `[R=406]` works, and why it is not reported here.

## How to check

Run `w3id-check` with `--rule htaccess/valid-rewrite-flags` to check this rule
on its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/valid-rewrite-flags ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/no-flag-whitespace`](./no-flag-whitespace)
- [`htaccess/uppercase-rewrite-flags`](./uppercase-rewrite-flags)
- [`htaccess/no-406-fallback`](./no-406-fallback)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
