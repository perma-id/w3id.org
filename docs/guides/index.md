# Guides

Task-oriented walkthroughs. If you are looking for a specific rule and why it
exists, see the [rule catalogue](/rules/) instead.

## [Creating an identifier](./create-an-id)

The main guide. Picking a name, what your directory needs to contain, writing
the redirect, and getting the pull request merged. Start here if you have never
contributed to this repository.

## [Writing .htaccess rules](./htaccess)

What an `.htaccess` file is, how `RewriteRule` works, and the handful of things
about the per-directory context that trip almost everyone up the first time.

## [Content negotiation](./content-negotiation)

Serving HTML to browsers and RDF to machines from a single ontology IRI, plus
version-aware IRIs and CORS. Read this if you are publishing a vocabulary.

## [Maintaining an identifier](./maintain-an-id)

Changing a redirect that people already depend on, without breaking them.
Transferring maintainership, retiring an identifier, and why you should not
reuse an old one.

## [Testing your changes](./testing)

How to run the automated checks yourself, and how to confirm a redirect actually
goes where you meant it to — which is the part no checker can do for you.

## Before you open a pull request

Whatever you are doing, these are worth a minute:

- Your change is a redirect and contact information, and nothing else —
  [Scope](/overview/scope).
- Your redirect target is live, HTTPS, and returns what you expect —
  [`htaccess/https-target`](/rules/htaccess/https-target),
  [Testing](./testing).
- Your `.htaccess` has no syntax errors. A bad rule returns **500 for the whole
  directory**, not just for the rule — [Rules](/rules/).
- Your commit message says what changed and which project it belongs to.
- Your maintainer contact includes a GitHub username —
  [`meta/maintainer-github-username`](/rules/meta/maintainer-github-username).
