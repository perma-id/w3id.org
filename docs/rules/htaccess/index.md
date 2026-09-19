---
title: .htaccess rules
---

# `.htaccess` rules

Everything about the redirect rules themselves: how they are written, and where
they point.

## Syntax

These break the file. Apache refuses to parse an invalid directive, and an
unparseable `.htaccess` returns 500 for every URL under the directory.

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/no-flag-whitespace`](./no-flag-whitespace) | error | No spaces inside the `[...]` flag list |
| [`htaccess/valid-rewrite-flags`](./valid-rewrite-flags) | error | Flag names must be ones mod_rewrite knows |
| [`htaccess/no-inline-comment`](./no-inline-comment) | error | `#` only starts a comment at the start of a line |
| [`htaccess/uppercase-rewrite-flags`](./uppercase-rewrite-flags) | warning | Write flags in upper case |

## Rules that never match

These do not break anything. They simply never fire, and the request falls
through to a 404 with nothing in the logs to say why.

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/rewrite-engine-required`](./rewrite-engine-required) | error | `RewriteRule` does nothing without `RewriteEngine on` |
| [`htaccess/pattern-relative-to-dir`](./pattern-relative-to-dir) | error | No leading slash, no repeated directory name |
| [`htaccess/anchor-patterns`](./anchor-patterns) | warning | Make an optional trailing group optional |
| [`htaccess/no-greedy-capture`](./no-greedy-capture) | warning | `^(.+)/?$` swallows the slash |
| [`htaccess/escape-literal-dots`](./escape-literal-dots) | warning | `.` is a wildcard; escape a literal dot |

## Redirect targets

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/no-open-redirect`](./no-open-redirect) | error | Never build the target hostname from the request |
| [`htaccess/https-target`](./https-target) | warning | Redirect to `https://` |
| [`htaccess/github-raw-target`](./github-raw-target) | warning | Raw file URLs, not `/blob/` pages |
| [`htaccess/no-double-slash`](./no-double-slash) | warning | No `//` in the produced URL |
| [`htaccess/no-self-redirect`](./no-self-redirect) | warning | Point at the destination, not back at w3id.org |
| [`htaccess/avoid-permanent-redirect`](./avoid-permanent-redirect) | warning | A 301 cannot be taken back |

## Directives and negotiation

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/allowed-directives`](./allowed-directives) | error | No code execution, proxying, or access control |
| [`htaccess/valid-cors-header`](./valid-cors-header) | warning | Do not copy the truncated CORS line |
| [`htaccess/no-406-fallback`](./no-406-fallback) | warning | Ending negotiation in 406 answers nobody |
| [`htaccess/no-options-directive`](./no-options-directive) | *proposed* | `Options` directives — open questions |

Back to the [rule catalogue](../).
