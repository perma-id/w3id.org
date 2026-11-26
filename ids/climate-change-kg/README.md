# /climate-change-kg/

Permanent identifiers of the Climate Change Knowledge Graph (CCKG), a knowledge
graph of climate variables, indices, models, simulations and projection
datasets, maintained by the Institute of Cognitive Sciences and Technologies of
the National Research Council of Italy (CNR-ISTC).

- `https://w3id.org/climate-change-kg/data/...` (the resources of the knowledge
  graph) redirects to their description as linked data, on a server hosted by
  CNR.
- `https://w3id.org/climate-change-kg/sparql` redirects to the SPARQL endpoint,
  on the same server.
- `https://w3id.org/climate-change-kg/shapes` (the SHACL shapes the knowledge
  graph is validated with, whose IRIs are in the namespace
  `https://w3id.org/climate-change-kg/shapes/`) redirects, by content
  negotiation, to the shapes in Turtle (when RDF is requested) or to their
  documentation, both on the website. The files by topic,
  `https://w3id.org/climate-change-kg/shapes/<topic>.ttl`, redirect to the same
  files.
- `https://w3id.org/climate-change-kg/` is the knowledge graph itself, as a
  dataset: when RDF is requested (Turtle, RDF/XML, JSON-LD, N-Triples), it
  redirects to its description, the named graph
  `https://w3id.org/climate-change-kg/data/kg`, returned by the SPARQL endpoint;
  otherwise, to the documentation.
- Anything else redirects to the documentation,
  <https://hacid-project.github.io/climate-change-kg/>.

The resources were first published under `https://w3id.org/hacid/data/cs/`,
which redirects here.

## Contacts

- Miguel Ceriani (CNR-ISTC)
  - <miguel.ceriani@cnr.it>
  - GitHub: [@miguel76](https://github.com/miguel76)

- Andrea Giovanni Nuzzolese (CNR-ISTC)
  - <andreagiovanni.nuzzolese@cnr.it>
  - GitHub: [@anuzzolese](https://github.com/anuzzolese)
