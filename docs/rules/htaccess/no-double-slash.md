---
id: htaccess/no-double-slash
title: No doubled slashes in the redirect target
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-double-slash`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

The URL produced by a redirect must not contain `//` after the scheme.

## Why

`https://example.org/base//vocab.ttl` is not the same URL as
`https://example.org/base/vocab.ttl`. Many servers treat the two differently:
some normalise, some 404, some serve a directory listing, and some redirect
again. Static hosts such as GitHub Pages and S3 are among the strict ones.

It is also a different IRI to every RDF tool that sees it, which matters when
the identifier is what names your terms.

The redirect looks correct in the `.htaccess`, and the failure only shows up at
the destination — which makes it slow to diagnose, because the reported symptom
is "w3id.org is broken" when in fact w3id.org did exactly what it was told.

The cause is almost always a slash on both sides of a capture: the pattern
captures a leading or trailing `/`, and the substitution supplies one too. See
[`htaccess/no-greedy-capture`](./no-greedy-capture) for the greedy version of
the same mistake.

This has needed corrective commits here on at least five occasions.

## Wrong

```apache
# capture includes the leading slash, substitution adds another
RewriteRule ^(/.*)$ https://example.org/base/$1 [R=302,L]
#   /vocab  →  https://example.org/base//vocab

# literal doubled slash
RewriteRule ^(.*)$ https://example.org/contexts//$1 [R=302,L]
```

## Right

```apache
RewriteRule ^(.*)$ https://example.org/base/$1 [R=302,L]
#   vocab  →  https://example.org/base/vocab

RewriteRule ^(.*)$ https://example.org/contexts/$1 [R=302,L]
```

## How to fix

Trace one concrete request through the rule by hand. Write down the path as the
pattern sees it — relative to the directory, no leading slash, see
[`htaccess/pattern-relative-to-dir`](./pattern-relative-to-dir) — work out what
each capture contains, and substitute it in.

Then confirm with a real request:

```sh
curl -sI http://localhost:8080/my-project/vocab | grep -i '^location:'
```

## Checked by

`htaccess/no-double-slash`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


The check reads the literal text of the target, so it catches the doubled slash
you can see. The version that only appears once a capture is substituted needs
tracing by hand.

## See also

- [`htaccess/no-greedy-capture`](./no-greedy-capture)
- [`htaccess/pattern-relative-to-dir`](./pattern-relative-to-dir)
