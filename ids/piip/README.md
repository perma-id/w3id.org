# Process Information Infrastructure Protocol (PIIP)

Permanent identifiers for the **Process Information Infrastructure Protocol** ontology suite.
YAML-based information model specification following an **Entity-Component-System (ECS)** architecture with focus on infrastructure.

| Permanent IRI | Target |
|---|---|
| https://w3id.org/piip | https://github.com/A-S-Consult-GmbH/PIIP |
| https://w3id.org/piip/{Path}/{Major} | `spec/{Path}.yaml` @ `main` |
| https://w3id.org/piip/{Path}/{X.Y.Z} | `spec/{Path}.yaml` @ git tag `vX.Y.Z` |

`{Path}` = relative path under `spec/` without `.yaml` (one or more segments), e.g. `Core`, `Rail/Signaling`.

Source: https://github.com/A-S-Consult-GmbH/PIIP

## Versioning

- **Ontology IRI**: major only → `https://w3id.org/piip/Core/1`
- **Snapshot IRI** (optional): `https://w3id.org/piip/Core/1.0.0` → tag `v1.0.0`
- Tag on the PIIP repo: `git tag v1.0.0 && git push origin v1.0.0`

## Maintainers

* Jens Bartnitzek – GitHub: [JensBartnitzek](https://github.com/JensBartnitzek)
* Organization: A+S Consult GmbH FuE – https://apluss.de/a+s_consult
