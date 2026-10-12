# Knowledge Store

Permanent identifiers for [Knowledge Store](https://github.com/patternode/knowledge-store), an open-source (Apache-2.0) kit that turns documents in S3 into an ontology-typed knowledge graph.

| Identifier | Resolves to |
|---|---|
| `https://w3id.org/knowledge-store/` | The project repository |
| `https://w3id.org/knowledge-store/core` | The latest core vocabulary: Turtle for RDF clients (`Accept: text/turtle`), its documentation page for browsers |
| `https://w3id.org/knowledge-store/core/<version>` | A release of the core vocabulary, from git tag `core-v<version>` |
| `https://w3id.org/knowledge-store/core/shapes` | The latest core SHACL shapes (`/core/<version>/shapes` for a release) |

The core vocabulary's namespace is `https://w3id.org/knowledge-store/core#`.

## Contact

- Maintainer: Patternode, [github.com/patternode](https://github.com/patternode)
- GitHub: [@dermot-obrien](https://github.com/dermot-obrien)

## Registering

These are the files for `ids/knowledge-store/` in [perma-id/w3id.org](https://github.com/perma-id/w3id.org): copy `htaccess` there as `.htaccess`, with this README, and open a pull request. Register once the repository has a `core-v1.0.0` tag, so every redirect resolves when the maintainers check it.
