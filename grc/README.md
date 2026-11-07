# /grc/ — GRC compliance & legal-risk ontology

Persistent identifiers for a compliance fabric that codes regulations and standards as
auditable clause data, with a separate measurement layer.

## Namespaces

| Path | Resolves to |
|---|---|
| https://w3id.org/grc/ontology | Ontology terms (`grc:`) — clauses, clause sets, modules, evidence types, domains |
| https://w3id.org/grc/evidence | Evidence-type shapes (policy, register, procedure, report, metric, …) |
| https://w3id.org/grc/measure | Assessment / measurement layer (scales, weights, scores, readiness index) |
| https://w3id.org/grc/legalrisk | Legal-risk layer, aligned with ISO 31022 |
| https://w3id.org/grc/pdpl | Saudi Personal Data Protection Law — 43 articles, official text |
| https://w3id.org/grc/pdpl-reg | PDPL Implementing Regulations — 38 articles, official text |
| https://w3id.org/grc/iso37301 | ISO 37301:2021 clause structure (no copyrighted text is redistributed) |
| https://w3id.org/grc/iso31022 | ISO 31022:2020 clause structure (no copyrighted text is redistributed) |

Turtle is served when an RDF media type is requested; browsers are redirected to the
corresponding file or documentation page.

## What is coded

* **Clause identity** — every obligation has a stable id (`PDPL.12`, `PDPL-REG.24`, `ISO37301.5.2`),
  an evidence type, an assessment priority and a verification status.
* **Two kinds of link, kept apart** — `grc:citesArticle` is an explicit citation in the text;
  `grc:implementsArticle` is an analyst mapping, flagged as such with `grc:mappingBasis`.
  A report built on this data can tell a quotation from an interpretation.
* **Measurement** — scores are 0–5 with declared weights and confidence; a score of 3 or above
  without evidence is rejected by SHACL shapes shipped alongside the ontology.
* **Honest gaps** — items whose text has not been verified carry `grc:verificationStatus`
  (`OFFICIAL-TEXT`, `HLS-STRUCTURE`, `NUMBERING-UNVERIFIED`). Nothing is presented as verified
  when it is not.

## Provenance and licensing

* PDPL and its Implementing Regulations are official Saudi instruments, published by SDAIA.
  Their texts are reproduced as published; the PDPL was amended by Royal Decree No. (M/148)
  dated 5/9/1444H, and that amendment should be applied on top of the coded text.
* ISO 37301 and ISO 31022 are copyrighted. **Only clause identifiers, short headings and
  evidence shapes are published here** — never the standard text. `grc:specText` is empty for
  those clauses by design, and `grc:verificationStatus` says so.
* The ontology and code are MIT licensed.

## Contacts

* Mohammed Al-Amawy — [@MOo207](https://github.com/MOo207)

## Related

* Source repository: https://github.com/MOo207/shacl-risk-grounding
* Supersedes pull request #6531 (same namespace, now carrying the statute-based modules).
