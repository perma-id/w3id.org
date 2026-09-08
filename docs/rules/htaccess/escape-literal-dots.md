---
id: htaccess/escape-literal-dots
title: Escape literal dots in patterns
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/escape-literal-dots`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

A `.` in a `RewriteRule` pattern matches *any single character*. To match a
literal dot — in a filename, a version number, or a media type — escape it as
`\.`.

## Why

`^vocab.ttl$` looks like it matches `vocab.ttl`, and it does. It also matches
`vocabXttl`, `vocab-ttl`, `vocab1ttl`, and every other single character in that
position.

That is rarely what you want, and it produces redirects for URLs you never
intended to serve — which then fail at the destination, giving the user a 404
from your server instead of a clean 404 from w3id.org. In a versioned scheme it
can silently route one version's requests to another.

The same applies inside `RewriteCond` patterns, where media types are the usual
victim: `application/ld+json` is a regular expression in which `+` means "one or
more of the preceding character".

## Wrong

```apache
RewriteRule ^vocab.ttl$ https://example.org/vocab.ttl [R=303,L]
RewriteRule ^(1.0.0)$ https://example.org/$1/vocab.ttl [R=303,L]

RewriteCond %{HTTP_ACCEPT} application/ld+json
```

## Right

```apache
RewriteRule ^vocab\.ttl$ https://example.org/vocab.ttl [R=303,L]
RewriteRule ^(1\.0\.0)$ https://example.org/$1/vocab.ttl [R=303,L]

RewriteCond %{HTTP_ACCEPT} application/ld\+json
```

A version pattern in general:

```apache
RewriteRule ^([0-9]+(\.[0-9]+)*)$ https://example.org/$1/vocab.ttl [R=303,L]
```

Dots in the **substitution** are literal and need no escaping — only the pattern
is a regular expression.

## How to fix

Escape every `.` in the pattern that is meant to be a literal dot.

A dot that is a deliberate wildcard is not reported: `(.*)`, `(.+)` and `.?`
are all doing their job, and so is a dot inside a character class. The check
looks only for a dot followed by something shaped like a file extension, which
is where the mistake actually lives.

## Checked by

`htaccess/escape-literal-dots`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


## See also

- [`htaccess/no-greedy-capture`](./no-greedy-capture)
- [`htaccess/anchor-patterns`](./anchor-patterns)
