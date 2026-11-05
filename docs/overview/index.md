# What is w3id.org?

w3id.org is a permanent URL redirection service for the Web. It is operated by
the [W3C Permanent Identifier Community Group](https://www.w3.org/community/perma-id/).

The service does one thing. You claim a path under `https://w3id.org/`, and you
say where requests for that path should be sent. When somebody resolves your
identifier, w3id.org answers with an HTTP redirect to the location you
nominated.

```
GET https://w3id.org/my-project/vocab
                │
                ▼
      w3id.org  ──►  302 Found
                     Location: https://my-project.example.org/2026/vocab
```

Think of it as a [switchboard](https://en.wikipedia.org/wiki/Telephone_switchboard).
It connects a request for information to wherever that information currently
lives, and it can be reconfigured when the information moves. The identifier
that people wrote into their data, their code, and their published papers never
has to change.

## Why it exists

Applications that deal with [Linked Data](https://en.wikipedia.org/wiki/Linked_data)
need URLs that are extremely stable. A vocabulary term, an ontology IRI, or a
JSON-LD context URL gets embedded in documents and datasets that outlive the
web server that first published them. Universities reorganise. Companies get
acquired. Projects get funded for three years and then stop.

An identifier under w3id.org survives all of that, because the identifier is
decoupled from the hosting. See [Purpose](./purpose) for more.

## How a change gets made

Everything the service does is defined by files in a public Git repository at
[github.com/perma-id/w3id.org](https://github.com/perma-id/w3id.org). Each
identifier is a directory under `ids/` containing an `.htaccess` file with
Apache rewrite rules.

To add or change an identifier, you open a pull request against that repository.
A maintainer reviews it and merges it, and the change is deployed to the
service. See [Creating an identifier](/guides/create-an-id).

## Who runs it

A consortium of organisations has pledged responsibility for keeping the
service running:

- [Digital Bazaar](https://www.digitalbazaar.com/)
- [3 Round Stones](http://3roundstones.com/)
- [OpenLink Software](https://www.openlinksw.com/)
- [Applied Testing and Technology](https://www.aptest.com/)
- [Bosatsu Consulting](https://bosatsu.net/)
- [KurrawongAI](https://kurrawong.ai)

They handle all administrative tasks associated with operating the service. The
social contract between them gives each organisation full access to everything
needed to run the site, so that several of them could fail, lose interest, or
become unreachable for long periods without affecting the service.

### Joining the consortium

Introduce yourself on the mailing list first (see below) and say what your
organisation would bring. Then open an issue on the
[issue tracker](https://github.com/perma-id/w3id.org/issues) titled
*Seeking to join the W3ID Consortium* with your details.

## Community

Discussion happens on the
[public-perma-id@w3.org mailing list](https://lists.w3.org/Archives/Public/public-perma-id/).
That is the right place to raise questions about the service, propose policy
changes, or discuss a use case that the [scope](./scope) does not obviously
cover.

## Disclaimer

The letters "w3" in the domain name stand for "World Wide Web". Other than
hosting the community group, the **World Wide Web Consortium (W3C) is not
involved in the support or management of this service in any way**. An
identifier under w3id.org carries no endorsement from the W3C, and is not a W3C
standard, recommendation, or publication.
