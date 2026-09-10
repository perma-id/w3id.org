---
id: format/final-newline
title: Files must end with a newline
severity: warning
status: enforced
applies-to: "ids/**"
---

# `format/final-newline`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

Every file ends with a newline character.

## Why

Git marks a file without one `\ No newline at end of file`, and the next change
that appends a line has to add the newline to your last line first — so your
line shows as modified in a diff you had nothing to do with.

It also means two files cannot be concatenated cleanly, and some shell tools
silently drop the final line.

None of this breaks an identifier. It is diff hygiene, which is why it is a
warning: worth fixing while you are here, not worth blocking a redirect over.

Hundreds of files in this repository are missing one.

## Wrong

```
$ tail -c 1 ids/my-project/.htaccess | xxd
00000000: 5d                                       ]
```

The file ends with `]`, not a newline.

## Right

```
$ tail -c 1 ids/my-project/.htaccess | xxd
00000000: 0a                                       .
```

## How to fix

```sh
printf '\n' >> ids/my-project/.htaccess
```

Better still, install [EditorConfig](https://editorconfig.org/) support in your
editor — most modern editors have it built in, some need a plugin — and the
repository's
[`.editorconfig`](https://github.com/perma-id/w3id.org/blob/master/.editorconfig)
will handle this for you on every file you save, along with the other
whitespace rules.

## How to check

Run `w3id-check` with `--rule format/final-newline` to check this rule on its
own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule format/final-newline ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`format/no-trailing-whitespace`](./no-trailing-whitespace)
- [`format/no-crlf`](./no-crlf)
