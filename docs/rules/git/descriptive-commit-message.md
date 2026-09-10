---
id: git/descriptive-commit-message
title: Name the identifier in the commit message
severity: warning
status: enforced
applies-to: "**"
---

# `git/descriptive-commit-message`

**Severity:** warning · **Status:** enforced · **Applies to:** repository-wide

## What

Replace the message GitHub fills in for you. Say which identifier changed.

## Why

Every identifier in this repository has an `.htaccess` and most have a
`README.md`, so "Update .htaccess" says nothing at all about what happened.
More than a thousand commits here already carry that exact message.

The history is how anyone works out later why a redirect points where it does.
A message that names the identifier makes `git log --grep` useful; one that
does not makes a decade of commits into an undifferentiated wall.

About one commit in six arrives with the default message.

## Wrong

```
Update .htaccess
Create README.md
Add files via upload
```

## Right

```
Add redirect for my-project
my-project: point vocab at the 1.2.0 release
my-project: add maintainer GitHub handle
```

## How to fix

In the GitHub web interface, the commit message box sits below the editor and
is pre-filled — replace the text before committing.

Locally:

```sh
git commit --amend -m "Add redirect for my-project"
```

For a message already pushed, amend and force-push:

```sh
git push --force-with-lease
```

## How to check

Run `w3id-check` with `--rule git/descriptive-commit-message` to check this
rule on its own; without it the tool runs every rule, as the pull request
checks do. This rule looks at your commits rather than your files, so it needs
a base to compare against; narrowing it to a path would not change what it
reports.

```sh
node tools/check/bin/w3id-check.js --rule git/descriptive-commit-message --base origin/master
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`git/minimal-commits`](./minimal-commits)
