# AI Atlas Nexus

**Persistent identifier (PID) home** for IBM's AI Atlas Nexus ontology (`ai-risk-ontology`) and related resources.

This directory hosts the redirection rules (via `.htaccess`) that resolve the PID
<https://w3id.org/ai-atlas-nexus> and its associated versions and vocabularies.

- Source: <https://github.com/IBM/ai-atlas-nexus>
- Documentation: <https://ibm.github.io/ai-atlas-nexus/ontology/>

## Resolvable Resources

The base PID <https://w3id.org/ai-atlas-nexus> and every term IRI beneath it
(for example <https://w3id.org/ai-atlas-nexus/Risk>) resolve to the documentation
site in a browser, and to a machine-readable representation via content negotiation
(`Accept: text/turtle`, `application/ld+json`, `application/schema+json`,
`application/shacl+turtle`, `text/shex`, `application/yaml`).

| PID | Resolves to |
| --- | --- |
| `/ai-risk-ontology.yaml` | self-contained LinkML schema (all modules merged); import it with `nexus:ai-risk-ontology` |
| `/<module>.yaml` (e.g. `/common.yaml`) | LinkML source module |
| `/schema/<path>.yaml` | any file in the schema source tree, including the modular root `/schema/ai-risk-ontology.yaml` |
| `/ai-risk-ontology.<ext>` | `gen-project` artefacts: `.context.jsonld`, `.jsonld`, `.schema.json`, `.owl.ttl`, `.shacl.ttl`, `.shex`, `.graphql`, `.proto`, `.sql`; also `/prefixmap/ai-risk-ontology.yaml` |
| `/graph_export/<fmt>/<file>` | knowledge-graph exports (yaml, json, cypher, owl, latex) |
| `/v<semver>/...` | any of the above pinned to that git tag |

Downstream LinkML schemas can import the ontology without vendoring it:

```yaml
prefixes:
  nexus: https://w3id.org/ai-atlas-nexus/
imports:
  - nexus:ai-risk-ontology
```

The `gen-project` and merged-schema targets are published from the upstream
`project/` directory (see the `regenerate_project` make target upstream); until a
release containing that directory is on `main`, those redirects return 404 from GitHub
while the schema-source and documentation redirects work.

## Maintainer

- Inge Vejsbjerg ([@ingelise](https://github.com/ingelise))

## Contributors

- Noel McLoughlin ([@noelmcloughlin](https://github.com/noelmcloughlin)) - LinkML artefact and content-negotiation rules
