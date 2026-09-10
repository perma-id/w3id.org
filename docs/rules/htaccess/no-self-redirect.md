---
id: htaccess/no-self-redirect
title: Do not redirect back to w3id.org
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-self-redirect`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

A redirect target should be the final destination, not another w3id.org URL.

## Why

Every hop costs the client a round trip, and a hop back through w3id.org costs
the service one too — the request arrives, is redirected, comes back, and is
redirected again. At the scale this service runs, that is real traffic for no
benefit.

Worse, a rule that targets the identifier it is defined in **loops**. The
browser follows the redirect back to the same URL, matches the same rule, and
keeps going until it gives up. The identifier is unusable and the failure looks
like a browser problem rather than a configuration one.

## Wrong

```apache
# in ids/my-project/.htaccess -- redirects to itself, forever
RewriteRule ^$ https://w3id.org/my-project [R=302,L]
```

```apache
# an extra round trip through the service for no reason
RewriteRule ^vocab$ https://w3id.org/other-project/vocab [R=302,L]
```

## Right

```apache
RewriteRule ^vocab$ https://example.org/other/vocab [R=302,L]
```

If one identifier really should resolve to the same place as another, point both
at the destination.

## How to fix

Follow the chain to its end and target that:

```sh
curl -sIL https://w3id.org/other-project/vocab | grep -i '^location:'
```

If the identifier has genuinely been superseded and you want the old name to
keep working, a redirect within the service is acceptable — but write it as a
relative target so it does not leave the server:

```apache
RewriteRule ^(.*)$ /new-project/$1 [R=302,L]
```

## How to check

Run `w3id-check` with `--rule htaccess/no-self-redirect` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/no-self-redirect ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/avoid-permanent-redirect`](./avoid-permanent-redirect)
