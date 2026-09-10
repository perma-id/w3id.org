---
id: meta/maintainer-github-username
title: Maintainer contact must include a GitHub username
severity: warning
status: enforced
applies-to: "ids/**"
---

# `meta/maintainer-github-username`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

Every identifier must record who maintains it, including at least one **GitHub
username**.

It can go in `.htaccess` comments, in a `README.md`, or both. Either is
acceptable — there is no requirement to have a `README.md` if the `.htaccess`
comments carry the information.

This rule reads the whole identifier, so a record anywhere in it counts.
[`meta/document-identifier-root`](./document-identifier-root) is the companion
rule that asks for one at the root specifically, since that is what claims the
identifier.

A sub-directory may record **additional** maintainers for its own part of the
tree, and several identifiers do. Those are read together with the root's, not
instead of them — never move or delete a deeper record to satisfy either rule.

## Why

This is the single most frequent review comment on this repository.

Identifiers are meant to last for decades, and the people maintaining them
change. Without a contact:

- a reviewer cannot tell whether a future pull request touching your directory
  is legitimate or a namespace hijack;
- nobody can tag you to approve a change to your own space;
- when your redirect target breaks, nobody can tell you;
- when the service needs to reach identifier owners, you are unreachable.

A GitHub username specifically, because that is where changes to this
repository happen. An email address alone does not let a reviewer confirm that
the account opening a pull request is entitled to make the change.

## Wrong

No contact information at all:

```apache
RewriteEngine on
RewriteRule ^ https://example.org/ [R=302,L]
```

Contact information with no GitHub account:

```apache
# My Project
# Contact: someone@example.org

RewriteEngine on
RewriteRule ^ https://example.org/ [R=302,L]
```

## Right

In `.htaccess` comments:

```apache
# # /my-project/
#
# Permanent identifiers for the My Project vocabulary.
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

Or in `README.md`:

```markdown

## Contact

- Firstname Lastname, <firstname@example.org>,
  GitHub: [@exampleuser](https://github.com/exampleuser)
```

More than one maintainer is better than one. An organisation or team account is
fine, and is more durable than an individual.

## How to fix

Add the block above. If you are taking over an existing identifier, update the
contact rather than appending to it, and make sure the outgoing maintainer is
visible on the pull request.

## How to check

Run `w3id-check` with `--rule meta/maintainer-github-username` to check this
rule on its own; without it the tool runs every rule, as the pull request
checks do.

```sh
node tools/check/bin/w3id-check.js --rule meta/maintainer-github-username ids/my-project
```

The check recognises the many shapes this information takes across the
repository — `GitHub username: name`, `(GitHub: name)`, a bare `@name`, a
profile URL, a Markdown link. It is deliberately lenient, and reports only when
it can find no plausible username anywhere in the identifier. A structured
format may replace it later.

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`meta/document-identifier-root`](./document-identifier-root)
- [`markdown/prefer-list-over-line-breaks`](../markdown/prefer-list-over-line-breaks)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
