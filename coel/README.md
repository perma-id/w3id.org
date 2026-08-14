# COEL v2.0 w3id Configuration

This directory contains the proposed w3id.org redirect configuration for the COEL v2.0 public artefact bundle.

Namespace root:

```text
https://w3id.org/coel/
```

GitHub Pages target:

```text
https://miltheo.github.io/coel/
```

Repository:

```text
https://github.com/miltheo/coel
```

Redirects currently use HTTP `302` status codes.

## Maintainer

- Millen J. Theophilus
- GitHub: https://github.com/miltheo
- Repository issues: https://github.com/miltheo/coel/issues

## Route Policy

- Namespace and collection/document paths redirect to GitHub Pages HTML pages.
- Concrete schema, registry, mapping, and derived TTL artefact paths redirect to raw GitHub files.
- Model term IRIs use fragment identifiers from the registry CSV `iri` columns. Fragments are resolved by clients after the base model path redirects.
- JSON-LD is included only as optional projection support.
- Non-public implementation routes, slug aliases, and derived JSON serialisation routes are intentionally excluded.

## HTML Routes

| w3id route | Target |
|---|---|
| `https://w3id.org/coel/` | `https://miltheo.github.io/coel/` |
| `https://w3id.org/coel/namespace/` | `https://miltheo.github.io/coel/namespace/` |
| `https://w3id.org/coel/atom/2.0/` | `https://miltheo.github.io/coel/atom/2.0/` |
| `https://w3id.org/coel/models/` | `https://miltheo.github.io/coel/models/` |
| `https://w3id.org/coel/models/coel/2.0/` | `https://miltheo.github.io/coel/models/coel/2.0/` |
| `https://w3id.org/coel/models/activinsights/` | `https://miltheo.github.io/coel/models/activinsights/` |
| `https://w3id.org/coel/models/activinsights/behavioural_bout/1.0/` | `https://miltheo.github.io/coel/models/activinsights/behavioural_bout/1.0/` |
| `https://w3id.org/coel/models/activinsights/rest_activity/1.0/` | `https://miltheo.github.io/coel/models/activinsights/rest_activity/1.0/` |
| `https://w3id.org/coel/mapping/` | `https://miltheo.github.io/coel/mapping/` |
| `https://w3id.org/coel/utilities/` | `https://miltheo.github.io/coel/utilities/` |
| `https://w3id.org/coel/utilities/jsonld/` | `https://miltheo.github.io/coel/utilities/jsonld/` |

## Raw Artefact Routes

| w3id route | Target |
|---|---|
| `https://w3id.org/coel/atom/2.0/coel-atom.json` | `https://raw.githubusercontent.com/miltheo/coel/main/atom/2.0/coel-atom.json` |
| `https://w3id.org/coel/atom/2.0/extension-registry.csv` | `https://raw.githubusercontent.com/miltheo/coel/main/atom/2.0/extension-registry.csv` |
| `https://w3id.org/coel/models/coel/2.0/coel-model-v2.0.csv` | `https://raw.githubusercontent.com/miltheo/coel/main/models/coel/2.0/coel-model-v2.0.csv` |
| `https://w3id.org/coel/models/activinsights/behavioural_bout/1.0/behavioural-bout-model-v1.0.csv` | `https://raw.githubusercontent.com/miltheo/coel/main/models/activinsights/behavioural_bout/1.0/behavioural-bout-model-v1.0.csv` |
| `https://w3id.org/coel/models/activinsights/rest_activity/1.0/rest-activity-model-v1.0.csv` | `https://raw.githubusercontent.com/miltheo/coel/main/models/activinsights/rest_activity/1.0/rest-activity-model-v1.0.csv` |
| `https://w3id.org/coel/mapping/behavioural-bout-model-v1.0-to-coel-model-v2.0.csv` | `https://raw.githubusercontent.com/miltheo/coel/main/mapping/behavioural-bout-model-v1.0-to-coel-model-v2.0.csv` |
| `https://w3id.org/coel/mapping/rest-activity-model-v1.0-to-coel-model-v2.0.csv` | `https://raw.githubusercontent.com/miltheo/coel/main/mapping/rest-activity-model-v1.0-to-coel-model-v2.0.csv` |
| `https://w3id.org/coel/models/coel/2.0/coel-model-v2.0.ttl` | `https://raw.githubusercontent.com/miltheo/coel/main/models/coel/2.0/coel-model-v2.0.ttl` |
| `https://w3id.org/coel/models/activinsights/behavioural_bout/1.0/behavioural-bout-model-v1.0.ttl` | `https://raw.githubusercontent.com/miltheo/coel/main/models/activinsights/behavioural_bout/1.0/behavioural-bout-model-v1.0.ttl` |
| `https://w3id.org/coel/models/activinsights/rest_activity/1.0/rest-activity-model-v1.0.ttl` | `https://raw.githubusercontent.com/miltheo/coel/main/models/activinsights/rest_activity/1.0/rest-activity-model-v1.0.ttl` |
| `https://w3id.org/coel/mapping/behavioural-bout-model-v1.0-to-coel-model-v2.0.ttl` | `https://raw.githubusercontent.com/miltheo/coel/main/mapping/behavioural-bout-model-v1.0-to-coel-model-v2.0.ttl` |
| `https://w3id.org/coel/mapping/rest-activity-model-v1.0-to-coel-model-v2.0.ttl` | `https://raw.githubusercontent.com/miltheo/coel/main/mapping/rest-activity-model-v1.0-to-coel-model-v2.0.ttl` |

## Optional Projection Route

| w3id route | Target |
|---|---|
| `https://w3id.org/coel/utilities/jsonld/context.jsonld` | `https://raw.githubusercontent.com/miltheo/coel/main/utilities/jsonld/context.jsonld` |
