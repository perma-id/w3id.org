# w3id.org contribution checker

Checks a change to this repository against the rules contributions are
expected to follow, and explains what to do about anything it finds.

```sh
(cd tools/check && npm ci)   # once
node tools/check/bin/w3id-check.js
```

With no arguments it compares your branch against `upstream/master` if you have
an `upstream` remote, and `origin/master` otherwise, counts
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
content. `test/corpus.test.js` does the same, so that a maintainer running it
with edits in progress sees what CI sees.

A `--head` that is not the checked-out commit implies it. Uncommitted edits are
changes to what is checked out; laid over another commit, such as a pull
request fetched for review, they would report the reviewer's work in progress
as the contributor's.

Where files are read from follows the same logic. Normally that is the disk.
For a `--head` the checkout does not contain, such as a pull request fetched
into a branch, the file list and contents come from that commit, because none
of its files need be on disk. When the checkout does contain it, as CI's merge
of the pull request into master does, the disk is still what is read, so the
check also sees whatever master has gained since the pull request forked.

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
w3id-check --head my-branch         # check a branch other than the current one
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
w3id-check --skip-rule git/minimal-commits   # everything except one rule
w3id-check --tag security --all
w3id-check --format markdown --output report.md
w3id-check --help                   # every option
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

## Checking a pull request

Fetch its commits and point `--head` at them. For a one-off check, `FETCH_HEAD`
saves making a branch:

```sh
git fetch origin                     # current master
git fetch origin pull/123/head       # the pull request, as FETCH_HEAD
node tools/check/bin/w3id-check.js --base origin/master --head FETCH_HEAD
```

Fetch the pull request on its own: `FETCH_HEAD` names the first ref fetched,
and the next fetch replaces it. To keep it around, fetch it into a branch. The
`+` lets a re-fetch replace the branch after the contributor force-pushes:

```sh
git fetch origin +pull/123/head:pr-123
node tools/check/bin/w3id-check.js --base origin/master --head pr-123
```

Worth knowing:

- Your own uncommitted work stays out. A `--head` that is not the checkout
  implies `--committed-only`, and the pull request's files are read from its
  commit rather than from your disk.
- Run it from your own up-to-date checkout rather than checking out the pull
  request. CI checks the pull request merged into current master, so it uses
  today's checker and rules; an old fork's branch carries an old checker, or
  none at all.
- Add a directory to narrow the report, even one only the pull request has:
  `--head pr-123 ids/their-id`.
- The one difference from CI: checked from your own checkout, the tree is the
  pull request's commit, which lacks any identifier master has gained since it
  forked. A check that depends on those, such as a case collision with a newer
  identifier, is only exact from a worktree of the merge ref, described below.
- The report covers only what the pull request is answerable for. A finding
  marked "already there" is in a file or namespace it touches, on a line it
  left alone — see [Provenance](#provenance).
- `--format markdown` gives the report CI writes to its job summary, and
  `--format github` the annotation lines. `--why` explains a finding you
  expected and did not get.
- In a clone of your own fork, the main repository is usually the `upstream`
  remote; use it in place of `origin`.

### Serving it, or running its own checker

GitHub also publishes `pull/123/merge`: the pull request merged into current
master, which is exactly what CI checks — today's `tools/` with the
contributor's `ids/`. It exists only while the pull request is open and merges
without conflicts. A worktree of it can be served:

```sh
git fetch origin +pull/123/merge:pr-123-merge
git worktree add ../w3id-pr-123 pr-123-merge
cd ../w3id-pr-123
tools/server/bin/run-server
```

`run-server` serves the `ids/` of the checkout it is run from, and reuses the
Apache that `build-httpd` cached, so nothing is rebuilt. Every checkout shares
one pid file, though, so stop any server you already have running, or give this
one its own run directory and port:

```sh
W3ID_PORT=8081 W3ID_RUNDIR=~/.local/state/w3id/pr-123 tools/server/bin/run-server
```

Docker works the same way: `cd tools/server && docker compose up` in the
worktree.

The same worktree reproduces CI exactly. Run the checker inside it with the
pull request's own head, as CI does; the worktree contains that commit, so its
files are read from disk, merged with today's master:

```sh
node tools/check/bin/w3id-check.js --base origin/master --head pr-123
```

That needs the `pr-123` branch from earlier, and `(cd tools/check && npm ci)`
in the worktree first, because `node_modules` is not shared between worktrees.
It is also the way to check a pull request that changes `tools/check` itself,
since CI then runs the pull request's version of the checker.

### Cleaning up

Stop a server started with `run-server start` (`run-server stop`) or Docker
(`docker compose down`) in the worktree first. Then, from your own checkout:

```sh
git worktree remove ../w3id-pr-123
git branch -D pr-123 pr-123-merge
```

Ignored files such as `node_modules` do not stop `git worktree remove`; other
untracked files do, and `git status` inside the worktree lists them.
`git branch --list 'pr-*'` and
`git worktree list` show anything left over, and `git worktree prune` tidies up
after a worktree directory deleted by hand. `FETCH_HEAD` needs nothing: the
next fetch replaces it.

## Is the backlog shrinking?

```sh
node tools/check/bin/w3id-check-trend.js
```

Today's rules against the tree as it was a week, a month and a year ago. It
prints two things per rule, because they want different responses: the count
says whether the backlog is shrinking, and the rate -- findings per thousand
files -- says whether new contributions are still making the mistake. A count
can rise while the rate falls, which is a fixed proportion of a growing tree
rather than anything getting worse.

Nothing in this repository gates on a finding count, and this is why. Bounding
each rule's count and failing CI when a bound is exceeded is the obvious
alternative, but the tree grows about 30% a year: ordinary growth exceeds any
bound tight enough to be useful within weeks, and CI then fails for something
no contributor did. The trend report stores no numbers at all, so there is
nothing to keep up to date.

## When a rule is wrong

Report it: <https://github.com/perma-id/w3id.org/issues>. A false positive is
a bug in the rule, and so is a check that should have been made and was not —
the latter is harder to notice, because the only person placed to see it is
whoever has just watched their own mistake pass a clean run.

The URL lives in `feedbackUrl` in `.w3id-check.yaml`; the report and every
rule page take it from there, and a test holds the pages to it.

## Writing a rule

A rule is a module in `src/rules/<category>/<name>.js`, registered in
`src/rules/index.js`. Its `id` doubles as its documentation slug: findings link
to `<docsBaseUrl><id>`, and `meta/rule-docs-exist` holds `docs/rules/` and the
registry to a one-to-one mapping.

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

`ctx` provides `tree`, `idPaths`, `read(path)`, `size(path)`, `mode(path)`,
`htaccess(path)` (parsed and cached), `namespaceOf(path)`, `changes`,
`changedPaths`, `changedNamespaces`, `addedLines`, `commits`,
`behindUpstream`, `uncommittedPaths`, `scope`, `inScope(path)` and `options`
(this rule's entry under `options:` in the config). Everything is computed at
most once per run.

`mode(path)` returns the file mode git records — `'100644'`, `'100755'`,
`'120000'` — taken from the index, and from disk for work the run counts as
uncommitted. It returns `null` when the mode cannot be established, including
everywhere git does not record the executable bit at all. `null` means "not
known", never "not executable", so test for the mode you care about rather
than negating.

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
W3ID_CHECK_CORPUS=1 npm test      # also run every rule over the real tree
```

Rule tests build a throwaway git repository (`test/helpers.js`) rather than
asserting against the live tree, so they stay valid as the tree changes.

`test/corpus.test.js` runs every rule over the whole repository and asserts
that none of them throws, and that the run produced findings at all — a rule
set that fails to load and a tree that is not there both look like "no
errors" from outside. It is off by default because the tree is over five
thousand files; the `Audit` workflow runs it on pushes to master and weekly, and
`Checker Node matrix` runs it on each supported Node version when `tools/`
changes.

**It asserts no counts**, deliberately. The file's own header gives the
argument: the identifier tree grows about 30% a year, so a per-rule upper
bound tight enough to notice a rule over-matching is exceeded within weeks by
ordinary growth, and one loose enough to survive that detects nothing. Counts
are reported instead, by `bin/w3id-check-trend.js`, which computes its
comparison points from dates and stores no numbers. The consequence to know
about: nothing here notices a rule that silently stops matching — the trend
report names a rule whose count has reached zero, but that is somebody
reading a report, not CI failing.

`test/references.test.js` is the one to know about before renaming a rule. A
rule id gets written down in more places than the registry: this README, the
contributor instructions, `.w3id-check.yaml`, workflow files, an
`.editorconfig` comment. `meta/rule-docs-exist` covers the documentation pages
and nothing else covers the rest, so without this a rename means sweeping
those by hand and hoping. The test scans them and names any id that does not
resolve.
