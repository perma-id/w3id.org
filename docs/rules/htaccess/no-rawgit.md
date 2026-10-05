---
id: htaccess/no-rawgit
title: Redirect targets must not use RawGit
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-rawgit`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

A redirect target must not use `rawgit.com` or `cdn.rawgit.com`. Use jsDelivr
for files, or GitHub Pages for pages meant to be read.

## Why

RawGit has shut down. Its [repository](https://github.com/rgrove/rawgit) is
archived, with a notice to use jsDelivr instead.

- **`rawgit.com` returns 404.** An identifier redirecting there does not
  resolve.
- **`cdn.rawgit.com` only forwards to jsDelivr.** It works today because a
  shut-down service still answers, and it can stop without notice.

jsDelivr serves the same files from GitHub, and it is what RawGit's notice
points to. It also sends a real content type for RDF — `text/turtle`,
`application/rdf+xml`, `application/ld+json` — which
`raw.githubusercontent.com` does not.

## Wrong

```apache
RewriteRule ^vocab$ https://rawgit.com/user/repo/master/vocab.ttl [R=303,L]
RewriteRule ^vocab$ https://cdn.rawgit.com/user/repo/v1.0/vocab.ttl [R=303,L]
```

## Right

```apache
RewriteRule ^vocab$ https://cdn.jsdelivr.net/gh/user/repo@v1.0/vocab.ttl [R=303,L]
```

## How to fix

Move the ref after an `@`:

```
https://rawgit.com/user/repo/REF/path/file.ttl
https://cdn.rawgit.com/user/repo/REF/path/file.ttl
https://cdn.jsdelivr.net/gh/user/repo@REF/path/file.ttl
```

The finding names the exact URL to use. Check that it returns the file and the
content type you expect:

```sh
curl -sIL https://cdn.jsdelivr.net/gh/user/repo@v1.0/vocab.ttl \
  | grep -iE '^(HTTP|content-type)'
```

Two things to know about jsDelivr:

- **It serves HTML as `text/plain`**, so a browser shows the source. For a
  documentation page, use the repository's GitHub Pages site instead.
- **It caches a branch**, so a push to `master` can take a while to appear.
  A URL naming a tag or a commit always serves the same file.

## How to check

Run `w3id-check` with `--rule htaccess/no-rawgit` to check this rule on its
own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/no-rawgit ids/my-project
```

This is a critical rule, so `w3id-check --triage` lists every identifier in the
tree that still uses RawGit.

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/github-raw-target`](./github-raw-target)
- [`htaccess/https-target`](./https-target)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
