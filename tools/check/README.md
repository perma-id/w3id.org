# w3id.org contribution checker

Checks a change to this repository against the rules contributions are
expected to follow, and explains what to do about anything it finds.

```sh
cd tools/check && npm ci      # once
node tools/check/bin/w3id-check.js
```

With no arguments it compares your branch against `origin/master`, counts
anything you have not committed yet as part of that change, and reports only
what the change is answerable for.

Give it paths to look at just those:

```sh
node tools/check/bin/w3id-check.js ids/my-project
node tools/check/bin/w3id-check.js ids/foo ids/bar
```

On their own, paths mean "check these as they stand on disk" rather than
"compare them with master" — work in progress usually has nothing committed to
compare against yet. Paths resolve relative to where you are, so
`cd ids && w3id-check my-project` works. A path that does not exist is an
error, not an empty run: a typo must never come back as success.

## Why it works the way it does

Two constraints shaped the design, and most of what looks unusual here follows
from one of them.

**Pull requests come from forks, and a fork's token is read-only.** GitHub caps
every permission at `read` for a `pull_request` event from a fork, whatever the
workflow asks for, and exposes no secrets. So the checker reports through
mechanisms that need no token at all: workflow log annotations, which the
runner turns into inline comments on the diff, and the job summary. The
`pull_request_target` trigger would lift that restriction and is never used —
it runs with a write token while checking out code the contributor controls.

**The repository has a large backlog.** Thousands of findings exist in the tree
already: lines with trailing whitespace, redirects still on plain `http`,
identifiers whose redirects do not work at all. Reporting those to
somebody adding one directory would be useless noise. So every finding is
classified against the diff, and a policy decides what survives.

## What counts as your change

Uncommitted edits and untracked files count. A contributor halfway through a
namespace, with nothing committed, is the ordinary case — being told "no
problems found" because the checks only looked at commits was the single most
misleading thing this tool did.

So the working tree is included by default: untracked files are part of
`ctx.tree`, and lines edited on disk are `introduced` the same as committed
ones. Untracked files come from `git status`, so `.gitignore` still applies and
`node_modules/` stays out.

`--committed-only` turns that off, for a reproducible audit of committed
content. `test/corpus.test.js` uses it, so that a maintainer running the ratchet
with edits in progress does not see the bounds move.

## Provenance

| Provenance | Meaning | Reported as, by default |
| --- | --- | --- |
| `introduced` | on a line this change added, or in a file it created | the rule's own severity |
| `touched` | in a file or namespace this change touches, on a line it left alone | `warning` |
| `preexisting` | anywhere else in the tree | not at all |

`.w3id-check.yaml` in the repository root holds that policy. Raising the values
there is how strictness gets ratcheted up over time; no code changes.

Its `rules:` block names rule ids, and a key naming no rule is refused at load
rather than ignored. Severities are looked up by id, so a stale key would
otherwise do nothing at all — and renaming a rule would quietly turn a
deliberate `off` back on. Run `w3id-check --list-rules` for the current set.

Rules marked `critical` — security problems, and redirects that are silently
dead in production — are the exception. They are reported for anything the
change touches even though `preexisting` is off, as a non-blocking `notice`, so
that whoever is editing an identifier learns it does not resolve. Critical
findings elsewhere stay suppressed: a first-time contributor cannot act on
them. `--triage` is what surfaces those, to maintainers.

## Commands

```sh
w3id-check                          # your branch, committed or not
w3id-check --quiet                  # only what blocks the pull request
w3id-check --base origin/main       # compare against a different branch
w3id-check --committed-only         # ignore what is not committed yet

w3id-check ids/my-project           # one directory, as it stands
w3id-check ids/foo ids/bar          # several
w3id-check ids/foo/.htaccess        # a single file

w3id-check --all                    # whole tree, every rule at its own severity
w3id-check --all --stats            # how big the backlog is
w3id-check --triage                 # what should be fixed out of band, and by whom
w3id-check --triage ids/my-project  # ... in one namespace
w3id-check --why ids/my-project     # why the run said nothing about this

w3id-check --list-rules
w3id-check --rule htaccess/https-target --all
w3id-check --tag security --all
w3id-check --format markdown --output report.md
```

Paths are a filter, not a mode: they narrow whatever the run would otherwise
do, so they combine with `--all`, `--triage` and `--base`.

`--stats`, `--triage` and `--why` always exit 0; they are reports, not gates.
Otherwise exit status is 0 for no errors, 1 for at least one error, 2 for bad
usage and 3 if the checker itself failed.

### `--why`

A quiet run has four possible explanations and looks the same in all of them:
the rule found nothing, it found something the policy suppressed, the finding
was outside the paths you asked about, or the rule never ran. `--why` says
which, for each rule, with the suppressed findings listed underneath.

It is worth knowing what it cannot tell you. With a commit range, rules that
work file by file are only given the paths the change touches, so an untouched
file is never opened and produces nothing to suppress -- the report says how
many paths were examined, and `--all` is what widens it. Tree rules see the
whole tree either way, which is where a `preexisting` finding in a branch run
comes from.

The terminal output caps the list of suppressed findings per rule. `--why
--format json` carries all of them, which is the form to query when the answer
is longer than a screen.

## Writing a rule

A rule is a module in `src/rules/<category>/<name>.js`, registered in
`src/rules/index.js`. Its `id` doubles as its documentation slug: findings link
to `<docsBaseUrl><id>`, and `meta/rule-docs-exist` will hold `docs/rules/` and
the registry to a one-to-one mapping once that directory exists.

```js
export default {
  id: 'htaccess/rewrite-engine-required',
  description: 'RewriteRule has no effect without RewriteEngine on',
  tags: ['htaccess', 'correctness'],
  severity: 'error',        // config may override; `off` disables
  critical: true,           // optional; see above
  scope: 'file',            // 'file' | 'tree' | 'git'
  files: ['**/.htaccess'],  // scope: 'file' only
  messages: {
    missing: 'This file has {{count}} RewriteRule directives but no ...'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed !== null && !parsed.rewriteEnabled()) {
      report({messageId: 'missing', line: 1, data: {count: 2}});
    }
  }
};
```

Scope decides what the rule is handed and what it costs:

- `file` — called once per matching file, with `ctx.file` set. In a range run
  only changed files are visited, so a rule costs nothing on an unrelated pull
  request. A `critical` file rule also sees the rest of every namespace the
  change touches.
- `tree` — called once, with the whole tree available. Use for anything
  cross-file: collisions, missing files, per-namespace metadata.
- `git` — called once, for rules about the commits rather than the content.

**A path scope does not narrow what a rule sees.** It is applied to findings
instead, in `engine.run()`. `tree/no-case-collision` has to compare a new
`ids/Foo` against the whole tree to know it collides with an existing
`ids/foo`, and that is exactly the run where somebody has scoped to `ids/Foo`.
For `scope: 'file'` rules the candidate list is narrowed too, but only as a
saving — the findings would have been dropped anyway. Findings that carry no
`file` (the `git` rules) are never scoped away: whether the branch needs a
rebase does not stop being true because the reader asked about one directory.

`ctx` provides `tree`, `idPaths`, `read(path)`, `htaccess(path)` (parsed and
cached), `namespaceOf(path)`, `changes`, `changedPaths`, `changedNamespaces`,
`addedLines`, `commits`, `behindUpstream`, `uncommittedPaths`, `scope`,
`inScope(path)` and `options` (this rule's entry under `options:` in the
config). Everything is computed at most once per run.

A rule does not normally need `scope` or `inScope` — the engine applies them —
but they are there for a rule that wants to skip work it knows will be
discarded.

Write messages for somebody who has never seen this repository: say what is
wrong, what breaks because of it, and the command or edit that fixes it.

### `.htaccess` parsing

Use `ctx.htaccess(path)`, not string matching. The corpus is not line-clean —
files use CRLF, join directives with trailing backslashes, put `#` comments
after directive arguments, and `#` appears legitimately inside
rewrite patterns and URL fragments. The parser normalises all of that and
records what it normalised, so rules can report those facts instead of being
tripped by them.

## Tests

```sh
npm test                          # fixtures and unit tests, no repository needed
W3ID_CHECK_CORPUS=1 npm test      # also ratchet the counts against the real tree
```

Rule tests build a throwaway git repository (`test/helpers.js`) rather than
asserting against the live tree, so they stay valid as the tree changes.

`test/corpus.test.js` holds an upper bound per rule over the whole repository.
Exceeding one means either a change made the tree worse or a rule started
over-matching. A count that has *fallen* is someone fixing the backlog: the
test prints the new number so the bound can be lowered and the ground kept.
It is off by default so that a pull request fixing an identifier does not have
to edit it; the `Audit` workflow runs it on every push to master.

`test/references.test.js` is the one to know about before renaming a rule. A
rule id gets written down in more places than the registry: this README, the
contributor instructions, `.w3id-check.yaml`, workflow files, an
`.editorconfig` comment. `meta/rule-docs-exist` covers the documentation pages
and nothing covered the rest, so a rename used to mean sweeping by hand and
hoping. The test scans them and names any id that no longer resolves.
