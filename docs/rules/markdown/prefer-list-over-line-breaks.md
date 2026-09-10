---
id: markdown/prefer-list-over-line-breaks
title: A stack of manual line breaks wants to be a list
severity: notice
status: enforced
applies-to: "ids/**/*.md"
---

# `markdown/prefer-list-over-line-breaks`

**Severity:** notice · **Status:** enforced · **Applies to:** `ids/**/*.md`

## What

Where several consecutive lines are held apart by a manual line break — two or
more trailing spaces, a trailing backslash, or a trailing `<br>` — a bulleted
list is usually the better shape.

## Why

Maintainer and contact blocks are overwhelmingly written as a stack of lines
glued together by invisible markup. It renders correctly, so this is a
suggestion rather than a fault.

It is worth making because the markup cannot be seen. The next person to edit
the block has no way to tell what is holding it together, and deleting a marker
by accident silently reflows three lines into one paragraph — which is exactly
the sort of thing nobody notices in a diff. A list survives editing.

The rule only fires on a run of two or more broken lines in the same block. A
single hard break inside a paragraph is a deliberate typographic choice, and a
block that is already a list is left alone even when its items carry markers.

Hundreds of blocks in this repository are in this shape.

## Wrong

```markdown
Some Person<br>
Email: someone@example.org<br>
GitHub: https://github.com/someone<br>
```

```markdown
Some Person \
ORCID: https://orcid.org/0000-0000-0000-0000 \
GitHub: [@someone](https://github.com/someone)
```

## Right

```markdown
- Some Person
- Email: someone@example.org
- GitHub: [@someone](https://github.com/someone)
```

## How to fix

Put `- ` in front of each line and delete the trailing marker. If the block has
a heading above it, leave the heading where it is.

To find them:

```sh
grep -nE '( {2,}|\\|<br ?/?>)$' ids/my-project/README.md
```

## How to check

Run `w3id-check` with `--rule markdown/prefer-list-over-line-breaks` to check
this rule on its own; without it the tool runs every rule, as the pull request
checks do.

```sh
node tools/check/bin/w3id-check.js --rule markdown/prefer-list-over-line-breaks ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`format/no-trailing-whitespace`](../format/no-trailing-whitespace)
- [`meta/maintainer-github-username`](../meta/maintainer-github-username)
