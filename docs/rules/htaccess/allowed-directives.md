---
id: htaccess/allowed-directives
title: Only redirect-related directives may be used
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/allowed-directives`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

An identifier's `.htaccess` configures redirects. Directives that make the
server execute code, serve local files, proxy requests, or change access
control are not accepted.

## Why

This file runs on a server shared with every other identifier on the service.
A directive that reaches outside the redirect use case is a change to
infrastructure that two thousand other people depend on, arriving through a
pull request that looks like a routine namespace addition.

The `[P]` proxy flag deserves a specific mention. It does not redirect — it
makes w3id.org **fetch** the target and serve the response as its own. That
turns the service into an open proxy, puts its IP address behind whatever the
target does, and means the service is now serving content it never agreed to
host.

## Wrong

```apache
Options +ExecCGI
AddHandler cgi-script .cgi

RewriteEngine on
RewriteRule ^run$ https://example.org/thing [P]
```

## Right

```apache
RewriteEngine on
RewriteRule ^run$ https://example.org/thing [R=302,L]
```

## How to fix

Remove the directive. If you believe your identifier genuinely needs one of
them, open an issue describing what you are trying to do rather than putting it
in a pull request — the answer is usually that the behaviour belongs on the
server that hosts your content.

The refused set is: `RewriteMap`, `Include`, `IncludeOptional`, `AddHandler`,
`SetHandler`, `Action`, `Script`, `Alias`, `ScriptAlias`, the `Auth*` family,
`Satisfy`, the `php_*` family, `Options +ExecCGI`, `Options +Includes`,
`Options All`, and the `[P]` flag.

## How to check

Run `w3id-check` with `--rule htaccess/allowed-directives` to check this rule
on its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/allowed-directives ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/no-open-redirect`](./no-open-redirect)
- [`htaccess/no-options-directive`](./no-options-directive)
