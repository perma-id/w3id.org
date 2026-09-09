---
id: htaccess/avoid-permanent-redirect
title: Prefer a temporary redirect over a permanent one
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/avoid-permanent-redirect`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

Use `302` for an ordinary redirect, or `303` when the identifier names a thing
and the target is a representation of it. Avoid `301` and `308`.

## Why

A permanent redirect tells every cache along the way that the answer will never
change, and caches are entitled to honour that indefinitely.

That makes a mistake unretractable. Correct the rule and the clients that
already saw the 301 keep going to the old target — for as long as their cache
decides, which may be forever. There is nothing this service can do about it,
and no way to tell how many are affected.

For an identifier meant to last decades, the ability to correct a target later
is the whole point. A 302 costs nothing and keeps it.

Hundreds of rules in this repository use `301`.

## Wrong

```apache
RewriteRule ^(.*)$ https://example.org/$1 [R=301,L]
Redirect 301 /my-project https://example.org/
```

## Right

```apache
RewriteRule ^(.*)$ https://example.org/$1 [R=302,L]
```

For an ontology IRI, where the identifier names a concept and the target is a
document describing it:

```apache
RewriteRule ^vocab\.ttl$ https://example.org/vocab.ttl [R=303,L]
```

## How to fix

Change the status code. If an identifier really has moved permanently and you
want callers to update their references, say so in the `README.md` — that
reaches humans, which a status code does not.

## Checked by

`htaccess/avoid-permanent-redirect`, in this repository's checker:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```


## See also

- [`htaccess/https-target`](./https-target)
- [`htaccess/no-406-fallback`](./no-406-fallback)
