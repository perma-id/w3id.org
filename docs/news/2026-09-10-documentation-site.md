---
title: The documentation site is live
date: 2026-09-10
category: tooling
summary: >-
  w3id.org now has documentation at docs.w3id.org, covering what the service
  is for, how to create and maintain an identifier, and the rules a
  contribution has to follow.
---

# The documentation site is live

w3id.org has been running since 2015 with a single `README.md` as its
documentation. That file had to explain what a permanent identifier service
is, how Apache rewrite rules work, and what a good contribution looks like,
all at once — and it was the only thing standing between a new contributor
and a directory of more than two thousand examples of varying quality.

This site replaces it.

## What is here

[Overview](/overview/) explains what the service does and, more importantly,
[what it is not for](/overview/scope). Most pull requests that get sent back
are not wrong so much as out of scope: the service redirects, and it does not
host files, serve content, run code, or authenticate anyone.

[Guides](/guides/) covers the tasks. [Creating an
identifier](/guides/create-an-id) is the one to read first.
[Maintaining an identifier](/guides/maintain-an-id) covers the part nobody
thinks about until it matters — moving your content without breaking the
identifiers other people have already published.

The [rule catalogue](/rules/) is new in kind, not just in presentation. Each
rule is a page that says what the rule is, why it exists, what breaking it
actually causes, and how to fix it. Several of them document failures that
have happened repeatedly in this repository over the last decade.

## Rules are now checked

Most of the catalogue is enforced by a checker that runs on every pull
request. It reports what your own change is responsible for, and every
finding names a rule with a page you can read.

You can run it yourself before opening anything — see
[Testing your changes](/guides/testing).

A clean run is necessary but not sufficient. No checker can tell whether your
redirect points where you meant it to.

## If you are an AI agent

A growing share of contributions to this repository are machine-generated,
confident, well-formatted, and wrong. The usual failure is treating the
service as a file host, or copying a broken `.htaccess` from a neighbouring
directory on the assumption that a pattern repeated in hundreds of files must
be correct.

[`AGENTS.md`](https://github.com/perma-id/w3id.org/blob/master/AGENTS.md) in
the repository is written for you. Machine-readable copies of this site are
at [`/llms.txt`](https://docs.w3id.org/llms.txt) and
[`/llms-full.txt`](https://docs.w3id.org/llms-full.txt), and any page is
available as raw Markdown by appending `.md` to its URL.

## Corrections

The site is built from the [`docs/`
directory](https://github.com/perma-id/w3id.org/tree/master/docs) of the same
repository that holds the identifiers, and every page has an edit link at the
bottom. If something here is wrong, or was true once and is not any more,
that is worth a pull request.
