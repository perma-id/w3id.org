---
id: meta/rule-docs-exist
title: Every rule must have a documentation page
severity: warning
status: enforced
applies-to: "docs/rules/**"
---

# `meta/rule-docs-exist`

**Severity:** warning · **Status:** enforced · **Applies to:** `docs/rules/**`

## What

The rule registry and this catalogue must agree:

- every rule the checker implements has a page at `docs/rules/<id>.md`;
- every page marked `status: enforced` corresponds to a rule that exists;
- a page's `id` matches its path.

A page marked `status: proposed` is exempt from the second point — that is what
`proposed` means.

## Why

Every finding the checker reports carries a link to
`https://w3id.org/docs/rules/<id>`. If the page is missing, the reader follows
that link to a 404 at the exact moment they were told to go and read something.

The reverse matters too. A page claiming `status: enforced` tells a contributor
a check will catch this before review, and that promise should be true.

This is the rule that keeps the two halves of this repository — the checker in
`tools/check/` and the catalogue in `docs/rules/` — from drifting apart. They
were written separately, which is exactly the situation that produces drift.

## Wrong

A rule with no page:

```
tools/check/src/rules/htaccess/<new-rule>.js   ← exists
docs/rules/htaccess/<new-rule>.md              ← missing
```

A page whose id disagrees with its path:

```
docs/rules/htaccess/https-target.md
---
id: target-https        ← does not match the path
---
```

## Right

```
tools/check/src/rules/htaccess/https-target.js
docs/rules/htaccess/https-target.md   with  id: htaccess/https-target
```

## How to fix

Adding a rule means adding its page in the same change, and adding it to the
catalogue table and the site sidebar. Removing a check without removing the
page means changing the page's `status` to `proposed`.

## Checked by

`meta/rule-docs-exist`, in this repository's checker. It is silent when
`docs/rules/` is absent, so the checker still works in a tree without the
documentation:

```sh
node tools/check/bin/w3id-check.js --all --rule meta/rule-docs-exist
```

## See also

- [The rule catalogue](../)
