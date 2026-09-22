# /finos/

This [W3ID](https://w3id.org) persistent URI namespace is reserved by the
[Fintech Open Source Foundation](https://www.finos.org/) (FINOS).

## Uses

Persistent identifiers for the machine-readable [LinkML](https://linkml.io) models of FINOS projects, published from a `.linkml/` sidecar directory in each project repository (`https://github.com/finos/<repo>`). Content negotiation follows Linked Data practice: a term IRI such as `https://w3id.org/finos/<repo>/<Term>` resolves to the documentation page in a browser and to RDF / JSON-LD / JSON Schema / SHACL / ShEx / LinkML YAML via the `Accept` header. Artefacts are also addressable by file extension, for example `https://w3id.org/finos/<repo>/context.jsonld` or `https://w3id.org/finos/<repo>/schema/<name>.yaml`.

The rule set is identical to [/lmodel/](../lmodel/), the reference implementation used by the `github.com/lmodel` forks where the sidecars are developed before being proposed upstream.

## Namespaces

| PID | Project | Notes |
| --- | --- | --- |
| `/finos/ai-governance-framework` | [finos/ai-governance-framework](https://github.com/finos/ai-governance-framework) | alias: `/finos/aigf`; docs at <https://air-governance-framework.finos.org/> |
| `/finos/common-domain-model` | [finos/common-domain-model](https://github.com/finos/common-domain-model) | default branch `master` |
| `/finos/fluxnova-bpm-platform` | [finos/fluxnova-bpm-platform](https://github.com/finos/fluxnova-bpm-platform) | |

Any other `/finos/<repo>` resolves with the defaults (branch `main`, stem `<repo>`).

## Contact

**Noel McLoughlin**
<noel.mcloughlin@gmail.com>  
GitHub: [noelmcloughlin](https://github.com/noelmcloughlin)

**Another person tbc**
*Ms Jane Doe*
<jane.doe@finos.org>
