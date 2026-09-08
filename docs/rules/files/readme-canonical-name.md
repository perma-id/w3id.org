---
id: files/readme-canonical-name
title: Name a README README.md
severity: warning
status: enforced
applies-to: "ids/**"
---

# `files/readme-canonical-name`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

If an identifier directory has a README, call it `README.md`.

## Why

GitHub recognises a wide range of README names and extensions, so
`readme.md`, `Readme.md` and `README.MD` all render exactly as `README.md`
does. **Nothing is broken.** This is a convention, not a fix: `README.md` is
the name the contributor instructions ask for, and the name tooling looks for.

There is one case where the name does change what a reader sees. A file
written as Markdown but *not* named `.md` — a `README` or `README.txt` opening
with a `#` heading — is shown verbatim, so its headings and links appear as
literal punctuation rather than being rendered. Five files in this repository
are in that state.

## Wrong

```
ids/my-project/readme.md      ← renders fine, wrong name
ids/my-project/README.MD      ← renders fine, wrong name
ids/my-project/README         ← if it contains Markdown, it is shown verbatim
```

## Right

```
ids/my-project/README.md
```

## How to fix

```sh
git mv ids/my-project/readme.md ids/my-project/README.md
```

On a case-insensitive filesystem — macOS, Windows — Git needs two steps to
record a change of case:

```sh
git mv ids/my-project/readme.md ids/my-project/readme-tmp.md
git mv ids/my-project/readme-tmp.md ids/my-project/README.md
```

## Checked by

`files/readme-canonical-name`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```

## See also

- [`files/readme-required`](./readme-required)
- [`files/only-allowed-names`](./only-allowed-names)
