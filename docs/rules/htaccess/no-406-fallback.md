---
id: htaccess/no-406-fallback
title: A content-negotiation chain should not end in 406
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-406-fallback`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

Prefer ending a content negotiation block with an unconditional redirect to your
HTML documentation, rather than a rule that returns `406 Not Acceptable`.

## Why

Answering 406 is a defensible choice. The identifier genuinely cannot serve what
was asked for, and saying so is honest — some authors mean exactly that, which
is why this is a warning and not an error.

One shape is worse than the rest, and it is the one that gets copied from
ontology templates:

```apache
RewriteCond %{HTTP_ACCEPT} .+
RewriteRule ^$ - [R=406,L]
```

The condition `.+` matches any non-empty `Accept` header. Every HTTP client
sends one — browsers, `curl`, triple stores, crawlers. So this rule matches
essentially every request that reaches it, and returns an error instead of a
redirect.

It appears to work while you are testing, because your earlier rules catch the
formats you thought to check. It fails for everything you did not: a browser
sending an `Accept` header your `text/html` condition does not quite match, a
client sending a wildcard media range, a tool sending `application/*`. Those
users get a 406 and have no idea why.

This has returned 406 for real requests here, in an identifier that repeated
the fallback several times over. Hundreds of identifiers carry the catch-all
shape.

And a 406 is usually just a worse answer. If somebody asks for a format you do
not publish, giving them your human-readable documentation tells them what does
exist. An error tells them nothing.

## Wrong

```apache
RewriteEngine on

RewriteCond %{HTTP_ACCEPT} text/turtle
RewriteRule ^$ https://example.org/vocab.ttl [R=303,L]

RewriteCond %{HTTP_ACCEPT} text/html
RewriteRule ^$ https://example.org/index.html [R=303,L]

# Everything else gets an error
RewriteCond %{HTTP_ACCEPT} .+
RewriteRule ^$ - [R=406,L]
```

## Right

```apache
RewriteEngine on

RewriteCond %{HTTP_ACCEPT} text/turtle
RewriteRule ^$ https://example.org/vocab.ttl [R=303,L]

RewriteCond %{HTTP_ACCEPT} application/ld\+json
RewriteRule ^$ https://example.org/vocab.jsonld [R=303,L]

# Default: anything else, including browsers, gets the documentation.
# No condition, so it always matches.
RewriteRule ^$ https://example.org/index.html [R=303,L]
```

## How to fix

Delete the 406 rule and make sure the last rule in the block is unconditional
and points at something useful.

Then check the cases the 406 was hiding:

```sh
curl -sI -H 'Accept: */*' http://localhost:8080/my-vocab/
curl -sI                  http://localhost:8080/my-vocab/
```

Neither should return 406.

## Checked by

`htaccess/no-406-fallback`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


The check distinguishes the two cases. A 406 behind a condition that matches any
`Accept` header gets the stronger message; a 406 behind a specific condition is
reported as the narrower, considered choice it probably is. Neither is an error.

## See also

- [`htaccess/valid-rewrite-flags`](./valid-rewrite-flags)
- [`htaccess/avoid-permanent-redirect`](./avoid-permanent-redirect)
