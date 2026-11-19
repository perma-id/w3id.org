---
id: meta/author-is-maintainer
title: A change comes from a maintainer of the directory it touches
severity: warning
status: enforced
applies-to: "ids/**"
---

# `meta/author-is-maintainer`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

When a pull request changes a directory under `ids/`, the account
that opened it should be listed as a maintainer of that directory, or
of any directory above it up to the root of the identifier, however
deeply it is nested. This holds for a directory the pull request
modifies and for one it creates.

The check follows the ownership model of
[`meta/document-identifier-root`](./document-identifier-root):

- a maintainer recorded at `ids/my-project/` covers everything
  beneath it;
- a sub-directory such as `ids/my-project/datasets/` may add
  maintainers of its own, who cover that part of the tree only;
- the maintainers of a sibling directory have no say over this one.

Maintainers are read the same way as for
[`meta/maintainer-github-username`](./maintainer-github-username):
from a README, or from `.htaccess` comments, in the directory.

## Why

A reviewer has to decide whether the person changing an identifier is
entitled to. Without this check that means opening every README
between the root and the changed file and comparing names by hand.
The report does that comparison and names the people to ask, as
`@` mentions.

Maintainers are read from the branch the pull request is going into,
not from the pull request. Adding yourself to a README is therefore
reported too: that is exactly the change an existing maintainer
should approve.

A warning rather than an error, because many legitimate changes come
from somebody else: a service maintainer fixing a broken redirect, or
a colleague the README does not list yet.

## When it is not reported

- No directory from the change up to the identifier root records
  anybody in the branch the pull request is going into, as for a new
  identifier. There is nobody to ask.
  [`meta/maintainer-github-username`](./maintainer-github-username)
  and [`meta/document-identifier-root`](./document-identifier-root)
  report the missing record.
- The run is not a pull request check. The author is read from the
  event GitHub Actions records for the run, so a local run has none
  and skips this rule.

## How to fix

If you maintain the directory, add your GitHub username to its
README, or to the README at its root, in a separate pull request that
a listed maintainer approves. Otherwise ask one of the maintainers
the report names to approve your pull request.

## How to check

The rule needs the pull request's author, which a local run reads
from a file in the format GitHub Actions writes:

```sh
echo '{"pull_request":{"user":{"login":"your-username"}}}' > /tmp/event.json
export GITHUB_EVENT_PATH=/tmp/event.json
node tools/check/bin/w3id-check.js --rule meta/author-is-maintainer
```

[Testing your changes](/guides/testing) covers installing the tool.

## See also

- [`meta/document-identifier-root`](./document-identifier-root): how
  ownership is inherited
- [`meta/maintainer-github-username`](./maintainer-github-username):
  what a maintainer record should contain
- [Report a false positive or a missing
  check](https://github.com/perma-id/w3id.org/issues)
