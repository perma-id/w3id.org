# Mentor

Permanent identifiers for [Mentor](https://github.com/faubulous/mentor-vscode), an RDF IDE extension for Visual Studio Code, and its related libraries.

Currently registered:

- `https://w3id.org/mentor-vscode/shapes/<name>` — the latest SHACL shape graph bundled with a Mentor built-in validation profile, redirecting to its source in the [mentor-vscode](https://github.com/faubulous/mentor-vscode) repository (e.g. [ontology](https://w3id.org/mentor-vscode/shapes/ontology), [taxonomy](https://w3id.org/mentor-vscode/shapes/taxonomy)).
- `https://w3id.org/mentor-vscode/shapes/<name>/<version>` — a specific, immutable version of a shape graph (matching its `owl:versionIRI`), e.g. [ontology/1.0.0](https://w3id.org/mentor-vscode/shapes/ontology/1.0.0). Because each version is a distinct file (`src/ontologies/shapes/<name>-<version>.ttl`) that never changes, versioned identifiers are served directly from `main`.

When a profile's shapes change, a new `src/ontologies/shapes/<name>-<version>.ttl` file is added and the unversioned "latest" redirect in `.htaccess` is pointed at it; earlier versions keep resolving unchanged.

## Contact

Maintained by [Sebastian Faubel](https://github.com/faubulous).
