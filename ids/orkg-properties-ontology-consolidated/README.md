# ORKG Properties Ontology Consolidated (OPO-Consolidated)

This directory contains the configuration for the permanent identifier:

- [**https://w3id.org/orkg-properties-ontology-consolidated**](https://w3id.org/orkg-properties-ontology-consolidated)

The **ORKG Properties Ontology Consolidated (OPO-Consolidated)** is a
consolidated schema derived from the crowdsourced ORKG property set. It
resolves redundant and inconsistent properties through a semi-automated
workflow based on lexical deduplication, embedding-based semantic clustering,
and LLM-assisted canonical selection and quality filtering, while preserving
backward compatibility via explicit mappings from deprecated properties to
their canonical OPO-Consolidated counterparts.

The ontology IRI is:

- [**https://w3id.org/orkg-properties-ontology-consolidated**](https://w3id.org/orkg-properties-ontology-consolidated)

and the namespace for terms is:

- [**https://w3id.org/orkg-properties-ontology-consolidated#**](https://w3id.org/orkg-properties-ontology-consolidated#)

## Redirects

The unversioned identifier resolves to the **current release**, and each release
additionally has its own permanent version IRI. All redirects use HTTP 303 and
point at the Turtle serialization hosted on GitHub.

| identifier | resolves to |
| --- | --- |
| `…/orkg-properties-ontology-consolidated` | v1.1.0 (current release) |
| `…/orkg-properties-ontology-consolidated/1.1.0` | [`opo-consolidated-1.1.0.ttl`](https://raw.githubusercontent.com/SandraSchaftner/orkg-properties-ontology-consolidation/main/ontology/opo-consolidated-1.1.0.ttl) |
| `…/orkg-properties-ontology-consolidated/1.0.0` | [`opo-consolidated-1.0.0.ttl`](https://raw.githubusercontent.com/SandraSchaftner/orkg-properties-ontology-consolidation/main/ontology/opo-consolidated-1.0.0.ttl) |

The target of the unversioned identifier changes with each release. Cite a
**version IRI** whenever the exact artifact matters.

> **Note for readers of the paper.** *"ORKG Properties Ontology Consolidated:
> LLM-Driven Refinement of Crowdsourced Knowledge for Machine-Actionability"*
> (Schaftner & Gaedke, 2026) describes **v1.0.0**. That release remains
> permanently available under its own version IRI
> [**https://w3id.org/orkg-properties-ontology-consolidated/1.0.0**](https://w3id.org/orkg-properties-ontology-consolidated/1.0.0)
> and is unaffected by later releases.

The version IRIs are also asserted inside the ontology documents themselves via
`owl:versionIRI` and `owl:priorVersion`, so the releases are distinguishable as
RDF and not only by file name.

## Maintainer

- **Name:** Sandra Schaftner
- **Affiliation:** Technische Universität Chemnitz
- **GitHub:** [@SandraSchaftner](https://github.com/SandraSchaftner)
- **Email:** sandra.schaftner@informatik.tu-chemnitz.de

## Intended usage

The identifier [**https://w3id.org/orkg-properties-ontology-consolidated**](https://w3id.org/orkg-properties-ontology-consolidated)
provides a stable, citable namespace and ontology IRI for:

- the OPO-Consolidated ontology terms (`…-consolidated#`),
- the corresponding ontology document in Turtle format,
- version IRIs of individual releases (`…-consolidated/1.0.0`,
  `…-consolidated/1.1.0`) and additional serializations
  or HTML documentation generated from this ontology.