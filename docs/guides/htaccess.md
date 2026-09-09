# Writing .htaccess rules

The `.htaccess` file in your identifier directory is what makes the redirect
happen. This page covers the syntax you need and, more importantly, the few
things about the **per-directory context** that catch almost everyone out.

If you just want a plain redirect, [Creating an identifier](./create-an-id) has
the two-line version and you do not need this page.

## What an .htaccess file is

`.htaccess` is a per-directory configuration file read by the Apache HTTP
Server. When a request comes in for a path, Apache looks for `.htaccess` files
along that path and applies the directives it finds.

On w3id.org, the directives available to you are effectively limited to
[`mod_rewrite`](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
(`RewriteEngine`, `RewriteRule`, `RewriteCond`), plus `AddType` and `Header` for
content negotiation. There is no application code behind it.

::: danger A syntax error takes out the whole directory
If Apache cannot parse your `.htaccess`, it returns **500 Internal Server
Error** for *every* URL under that directory — not just for the broken rule.

This is why [testing](./testing) matters, and why a stray space inside a flag
list is a genuine outage rather than a typo.
:::

## The basic shape

```apache
RewriteEngine on
RewriteRule ^ https://example.com/ [R=302,L]
```

`RewriteEngine on` switches the rewrite engine on for this directory. Without
it, none of your rules run at all — and it is not inherited in a way you should
rely on. Put it in every `.htaccess` you write.

`RewriteRule` is the rule itself. Its syntax is:

```
RewriteRule Pattern Substitution [Flags]
```

## Pattern

A [Perl-compatible regular expression](https://httpd.apache.org/docs/current/rewrite/intro.html#regex)
matched against the requested path.

**The single most important thing to understand:** in a per-directory
`.htaccess`, the pattern is matched against the path **relative to the directory
containing the file**, with no leading slash.

So in `ids/my-project/.htaccess`, for a request to
`https://w3id.org/my-project/vocab/Thing`:

| What the pattern sees | `vocab/Thing` |
| --- | --- |
| ❌ `^/my-project/vocab/Thing$` | never matches — wrong prefix *and* leading slash |
| ❌ `^/vocab/Thing$` | never matches — leading slash |
| ✅ `^vocab/Thing$` | matches |

Getting this wrong is silent. The rule simply never fires, and you get a 404
instead of a redirect. See
[`htaccess/pattern-relative-to-dir`](/rules/htaccess/pattern-relative-to-dir).

For a request to the identifier root itself — `https://w3id.org/my-project/` —
the pattern sees the **empty string**, which is why `^$` and `^` both work as
"the identifier root".

### Regex essentials

| | |
| --- | --- |
| `^` | start of the string |
| `$` | end of the string |
| `.` | any single character |
| `*` | zero or more of the preceding |
| `+` | one or more of the preceding |
| `?` | zero or one of the preceding (makes it optional) |
| `[^/]` | any character except `/` |
| `(...)` | a capture group, referenced as `$1`, `$2`, … in the substitution |
| `\.` | a **literal** dot |

Three traps worth naming explicitly, because they recur:

**Escape literal dots.** `^vocab.ttl$` also matches `vocabXttl`. Write
`^vocab\.ttl$`. See [`htaccess/escape-literal-dots`](/rules/htaccess/escape-literal-dots).

**Anchor your patterns.** `^vocab` matches `vocabulary-of-doom` too. Unless you
mean a prefix match, end the pattern with `$`. See
[`htaccess/anchor-patterns`](/rules/htaccess/anchor-patterns).

**Watch greedy captures.** `^(.+)/?$` does not do what it looks like it does —
`.+` is greedy and swallows the trailing slash, so `$1` ends up containing it
and you get a doubled slash in the output. Use `^([^/]+)/?$`. See
[`htaccess/no-greedy-capture`](/rules/htaccess/no-greedy-capture).

## Substitution

The replacement. On w3id.org this is almost always an absolute URL to somewhere
outside w3id.org.

Capture groups from the pattern are available as `$1`, `$2`, and so on:

```apache
# /my-project/anything  ->  https://example.org/base/anything
RewriteRule ^(.*)$ https://example.org/base/$1 [R=302,L]
```

Watch the slashes. If your pattern captures a leading slash and your
substitution also has one, you get `https://example.org/base//anything`, which
many servers treat as a different path. See
[`htaccess/no-double-slash`](/rules/htaccess/no-double-slash).

## Flags

A comma-separated list in square brackets.

| Flag | Meaning |
| --- | --- |
| `R=302` | Issue an HTTP redirect with this status code |
| `L` | Last — stop processing rules if this one matches |
| `NC` | No case — match the pattern case-insensitively |
| `NE` | No escape — do not URL-escape special characters in the output |
| `QSA` | Query string append — keep the original query string |
| `OR` | Combine with the next `RewriteCond` using OR instead of AND |

::: danger No spaces inside the brackets
```apache
RewriteRule ^ https://example.com/ [R=302, L]   # ← 500 Internal Server Error
RewriteRule ^ https://example.com/ [R=302,L]    # ← correct
```
Apache does not tolerate whitespace in the flag list. This is a real, recurring
cause of outages in this repository. See
[`htaccess/no-flag-whitespace`](/rules/htaccess/no-flag-whitespace).
:::

Always use `L` on a redirect rule. Without it Apache keeps evaluating
subsequent rules, which at best wastes work and at worst produces a redirect
loop.

## Common patterns

### Everything to one destination

```apache
RewriteEngine on
RewriteRule ^ https://example.org/landing [R=302,L]
```

### Preserve the path

```apache
RewriteEngine on
RewriteRule ^(.*)$ https://example.org/base/$1 [R=302,L]
```

### The root, and sub-paths, differently

```apache
RewriteEngine on

# https://w3id.org/my-project/  ->  the project home page
RewriteRule ^$ https://example.org/ [R=302,L]

# https://w3id.org/my-project/anything-else  ->  under /vocab/
RewriteRule ^(.+)$ https://example.org/vocab/$1 [R=302,L]
```

Order matters: the more specific rule goes first, and `L` stops the rest from
running.

### An optional trailing path

```apache
# matches /my-project/taxonomy AND /my-project/taxonomy/anything
RewriteRule ^taxonomy(/.*)?$ https://example.org/taxonomy$1 [R=302,L]
```

Note `(/.*)?$` — with a bare `(/.*)$` the group is required, and
`/my-project/taxonomy` with no trailing slash does not match.

### Dispatch on a file extension

```apache
RewriteEngine on

RewriteRule ^vocab\.(ttl|jsonld|rdf)$ https://example.org/vocab.$1 [R=303,L]
```

### Query strings

The query string is **not** part of what the pattern matches. It is passed
through to the substitution automatically, as long as your substitution does not
contain a `?` of its own.

To match on the query string, you need `RewriteCond` with `%{QUERY_STRING}`:

```apache
RewriteCond %{QUERY_STRING} (.*)
RewriteRule ^ https://example.org/page.php?%1 [R=302,L]
```

Captures from a `RewriteCond` are referenced with `%1`, not `$1` — `$` is for
captures from the `RewriteRule` pattern. A trailing `?` on the substitution
discards the original query string instead of appending it.

## RewriteCond

`RewriteCond` adds a condition to the `RewriteRule` that immediately follows it.
Several conditions can stack; by default they are ANDed, and `[OR]` changes
that.

```
RewriteCond TestString CondPattern [Flags]
```

The most common use on this service is inspecting the `Accept` header for
content negotiation, which has its own page:
[Content negotiation](./content-negotiation).

## Things not to add

Contributors routinely copy directives from other identifiers without needing
them. Each of these has caused a real problem here:

| Directive | Why not |
| --- | --- |
| `Options +FollowSymLinks`, `Options -Indexes`, `Options -MultiViews` | Usually not needed for a remote redirect, and `-Indexes` has caused a 403 on a bare identifier URL. `-MultiViews` is the one with a real open question behind it — read [`htaccess/no-options-directive`](/rules/htaccess/no-options-directive) before removing one from a file you did not write. |
| A `[R=406,L]` catch-all fallback | Copied from conneg examples, it swallows every request that does not match an earlier rule. [`htaccess/no-406-fallback`](/rules/htaccess/no-406-fallback) |
| `RewriteCond %{HTTPS} !=on` and friends | The service is HTTPS-only already. |
| A copied `Access-Control-Allow-Headers` line | The widely-copied version in this repository is truncated and wrong. [`htaccess/valid-cors-header`](/rules/htaccess/valid-cors-header) |
| `RewriteBase` | Almost never needed when substituting an absolute URL. |

::: warning Other identifiers are not a style guide
There are thousands of `.htaccess` files in this repository, written by more
than a thousand people over more than a decade, and many are copies of copies.
The fact that hundreds of files contain a directive is evidence that it was
*copied*, not that it is *correct* — the truncated CORS header in
[`htaccess/valid-cors-header`](/rules/htaccess/valid-cors-header) reached hundreds
of files that way.

Write the smallest rule set that does what you need, and understand every line
of it.
:::

## Reference

- [Apache mod_rewrite documentation](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
- [RewriteRule flags](https://httpd.apache.org/docs/current/rewrite/flags.html)
- [Introduction to mod_rewrite regular expressions](https://httpd.apache.org/docs/current/rewrite/intro.html)
- [`.htaccess` on Wikipedia](https://en.wikipedia.org/wiki/.htaccess)
- Worked examples in the repository:
  [`ids/examples/`](https://github.com/perma-id/w3id.org/tree/master/ids/examples)
