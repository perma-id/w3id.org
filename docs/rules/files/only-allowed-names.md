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

## Why

**w3id.org is a redirection service, not a file host.** It answers requests
with an HTTP redirect; it does not serve documents. A `.ttl`, `.owl`,
`.jsonld` or `index.html` committed here is never served to anyone — the
redirect fires first — so it does nothing except sit in the repository.

It is not a size question. A one-line JSON-LD context is as out of scope as a
fifty-megabyte ontology. The repository is cloned in full onto the production
host and is shared infrastructure for over two thousand identifiers, so it is
deliberately kept to configuration only. This is the most common out-of-scope
contribution and it is reverted every time: one namespace needed six separate
deletion commits, and another single commit removed 4,843 lines of Turtle.

**A misnamed rules file does nothing at all.** Apache reads per-directory
configuration from a file with that exact name. `htaccess.txt` is just a file
sitting in the repository, the identifier resolves to a 404, and the
contributor cannot see why because the file is right there in the pull
request. At least 22 commits exist purely to rename it after the fact.

The usual cause is GitHub's web editor, which will not accept a filename
beginning with a dot typed into an empty filename box, so people save
`htaccess.txt` meaning to fix it later. Variants that have all happened here:
`htaccess.txt`, `htaccess.txt.txt`, `.htaccess.txt`, `htaccess`,
`default.htaccess`, and `ecsel-dr-prc-PMV.htaccess`.

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

## Checked by

`files/only-allowed-names`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```

## See also

- [`files/readme-canonical-name`](./readme-canonical-name)
- [`htaccess/github-raw-target`](../htaccess/github-raw-target)
