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

A single `.htaccess` in this repository once gained this line:

```apache
Header set Access-Control-Allow-Headers DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified$
```

It is **truncated mid-token**. The value should end
`If-Modified-Since,Cache-Control`; instead it stops after `If-Modified` and
picks up a stray `$`.

Over the years since, that line was copied, verbatim and unexamined, into
**hundreds of files** — while barely any file here contains a correct
`If-Modified-Since`. It is the clearest illustration in this codebase of why
the existing tree is not a style guide: a string appearing everywhere is
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

## How to check

Run `w3id-check` with `--rule htaccess/valid-cors-header` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/valid-cors-header ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/allowed-directives`](./allowed-directives)
