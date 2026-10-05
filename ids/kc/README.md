# /kc/ — Knowledge Complex

Persistent URIs for the [Knowledge Complex](https://github.com/BlockScience/knowledgecomplex) ontology — typed simplicial complexes backed by OWL, SHACL, and SPARQL.

## URIs

| URI | Resolves to |
|-----|-------------|
| `https://w3id.org/kc` | Core OWL ontology (`kc_core.ttl`) |
| `https://w3id.org/kc/shape` | Core SHACL shapes (`kc_core_shapes.ttl`) |
| `https://w3id.org/kc/queries/boundary` | SPARQL template: boundary operator ∂(σ) |
| `https://w3id.org/kc/queries/coboundary` | SPARQL template: cofaces δ(σ) |
| `https://w3id.org/kc/queries/star` | SPARQL template: star St(σ) |
| `https://w3id.org/kc/queries/closure` | SPARQL template: closure Cl(S) |
| `https://w3id.org/kc/queries/skeleton` | SPARQL template: k-skeleton sk_k(K) |
| `https://w3id.org/kc/queries/degree` | SPARQL template: degree deg(v) |
| `https://w3id.org/kc/queries/vertices` | SPARQL template: all vertices and types |

Content negotiation: requests for `/kc` and `/kc/shape` with `Accept: text/turtle` receive the Turtle file directly; all other requests redirect to HTML documentation. Query templates are served directly as `.sparql` files.

## Contact

This namespace is maintained by:

- **Zargham** — GitHub: [@mzargham](https://github.com/mzargham)
