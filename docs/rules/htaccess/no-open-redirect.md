---
id: htaccess/no-open-redirect
title: Do not build the target hostname from the request
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-open-redirect`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

The hostname a redirect sends people to must be written literally in the file.
Do not build it out of a value captured from the requested URL.

## Why

A rule like this lets the visitor choose where they end up:

```apache
RewriteRule ^([^/]+)/schema/(.*)$ https://service.$1/templates/$2 [R=302,L]
```

Request `https://w3id.org/my-project/evil.example/schema/x` and w3id.org
redirects to `https://service.evil.example/`. Anyone can craft a w3id.org link
that lands on a host they control, with this service's reputation behind it.

That is a phishing primitive, and a durable one — w3id.org URLs are meant to be
stable for decades and are widely trusted in exactly the communities that would
follow one without looking.

Using the captured value in the **path** is fine. It is only the hostname that
matters.

## Wrong

```apache
# visitor picks the parent domain
RewriteRule ^([^/]+)/schema/(.*)$ https://service.$1/t/$2 [R=302,L]

# visitor picks the whole host
RewriteRule ^go/([^/]*)/(.*)$ https://$1/$2 [R=302,L]

# capture appended to a hostname: .evil.example makes it a different host
RewriteRule ^data(.*)$ https://files.example.org$1 [R=302,L]
```

## Right

```apache
RewriteRule ^([^/]+)/schema/(.*)$ https://service.example.org/$1/t/$2 [R=302,L]
```

The hostname is fixed; the captured values go in the path.

## How to fix

Write the destination hostname out in full. If you genuinely need to send
requests to several different hosts, enumerate them:

```apache
RewriteRule ^alpha/(.*)$ https://alpha.example.org/$1 [R=302,L]
RewriteRule ^beta/(.*)$  https://beta.example.org/$1  [R=302,L]
```

## Checked by

`htaccess/no-open-redirect`, in this repository's checker:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```


The check reasons about where the capture lands and what it can contain, so a
capture whose character class cannot produce a dot or a slash — and therefore
cannot change the host — is not reported.

## See also

- [`htaccess/https-target`](./https-target)
- [`htaccess/allowed-directives`](./allowed-directives)
