# AGENTS.md

Instructions for AI coding agents working in this repository.

## What this repository is

w3id.org is a **permanent URL redirection service**. This repository is the
Apache document root. `ids/` contains one directory per identifier, and each
one holds an `.htaccess` file with Apache rewrite rules.

`ids/my-project/` serves `https://w3id.org/my-project/`.

## What a change here is allowed to be

**A redirect, plus contact information. Nothing else.**

This constraint is absolute and it is the thing agents get wrong most often.
The service does not host files, serve content, run code, proxy, or
authenticate. If the task appears to require any of those, the task is
misconceived — say so rather than producing a plausible-looking approximation.

Read `docs/overview/scope.md` before doing anything else.

## Which task is this?

**Adding a new identifier** → `docs/guides/create-an-id.md`

**Changing an existing identifier** → `docs/guides/maintain-an-id.md`.
Check whether the user is a listed maintainer of that directory first.

**Writing or debugging rewrite rules** → `docs/guides/htaccess.md`, and
`docs/guides/content-negotiation.md` if `Accept` headers are involved.

**Editing this documentation** → `docs/`, built with VitePress. See
[Working on the docs](#working-on-the-docs) below.

## Hard rules

Full explanations, with the failure each one causes, are in `docs/rules/`.
One file per rule; a rule's id is its path under `docs/rules/` without the
`.md`. This is a summary, not the whole catalogue — read `docs/rules/index.md`
for all of it.

Do not:

- **Commit content files.** No `.ttl`, `.owl`, `.rdf`, `.nt`, `.jsonld`,
  `.json`, `.html`, images, or PDFs under `ids/`. Not even small ones.
  → `docs/rules/files/only-allowed-names.md`
- **Touch anything outside the identifier directory you were asked about.**
  Not the root `README.md`, not `ids/index.html`, not `ids/.htaccess`, not
  another project's directory. → `docs/rules/tree/only-own-identifier.md`
- **Name the file anything but `.htaccess`.** Not `htaccess.txt`.
  → `docs/rules/files/only-allowed-names.md`
- **Put a space inside the `[...]` flag list.** `[R=302, L]` returns 500 for
  every URL in the directory. → `docs/rules/htaccess/no-flag-whitespace.md`
- **Start a pattern with `/`, or repeat the directory name in it.** The pattern
  matches the path *relative to the directory*. A wrong prefix silently never
  matches. → `docs/rules/htaccess/pattern-relative-to-dir.md`
- **Add `Options` directives.** They are usually unnecessary for a redirect,
  and `-Indexes` causes a 403 on the bare identifier URL. Do not strip an
  existing one from a file you did not write either: whether `-MultiViews` is
  load-bearing is an open question.
  → `docs/rules/htaccess/no-options-directive.md`
- **Add a `[R=406]` catch-all.** It matches every real request.
  → `docs/rules/htaccess/no-406-fallback.md`
- **Copy an `.htaccess` from elsewhere in `ids/` as a template.** There are
  thousands of them, written by more than a thousand people, and many are
  copies of copies. A pattern appearing in hundreds of files is evidence that it
  was easy to copy, not that it is correct — one malformed CORS header reached hundreds
  of files that way. → `docs/rules/htaccess/valid-cors-header.md`
- **Use `301`.** Caches may honour it forever, so a mistake cannot be retracted.
  Use `302`, or `303` for content-negotiated ontology IRIs.
  → `docs/rules/htaccess/avoid-permanent-redirect.md`
- **Redirect to `http://`, a bare IP, or a `github.com/.../blob/...` URL.**
  → `docs/rules/htaccess/https-target.md`, `docs/rules/htaccess/github-raw-target.md`
- **Write `Update .htaccess` as a commit message.** It is already the most
  common message in this repository. Name the project and say what changed.
  → `docs/rules/git/descriptive-commit-message.md`

And do include:

- **`RewriteEngine on`** in every `.htaccess` you write. Without it none of your
  rules run. → `docs/rules/htaccess/rewrite-engine-required.md`

Always include maintainer contact with a **GitHub username**, in `.htaccess`
comments or `README.md`. Either is fine; a `README.md` is not required.
→ `docs/rules/meta/maintainer-github-username.md`

## The minimal correct identifier

```apache
# # /my-project/
#
# https://w3id.org/my-project/ redirects to https://example.org/
#
# ## Contact
# This space is administered by:
#
# Firstname Lastname
# firstname@example.org
# GitHub username: exampleuser

RewriteEngine on
RewriteRule ^(.*)$ https://example.org/$1 [R=302,L]
```

Note what is absent: no `Options`, no `RewriteBase`, no `AddType`, no
`RewriteCond`. Add a directive only when you can state what breaks without it.

## Before you claim the work is done

1. Run the checker. It reports what your own change is responsible for,
   including uncommitted work:

   ```sh
   (cd tools/check && npm ci)   # once
   node tools/check/bin/w3id-check.js
   ```

   Every finding names a rule id with a page under `docs/rules/<id>.md`. Fix
   findings; do not suppress them. A clean run is necessary but **not
   sufficient** — rules marked `status: proposed` have no check behind them, and
   nothing here can tell whether your redirect points at the right place.

2. Confirm the diff touches only the intended identifier directory:

   ```sh
   git diff --stat origin/master
   ```

3. Confirm no content files were added. An identifier directory holds
   `.htaccess` plus, optionally, a README — in any format GitHub renders,
   though `README.md` is the convention:

   ```sh
   git diff --name-only origin/master -- ids/ \
     | grep -viE '/(\.htaccess|README(\.(md|markdown|mdown|mkdn|adoc|asciidoc|asc|rst|org|textile|rdoc|creole|mediawiki|wiki|pod|txt))?)$'
   ```

   This should print nothing. Anything it does print is a content file, and
   content files do not belong here — see
   `docs/rules/files/only-allowed-names.md`.

4. Confirm the redirect target actually resolves, and returns the content type
   you expect:

   ```sh
   curl -sIL https://example.org/vocab.ttl | grep -iE '^(HTTP|content-type)'
   ```

5. Exercise the rules against a real Apache if you can — see
   `docs/guides/testing.md`. At minimum, hand-trace one request through each
   rule and state what the pattern matches and what `$1` contains.

Report honestly which of these you actually ran. Do not describe a redirect as
"tested" when you only read it.

## Working on the docs

The documentation site lives in `docs/` and is built with VitePress. This
toolchain is **only** for changes to `docs/` — adding or updating an identifier
needs no Node, no npm, and no build step.

```sh
cd docs
npm ci
npm run dev      # local preview
npm run build    # fails on dead internal links; this is what CI runs
```

The published site is <https://docs.w3id.org/>, also reachable at
<https://w3id.org/docs/>. Machine-readable copies are at
`https://w3id.org/docs/llms.txt` and `https://w3id.org/docs/llms-full.txt`, and
any page is available as raw Markdown by appending `.md` to its URL.

Prefer the relative repository paths above when linking from agent-facing files,
so they still work in a fork or offline.

### Rule pages

Files in `docs/rules/` are the machine-readable rule catalogue. Each has YAML
frontmatter with `id`, `title`, `severity`, `status`, and `applies-to`. The `id`
always equals the page's path under `docs/rules/` without the `.md`, so
`docs/rules/htaccess/no-double-slash.md` has id `htaccess/no-double-slash`.

The checker in `tools/check/` enforces that correspondence both ways via
`meta/rule-docs-exist`: every rule needs a page, every page claiming
`status: enforced` needs a rule, and an `id` must match its path. Keep the
format intact when editing, and add new rules as new files rather than as
sections of existing ones.

### News posts

A post is one file, `docs/news/<date>-<slug>.md`, where the date is written
`YYYY-MM-DD`, with this frontmatter:

```yaml
---
title: A sentence, not a headline
id: urn:uuid:6a632748-c0fc-408b-bd83-886b3141c36a
date: 2026-09-10
categories: [tooling]
summary: One sentence. It appears on the index and as the feed description.
---
```

`id` is the post's **permanent identifier**, and it is what feed readers use to
recognise the post. Mint one with `uuidgen`, prefix it with `urn:uuid:`, and
keep it lowercase. **Never change it after the post is published**, and never
copy one from another post — a shared id makes two posts collide into a single
entry in every subscriber's reader, and no later fix reaches the copies they
have already stored. The date and the URL may change; this may not.

`categories` is a list, and every entry must be a key in
`docs/news/schema.js` — currently `service`, `policy`, `tooling`,
`governance`.

The build **fails**, naming the file, if a post has no `id` or one that is not
a lowercase `urn:uuid:`, if two posts share an `id`, if a category is not in
that list, or if `title`, `date` or `summary` is missing. Run `npm run build`
in `docs/` before you claim a post is finished.

Adding the file is the whole job. The index at `docs/news/index.md` builds
itself from the frontmatter of every post, the RSS and Atom feeds are generated
at build time by `docs/.vitepress/buildEnd.js`, and the sidebar links the index
rather than the posts. Do not hand-edit any of those to add a post; nothing
about a new post belongs in `docs/.vitepress/config.js`.

Use the frontmatter `date` as the published date. VitePress's own `lastUpdated`
is derived from the file's last commit, so it moves when somebody fixes a typo
years later; the two answer different questions.

## A note on generated pull requests

This project receives a large volume of machine-generated pull requests that
are confident, well-formatted, and wrong — usually because they treat the
service as a file host, copy a broken template from a neighbouring directory,
or add directives nobody needed.

Correcting one costs a volunteer reviewer more time than writing it by hand
would have. If you are not confident the change is right, say so instead of
opening it.
