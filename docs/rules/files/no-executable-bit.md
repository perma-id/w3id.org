---
id: files/no-executable-bit
title: Tracked files are not programs and must not be executable
severity: error
status: enforced
applies-to: "**/*"
---

# `files/no-executable-bit`

**Severity:** error · **Status:** enforced · **Applies to:** `**/*`

## What

A file committed with the executable bit set — mode `100755` rather than
`100644` — when it is not a program.

Inside an identifier directory that means any file at all: an `.htaccess` and
a README are the only things that belong there, and neither is run by
anything. Elsewhere in the repository it means a file that does not begin with
a `#!` line, since that is what makes a file runnable.

## Why

**The bit does not break your identifier.** w3id.org resolves identifiers and
answers with a redirect; it never executes anything it stores. An `.htaccess`
at mode `755` redirects exactly as one at `644` does. This rule is not
reporting an outage.

What it reports is **recorded state that is not true**. The mode is part of
what git stores, it appears in the diff of every later change to the file, and
it says the file is a program when it is a paragraph of contact details or six
lines of rewrite rules.

It is never deliberate. It arrives with a file copied off a Windows, FAT or
exFAT volume, unpacked from a zip that preserved modes, or written under a
permissive umask — and then it persists, because nothing about a working
redirect ever draws attention to it. It also spreads: an identifier directory
is the most copied thing in this repository, and a namespace cloned as a
template brings the bit with it. That is how the current backlog arose. Of
5431 tracked files, 96 carry the bit; 91 of those are `.htaccess` and
`README.md` files under `ids/`, and a single namespace accounts for 80 of
them.

The five that are genuinely executable are the checker's own entry points and
the local server scripts, and every one of them begins with `#!`. No file in
the repository that lacks the bit begins with one. So outside the identifier
tree the shebang separates a program from a data file exactly, and that is the
test this rule uses.

## Wrong

```
$ ls -l ids/my-project/
-rwxr-xr-x  .htaccess      ← mode 755; nothing runs it
-rwxr-xr-x  README.md      ← mode 755; it is prose
```

```
$ git ls-files -s ids/my-project/
100755 6f1c… 0	ids/my-project/.htaccess
100755 a904… 0	ids/my-project/README.md
```

## Right

```
$ git ls-files -s ids/my-project/
100644 6f1c… 0	ids/my-project/.htaccess
100644 a904… 0	ids/my-project/README.md
```

## How to fix

```sh
chmod 644 ids/my-project/.htaccess ids/my-project/README.md
git add ids/my-project/
```

The mode change is a change like any other, so it needs to be staged and
committed. `git status` shows the file as modified even though no character of
it changed.

On a filesystem that does not record the bit — Windows, FAT, exFAT, some
network mounts — `chmod` does nothing git can see. Tell the index directly:

```sh
git update-index --chmod=-x ids/my-project/.htaccess
```

To find every affected file in a directory:

```sh
git ls-files -s ids/my-project/ | grep ^100755
```

If a file outside `ids/` really is a script, give it a `#!` line instead of
clearing the bit.

## How to check

Run `w3id-check` with `--rule files/no-executable-bit` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule files/no-executable-bit ids/my-project
```

The check reads the mode git has recorded, and — for work you have not
committed yet — the mode on disk. A bit set but not yet staged is still
reported, so you do not have to commit to find out.

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`files/only-allowed-names`](./only-allowed-names)
- [`format/no-bom`](../format/no-bom)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
