# w3id.org contribution checker

Checks a change to this repository against the rules contributions are
expected to follow, and explains what to do about anything it finds.

```sh
cd tools/checker && npm ci      # once
node tools/checker/bin/w3id-check.js
```

With no arguments it compares your branch against `origin/master` and reports
only what your change is answerable for.

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

**The repository has a large backlog.** Around 8,000 findings exist in the tree
already: 3,700 lines with trailing whitespace, 1,600 redirects still on plain
`http`, 25 identifiers whose redirects do not work at all. Reporting those to
somebody adding one directory would be useless noise. So every finding is
classified against the diff, and a policy decides what survives.

## Provenance

| Provenance | Meaning | Reported as, by default |
| --- | --- | --- |
| `introduced` | on a line this change added, or in a file it created | the rule's own severity |
| `touched` | in a file or namespace this change touches, on a line it left alone | `warning` |
| `preexisting` | anywhere else in the tree | not at all |

`.w3id-check.yaml` in the repository root holds that policy. Raising the values
there is how strictness gets ratcheted up over time; no code changes.

Rules marked `critical` — security problems, and redirects that are silently
dead in production — are the exception. They are reported for anything the
change touches even though `preexisting` is off, as a non-blocking `notice`, so
that whoever is editing an identifier learns it does not resolve. Critical
findings elsewhere stay suppressed: a first-time contributor cannot act on
them. `--triage` is what surfaces those, to maintainers.

## Commands

```sh
w3id-check                          # your branch, default policy
w3id-check --quiet                  # only what blocks the pull request
w3id-check --base origin/main       # compare against a different branch

w3id-check --all                    # whole tree, every rule at its own severity
w3id-check --all --stats            # how big the backlog is
w3id-check --triage                 # what should be fixed out of band, and by whom

w3id-check --list-rules
w3id-check --rule htaccess/https-target --all
w3id-check --tag security --all
w3id-check --format markdown --output report.md
```

`--stats` and `--triage` always exit 0; they are reports, not gates. Otherwise
exit status is 0 for no errors, 1 for at least one error, 2 for bad usage and 3
if the checker itself failed.

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

`ctx` provides `tree`, `idPaths`, `read(path)`, `htaccess(path)` (parsed and
cached), `namespaceOf(path)`, `changes`, `changedPaths`, `changedNamespaces`,
`addedLines`, `commits`, `behindUpstream` and `options` (this rule's entry
under `options:` in the config). Everything is computed at most once per run.

Write messages for somebody who has never seen this repository: say what is
wrong, what breaks because of it, and the command or edit that fixes it.

### `.htaccess` parsing

Use `ctx.htaccess(path)`, not string matching. The corpus is not line-clean —
57 files use CRLF, nine join directives with trailing backslashes, eight put
`#` comments after directive arguments, and `#` appears legitimately inside
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
