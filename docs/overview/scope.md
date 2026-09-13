# Scope

This page exists because most rejected pull requests are not *wrong*, they are
*out of scope*. The contributor built something reasonable for a service that
this is not.

## What w3id.org is for

**Stable identifiers that redirect somewhere you control.**

Concretely, the service is a good fit when:

- You are publishing a **vocabulary, ontology, or schema** and need permanent
  IRIs for its terms.
- You need a permanent **JSON-LD context URL**, or a stable IRI for a
  credential type, a specification, or a protocol.
- You want a **namespace** under which your project can mint identifiers, e.g.
  `https://w3id.org/my-project/...`, that outlives your current hosting.
- You need **content negotiation** in front of an ontology, so that a browser
  gets HTML and a triple store gets Turtle, from the same IRI. See
  [Content negotiation](/guides/content-negotiation).
- You are an individual who wants a stable identifier for yourself, under the
  shared [`/people/`](https://github.com/perma-id/w3id.org/tree/master/ids/people)
  namespace.

In all of these, w3id.org holds a redirect and nothing else. The content lives
on your infrastructure.

## What w3id.org is not for

### It is not a file host

**Do not commit your ontology, schema, context, or documentation to this
repository.** Not as `.ttl`, `.owl`, `.rdf`, `.jsonld`, `.json`, `.html`, or
anything else.

This is the single most common out-of-scope pull request. It gets rejected every
time, and it is not a matter of size — a one-line context file is as out of
scope as a fifty-megabyte ontology. The repository holds redirect rules and
contact information. That is the whole inventory.

Host the files yourself: a project website, GitHub Pages, an institutional
repository, Zenodo, a purpose-built vocabulary server. Then point your w3id.org
identifier at it. See [`files/only-allowed-names`](/rules/files/only-allowed-names).

### It is not a CDN or a general-purpose URL shortener

The service is not there to make your links shorter, to sit in front of your
website for performance, or to give a marketing campaign a tidy URL. It exists
so that *identifiers embedded in data* keep resolving. If nothing is going to
embed the identifier, you probably do not need one.

### It is not a place to reserve names

Claiming a directory is a long-term commitment, not a land grab. Requests are
declined for names that are:

- **too generic** — a single common English word, or a term the whole community
  would plausibly need;
- **confusing** — close enough to an existing identifier or a well-known
  organisation to mislead;
- **inappropriate or offensive**;
- **speculative** — claimed with no concrete project behind them, or claimed in
  bulk.

Do not squat on names for projects that do not exist yet, and do not claim a
top-level directory when a path under an existing namespace would do.

### It is not a dynamic application platform

There is no application code, no database, no server-side processing you can
extend, no authentication, no access control, no per-user logic. `.htaccess`
rewrite rules are the only mechanism available, and only the subset of them that
produces redirects.

Specifically, you cannot use this service to:

- proxy or mirror content;
- vary a response by who is asking, or by anything other than the request URL
  and headers;
- add authentication or restrict access to an identifier;
- run any code.

### It is not a place for project documentation

The `README.md` in your identifier directory is for **identifier and maintainer
information** — what the identifier is, who looks after it, how to reach them.
It is not your project's README, not a user manual, and not a specification.
Keep it short and link out to the real documentation.

## Naming

There is no formal naming policy, and no published list of reserved names. The
current practice:

- Claim a **top-level directory** for your project and mint second-level
  identifiers under it: `https://w3id.org/PROJECT-ID/SUB-ID`.
- Shared top-level namespaces exist for some categories, e.g.
  `https://w3id.org/people/PERSON-ID` for individuals. Use them where they
  apply rather than claiming a new top level.
- Prefer lowercase directory names. See
  [`tree/no-case-collision`](/rules/tree/no-case-collision) — this is not just
  aesthetics, case collisions genuinely break the repository on macOS and
  Windows.

Maintainers may decline a name for any of the reasons above. If you are
unsure whether a name will be acceptable, ask first — on the
[mailing list](https://lists.w3.org/Archives/Public/public-perma-id/) or as an
[issue](https://github.com/perma-id/w3id.org/issues). Either is much cheaper
than finding out in a pull request review.

## Still not sure?

Ask before you write any code, on the
[public-perma-id@w3.org mailing list](https://lists.w3.org/Archives/Public/public-perma-id/)
or as an [issue](https://github.com/perma-id/w3id.org/issues). Describe what
you want to identify and where the content will live, and somebody will tell
you whether this is the right tool.
