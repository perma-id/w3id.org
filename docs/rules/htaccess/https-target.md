---
id: htaccess/https-target
title: Redirect to HTTPS, not HTTP
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/https-target`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

Redirect targets should use `https://`.

## Why

w3id.org is HTTPS-only precisely so that identifier resolution cannot be
tampered with in transit. A secure redirect to an insecure destination throws
that away at the last step: an attacker on the path to your server can
substitute the ontology, the context file, or the credential schema being
fetched, and the client has no way to tell.

It also produces mixed-content failures. A page loaded over HTTPS cannot fetch
`http://` resources — browsers block the request outright — so an `http://`
target simply does not work for browser-based clients, whatever the security
argument.

A large share of rules in this repository still target `http://`. Most of those
destinations now support HTTPS and the rule was just never updated.

## Wrong

```apache
RewriteRule ^(.*)$ http://example.org/vocab/$1 [R=302,L]
```

## Right

```apache
RewriteRule ^(.*)$ https://example.org/vocab/$1 [R=302,L]
```

## How to fix

Check whether the destination supports HTTPS — most do now:

```sh
curl -sI https://example.org/vocab/vocab.ttl | head -n 1
```

If it does, change the scheme. If it does not, that host is not a suitable
target for a permanent identifier; get a certificate on it (Let's Encrypt is
free) or move the content somewhere that has one.

A bare IP address is worse again: it cannot present a valid TLS certificate for
a hostname, ties the identifier to one specific machine, and will break when the
host is renumbered — which, over the decades an identifier is meant to last, it
will be. Put a real hostname in front of it and point the identifier at that.

## Checked by

`htaccess/https-target`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


## See also

- [`htaccess/github-raw-target`](./github-raw-target)
- [`htaccess/no-open-redirect`](./no-open-redirect)
