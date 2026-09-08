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

Eight files in this repository do this today.

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

## Checked by

`htaccess/no-inline-comment`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


## See also

- [`htaccess/no-flag-whitespace`](./no-flag-whitespace)
