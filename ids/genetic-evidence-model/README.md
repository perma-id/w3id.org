# Genetic Evidence Model (GEM)

This directory registers the permanent identifier
`https://w3id.org/genetic-evidence-model/` as the namespace for the
Genetic Evidence Model, an open semantic model for representing
genetic evidence drawn from the biomedical literature.

## About the namespace

The namespace is used as the base IRI for classes, properties, and
dimension enumerations defined by the model. For example:

- `https://w3id.org/genetic-evidence-model/GeneticEvidence`
- `https://w3id.org/genetic-evidence-model/knowledgeDomain`
- `https://w3id.org/genetic-evidence-model/HUMAN_GENETICS`

The model comprises a small hierarchy of core classes
(`ScientificEvidence`, `EvidenceVariable`, `EvidenceAssertion`) with
genetic specialisations; a compact dimensional vocabulary structured
by a conditional-activation mechanism formalised in SHACL; and an
open annotation corpus demonstrating coverage across human,
population, model-organism, and polygenic-score genetics.

The SHACL shapes, the human-readable dimension reference, the
annotation corpus, and accompanying tooling are hosted at:

> https://github.com/ForomePlatform/genetic-evidence-model

## Redirect behaviour

The base identifier `https://w3id.org/genetic-evidence-model/`
302-redirects to the project's GitHub repository. Sub-paths redirect
to the corresponding files in the repository (see `.htaccess` in this
directory for the exact rules). The temporary 302 status will be
upgraded to a permanent 301 once the repository layout stabilises, and
content-negotiated responses for Linked Data clients (`text/turtle`,
`application/ld+json`) will be added at that time.

## License

Content published under this namespace is made available under the
Creative Commons Attribution 4.0 International License (CC-BY 4.0),
with accompanying source code under the Apache License 2.0. See the
project repository for full license texts.

## Maintainers

- Michael Bouzinier — <michael.bouzinier@forome.org>
  (GitHub: [@mmcentre](https://github.com/mmcentre))
- Forome Association — <https://forome.org>; [Forome GitHub](https://github.com/ForomePlatform)


Please open issues and pull requests against the namespace content at
the project repository linked above. For questions specifically
concerning the w3id redirect, please open an issue or pull request
against this directory in `perma-id/w3id.org`.
