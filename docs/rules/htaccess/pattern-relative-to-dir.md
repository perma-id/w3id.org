---
id: htaccess/pattern-relative-to-dir
title: Patterns are relative to the directory
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/pattern-relative-to-dir`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

In a per-directory `.htaccess`, the `RewriteRule` pattern is matched against the
request path **relative to the directory containing the file**, with the leading
slash stripped.

So the pattern must not start with `/`, and must not repeat the identifier's own
directory name.

## Why

Apache strips the directory prefix before matching. In
`ids/my-project/.htaccess`, a request for
`https://w3id.org/my-project/vocab/Thing` is matched against `vocab/Thing` —
not `/my-project/vocab/Thing`, and not `/vocab/Thing`.

A pattern with the wrong shape simply never matches. There is no error, no
warning, and no log entry that says what happened; the request falls through to
a **404**. That silence is what makes this worth checking mechanically — a
`.htaccess` that looks entirely reasonable can be completely inert.

Many rules in this repository have one of these two shapes.

## Wrong

In `ids/my-project/.htaccess`:

```apache
# leading slash -- never matches
RewriteRule ^/vocab$ https://example.org/vocab.ttl [R=303,L]

# repeats the directory name -- never matches
RewriteRule ^my-project/vocab$ https://example.org/vocab.ttl [R=303,L]

# both -- never matches
RewriteRule ^/my-project/vocab$ https://example.org/vocab.ttl [R=303,L]
```

## Right

```apache
RewriteRule ^vocab$ https://example.org/vocab.ttl [R=303,L]
```

For the identifier root itself — `https://w3id.org/my-project/` — the pattern
sees the empty string:

```apache
RewriteRule ^$ https://example.org/ [R=303,L]
```

## How to fix

Work out what the path looks like with the directory prefix removed, and match
that.

| Request | Pattern must match |
| --- | --- |
| `https://w3id.org/my-project/` | `` (empty) |
| `https://w3id.org/my-project/vocab` | `vocab` |
| `https://w3id.org/my-project/vocab/Thing` | `vocab/Thing` |
| `https://w3id.org/my-project/a/b/c` | `a/b/c` |

The defensive form `^/?vocab$` also appears in this repository. It works, and is
not reported, but it is a workaround for the confusion rather than a fix and it
obscures the actual rule. Prefer `^vocab$`.

A pattern that merely *starts with the same letters* as its directory —
`^my-project\.owl$` in `ids/my-project/` — is a filename, not a repeated
prefix, and is not reported.

## How to check

Run `w3id-check` with `--rule htaccess/pattern-relative-to-dir` to check this
rule on its own; without it the tool runs every rule, as the pull request
checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/pattern-relative-to-dir ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/anchor-patterns`](./anchor-patterns)
- [`htaccess/rewrite-engine-required`](./rewrite-engine-required)
