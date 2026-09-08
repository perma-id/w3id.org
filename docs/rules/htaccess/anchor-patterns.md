---
id: htaccess/anchor-patterns
title: Make an optional trailing path group optional
severity: warning
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/anchor-patterns`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

Where a trailing path segment is optional, make the group optional with `?`.

End a pattern with `$` unless you deliberately mean a prefix match.

## Why

**A required group matches too little.** `^taxonomy(/.*)$` requires the group,
so `https://w3id.org/my-project/taxonomy` — with no trailing slash — does not
match at all. Only `taxonomy/` and `taxonomy/something` do. Users hitting the
bare form get a 404, and that is exactly the URL they are most likely to type
or to have written down.

**A missing `$` matches too much.** `^vocab` matches `vocab`, but also
`vocabulary`, `vocab-2024`, and `vocabularies/legacy/thing`. Combined with `L`,
the over-broad rule fires first and swallows requests a later, more specific
rule was supposed to handle. The symptom is a rule further down the file that
"never runs" for no visible reason. There is a live example of this in the
shared `/people/` namespace.

## Wrong

```apache
# does NOT match /my-project/taxonomy
RewriteRule ^taxonomy(/.*)$ https://example.org/taxonomy$1 [R=302,L]

# matches vocabulary, vocab-old, vocabs/anything ...
RewriteRule ^vocab https://example.org/vocab.ttl [R=303,L]
```

## Right

```apache
# matches /taxonomy, /taxonomy/, and /taxonomy/anything
RewriteRule ^taxonomy(/.*)?$ https://example.org/taxonomy$1 [R=302,L]

RewriteRule ^vocab$ https://example.org/vocab.ttl [R=303,L]
```

A deliberate prefix match is fine when that is what you mean — just be explicit
about it:

```apache
# everything under /vocab/ goes to the same place, path preserved
RewriteRule ^vocab/(.*)$ https://example.org/vocab/$1 [R=302,L]
```

## How to fix

For each rule, write down the exact list of paths it should match and the paths
it should not, then check the pattern against both. Pay particular attention to:

- the bare form with no trailing slash;
- the form with a trailing slash;
- a longer identifier that starts with the same letters.

## Checked by

`htaccess/anchor-patterns`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```


Only the required-group half is checked. An unanchored pattern is often exactly
what the author wanted, and a rule cannot tell the deliberate ones from the
accidents — so the `$` advice above is guidance, not a finding.

## See also

- [`htaccess/no-greedy-capture`](./no-greedy-capture)
- [`htaccess/pattern-relative-to-dir`](./pattern-relative-to-dir)
