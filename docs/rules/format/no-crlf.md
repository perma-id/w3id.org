---
id: format/no-crlf
title: Files must use Unix line endings
severity: warning
status: enforced
applies-to: "ids/**"
---

# `format/no-crlf`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

Files use **LF** line endings, not the CRLF pair that Windows tools write by
default.

## Why

Mixed with the LF endings used everywhere else, a CRLF file shows **every one
of its lines as changed** in a diff — including the ones you did not touch.
That buries the actual change and makes the history harder to read later.

In an `.htaccess` there is a second, sharper problem: a stray carriage return
at the end of a substitution URL becomes part of the redirect target. The rule
looks right and sends clients to a URL with an invisible control character on
the end.

Plenty of files in this repository already have CRLF endings.

## Wrong

```
$ file ids/my-project/.htaccess
ids/my-project/.htaccess: ASCII text, with CRLF line terminators
```

## Right

```
$ file ids/my-project/.htaccess
ids/my-project/.htaccess: ASCII text
```

## How to fix

Convert the file:

```sh
sed -i 's/\r$//' ids/my-project/.htaccess
```

Stop it happening again — this tells Git to store LF and convert on checkout:

```sh
git config core.autocrlf input
```

Better still, install [EditorConfig](https://editorconfig.org/) support in your
editor — most modern editors have it built in, some need a plugin — and the
repository's
[`.editorconfig`](https://github.com/perma-id/w3id.org/blob/master/.editorconfig)
will handle this for you on every file you save, along with the other
whitespace rules.

## Checked by

`format/no-crlf`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```

## See also

- [`format/final-newline`](./final-newline)
- [`format/no-bom`](./no-bom)
