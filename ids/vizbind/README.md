## VizBind

A declarative RDF vocabulary for notation-independent visualisation of RDFS/OWL
models. VizBind describes a visual notation *as data*: a notation is a set of
binding rules, each separating selection of model constructs (via SPARQL),
mapping to abstract visual constructs, and engine-agnostic styling.

`https://w3id.org/vizbind` redirects to the published vocabulary at
<https://mareksuchanek.github.io/vizbind/>, with content negotiation:

| Accept | Redirects to |
|---|---|
| `text/html` (browsers) | `https://mareksuchanek.github.io/vizbind/` |
| `text/turtle` | `.../vizbind.ttl` |
| `application/rdf+xml` | `.../vizbind.rdf` |
| `application/ld+json` | `.../vizbind.jsonld` |

VizBind uses a hash namespace, so terms such as `https://w3id.org/vizbind#Binding`
resolve through the single `https://w3id.org/vizbind` request the client makes
after stripping the fragment.

The vocabulary accompanies the KEOD 2026 paper *Binding Ontologies to Notation: A
Declarative RDF Vocabulary for Notation-Independent Visualisation of RDFS/OWL
Models*, and is licensed under CC BY 4.0.

Source and issue tracker: <https://github.com/MarekSuchanek/vizbind>

Maintainer: Marek Suchánek (@MarekSuchanek), Faculty of Information Technology,
Czech Technical University in Prague — marek.suchanek@cvut.cz
