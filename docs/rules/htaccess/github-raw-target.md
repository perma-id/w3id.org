---
id: htaccess/github-raw-target
title: GitHub targets must be raw file URLs
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/github-raw-target`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

When redirecting to a file hosted on GitHub:

- use `raw.githubusercontent.com`, not `github.com/.../blob/...`;
- do not include a `refs/heads/` path segment.

## Why

**`/blob/` serves a web page, not a file.**
`https://github.com/user/repo/blob/main/vocab.ttl` returns an HTML document
with syntax highlighting, navigation, and a comment box. A triple store fetching
your ontology IRI gets that HTML and fails to parse it. The redirect looks
right, the URL opens fine in a browser, and every machine client breaks. Around
a hundred rules in this repository still do this.

The raw equivalent — `https://raw.githubusercontent.com/user/repo/main/vocab.ttl`
— returns the file itself.

**`refs/heads/` is redundant.** GitHub's web interface sometimes produces raw
URLs containing `refs/heads/main`. These work today, but the extra segment is an
implementation detail of GitHub's routing rather than a documented URL shape,
and it makes the target harder to read.

## Wrong

```apache
RewriteRule ^vocab\.ttl$ https://github.com/user/repo/blob/main/vocab.ttl [R=303,L]
RewriteRule ^vocab\.ttl$ https://raw.githubusercontent.com/user/repo/refs/heads/main/vocab.ttl [R=303,L]
```

## Right

```apache
# pinned to a release tag -- stable
RewriteRule ^vocab\.ttl$ https://raw.githubusercontent.com/user/repo/v1.2.0/vocab.ttl [R=303,L]
```

Or, if you deliberately want "whatever is current":

```apache
RewriteRule ^vocab\.ttl$ https://raw.githubusercontent.com/user/repo/main/vocab.ttl [R=303,L]
```

## How to fix

Convert a blob URL to a raw one:

```
https://github.com/user/repo/blob/main/path/vocab.ttl
https://raw.githubusercontent.com/user/repo/main/path/vocab.ttl
```

Then verify what actually comes back:

```sh
curl -sIL https://raw.githubusercontent.com/user/repo/main/vocab.ttl \
  | grep -iE '^(HTTP|content-type)'
```

Two things this rule deliberately does not tell you to do.

**Branch names move**, and a tag does not — but a branch target is the right
answer when you want whatever is current, so preferring a tag is advice rather
than a rule, and is not reported.

**GitHub Pages is often a better target than raw files at all.**
`raw.githubusercontent.com` serves everything as `text/plain`, so a correctly
negotiated request for `text/turtle` still arrives with the wrong content type
and some clients reject it. With Pages you control the content type and get a
real hostname you can move later without touching this repository.

## Checked by

`htaccess/github-raw-target`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


## See also

- [`htaccess/https-target`](./https-target)
- [`files/only-allowed-names`](../files/only-allowed-names)
