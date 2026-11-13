# OntoGSN

OntoGSN is an ontology for managing and maintaining assurance cases in Goal Structuring Notation (GSN). The main purpose of OntoGSN is to establish a bridge between the visual and textual interface represented by the assurance case (i.e., so far a mostly static view used by auditors and architects), and the dynamic and varied interfaces of developers, safety and security engineers, etc.

This artifact was created with the needs of domain experts, the assurance community and the Semantic Web community in mind.

The ontology has been created by Tomas Bueno Momčilović, scientific researcher at the fortiss Research Institute of the Free State of Bavaria for software-intensive systems and PhD student at the Technical University of Munich.

# Author & Maintainer

- [Tomas Bueno Momcilovic](https://www.fortiss.org/ergebnisse/publikationen/autor/tomas-bueno-momcilovic) (Github: [Tomas-Bueno-Momcilovic](https://github.com/Tomas-Bueno-Momcilovic/))

# Redirects

| Path under `https://w3id.org/OntoGSN` | Target |
| :--- | :--- |
| `/` | the website, https://fortiss.github.io/OntoGSN/ |
| `/ontology` | the current ontology on the `main` branch of https://github.com/fortiss/OntoGSN, as Turtle, JSON-LD or RDF/XML by the `Accept` header |
| `/ontology/{x.y.z}` | the same three files at the git tag `v{x.y.z}`. A new version needs no new rule |
| `/ontology/core`, `/pattern`, `/modular`, `/confidence`, `/dialectic` | the ontology cut by section of the GSN standard, Turtle |
| `/shapes`, `/shapes/{section}` | the SHACL shapes, Turtle |
| `/augmentation`, `/augmentation/shapes`, `/alignment` | the augmentation, its shapes and the alignment, Turtle |
| `/design`, `/design/{data,queries,augmentations}`, `/alignment/design`, `/augmentation/design` | the design record, Turtle |
| `/playground` | the playground on the website |

Any other path answers 404.
