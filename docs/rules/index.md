# Rule catalogue

Each rule on this page describes one specific, checkable thing that
contributions to this repository get wrong. They exist because these mistakes
recur — most of them have needed repeated corrective commits over the years.

Every rule has a stable URL of the form `https://w3id.org/docs/rules/<id>`, so a
reviewer or an automated check can link to the exact explanation rather than
restating it.

If you are looking for a walkthrough rather than a reference, start with the
[guides](/guides/).

## How to read a rule

| Field | Meaning |
| --- | --- |
| **`id`** | Stable identifier. Also the page's URL and how checks refer to it. |
| **`severity`** | `error` — the identifier is broken or the change is not acceptable. `warning` — it works, but it will cause problems. `notice` — advisory. |
| **`status`** | `enforced` — an automated check emits this id. `proposed` — documented, not yet checked. |
| **`applies-to`** | Which files the rule concerns, as a reader-facing summary. The checker's own patterns are the source of truth. |

The three severities are the three annotation levels GitHub Actions
understands, so a finding keeps the same word from the checker's output through
to the pull request.

## Running the checks

The checker lives in `tools/check/` and needs no arguments:

```sh
cd tools/check && npm ci
cd ../.. && node tools/check/bin/w3id-check.js
```

It compares your branch against `origin/master`, counts work you have not
committed yet, and reports only what your own change is answerable for — the
repository's existing backlog stays out of your way. To look at one directory:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```

Only `error` findings block a pull request. A `warning` is something a
maintainer will probably ask about; a `notice` is there so you have seen it.

::: warning The existing repository is not a style guide
There are thousands of `.htaccess` files here, written by more than a thousand
people over more than a decade, and many are copies of copies. That a pattern
appears in hundreds of files is evidence it was *copied*, not that it is
*correct* —
[`htaccess/valid-cors-header`](./htaccess/valid-cors-header) documents a broken
line that spread to hundreds of files exactly that way.

These rules are maintainer guidance. Existing files are not.
:::

The rules are not infallible either. If one is wrong about your files, or if
something that should have been caught was not, please
[open an issue](https://github.com/perma-id/w3id.org/issues). A false positive
is a bug in the rule rather than something to work around, and a check that
should exist is hardest to notice from the inside — the person best placed to
report it is whoever has just watched their own mistake pass.

## [Files and directories](./files/)

| Rule | Severity | What |
| --- | --- | --- |
| [`files/only-allowed-names`](./files/only-allowed-names) | error | Only `.htaccess` and a README — no content files, and the rules file must be named exactly |
| [`files/no-empty-htaccess`](./files/no-empty-htaccess) | error | An `.htaccess` with no directives resolves to 404 |
| [`files/htaccess-required`](./files/htaccess-required) | warning | Something in the directory must answer requests |
| [`files/prefer-readme-md`](./files/prefer-readme-md) | warning | Write it as Markdown, called `README.md` |

## [Repository shape](./tree/)

| Rule | Severity | What |
| --- | --- | --- |
| [`tree/no-case-collision`](./tree/no-case-collision) | error | Two names differing only by case cannot both be checked out |
| [`tree/only-own-identifier`](./tree/only-own-identifier) | warning | Keep a change to one identifier |

## [`.htaccess` syntax](./htaccess/)

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/no-flag-whitespace`](./htaccess/no-flag-whitespace) | error | No spaces inside the `[...]` flag list |
| [`htaccess/valid-rewrite-flags`](./htaccess/valid-rewrite-flags) | error | Flag names must be ones mod_rewrite knows |
| [`htaccess/no-inline-comment`](./htaccess/no-inline-comment) | error | `#` only starts a comment at the start of a line |
| [`htaccess/uppercase-rewrite-flags`](./htaccess/uppercase-rewrite-flags) | warning | Write flags in upper case |

## [Rules that never match](./htaccess/)

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/rewrite-engine-required`](./htaccess/rewrite-engine-required) | error | `RewriteRule` does nothing without `RewriteEngine on` |
| [`htaccess/pattern-relative-to-dir`](./htaccess/pattern-relative-to-dir) | error | No leading slash, no repeated directory name |
| [`htaccess/anchor-patterns`](./htaccess/anchor-patterns) | warning | Make an optional trailing group optional |
| [`htaccess/no-greedy-capture`](./htaccess/no-greedy-capture) | warning | `^(.+)/?$` swallows the slash |
| [`htaccess/escape-literal-dots`](./htaccess/escape-literal-dots) | warning | `.` is a wildcard; escape a literal dot |

## [Redirect targets](./htaccess/)

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/no-open-redirect`](./htaccess/no-open-redirect) | error | Never build the target hostname from the request |
| [`htaccess/https-target`](./htaccess/https-target) | warning | Redirect to `https://` |
| [`htaccess/github-raw-target`](./htaccess/github-raw-target) | warning | Raw file URLs, not `/blob/` pages |
| [`htaccess/no-double-slash`](./htaccess/no-double-slash) | warning | No `//` in the produced URL |
| [`htaccess/no-self-redirect`](./htaccess/no-self-redirect) | warning | Point at the destination, not back at w3id.org |
| [`htaccess/avoid-permanent-redirect`](./htaccess/avoid-permanent-redirect) | warning | A 301 cannot be taken back |

## [Directives and negotiation](./htaccess/)

| Rule | Severity | What |
| --- | --- | --- |
| [`htaccess/allowed-directives`](./htaccess/allowed-directives) | error | No code execution, proxying, or access control |
| [`htaccess/valid-cors-header`](./htaccess/valid-cors-header) | warning | Do not copy the truncated CORS line |
| [`htaccess/no-406-fallback`](./htaccess/no-406-fallback) | warning | Ending negotiation in 406 answers nobody |
| [`htaccess/no-options-directive`](./htaccess/no-options-directive) | *proposed* | `Options` directives — open questions |

## [File format](./format/)

| Rule | Severity | What |
| --- | --- | --- |
| [`format/no-bom`](./format/no-bom) | error | No byte order mark — it makes Apache return 500 |
| [`format/no-crlf`](./format/no-crlf) | warning | Unix line endings, not CRLF |
| [`format/final-newline`](./format/final-newline) | warning | End the file with a newline |
| [`format/no-trailing-whitespace`](./format/no-trailing-whitespace) | warning | No trailing whitespace that does nothing |
| [`format/no-excessive-blank-lines`](./format/no-excessive-blank-lines) | warning | No long runs of blank lines, and none at the start or end |

## [Markdown](./markdown/)

| Rule | Severity | What |
| --- | --- | --- |
| [`markdown/prefer-list-over-line-breaks`](./markdown/prefer-list-over-line-breaks) | notice | A stack of manual line breaks reads better as a list |

## [Pull request shape](./git/)

These look at the commits rather than the files, so they are reported on a pull
request and not by a run scoped to a directory.

| Rule | Severity | What |
| --- | --- | --- |
| [`git/minimal-commits`](./git/minimal-commits) | warning | One identifier change should be one commit |
| [`git/no-merge-commits`](./git/no-merge-commits) | warning | Rebase; do not merge master into your branch |
| [`git/descriptive-commit-message`](./git/descriptive-commit-message) | warning | Name the identifier, not the filename |
| [`git/branch-not-stale`](./git/branch-not-stale) | notice | Start from a recent master |

## [Metadata](./meta/)

| Rule | Severity | What |
| --- | --- | --- |
| [`meta/document-identifier-root`](./meta/document-identifier-root) | warning | Claim the root of an identifier with a maintainer record |
| [`meta/maintainer-github-username`](./meta/maintainer-github-username) | warning | Record who maintains the identifier, with a GitHub username |
| [`meta/rule-docs-exist`](./meta/rule-docs-exist) | warning | Every rule has a page and every page has a rule |

## For tooling

Every rule page carries YAML frontmatter with `id`, `title`, `severity`,
`status`, and `applies-to`. The `id` is always the page's path relative to
`docs/rules/` with the `.md` removed — so `docs/rules/htaccess/https-target.md`
has the id `htaccess/https-target` — and a checker can enumerate the rule set
from `docs/rules/**/*.md` and emit `https://w3id.org/docs/rules/<id>` in its
output.

Pages named `index.md` are catalogue pages, not rules, and carry no `id`.

That contract is itself checked, by
[`meta/rule-docs-exist`](./meta/rule-docs-exist): every rule the checker
implements must have a page, every page claiming `status: enforced` must have a
rule behind it, and a page's `id` must match its path.

`applies-to` is outside that contract. It is a summary written for readers,
and nothing verifies it against the patterns the rule actually selects on, so
do not use it to decide which files to check — read the rule. The frontmatter
fields safe to build on are the ones above: `id`, `severity` and `status`.

Raw Markdown for any page is available by appending `.md` to its URL, and the
whole site is published as [`llms.txt`](https://w3id.org/docs/llms.txt) and
[`llms-full.txt`](https://w3id.org/docs/llms-full.txt).
