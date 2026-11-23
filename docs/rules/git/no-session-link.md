---
id: git/no-session-link
title: Commit messages should not link to an agent session
severity: warning
status: enforced
applies-to: "**"
---

# `git/no-session-link`

**Severity:** warning · **Status:** enforced · **Applies to:** repository-wide

## What

A commit message should not contain a link to the coding-agent session that
produced it, such as the trailer Claude Code adds:

```
Claude-Session: https://claude.ai/code/session_01AbCdEf...
```

## Why

**Nobody else can open it.** The session is private to whoever ran it, so
reviewers following the link, and anyone reading the history later, reach a
page that does not load.

**A merged commit keeps it for good.** History here is public and is not
rewritten, so the link outlasts any reason it had to be there. A pull request
description is a better place for it, if anywhere: it can be edited later.

What the link does not cover is how the change was made, and that is worth
recording. A `Co-Authored-By` line naming the agent says so, as does an
`Assisted-by` line in the style the
[Linux kernel uses](https://docs.kernel.org/process/coding-assistants.html#attribution).
Neither is reported.

## Wrong

```
my-project: add vocabulary redirect

Co-Authored-By: Claude <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01AbCdEf...
```

## Right

```
my-project: add vocabulary redirect

Co-Authored-By: Claude <noreply@anthropic.com>
```

Or:

```
my-project: add vocabulary redirect

Assisted-by: Claude
```

## How to fix

The simplest way is to tick **Please squash my commits when merging** in the
pull request description; the maintainer merging it can then leave the line
out of the squashed message.

To remove it yourself, for the most recent commit:

```sh
git commit --amend          # delete the line in the editor
git push --force-with-lease
```

For an older commit, `git rebase -i upstream/master`, mark it `reword`, and
delete the line; see [`git/minimal-commits`](./minimal-commits#how-to-fix)
for the same steps with a backup branch.

To stop Claude Code adding it, set `attribution.sessionUrl` to `false` in one
of its settings files, such as `~/.claude/settings.json`:

```json
{
  "attribution": {
    "sessionUrl": false
  }
}
```

That keeps the `Co-Authored-By` line, and also leaves the link out of pull
request descriptions. See the
[settings reference](https://code.claude.com/docs/en/settings-reference#attribution-sessionurl).

## How to check

Run `w3id-check` with `--rule git/no-session-link` to check this rule on its
own; without it the tool runs every rule, as the pull request checks do. This
rule looks at your commits rather than your files, so it needs a base to
compare against; narrowing it to a path would not change what it reports.

```sh
node tools/check/bin/w3id-check.js --rule git/no-session-link
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`git/descriptive-commit-message`](./descriptive-commit-message)
- [`git/minimal-commits`](./minimal-commits)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
