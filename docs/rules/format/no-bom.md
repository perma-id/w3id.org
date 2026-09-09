---
id: format/no-bom
title: Files must not begin with a byte order mark
severity: error
status: enforced
applies-to: "ids/**"
---

# `format/no-bom`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**`

## What

Files must be UTF-8 encoded with **no byte order mark**.

## Why

A byte order mark is three invisible bytes at the start of the file. Apache
reads them as part of the first directive, which usually makes that directive
unparseable — and an unparseable `.htaccess` returns **500 for every URL under
the directory**. The symptom is an identifier that is completely broken while
the file looks perfect in every editor.

This has happened here.

BOMs are added by some Windows editors, by Notepad, and by a few tools that
"helpfully" fix encodings. You will not see one by looking.

No file in the repository currently has one. This rule exists so that stays
true: of all the whitespace and encoding problems in these files, this is the
only one that takes an identifier off the air.

## Wrong

```
$ head -c 3 ids/my-project/.htaccess | xxd
00000000: efbb bf                                  ...
```

Those three bytes are a BOM.

## Right

```
$ file ids/my-project/.htaccess
ids/my-project/.htaccess: ASCII text
```

## How to fix

Check for one:

```sh
grep -rlI $'\xef\xbb\xbf' ids/my-project/
```

Remove it:

```sh
sed -i '1s/^\xef\xbb\xbf//' ids/my-project/.htaccess
```

Better still, install [EditorConfig](https://editorconfig.org/) support in your
editor — most modern editors have it built in, some need a plugin — and the
repository's
[`.editorconfig`](https://github.com/perma-id/w3id.org/blob/master/.editorconfig)
will handle this for you on every file you save, along with the other
whitespace rules.

## Checked by

`format/no-bom`, in this repository's checker:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```

## See also

- [`format/no-crlf`](./no-crlf)
- [`htaccess/no-flag-whitespace`](../htaccess/no-flag-whitespace)
