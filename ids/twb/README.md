# TWB — Thin-Walled Blueprint

An OWL ontology of a building described as zero-thickness surfaces on the reference planes of its
walls, floors and roofs, with construction knowledge (recipes, joint details, requirements)
attached where it belongs. It is the data model of [arch](https://github.com/MadsHolten/arch).

## Redirects

TWB is modular, as SEAS is: one namespace (`https://w3id.org/twb#`), each module an ontology of its
own at `https://w3id.org/twb/{module}`, and `https://w3id.org/twb` importing them all. A browser
(`text/html`) is sent to the documentation; anything else gets Turtle.

| w3id | Browser | Otherwise |
| --- | --- | --- |
| `https://w3id.org/twb` | `https://twb.madsholten.dk/en/datamodel/#moduler` | `https://twb.madsholten.dk/ontology/twb.ttl` — TWB as a whole |
| `https://w3id.org/twb/{module}` (core, construction, detailing, requirements, profile, decision, derivation, housefile, doc, shapes, align) | `…/en/datamodel/#modul-{module}` | `…/ontology/twb-{module}.ttl` |
| `https://w3id.org/twb/catalogue/arch` | `…/en/datamodel/#modul-catalogue` | `…/ontology/twb-catalogue.ttl` |
| `https://w3id.org/twb/{name}.ttl` | always the Turtle | |
| `https://w3id.org/twb/context/{n}.jsonld` | `https://twb.madsholten.dk/context/{n}.jsonld` — the JSON-LD context of the house file, version `n` | |

## Contact

* Mads Holten Rasmussen — GitHub: [@MadsHolten](https://github.com/MadsHolten)
