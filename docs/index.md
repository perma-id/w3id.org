---
layout: home

hero:
  name: w3id.org
  text: Permanent Identifiers for the Web
  tagline: >-
    A secure, permanent URL redirection service for Web applications, run by the
    W3C Permanent Identifier Community Group.
  actions:
    - theme: brand
      text: Create an identifier
      link: /guides/create-an-id
    - theme: alt
      text: What this service is for
      link: /overview/scope
    - theme: alt
      text: Rules
      link: /rules/

features:
  - title: Read this before opening a pull request
    details: >-
      Almost every identifier on w3id.org is added by an outside contributor
      through a pull request. The guide walks through the whole process, from
      picking a name to getting the change merged.
    link: /guides/create-an-id
    linkText: Creating an identifier
  - title: It is a redirect, and only a redirect
    details: >-
      w3id.org does not host files. It does not serve your ontology, your
      documentation, or your website. It answers a request with an HTTP
      redirect to somewhere you control.
    link: /overview/scope
    linkText: What the service is not for
  - title: The mistakes we see over and over
    details: >-
      A catalogue of specific, checkable rules, each one written because
      contributors keep getting it wrong. A missing backslash or a stray space
      can take an identifier offline.
    link: /rules/
    linkText: Rule catalogue
  - title: Changing an identifier that people already use
    details: >-
      Identifiers on this service are meant to last for decades. Updating one
      without breaking the applications that depend on it takes a little care.
    link: /guides/maintain-an-id
    linkText: Maintaining an identifier
---

## New here?

w3id.org is a **redirection service**. You claim a path such as
`https://w3id.org/my-project/`, and you tell the service where requests for
that path should be sent. Years later, when your project moves to a different
host, you change the redirect and every application that used your w3id.org URL
keeps working.

That is the entire service. It is deliberately small.

### Where to go next

| If you want to… | Read |
| --- | --- |
| Understand what this service does and who runs it | [Overview](/overview/) |
| Know whether your use case is appropriate | [Scope](/overview/scope) |
| Add a new identifier | [Creating an identifier](/guides/create-an-id) |
| Change or move an existing identifier | [Maintaining an identifier](/guides/maintain-an-id) |
| Understand the `.htaccess` syntax | [Writing .htaccess rules](/guides/htaccess) |
| Serve RDF and HTML from one URL | [Content negotiation](/guides/content-negotiation) |
| Check your change before opening a pull request | [Testing your changes](/guides/testing) |
| Find out why a reviewer asked you to change something | [Rules](/rules/) |
| Ask a common question | [FAQ](/faq) |

### If you are an AI coding agent

Read [`AGENTS.md`](https://github.com/perma-id/w3id.org/blob/master/AGENTS.md)
in the repository first. Machine-readable versions of this whole site are
published at [`/llms.txt`](https://w3id.org/docs/llms.txt) and
[`/llms-full.txt`](https://w3id.org/docs/llms-full.txt), and every page is
available as raw Markdown by appending `.md` to its URL.

Please read [Scope](/overview/scope) and the [rule catalogue](/rules/) before
generating a pull request. A large share of the pull requests this project
receives are machine-generated, plausible-looking, and wrong in ways that take a
human reviewer longer to correct than to have written by hand.
