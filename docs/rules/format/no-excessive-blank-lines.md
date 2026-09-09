---
id: format/no-excessive-blank-lines
title: No long runs of blank lines
severity: warning
status: enforced
applies-to: "ids/**"
---

# `format/no-excessive-blank-lines`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

Three thresholds, because the middle of a file and its two edges are different
situations:

| Where | Allowed |
| --- | --- |
| Between lines | up to **3** blank lines in a row |
| At the start | **none** |
| At the end | the final newline, and **one** blank line past it |

## Why

A blank line or two between groups of directives earns its place — it shows
which rules belong together, which is the one thing an `.htaccess` cannot say
any other way. Three is generous. Past that the space is no longer separating
anything, and the file becomes longer than the window it is being read in: a
reviewer scrolls, loses the previous rule from view, and has to scroll back.

**The two edges are a different matter, because there is nothing on the far
side to separate.** A blank line at the top of a file is a whole line of
nothing before the file has begun; all it does is push the first real line
further from the top of the screen. At the bottom, the file is *supposed* to
end with a newline after its last line — see
[`format/final-newline`](./final-newline) — so one blank line past that is a
single character of overshoot and not worth mentioning. Two or more is
somebody having left a gap behind.

None of this breaks anything. Apache ignores blank lines and so does Markdown;
this is a rule about the file being readable by the next person, not about
whether the identifier resolves.

## Wrong

```apache
RewriteEngine on
RewriteRule ^vocab$ https://example.org/vocab.ttl [R=303,L]




RewriteRule ^spec$ https://example.org/spec.html [R=303,L]
```

Four blank lines separating two rules that are already one line apart.

## Right

```apache
RewriteEngine on

# Ontology
RewriteRule ^vocab$ https://example.org/vocab.ttl [R=303,L]
RewriteRule ^vocab.ttl$ https://example.org/vocab.ttl [R=303,L]

# Documentation
RewriteRule ^spec$ https://example.org/spec.html [R=303,L]
```

One blank line does the grouping, and a comment says what the group is.

## How to fix

Delete the extra lines. To see where they are:

```sh
cat -A ids/my-project/.htaccess | grep -n '^\$'
```

`cat -A` marks the end of every line with `$`, so a blank line shows as a bare
`$` and the line numbers tell you which ones are consecutive.

Squeeze runs of blank lines down to one, throughout the file:

```sh
cat -s ids/my-project/.htaccess
```

Read the result before saving it over the original — `cat -s` is
indiscriminate, and if you were using two or three blank lines deliberately to
group rules it will flatten that too.

Installing [EditorConfig](https://editorconfig.org/) support in your editor is
worth doing for the other whitespace rules — the repository's
[`.editorconfig`](https://github.com/perma-id/w3id.org/blob/master/.editorconfig)
trims trailing whitespace and fixes line endings on save. It will **not** help
here: `insert_final_newline` guarantees a file *ends* with a newline but does
not remove extra blank lines before it. This one is done by hand.

## Checked by

`format/no-excessive-blank-lines`, in this repository's checker. A run is
reported once, at its first line, rather than once per blank line:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```

Content inside a fenced code block is not counted. A README quoting an example
`.htaccess` contains whatever it is quoting, and this rule is about the layout
of the file itself — which is how the "Wrong" example above can appear on this
page at all.

A run of whitespace-only lines is also reported by
[`format/no-trailing-whitespace`](./no-trailing-whitespace), once per line.
Those are two different things to say about the same lines — that the run is
too long, and that the lines are not even empty — rather than the same
complaint twice.

## See also

- [`format/final-newline`](./final-newline)
- [`format/no-trailing-whitespace`](./no-trailing-whitespace)
