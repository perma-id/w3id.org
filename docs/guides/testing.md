# Testing your changes

::: warning Automated checks help, but they cannot resolve your redirect
Every pull request is checked automatically against the
[rule catalogue](/rules/), and findings appear as comments on the changed lines.
Run the same checks yourself first — see [Run the checks](#run-the-checks)
below.

What they **cannot** tell you is whether your redirect actually goes where you
meant it to. No checker knows what your identifier is supposed to resolve to, or
whether the URL on the other end is alive. That part is this page.

A syntax error is also not a small failure: Apache returns **500 Internal Server
Error for every URL under that directory**, not just for the rule you got wrong.
:::

## Run the checks

The checker lives in `tools/check/` and reports only what your own change is
responsible for, including work you have not committed yet:

```sh
(cd tools/check && npm ci)   # once
node tools/check/bin/w3id-check.js
```

To look at one directory:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```

Each finding names a rule id, and every rule id has a page under
[`/rules/`](/rules/) explaining what to do about it. See
[`tools/check/README.md`](https://github.com/perma-id/w3id.org/blob/master/tools/check/README.md)
for the full set of options.

Not every rule is mechanized. A rule page marked `proposed` is documented but
not yet checked, so a clean run does not mean every rule on this site is
satisfied.

## The quickest check: read it again

Before running anything, re-read your `.htaccess` looking for these
specifically. They account for most of the breakage:

- A **space inside the flag brackets** — `[R=302, L]`. This is a 500.
  [`htaccess/no-flag-whitespace`](/rules/htaccess/no-flag-whitespace)
- A **leading slash or the directory name** in the pattern — `^/my-project/foo$`.
  This silently never matches.
  [`htaccess/pattern-relative-to-dir`](/rules/htaccess/pattern-relative-to-dir)
- An **unescaped dot** — `^vocab.ttl$`.
  [`htaccess/escape-literal-dots`](/rules/htaccess/escape-literal-dots)
- A **missing `$`** at the end of a pattern that should be exact.
  [`htaccess/anchor-patterns`](/rules/htaccess/anchor-patterns)
- A **doubled slash** in the substitution.
  [`htaccess/no-double-slash`](/rules/htaccess/no-double-slash)
- **`RewriteEngine on` missing** entirely.

## Check the redirect target exists

Independently of any rewrite rules, confirm the URL you are redirecting *to*
actually works:

```sh
curl -sIL https://example.org/vocab/vocab.ttl | head -n 20
```

Look for a final `200`, and check the `content-type` is what you expect. A
redirect to a `404`, or to an ontology served as `text/plain`, is a broken
identifier even though the rewrite rule is perfect.

If your target is on GitHub, check it is a `raw.githubusercontent.com` URL
rather than a `github.com/.../blob/...` page, and that it has no `refs/heads/`
segment. See [`htaccess/github-raw-target`](/rules/htaccess/github-raw-target).

## Run the rules locally

To actually exercise your `.htaccess` you need to serve the repository's `ids/`
directory with a real Apache — that is the document root on the live service, so
`ids/my-project/` is reachable at `/my-project/`.

There is a supported setup in `tools/server/`, configured to match the live
server. From the repository root:

```sh
cd tools/server && docker compose up
```

Then, in another terminal:

```sh
tools/server/bin/resolve-identifier my-project
```

That makes all the requests described below and prints the status and
`location:` for each one.

[Running a local server](./local-server) has the rest: the same thing without a
build step, a native Apache setup, HTTPS and self-signed certificates, how to
read the results, and what to do when it will not start.

## What to check

Run every one of these against your identifier. Use `-I` for headers only and
`-s` to suppress the progress meter.

### The identifier root

```sh
curl -sI http://localhost:8080/my-project/
```

Expect a `302` (or `303`) and a `location:` header pointing where you intended.

### The bare form, with no trailing slash

```sh
curl -sI http://localhost:8080/my-project
```

Because your identifier is a real directory, Apache first redirects this to
`/my-project/` with a `301`, and your rule fires on the second request. That
extra hop is normal and expected — do not try to eliminate it by adding
`DirectorySlash Off` or `Options -Indexes`, which is how you get a `403`. See
[`htaccess/no-options-directive`](/rules/htaccess/no-options-directive).

### Sub-paths

```sh
curl -sI http://localhost:8080/my-project/vocab
curl -sI http://localhost:8080/my-project/vocab/Thing
curl -sI http://localhost:8080/my-project/1.2.0
```

Include the paths you did *not* intend to match, and confirm they do something
sensible rather than landing on a rule by accident.

### Content negotiation

If you negotiate on `Accept`, check every format **and** the cases you did not
write a rule for:

```sh
for a in 'text/turtle' 'application/ld+json' 'application/rdf+xml' \
         'application/n-triples' 'text/html' '*/*'; do
  printf '%-24s ' "$a"
  curl -sI -H "Accept: $a" http://localhost:8080/my-vocab/ \
    | awk 'tolower($1)=="location:" || $1 ~ /^HTTP/ {printf "%s ", $2}'
  echo
done
```

Also check with **no** `Accept` header at all, and with a browser's real one:

```sh
curl -sI http://localhost:8080/my-vocab/
curl -sI -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
  http://localhost:8080/my-vocab/
```

Every one of these must produce a useful response. If any returns `406`, you
have the [406 catch-all problem](/rules/htaccess/no-406-fallback).

### Follow the whole chain

```sh
curl -sIL http://localhost:8080/my-project/vocab | grep -iE '^(HTTP|location)'
```

`-L` follows redirects, so you see the full chain and the final status. The last
line should be a `200`.

## After it is merged

Once a maintainer merges your pull request, the change is deployed to the
service and is normally live shortly afterwards. Check it for real:

```sh
curl -sIL https://w3id.org/my-project/ | grep -iE '^(HTTP|location)'
```

If something is wrong, open an issue describing what you expected and what you
got. Do not open another pull request changing the same rules until you know
what went wrong — a second guess on top of a first guess is harder for everyone
to unpick.
