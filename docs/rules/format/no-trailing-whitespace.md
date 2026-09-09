---
id: format/no-trailing-whitespace
title: Lines must not end in whitespace that does nothing
severity: warning
status: enforced
applies-to: "ids/**"
---

# `format/no-trailing-whitespace`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

Lines must not end in spaces or tabs that have no effect.

In `.htaccess` and plain text that means **all** of it — neither format has a
line-break idiom, so every trailing space is dead weight.

In Markdown it means the whitespace that cannot be doing anything: a single
trailing space, a trailing tab, or whitespace on an otherwise-empty line. Two
or more trailing spaces is Markdown's hard-line-break idiom, and this rule
leaves it alone — see
[`markdown/prefer-list-over-line-breaks`](../markdown/prefer-list-over-line-breaks)
for what to do about that instead.

## Why

Trailing whitespace is invisible in most editors and reads as noise in every
diff that touches the line. It is not a functional problem in these files.

The distinction Markdown gets is the point of the rule. A **single** trailing
space in Markdown does nothing at all — a line break needs two or more — so it
is pure noise. Reporting the two-space form alongside it would be wrong: those
lines render as their author intended, and many of them in this repository are
doing real work in maintainer blocks.

## Wrong

In `.htaccess`, any of it:

```apache
RewriteEngine on
RewriteRule ^$ https://example.org/ [R=302,L]···
```

In Markdown, a lone trailing space:

```markdown
Contacts:·
```

## Right

```apache
RewriteEngine on
RewriteRule ^$ https://example.org/ [R=302,L]
```

## How to fix

Find it:

```sh
grep -nP '[ \t]+$' ids/my-project/.htaccess
```

Remove it:

```sh
sed -i 's/[[:space:]]*$//' ids/my-project/.htaccess
```

Better still, install [EditorConfig](https://editorconfig.org/) support in your
editor — most modern editors have it built in, some need a plugin — and the
repository's
[`.editorconfig`](https://github.com/perma-id/w3id.org/blob/master/.editorconfig)
will handle this for you on every file you save, along with the other
whitespace rules.

## Checked by

`format/no-trailing-whitespace`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```

## See also

- [`markdown/prefer-list-over-line-breaks`](../markdown/prefer-list-over-line-breaks)
- [`format/final-newline`](./final-newline)
