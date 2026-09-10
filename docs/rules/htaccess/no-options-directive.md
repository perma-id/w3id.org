---
id: htaccess/no-options-directive
title: Options directives in an identifier's .htaccess
severity: warning
status: proposed
applies-to: "ids/**/.htaccess"
---

# `htaccess/no-options-directive`

**Severity:** warning · **Status:** proposed · **Applies to:** `ids/**/.htaccess`

::: info Documented, not yet checked
This rule is **proposed**. No automated check reports it, and the questions
below need answering before one should. See [Checked by](#checked-by).
:::

## What

`Options` directives appear in most of the `.htaccess` files in this
repository — `Options +FollowSymLinks`, `Options -MultiViews`,
`Options -Indexes` — almost always copied from an example alongside lines that
were needed.

## Why

**They are mostly not needed.** Your identifier redirects to a URL somewhere
else. `Options` controls how Apache serves files out of the directory — symlink
following, directory listings, implicit content negotiation over local files —
and none of that happens, because the request never gets as far as being served.
The rewrite rule fires first.

**`-Indexes` has actively caused a 403.** One identifier here returned
`403 Forbidden` for its bare URL — the one without a trailing slash — because of
it. The interaction is subtle:

1. For a request to `/my-project` (no trailing slash), mod_rewrite **declines**
   to run the rules in `ids/my-project/.htaccess`. This is deliberate behaviour
   in Apache: when the request resolves to exactly the directory holding the
   `.htaccess`, per-directory rewriting is skipped.
2. Normally `mod_dir` then redirects `/my-project` to `/my-project/` with a 301,
   and on that second request the rules do run. That extra hop is correct and
   expected.
3. But if directory listings are also disabled and the auto-redirect is
   suppressed, Apache has no valid response left to give, and answers 403.

So the directive added to "tidy things up" is the thing that broke the most
important URL of the identifier.

**Do not try to remove the extra hop.** The `DirectorySlash Off` +
`RewriteOptions AllowNoSlash` combination that eliminates it is what re-arms
this trap for whoever edits the file next. One cached redirect is not worth it.

## Wrong

```apache
Options +FollowSymLinks
Options -MultiViews
Options -Indexes

RewriteEngine on
RewriteRule ^(.*)$ https://example.org/$1 [R=302,L]
```

## Right

```apache
RewriteEngine on
RewriteRule ^(.*)$ https://example.org/$1 [R=302,L]
```

## How to fix

Delete the `Options` lines. Then check the bare URL still behaves:

```sh
curl -sI http://localhost:8080/my-project     # expect 301 → /my-project/
curl -sI http://localhost:8080/my-project/    # expect your redirect
```

## How to check

Not automated yet, deliberately. Three questions need answering first, and each
changes what the check should say:

- **`-MultiViews`** may be load-bearing for some content-negotiation
  approaches, where Apache's implicit negotiation would otherwise interfere.
  Nothing in the tree demonstrably relies on that, but this is the directive
  with a stated justification, so a rule that flags it needs to know when it
  is right. Worth knowing before that research starts: MultiViews is
  **enabled** on the deployed document root, and about a third of the files
  here switch it off — so these are not lines reacting to nothing. A handful
  more have the directive commented out, which suggests somebody tried it and
  backed it out, or copied a template that had already given up on it.
- **`-Indexes`** probably has no per-directory justification at all, and would
  be better handled once, globally, in the server configuration. If that
  happened, the per-directory copies become redundant rather than wrong —
  a different message, and arguably a different severity.
- **`+FollowSymLinks`** is in most files and nobody remembers why, or whether
  it does anything on this service. That needs establishing before the check
  tells people to remove it.

Until those are settled, this page is guidance for reviewers rather than a gate.
The related directives that are unambiguously refused — the ones that make the
server execute code or proxy requests — are covered by
[`htaccess/allowed-directives`](./allowed-directives), which is enforced.

[Testing your changes](/guides/testing) covers what the tool does check, and
what is worth checking by hand.

## See also

- [`htaccess/allowed-directives`](./allowed-directives)
- [`files/only-allowed-names`](../files/only-allowed-names)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
