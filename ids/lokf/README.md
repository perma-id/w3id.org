# /lokf/

Permanent identifiers for the Linked Open Knowledge Format (LOKF): its LinkML schema, the JSON-LD context a bundle attaches to its concepts, the artifacts generated from the schema, and the vocabulary terms under `https://w3id.org/lokf/`.

- `https://w3id.org/lokf/schema` is the schema, `lokf.yaml`, as the project's site serves it.
- `https://w3id.org/lokf/context.jsonld` is the JSON-LD context a bundle's `index.md` declares. `https://w3id.org/lokf/lokf.yaml`, `lokf.context.jsonld`, `lokf.schema.json`, `lokf.shacl.ttl`, `lokf.owl.ttl` and `lokf.sql` are the schema and its generated artifacts, each by its file name on the site.
- `https://w3id.org/lokf/v<tag>/<file>` is the same file at that release tag of the repository, for a consumer that pins a version.
- `https://w3id.org/lokf/<Term>` is a vocabulary term, such as `Concept` or `excerpt`. An RDF client gets the OWL ontology; a browser gets the specification.
- `https://w3id.org/lokf/` and any other path go to the site, path included.

Site: <https://lokf.nolan-nichols.com>. Source: <https://github.com/nicholsn/lokf>

## Contact

- Nolan Nichols, who maintains LOKF
- GitHub: [@nicholsn](https://github.com/nicholsn)
- Noel McLoughlin, who contributes to LOKF and opened this request
- GitHub: [@noelmcloughlin](https://github.com/noelmcloughlin)
