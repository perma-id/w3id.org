# Maintaining an identifier

Adding an identifier is easy. Changing one that people already depend on is
where the care is needed, because by then you no longer know who is relying on
it.

## The mental model

Assume that:

- Somebody has your identifier embedded in a dataset you will never see.
- Somebody has it hard-coded in software that is no longer maintained.
- Somebody has it in a published paper, and cannot edit it.
- Some of those clients cached your redirect, possibly permanently.

You cannot notify any of them. So the guiding principle is: **changes should be
additive, and old paths should keep resolving.**

## Who may change an identifier

The maintainers listed in the identifier's `.htaccess` comments or `README.md`.

If you are submitting a change to a directory you are not listed on, say so in
the pull request and **tag one of the listed maintainers to approve it**.
Reviewers check this. From the outside, an unexplained change to somebody
else's namespace is indistinguishable from an attempt to take it over, and a
reviewer has no way to tell the two apart without being told.

If the listed maintainer is unreachable and you have a legitimate claim, say
so — in the pull request, or by raising it first as an
[issue](https://github.com/perma-id/w3id.org/issues) or on the
[mailing list](https://lists.w3.org/Archives/Public/public-perma-id/) — rather
than pushing the change through and leaving the reviewer to guess.

## Zero-downtime updates

You control your target server; you do not control when the pull request
changing this repository is merged. Everything between those two moments is a
window in which the identifier is live and pointing somewhere, so sequence the
two so that no arrangement of them breaks:

1. On the target, keep the old URLs working and **add** the new ones. Both
   resolve.
2. Open the pull request, and let it be reviewed and merged whenever it is.
3. Only then retire the old target resources, if retiring them is appropriate
   at all.

Do it the other way round — remove the old URLs, then wait for review — and
the identifier is broken for however long the review takes.

If that is not possible — a target that cannot serve both sets of URLs at
once, a coordinated announcement, an embargo — say so rather than hoping the
timing works out. Open the pull request **as a draft** and describe the window
you need. A draft cannot be merged, so it will not land early by accident, and
a maintainer will work out a time with you; mark it ready when that time comes.

### Add before you remove

The same rule applies inside the `.htaccess`. When your content moves, do not
rewrite the existing rule in place and assume nothing was using the old path;
you cannot see who is. Add the new rule, confirm it works, and only then
consider removing anything.

```apache
RewriteEngine on

# New location, current as of 2026-09.
RewriteRule ^vocab$ https://new-host.example.org/vocab.ttl [R=302,L]

# Old paths, kept working. Clients out there still request these.
RewriteRule ^ontology$ https://new-host.example.org/vocab.ttl [R=302,L]
RewriteRule ^v1/vocab$ https://new-host.example.org/v1/vocab.ttl [R=302,L]
```

Old paths cost you two lines of configuration. Removing them costs somebody
else a broken application.

## Keep the meaning stable

An identifier names a thing. Redirecting it somewhere that describes a
*different* thing is a breaking change even though every URL still resolves —
and it is a silent one, because nothing 404s. Consumers just start getting
wrong data.

If the thing genuinely changed, mint a new identifier.

## Never repurpose an identifier

Do not take over a directory that belonged to an abandoned project and point it
at yours. The old identifier is still in other people's data, and now it
resolves to something unrelated. This is worse than a broken link, because it
fails silently.

If a project is gone and you want a similar name, pick a different one.

## Avoid 301, and be careful undoing one

**302** and **303** are re-checked by clients. **301 Moved Permanently** may be
cached indefinitely — browsers in particular are aggressive about this — so a
301 you regret cannot be fully retracted. Some fraction of clients will keep
following the old target for as long as their cache survives.

Use 302 for ordinary redirects and 303 for content-negotiated ontology IRIs.
Reserve 301 for cases where you are certain the move is permanent and you have
thought about the consequences of being wrong.

## Test both before and after

Before opening the pull request, check that the paths that worked before still
work, and that the new ones do too:

```sh
# against your local test server -- see the Testing guide
curl -sI http://localhost:8080/my-project/vocab
curl -sI http://localhost:8080/my-project/ontology     # the old path
curl -sI -H 'Accept: text/turtle' http://localhost:8080/my-project/
```

Write the list of URLs you are checking into the pull request description. It
tells the reviewer what you thought about, and it tells the next maintainer what
mattered.

## Transferring maintainership

Update the contact details in `.htaccess` and/or `README.md` in a pull request,
and have **both** the outgoing and incoming maintainer visible on it — the
outgoing maintainer opening it, or approving it, or commenting on it. Include
the new maintainer's GitHub username. See
[`meta/maintainer-github-username`](/rules/meta/maintainer-github-username).

Do this while the outgoing maintainer is still reachable. The alternative is a
namespace nobody can legitimately change.

## Retiring an identifier

Identifiers are not deleted. Removing the directory turns the identifier into a
404 for everyone still using it, and destroys the record of what it once meant.

Instead, make the outcome explicit. If the content is genuinely gone and is not
coming back:

```apache
RewriteEngine on

# The Foo vocabulary was withdrawn in 2026. Nothing replaces it.
RewriteRule ^ - [G]
```

`[G]` returns **410 Gone**, which tells a client the resource is deliberately
withdrawn rather than temporarily missing.

Better, where it applies: point at a tombstone page explaining what happened and
what people should use instead.

```apache
RewriteRule ^ https://example.org/foo-vocab-withdrawn.html [R=302,L]
```

Either way, keep the `README.md` and explain the situation in it.

## Housekeeping

Some things worth doing when you touch an identifier you have not looked at in a
while:

- **Check your redirect target still resolves.** Link rot is why this service
  exists, and identifier directories are not exempt. Repository renames,
  ownership transfers, and branch renames on GitHub all silently break targets.
- **Check for `refs/heads/` and `/blob/` in GitHub URLs** — both are common and
  both are wrong. See [`htaccess/github-raw-target`](/rules/htaccess/github-raw-target).
- **Check the target is HTTPS.** See [`htaccess/https-target`](/rules/htaccess/https-target).
- **Check the maintainer contact is still accurate**, and that the GitHub
  username is present.
- **Check you are not pointing at a moving branch.** A target on `master` or
  `main` changes under you; a tag does not.

## Pull request expectations

The same as for a new identifier — see
[Creating an identifier](./create-an-id#_7-open-the-pull-request) — plus:

- **Say what changed and why** in the description, not just what the diff shows.
- **Say which URLs you tested.**
- **Say whether any existing path stops working.** If one does, explain why that
  is acceptable. If you are not sure, keep it working.
