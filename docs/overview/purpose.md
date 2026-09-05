# Purpose

## The problem this service solves

A URL is two things at once: a *name* for something, and an *address* telling
you where to fetch it. For most of the Web that conflation is fine. For Linked
Data it is a serious problem.

When you publish a vocabulary, the IRIs of its terms are copied into other
people's data. A JSON-LD context URL gets baked into documents that are signed,
archived, and exchanged for years. A property IRI ends up in triple stores
around the world. Those IRIs are *names*, and names are supposed to be stable.

But the address half of the URL is not stable at all. It points at a hostname
that belongs to a particular organisation, on a particular server, under a
particular directory layout, subject to a particular funding cycle. Three years
later:

- the research group's grant ends and `project.cs.example.edu` disappears;
- the company is acquired and every URL moves to a new domain;
- somebody reorganises the website and `/ontologies/` becomes `/vocab/`;
- the maintainer leaves and nobody renews the domain.

Every dataset that referenced those IRIs now contains dead links, and there is
nothing the people holding that data can do about it.

## What w3id.org does about it

w3id.org gives you a name whose address you can change.

You publish your vocabulary at `https://w3id.org/my-vocab/`. That is what goes
into other people's data. Behind it, w3id.org holds a redirect pointing at
wherever the content actually lives today. When the content moves, you open a
pull request that changes one line, and every existing reference keeps
resolving.

The identifier is decoupled from the hosting. That is the whole idea.

## The commitment

Identifiers on this service are intended to last **as long as the Web lasts** —
decades, and preferably longer.

Two things follow from that, and both of them place obligations on you as well
as on the service:

**The service will not casually delete your identifier.** Once an identifier is
in use, removing it breaks other people's data. Identifiers are effectively
permanent even when the project behind them has stopped.

**You should not claim an identifier you are not prepared to steward.** A
directory under `ids/` is a commitment on the order of twenty years, not a
convenient short link for a demo. If the redirect target dies and nobody
maintains it, the identifier becomes a permanent broken link with your project's
name on it.

If the destination for a *widely used* identifier fails badly enough to become a
danger or a major inconvenience to the Web, the community may mirror the content
and repoint the redirect to restore service. That is a last resort for the
popular cases, not a general safety net.

## Security

The service operates in **HTTPS-only** mode, end to end. There is no plaintext
HTTP option, and requests are not downgraded.

This is deliberate: it lets the service be used by Linked Data applications
that require high assurance, including those in the financial, medical, and
public infrastructure sectors, where a tampered redirect would be a meaningful
attack.

Your redirect targets should be HTTPS too — see [`htaccess/https-target`](/rules/htaccess/https-target).
A secure redirect to an insecure destination protects nobody.

## What this is not

Read [Scope](./scope) next. The single most common reason a pull request gets
rejected is that the contributor wanted the service to do something it does not
do.
