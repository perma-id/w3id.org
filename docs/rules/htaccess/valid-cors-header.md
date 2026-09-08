---
id: htaccess/valid-cors-header
title: Do not copy the truncated CORS header line
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/valid-cors-header`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

If you copy an `.htaccess` from elsewhere in this repository and it contains an
`Access-Control-Allow-Headers` line ending in `If-Modified$`, delete the line.

More generally: CORS headers belong on the server that actually serves your
content, not on the redirect.

## Why

In 2015 a single `.htaccess` in this repository gained this line:

```apache
Header set Access-Control-Allow-Headers DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified$
```

It is **truncated mid-token**. The value should end
`If-Modified-Since,Cache-Control`; instead it stops after `If-Modified` and
picks up a stray `$`.

Over the following ten years that line was copied, verbatim and unexamined,
into **223 files**. Only seven files in the repository contain a correct
`If-Modified-Since`. It is the clearest illustration in this codebase of why
the existing tree is not a style guide: hundreds of occurrences of a string is
evidence that it was easy to copy, not that it was ever right.

**CORS on a redirect does not do what people think.** When a browser makes a
cross-origin request to `https://w3id.org/my-vocab/` and gets a 303, it follows
the redirect and then applies the CORS check to the **final response** — the
one from your server. Headers set on the redirect do not authorise reading the
data. Whatever host actually serves `vocab.ttl` is what needs to send
`Access-Control-Allow-Origin`.

## Wrong

```apache
Header set Access-Control-Allow-Origin *
Header set Access-Control-Allow-Headers DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified$

RewriteEngine on
RewriteRule ^ https://example.org/vocab.ttl [R=303,L]
```

## Right

```apache
RewriteEngine on
RewriteRule ^ https://example.org/vocab.ttl [R=303,L]
```

And on **your** server, where `vocab.ttl` is served:

```
Access-Control-Allow-Origin: *
```

## How to fix

Delete the line. Then check that whatever serves your content sends CORS
headers:

```sh
curl -sI -H 'Origin: https://example.com' https://example.org/vocab.ttl \
  | grep -i 'access-control'
```

If that returns nothing, configure CORS there — that is the fix that actually
makes browser-based clients work.

A bare `Header set Access-Control-Allow-Origin "*"` on the redirect is not
reported. It is unnecessary but harmless, and only the malformed
`Allow-Headers` line is a mistake.

## Checked by

`htaccess/valid-cors-header`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


## See also

- [`htaccess/allowed-directives`](./allowed-directives)
