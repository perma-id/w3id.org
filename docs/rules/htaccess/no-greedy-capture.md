---
id: htaccess/no-greedy-capture
title: A greedy capture before an optional slash swallows the slash
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-greedy-capture`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

`^(.+)/?$` does not do what it appears to. Where you mean "one path segment",
write `([^/]+)`.

## Why

In `^(.+)/?$`, the `.+` is greedy, so it consumes as much as it can — including
the trailing slash — before the optional `/?` gets a chance to match anything.
For a request to `vocab/`, the capture `$1` ends up as `vocab/` rather than
`vocab`.

Substitute that into a URL with its own slash and you get a doubled separator
and a broken path:

```
RewriteRule ^(.+)/?$ https://example.org/data/$1/thing.ttl
vocab/  →  https://example.org/data/vocab//thing.ttl
```

This exact pattern produced malformed ontology redirects in this repository and
had to be corrected.

## Wrong

```apache
RewriteRule ^(.+)/?$ https://example.org/data/$1/vocab.ttl [R=303,L]
```

## Right

```apache
# one segment, trailing slash optional and not captured
RewriteRule ^([^/]+)/?$ https://example.org/data/$1/vocab.ttl [R=303,L]
```

When you genuinely want to pass an arbitrary path straight through, `(.*)` is
correct — just do not add slashes around it. That form is **not** reported:

```apache
RewriteRule ^(.*)$ https://example.org/base/$1 [R=302,L]
```

## How to fix

Ask what `$1` should contain, then pick the narrowest expression that produces
it:

| You mean | Use |
| --- | --- |
| one path segment | `([^/]+)` |
| one optional path segment | `([^/]*)` |
| a version number | `([0-9]+(\.[0-9]+)*)` |
| a known file extension | `(ttl\|jsonld\|rdf\|nt)` |
| the whole remaining path, unchanged | `(.*)` |

Then check the result for doubled slashes — see
[`htaccess/no-double-slash`](./no-double-slash).

## How to check

Run `w3id-check` with `--rule htaccess/no-greedy-capture` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/no-greedy-capture ids/my-project
```

Only the `^(.+)/?$` shape is reported. Deciding that some other `(.+)` "should
have been" `([^/]+)` needs to know what the author meant.

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/no-double-slash`](./no-double-slash)
- [`htaccess/anchor-patterns`](./anchor-patterns)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
