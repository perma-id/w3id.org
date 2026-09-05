Permanent Identifiers for the Web
=================================

This repository holds the website source code for <https://w3id.org/>, a
secure, permanent [URL](https://en.wikipedia.org/wiki/URL) redirection service
run by the
[W3C Permanent Identifier Community Group](https://www.w3.org/community/perma-id/).

Applications that deal with
[Linked Data](https://en.wikipedia.org/wiki/Linked_data) need URLs that stay
stable for decades. This service operates like a
[switchboard](https://en.wikipedia.org/wiki/Telephone_switchboard): it connects
a request for an identifier to wherever that information currently lives, and
it can be reconfigured when the information moves.

## 📖 Documentation

**<https://w3id.org/docs/>**

That is where everything lives — what the service is and is not for, how to
create and maintain an identifier, how to write and test `.htaccess` rules, and
a catalogue of the mistakes that most often send a pull request back.

| | |
| --- | --- |
| New here? | <https://w3id.org/docs/overview/> |
| **Creating an identifier** | <https://w3id.org/docs/guides/create-an-id> |
| Updating an existing one | <https://w3id.org/docs/guides/maintain-an-id> |
| Writing `.htaccess` rules | <https://w3id.org/docs/guides/htaccess> |
| Testing your changes | <https://w3id.org/docs/guides/testing> |
| Rules and common mistakes | <https://w3id.org/docs/rules/> |
| FAQ | <https://w3id.org/docs/faq> |

AI coding agents should start with [AGENTS.md](AGENTS.md).

## Creating an identifier, in short

1. **Fork** this repository on GitHub.
2. Create `ids/<your-id>/.htaccess` containing your redirect rules and your
   contact details, including a **GitHub username**.
3. **Test it**, then open a **pull request**.

A minimal identifier is just this:

```apache
# # /my-project/
#
# https://w3id.org/my-project/ redirects to https://example.org/
#
# ## Contact
# This space is administered by:
#
# Firstname Lastname
# firstname@example.org
# GitHub username: exampleuser

RewriteEngine on
RewriteRule ^(.*)$ https://example.org/$1 [R=302,L]
```

Please read
[Creating an identifier](https://w3id.org/docs/guides/create-an-id) before
opening a pull request. In particular:

- **This service redirects; it does not host files.** Do not commit ontologies,
  schemas, contexts, or documentation to this repository.
- **Only change your own directory** under `ids/`.
- **Test your changes.** A syntax error in `.htaccess` returns a 500 for every
  URL in that directory.

You can also request a redirect by email — see
[the FAQ](https://w3id.org/docs/faq#how-do-i-get-one).

## Checking your changes

Every pull request is checked automatically. Anything that needs fixing appears
as a comment on the changed lines under _Files changed_, with the full report
under _Checks_, and each finding links to the rule explaining what to do.

Run the same checks yourself first. They report only what your own change is
responsible for, and they count work you have not committed yet:

```sh
cd tools/check && npm ci
cd ../.. && node tools/check/bin/w3id-check.js
```

To look at one directory, name it:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```

See [`tools/check/README.md`](tools/check/README.md) for the full set of
options and how to add a check, and
<https://w3id.org/docs/rules/> for the rules themselves.

A clean run is not the whole job: nothing can tell whether your redirect points
where you meant it to. See
[Testing your changes](https://w3id.org/docs/guides/testing).

> [!NOTE]
> Adding or updating an identifier requires no build step. The checker in
> `tools/check/` is optional — pull requests are checked automatically — and
> the tooling in `docs/` is only for people editing the documentation site.

## Repository layout

| Path | |
| --- | --- |
| `ids/` | The document root. One directory per identifier. |
| `ids/<id>/.htaccess` | Redirect rules for that identifier. |
| `ids/<id>/README.md` | Identifier and maintainer information. Optional. |
| `docs/` | Source for <https://docs.w3id.org/>, built with VitePress. |
| `tools/check/` | The automated contribution checks. |
| `AGENTS.md` | Instructions for AI coding agents. |

## Management

The service is operated by a consortium of organisations that have pledged
responsibility for keeping it running:

* [Digital Bazaar](https://www.digitalbazaar.com/)
* [3 Round Stones](http://3roundstones.com/)
* [OpenLink Software](https://www.openlinksw.com/)
* [Applied Testing and Technology](https://www.aptest.com/)
* [Bosatsu Consulting](https://bosatsu.net/)
* [KurrawongAI](https://kurrawong.ai)

See
[the documentation](https://w3id.org/docs/overview/#who-runs-it) for how this
works and how to join.

## Community

Discussion happens on the
[public-perma-id@w3.org mailing list](https://lists.w3.org/Archives/Public/public-perma-id/).
For problems with a specific identifier, use the
[issue tracker](https://github.com/perma-id/w3id.org/issues).

* * *

### Disclaimer

The letters 'w3' in the domain name for this site stand for "World Wide Web".
Other than hosting the software for the Permanent Identifier Community Group,
the "World Wide Web Consortium" (W3C) is not involved in the support or
management of this website in any way.
