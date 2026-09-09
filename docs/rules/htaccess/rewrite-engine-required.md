---
id: htaccess/rewrite-engine-required
title: RewriteRule does nothing without RewriteEngine on
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/rewrite-engine-required`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

A file containing `RewriteRule` directives must switch the rewrite engine on
first:

```apache
RewriteEngine on
```

## Why

Without it, Apache ignores every rewrite rule in the file. There is no error and
no warning — the rules are simply never consulted, and every request to the
identifier falls through to a **404**.

The file looks completely reasonable. It contains rules, the rules are correct,
and none of them run.

There are identifiers in this repository in this state right now.

`RewriteEngine off` has the same effect and is reported the same way.

## Wrong

```apache
RewriteRule ^$ https://example.org/ [R=302,L]
```

## Right

```apache
RewriteEngine on
RewriteRule ^$ https://example.org/ [R=302,L]
```

## How to fix

Add `RewriteEngine on` above the first rule. It goes once per file, not once
per rule.

Files using only `Redirect` or `RedirectMatch` do not need it — those come from
a different Apache module — and are not reported.

## Checked by

`htaccess/rewrite-engine-required`, in this repository's checker:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```


## See also

- [`files/no-empty-htaccess`](../files/no-empty-htaccess)
- [`htaccess/pattern-relative-to-dir`](./pattern-relative-to-dir)
