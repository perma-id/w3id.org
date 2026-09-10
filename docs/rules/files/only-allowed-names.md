---
id: files/only-allowed-names
title: Only .htaccess and a README belong in an identifier directory
severity: error
status: enforced
applies-to: "ids/**"
---

# `files/only-allowed-names`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**`

## What

An identifier directory contains redirect rules and contact information, and
nothing else:

```
ids/my-project/
├── .htaccess
└── README.md
```

The `README.md` is optional. The rules file must be named **exactly**
`.htaccess` — lowercase, leading dot, no extension.

This rule accepts any README name GitHub will render — `readme.md`,
`README.adoc`, `README.rst` and the rest — because those are working files,
not mistakes. Preferring Markdown called `README.md` is a separate and much
softer matter: see [`files/prefer-readme-md`](./prefer-readme-md).

## Why

**w3id.org is a redirection service, not a file host.** It answers requests
with an HTTP redirect; it does not serve documents. A `.ttl`, `.owl`,
`.jsonld` or `index.html` committed here is never served to anyone — the
redirect fires first — so it does nothing except sit in the repository.

It is not a size question. A one-line JSON-LD context is as out of scope as a
fifty-megabyte ontology. The repository is cloned in full onto the production
host and is shared infrastructure for over two thousand identifiers, so it is
deliberately kept to configuration only. This is the most common out-of-scope
contribution, it arrives at every size, and it is reverted every time.

**A misnamed rules file does nothing at all.** Apache reads per-directory
configuration from a file with that exact name. `htaccess.txt` is just a file
sitting in the repository, the identifier resolves to a 404, and the
contributor cannot see why because the file is right there in the pull
request. Commits exist in this repository purely to rename it after the
fact.

The usual cause is GitHub's web editor, which will not accept a filename
beginning with a dot typed into an empty filename box, so people save
`htaccess.txt` meaning to fix it later. Variants that have all happened here:
`htaccess.txt`, `htaccess.txt.txt`, `.htaccess.txt`, `htaccess`,
`default.htaccess`, and `<project-name>.htaccess`.

## Wrong

```
ids/my-project/
├── htaccess.txt          ← not read by Apache; the identifier 404s
├── my-vocab.ttl          ← never served
├── context.jsonld        ← never served
├── index.html            ← never served
├── documentation/        ← never served
└── CONTRIBUTING.md       ← not this repository's business
```

Also seen and removed: `.gitignore` files, `DECISIONS.md`, test fixtures,
symlinks, `desktop.ini`, and editor history directories.

## Right

```
ids/my-project/
├── .htaccess
└── README.md
```

## How to fix

**For content files**, publish them somewhere you control and point the
identifier at them — GitHub Pages, your own site, a persistent archive such as
Zenodo, or a vocabulary server:

```apache
RewriteEngine on
RewriteRule ^vocab\.ttl$ https://example.org/vocab/vocab.ttl [R=303,L]
```

If you already committed them, remove them in the same pull request:

```sh
git rm ids/my-project/my-vocab.ttl ids/my-project/context.jsonld
```

**For a misnamed rules file in the GitHub web interface**, use **Add file →
Create new file** and type the *whole path* into the filename box, directories
included:

```
ids/my-project/.htaccess
```

Typing the path with directories in front is what makes GitHub accept the
leading dot. If you already committed the wrong name:

```sh
git mv ids/my-project/htaccess.txt ids/my-project/.htaccess
```

Locally, note that `.htaccess` is hidden from a plain `ls` — use `ls -a`, and
check that `git status` actually shows it.

## How to check

Run `w3id-check` with `--rule files/only-allowed-names` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule files/only-allowed-names ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`files/prefer-readme-md`](./prefer-readme-md)
- [`htaccess/github-raw-target`](../htaccess/github-raw-target)
