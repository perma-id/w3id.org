# FAQ

## About the service

### What is w3id.org, in one sentence?

A permanent URL redirection service: you claim a path under `https://w3id.org/`,
and you control where requests for it are sent. See [Overview](/overview/).

### Is the W3C involved?

No. The "w3" in the domain name stands for "World Wide Web". Other than hosting
the [Permanent Identifier Community Group](https://www.w3.org/community/perma-id/),
the World Wide Web Consortium has no involvement in the support or management of
this service.

An identifier under w3id.org is not a W3C standard, recommendation, or
publication, and carries no endorsement.

### Does it cost anything?

No. The service is run by a consortium of organisations that have pledged to
keep it operating. See [Overview — Who runs it](/overview/#who-runs-it).

### How long will my identifier last?

The intent is decades — "as long as the Web is around". Identifiers are not
deleted once they are in use, because deleting one breaks other people's data.

That commitment runs both ways: do not claim an identifier you are not prepared
to look after. See [Purpose — The commitment](/overview/purpose#the-commitment).

## Getting an identifier

### How do I get one?

Open a pull request adding a directory under `ids/`. See
[Creating an identifier](/guides/create-an-id).

If you would rather not use Git, you can ask on the
[mailing list](https://lists.w3.org/Archives/Public/public-perma-id/) instead —
include the URL you want, where it should redirect to, and the status code.

### Can I host my ontology file here?

No. This service redirects; it does not serve files. Publish your ontology,
schema, or context somewhere you control and point the identifier at it.

This is the most common out-of-scope request. See
[`files/only-allowed-names`](/rules/files/only-allowed-names) and
[Scope](/overview/scope#it-is-not-a-file-host).

### Can I have a short or generic name?

Probably not. Names that are single common words, that could be confused with an
existing identifier or a known organisation, or that look like speculative
claims are declined. Ask on the
[mailing list](https://lists.w3.org/Archives/Public/public-perma-id/) before
opening a pull request if you are unsure. See
[Scope — Naming](/overview/scope#naming).

### Can I reserve a name for a future project?

No. Claiming a directory is a long-term commitment, not a reservation. Come back
when the project exists and the content is live.

### Is there a list of reserved names?

No. Check [`ids/`](https://github.com/perma-id/w3id.org/tree/master/ids) for
what is taken — including case variants, since `Foo` and `foo` cannot coexist.
See [`tree/no-case-collision`](/rules/tree/no-case-collision).

### Can I use w3id.org as a URL shortener?

No. The service exists so that identifiers embedded in data keep resolving. If
nothing is going to embed the identifier, this is the wrong tool. See
[Scope](/overview/scope#it-is-not-a-cdn-or-a-general-purpose-url-shortener).

## Pull requests

### When will my change go live?

After a maintainer reviews and merges your pull request, the change is deployed
to the service and is normally live shortly afterwards. Check it with:

```sh
curl -sIL https://w3id.org/my-project/
```

### How long does review take?

It varies with maintainer availability. You can make it faster by opening a
small, single-purpose pull request that follows the
[rules](/rules/) — most delay comes from review round-trips over things that
were avoidable.

### Why was my pull request sent back?

The most frequent reasons, in rough order:

1. No maintainer GitHub username — [`meta/maintainer-github-username`](/rules/meta/maintainer-github-username)
2. Content files committed — [`files/only-allowed-names`](/rules/files/only-allowed-names)
3. Files changed outside your directory — [`tree/only-own-identifier`](/rules/tree/only-own-identifier)
4. The file is not named `.htaccess` — [`files/only-allowed-names`](/rules/files/only-allowed-names)
5. Untested rules that do not work
6. Uninformative commit messages, or a long unsquashed history

See the [rule catalogue](/rules/) for the full list.

### Do I have to squash my commits?

A new identifier should ideally be one commit. If you are not comfortable
squashing, say so in the pull request and a maintainer can do it — you will then
need to resync your fork before your next contribution.

### Why does my commit message matter?

`Update .htaccess` is by a wide margin the most common commit message in this
repository, on well over a thousand commits — more than twice the next most
common. When something breaks years later, that history is what somebody has
to read. Include your project name and what changed.

### Can I change someone else's identifier?

Only with the listed maintainer's involvement. Open it as its own pull request,
explain why, and tag a maintainer from that directory to approve it. See
[Maintaining an identifier](/guides/maintain-an-id#who-may-change-an-identifier).

### Why didn't any automated check catch my mistake?

Probably one of three reasons.

The rule may be **documented but not mechanized** — a rule page marked
`proposed` in the [catalogue](/rules/) has no check behind it yet.

The mistake may be **outside what any checker can know**. Nothing can tell that
your redirect points at the wrong place, only that it is well-formed. Whether
the target is the one you meant is [yours to verify](/guides/testing).

Or the check may only look at **what your change touched**. The checker reports
what your own diff is responsible for, so a pre-existing problem elsewhere in
the repository will not appear.

Note also that most of the identifiers already in this repository predate any
automated checking and have never been checked at all. A rule being enforced
today says nothing about whether the existing tree satisfies it — which is one
more reason not to copy a neighbouring `.htaccess` as a template.

## Redirects and HTTP

### Which status code should I use?

**302** for ordinary redirects. **303** for content-negotiated ontology IRIs,
where the identifier names a concept and you redirect to a document about it.

**Avoid 301.** Browsers and caches may honour it indefinitely and never
re-check, so a 301 you got wrong cannot be fully retracted. On a service built
for identifiers that live for decades, that is a bad trade for a marginal
caching benefit.

### Why am I getting a 500?

Your `.htaccess` has a syntax error, and Apache is refusing to parse it. Note
that a 500 affects **every** URL under the directory, not just the broken rule.

Check first for a space inside the flag brackets —
[`htaccess/no-flag-whitespace`](/rules/htaccess/no-flag-whitespace) — and for a byte order
mark at the start of the file — [`format/no-bom`](/rules/format/no-bom).

### Why am I getting a 403?

Most likely an `Options -Indexes` directive interacting badly with a bare
identifier URL. Remove the `Options` lines; you do not need them. See
[`htaccess/no-options-directive`](/rules/htaccess/no-options-directive).

### Why doesn't my rule match anything?

Almost always because the pattern includes a leading slash or the identifier's
own directory name. The pattern is matched against the path **relative to your
directory**. See
[`htaccess/pattern-relative-to-dir`](/rules/htaccess/pattern-relative-to-dir).

### Why does `https://w3id.org/my-project` redirect twice?

Because it is a real directory. Apache first redirects the bare form to
`https://w3id.org/my-project/` with a 301, and your rules run on the second
request.

This is normal and expected. Do not try to eliminate it with `DirectorySlash Off`
or `Options -Indexes` — that is how you get a 403. See
[`htaccess/no-options-directive`](/rules/htaccess/no-options-directive).

### Why is my client getting HTML instead of Turtle?

Two likely causes:

- your redirect target is a `github.com/.../blob/...` URL, which serves a web
  page rather than the file — see
  [`htaccess/github-raw-target`](/rules/htaccess/github-raw-target);
- your content negotiation rule ordering puts a broad match above the specific
  ones — see
  [Content negotiation](/guides/content-negotiation#_1-order-most-specific-first-default-last).

### Why is my client getting a 406?

You have a `[R=406]` catch-all fallback that is matching every request. Remove
it and end with an unconditional default. See
[`htaccess/no-406-fallback`](/rules/htaccess/no-406-fallback).

### Can I use plain HTTP?

No. The service is HTTPS-only, end to end. Your redirect targets should be
HTTPS too — see [`htaccess/https-target`](/rules/htaccess/https-target).

### Can I restrict access to my identifier?

No. There is no authentication or access control. Everything on the service is
public. See [Scope](/overview/scope#it-is-not-a-dynamic-application-platform).

### Can w3id.org proxy or mirror my content?

No. It issues redirects; it does not fetch or serve content.

## Maintenance

### My content moved. What do I do?

Add a rule for the new location, keep the old paths resolving, and test both.
See [Maintaining an identifier](/guides/maintain-an-id#zero-downtime-updates).

### How do I transfer maintainership?

Update the contact details in a pull request that both the outgoing and incoming
maintainer are visible on, and do it while the outgoing maintainer is still
reachable. See
[Maintaining an identifier](/guides/maintain-an-id#transferring-maintainership).

### Can I delete my identifier?

Identifiers are not deleted — removing one turns it into a 404 for everyone
still using it. Instead, return `410 Gone` or redirect to a page explaining what
happened. See
[Maintaining an identifier](/guides/maintain-an-id#retiring-an-identifier).

### Can I reuse an abandoned identifier for my project?

No. The old identifier is still in other people's data, and repointing it means
they silently start receiving something unrelated. Pick a different name.

## Other

### Where do I ask something not covered here?

The [public-perma-id@w3.org mailing list](https://lists.w3.org/Archives/Public/public-perma-id/).
For problems with a specific identifier, the
[issue tracker](https://github.com/perma-id/w3id.org/issues).

### How do I join the consortium?

Introduce yourself on the mailing list, then open an issue titled
*Seeking to join the W3ID Consortium*. See
[Overview](/overview/#joining-the-consortium).

### I am an AI agent. What should I read?

[`AGENTS.md`](https://github.com/perma-id/w3id.org/blob/master/AGENTS.md) in the
repository, then [Scope](/overview/scope) and the [rule catalogue](/rules/).
Machine-readable versions of this site are at
[`/llms.txt`](https://w3id.org/docs/llms.txt) and
[`/llms-full.txt`](https://w3id.org/docs/llms-full.txt), and any page is
available as raw Markdown by appending `.md` to its URL.
