---
id: htaccess/no-inline-comment
title: Apache has no inline comment syntax
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-inline-comment`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

A `#` only starts a comment at the beginning of a line. Text after a directive's
arguments is not ignored — it is passed to the directive as more arguments.

## Why

```apache
RewriteRule ^audio/ - [F] # block audio requests
```

Apache does not read that trailing text as a note to the reader. It reads it as
additional arguments to `RewriteRule`, and either misbehaves or refuses to parse
the file — which returns 500 for every URL under the directory.

There are files in this repository doing this today.

## Wrong

```apache
RewriteRule ^audio/ - [F] # block audio requests
SetEnvIf Accept ^ FILE_EXT=ttl    # the default
```

## Right

```apache
# block audio requests
RewriteRule ^audio/ - [F]

# the default
SetEnvIf Accept ^ FILE_EXT=ttl
```

## How to fix

Move the comment to its own line above the directive.

Note that a `#` inside a pattern or a URL is fine — it is only a problem when a
separate word beginning with `#` follows the directive's arguments. These are
both correct:

```apache
RewriteRule ^ont[/-]?prof(#[^/]+)?$ https://example.org/ [R=302,L]
RewriteRule ^doc$ https://example.org/page#section [R=302,L]
```

## How to check

Run `w3id-check` with `--rule htaccess/no-inline-comment` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/no-inline-comment ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/no-flag-whitespace`](./no-flag-whitespace)
