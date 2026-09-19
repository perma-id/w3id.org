---
title: A new layout, a rule checker, and a documentation site
id: urn:uuid:6a632748-c0fc-408b-bd83-886b3141c36a
date: 2026-09-11
categories: [service, tooling]
summary: >-
  Every identifier now lives under ids/, a checker runs the contribution rules
  on every pull request, there is a supported local Apache for testing, and
  the service has a documentation site.
---

# A new layout, a rule checker, and a documentation site

Several things changed at once. This post covers all of them.

## Everything moved under `ids/`

The identifier directories used to sit at the top level of the repository,
next to its own files. They are now all under `ids/`.

Three reasons, in rough order of how often they came up:

- **The repository had outgrown the GitHub web interface.** There were too
  many files and directories for it to display.
- **Basic information about the project was hard to find** among a couple of
  thousand identifier directories.
- **Hosted and non-hosted files were mixed together**, with nothing in the
  layout to say which was which.

It also clears the way for the rest of this post. Now that everything the
service actually serves is under one directory, tooling can tell the
identifiers apart from the repository's own files without guessing.

If you maintain an identifier, the change is only where the directory lives:
`https://w3id.org/my-project/` still resolves the same way, and your
`.htaccess` is unchanged.

## Contributions are now checked

There is a checker in `tools/check/`. It runs on every pull request and
reports only what your own change is responsible for — findings appear as
comments on the changed lines, with the full report under _Checks_, and each
one links to a page explaining the rule.

You can also run it by hand, over your own directory or over everything:

```sh
(cd tools/check && npm ci)   # once
node tools/check/bin/w3id-check.js ids/my-project
```

It finds thousands of issues across the tree today. They range from the
entirely benign — trailing whitespace, a missing newline at the end of a file
— to `.htaccess` errors serious enough that an identifier does not resolve at
all. A rewrite rule can look completely reasonable, be written correctly, and
never run.

**This needs testing, and the rules need your feedback.** Until now none of
these rules were written down anywhere, so this is the first time most of them
have met the tree. If the checker is wrong about your files, or if it stays
quiet about something it should have caught, that is worth reporting at
<https://github.com/perma-id/w3id.org/issues>. A rule that produces false
positives is a bug in the rule.

A clean run is necessary but not sufficient. No checker can tell whether your
redirect points where you meant it to.

## You can run the service locally

`tools/server/` has a supported Apache setup, so you can make a request to
your own rules and see what happens, rather than reasoning about it. There are
two ways in: a container, or an Apache you already have.

```sh
cd tools/server && docker compose up
```

The point of it is the module list. It loads what the production server loads
and nothing else, so a directive from a module production does not run fails
here too, at the moment you try it, instead of passing locally and breaking on
deploy. It aligns with production rather than matching it exactly —
[the guide](/guides/local-server) documents where it departs.

See [Testing your changes](/guides/testing) for which method to reach for.

## The documentation site

This site is new. Before it, a single `README.md` had to explain what a
permanent identifier service is, how Apache rewrite rules work, and what a
good contribution looks like, all at once.

It now holds:

- [What the service is for](/overview/) and, more to the point,
  [what it is not for](/overview/scope). Most pull requests that get sent back
  are not wrong so much as out of scope — the service redirects, and it does
  not host files, serve content, run code, or authenticate anyone.
- [Guides](/guides/) for the actual tasks:
  [creating an identifier](/guides/create-an-id) and
  [maintaining one](/guides/maintain-an-id), which covers the part nobody
  thinks about until it matters — moving your content without breaking the
  identifiers other people have published.
- [Writing `.htaccess` rules](/guides/htaccess), and
  [how to test them](/guides/testing).
- The [rule catalogue](/rules/). Each rule has a page saying what it is, why
  it exists, what breaking it actually causes, and how to fix it.
- An [FAQ](/faq).
- [News](/news/), which is where you are.

## A start on agent support

A growing share of contributions here are machine-generated: confident,
well-formatted, and wrong. The usual failure is treating the service as a file
host, or copying a broken `.htaccess` from a neighbouring directory on the
assumption that a pattern repeated in hundreds of files must be correct.

So there is now something for agents to read.
[`AGENTS.md`](https://github.com/perma-id/w3id.org/blob/master/AGENTS.md) in
the repository is written for them, with `CLAUDE.md` pointing at it. This site
is built with machine-readable output at
[`/llms.txt`](https://docs.w3id.org/llms.txt) and
[`/llms-full.txt`](https://docs.w3id.org/llms-full.txt), and any page is
available as raw Markdown by appending `.md` to its URL.

This is a first pass and it is thin. Agent skills for the common tasks would
be genuinely useful — **volunteers welcome.** Feedback on what is missing is
just as welcome.

## Coming soon

- More documentation.
- More rules.
- Revisions to the rules that are already here, based on feedback.

**What would you like to see?** Say so at
<https://github.com/perma-id/w3id.org/issues>.

## Corrections

This site is built from the [`docs/`
directory](https://github.com/perma-id/w3id.org/tree/master/docs) of the same
repository that holds the identifiers, and every page has an edit link at the
bottom. If something here is wrong, or was true once and is not any more, that
is worth a pull request.
