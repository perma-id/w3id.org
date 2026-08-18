# Mining Permitting Directory

The permanent identifier `https://w3id.org/mining-permitting-directory/` and the resources beneath
it — jurisdictions, criteria, authorization types. The Mining Permitting Directory is a structured
record of which authorizations a mining project requires, in which jurisdiction, on what documentary
evidence, and with what degree of certainty. The identifier names those things; `.htaccess` in this
directory redirects each one, with a `303 See Other`, to human-readable documentation about it.

## Maintainer

**GitHub: `SCPerm727`** — <https://github.com/SCPerm727>

A GitHub account and deliberately no email address. This directory is served from a public
repository, so an address written here is an address that gets harvested, and a profile outlives a
change of mail provider — the failure mode that leaves a w3id entry pointing at a contact nobody
answers, on a path that is permanent and allocated first-come-first-served.

**The scope of this contact is maintenance of this redirect and nothing else:** the target has
moved, the rule has stopped resolving, the path needs transferring or retiring. It is not an
authority for the content of the directory. Whoever answers is not answering as a Qualified Person,
and nothing said through it is a legal finding.

## Redirect target

```
https://scperm727.github.io/mining-permitting-directory/
```

The path suffix is preserved, so each identifier lands on its own page rather than on the index.

**That target is changeable by design and is expected to change.** What a consumer stores and cites
is the `w3id.org` request IRI; the `Location` is transport, followed once and discarded. Moving the
target is a one-line pull request against this directory and breaks no citation already made. The
path string is the permanent half. The target is not, and keeping the two apart is why this project
uses w3id.org rather than a domain it owns.

## Status

**In development. No verified legal content is published at the target.** The underlying assessment
lattice is *structurally complete and legally unverified*: no assessment in it has been read against
a legal provision or signed off by a Qualified Person. Nothing at this address should be relied on
for any legal, regulatory, permitting or investment purpose.

Registration of this path changed where the identifier points. It changed nothing above.

## Content negotiation

Content negotiation is **deliberately disabled**, not forgotten. Rules for `text/turtle` and
`application/rdf+xml` are written and held out of `.htaccess` until `ontology.ttl` and
`ontology.rdf` actually resolve at the target: a `303` to a `404` is worse than no negotiation,
because it turns a request that would have been answered with HTML into an error. They are enabled by a second one-line pull request once those
documents exist, and that waits on the status above rather than on anything in this directory.

---

`.htaccess` and this file are maintained in the project repository at `config/w3id/` and copied
here. Neither is edited only here — a redirect rule that lives only in its deployment target is the
one artifact nothing can notice going stale.
