# KEE permanent identifiers

This directory registers the persistent identifier namespace for **KEE — Knowledge, Epistemics & Eidos**.

Base identifier:

`https://w3id.org/kee`

Public project repository:

https://github.com/KnoEdg/kee

Current published normative baseline:

**KEE v0.9.2**

## Purpose

KEE uses W3ID identifiers as stable public names for its published knowledge-framework namespaces and controlled vocabularies.

The W3ID layer acts only as a persistent redirect. The published resources remain maintained in the public KEE repository and may move without changing their canonical `w3id.org` identifiers.

Registered surfaces include:

- `https://w3id.org/kee#` — core KEE namespace
- `https://w3id.org/kee/artifact#` — artifact classifications
- `https://w3id.org/kee/lifecycle/assertion#`
- `https://w3id.org/kee/lifecycle/scientific-claim#`
- `https://w3id.org/kee/lifecycle/organizational-memory#`
- `https://w3id.org/kee/lifecycle/decision#`
- `https://w3id.org/kee/lifecycle/software-engineering#`
- `https://w3id.org/kee/confidence#` — confidence-interpretation sentinel namespace
- `https://w3id.org/kee/vocab/contradiction-cause#`
- `https://w3id.org/kee/vocab/assertion-unit-kind#`
- `https://w3id.org/kee/profile#`

The generic `https://w3id.org/kee/lifecycle#` surface is retained only for compatibility guidance; KEE uses profile-specific lifecycle namespaces for new writes.

## Content negotiation

Requests to the base KEE identifier support:

- `text/turtle` → the published KEE Turtle vocabulary
- `application/ld+json` or `application/json` → the published JSON-LD context
- other requests → the public KEE repository

All redirects use HTTP 302 so destination locations can change while the W3ID identifiers remain stable.

## Maintainer

**René Yap**

GitHub: https://github.com/reneyap

Project organization: https://github.com/KnoEdg
