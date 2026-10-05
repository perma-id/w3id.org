---
id: htaccess/space-before-flags
title: Separate the flag list from the argument before it
severity: error
status: enforced
applies-to: "ids/**/.htaccess"
---

# `htaccess/space-before-flags`

**Severity:** error · **Status:** enforced · **Applies to:** `ids/**/.htaccess`

## What

The `[...]` flag list at the end of a `RewriteRule` or `RewriteCond` must be
separated from the argument before it by a space. Written against the target
with nothing in between, it is not a flag list at all — it is part of the
target.

## Why

Apache splits a directive into arguments on spaces and tabs. A `RewriteRule`
takes three: a pattern, a substitution and a flag list. Write the brackets
against the substitution and Apache sees only **two** arguments, so there is no
flag list, and every flag in it is lost — the status the `R` asked for, the
`NE` that would have stopped the URL being escaped, the `L` that would have
stopped later rules running.

**Nothing about this looks like a failure, which is the point.** Because the
substitution is an absolute URL, mod_rewrite still issues an external redirect.
The identifier answers `302`, a `curl -I` looks healthy, and the file reads
correctly at a glance. What the client actually receives is a redirect to the
target with the brackets escaped onto the end as `%5B...%5D` — a URL that does
not exist — and at mod_rewrite's default 302 rather than the 303 an ontology
IRI meant to send.

Compare its neighbour: [`htaccess/no-flag-whitespace`](./no-flag-whitespace) is
a space too *many*, and it fails loudly — Apache cannot parse the file and
every URL under the identifier returns 500, so somebody notices within the
hour. This is a space too *few*, and it fails in silence. Every instance in
this repository was committed once and never corrected.

No other rule can catch it. Apache parses no flag list, so the checker's parser
reports none, so
[`htaccess/valid-rewrite-flags`](./valid-rewrite-flags),
[`htaccess/uppercase-rewrite-flags`](./uppercase-rewrite-flags) and
`htaccess/no-flag-whitespace` all have nothing to look at.

## Wrong

```apache
RewriteRule ^vocab\.ttl$ https://example.org/vocab.ttl[R=303,L]
RewriteRule ^(.*)$ https://example.org/$1[R=302,NE,L]
RewriteCond %{HTTP_ACCEPT} text/turtle[NC]
```

There is a second shape that cannot be shown in a code block, because it looks
identical to the correct version:

```apache
RewriteRule ^$ https://example.org/ [R=302,L]
```

If the character before `[` is a **no-break space** (`U+00A0`) rather than an
ordinary one, Apache does not treat it as a separator and the line has exactly
the defect above. This happens when a rule is pasted out of a word processor, a
PDF or a rendered web page. The checker names the character when it finds one.
To see them yourself:

```sh
grep -nP '\xc2\xa0' ids/my-project/.htaccess
```

## Right

```apache
RewriteRule ^vocab\.ttl$ https://example.org/vocab.ttl [R=303,L]
RewriteRule ^(.*)$ https://example.org/$1 [R=302,NE,L]
RewriteCond %{HTTP_ACCEPT} text/turtle [NC]
```

## How to fix

Put an ordinary space before the `[`. If the gap is a no-break space, delete it
and type a real one — adding a second space after it will not help, because the
invisible character stays part of the target.

Then check the status you meant. A flag list that never applied means the
redirect has been running at 302; if the rule says `[R=303,L]`, that 303 has
never been served, and anything relying on it — content negotiation for an
ontology IRI in particular — has not been working.

## How to check

Run `w3id-check` with `--rule htaccess/space-before-flags` to check this rule on
its own; without it the tool runs every rule, as the pull request checks do.

```sh
node tools/check/bin/w3id-check.js --rule htaccess/space-before-flags ids/my-project
```

[Testing your changes](/guides/testing) covers installing the tool, and what
else is worth checking by hand.

## See also

- [`htaccess/no-flag-whitespace`](./no-flag-whitespace) — the opposite mistake
- [`htaccess/valid-rewrite-flags`](./valid-rewrite-flags)
- [`htaccess/avoid-permanent-redirect`](./avoid-permanent-redirect)
- [Report a false positive or a missing check](https://github.com/perma-id/w3id.org/issues)
