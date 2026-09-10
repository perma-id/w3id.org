---
id: files/prefer-readme-md
title: Prefer README.md
severity: warning
status: enforced
applies-to: "ids/**"
---

# `files/prefer-readme-md`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

If an identifier directory has a README, write it in Markdown and call it
`README.md`.

## Why

GitHub renders a README under a long list of names and markup formats, so
`readme.md`, `README.MD`, `README.adoc` and `README.rst` all appear on the
directory page just as `README.md` does. **Nothing is broken.** This is a
convention, not a fix.

The convention earns its keep in small ways. Every identifier's documentation
reads and edits the same, contributors copying a neighbouring directory copy
something consistent, and a reviewer skimming a pull request does not have to
work out which syntax a diff is written in.

There is one case where the name does change what a reader sees. A file
written as Markdown but *not* named with a Markdown extension — a `README` or
`README.txt` opening with a `#` heading — is shown verbatim, so its headings
and links appear as literal punctuation rather than being rendered.

### What the message is telling you

The rule says different things depending on how far the file is from the
convention, because the work involved differs:

| The file is | GitHub shows it as | What it takes |
| --- | --- | --- |
| `readme.md`, `README.MD`, `README.markdown` | Markdown | a rename |
| `README.adoc`, `README.rst`, `README.textile`, … | that markup, rendered | a **conversion** |
| `README`, `README.txt` containing Markdown | verbatim text | a rename |
| `README`, `README.txt` containing prose | verbatim text | a conversion |

A conversion is genuinely more than a `git mv`. AsciiDoc writes a heading
`= Title`, reStructuredText underlines it, Markdown prefixes it with `#`;
links, emphasis and line breaks differ too. Renaming the file without
rewriting the content leaves a page that renders as a jumble.

### Names this rule does not accept

The recognised extensions are the ones GitHub itself renders: `.md`,
`.markdown`, `.mdown`, `.mkdn`, `.adoc`, `.asciidoc`, `.asc`, `.rst`, `.org`,
`.textile`, `.rdoc`, `.creole`, `.mediawiki`, `.wiki` and `.pod`, plus a bare
`README` and `README.txt`.

A name outside that set — `README.me`, `README..md`, `_readme.md` — is not a
README to GitHub at all. It will not appear on the directory page under any
syntax, so it is reported by
[`files/only-allowed-names`](./only-allowed-names) as a file that does not
belong, not by this rule.

## Wrong

```
ids/my-project/readme.md      ← renders fine, wrong name
ids/my-project/README.MD      ← renders fine, wrong name
ids/my-project/README.adoc    ← renders fine, wrong syntax
ids/my-project/README         ← if it contains Markdown, it is shown verbatim
```

## Right

```
ids/my-project/README.md
```

## How to fix

If only the name is wrong:

```sh
git mv ids/my-project/readme.md ids/my-project/README.md
```

On a case-insensitive filesystem — macOS, Windows — Git needs two steps to
record a change of case:

```sh
git mv ids/my-project/readme.md ids/my-project/readme-tmp.md
git mv ids/my-project/readme-tmp.md ids/my-project/README.md
```

If the content is in another markup format, rewrite it as Markdown as well as
renaming the file. These READMEs are short — a heading, a sentence about the
namespace, and who maintains it — so this is usually a few minutes' work by
hand. [`pandoc`](https://pandoc.org/) will do the mechanical part if you would
rather not:

```sh
pandoc -f asciidoc -t gfm ids/my-project/README.adoc \
  -o ids/my-project/README.md
git rm ids/my-project/README.adoc
```

Read the result before committing it. Converters are good at headings and
lists and less good at anything unusual, and a README that came out of one
still has to say the same things it said before.

## How to check

Run `w3id-check` with `--rule files/prefer-readme-md` to check this rule on its
own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule files/prefer-readme-md ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`meta/document-identifier-root`](../meta/document-identifier-root)
- [`files/only-allowed-names`](./only-allowed-names)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
