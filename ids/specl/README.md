# SPECL — `/specl`

RDF-native, SHACL-validated spec language for spec-driven AI development.

## URIs

| URI | Purpose |
| --- | --- |
| `https://w3id.org/specl/ns#` | SPECL vocabulary (OWL ontology), current contract |
| `https://w3id.org/specl/ns/1` | Vocabulary as published under graph contract 1 |
| `https://w3id.org/specl/ns/2` | Vocabulary as published under graph contract 2 |
| `https://w3id.org/specl/shapes` | SHACL shapes graph, current contract |
| `https://w3id.org/specl/shapes/1` | Shapes as published under graph contract 1 |
| `https://w3id.org/specl/shapes/2` | Shapes as published under graph contract 2 |
| `https://w3id.org/specl/contract/1` | What a contract 1 graph guarantees |
| `https://w3id.org/specl/contract/2` | What a contract 2 graph guarantees |
| `https://w3id.org/specl/tool/spec#` | Items of the specl tool's own specification |
| `https://w3id.org/specl/explorer/spec#` | Items of the spec explorer's specification |
| `https://w3id.org/specl/commitments/spec#` | Items of specl's commitments register |
| `https://w3id.org/specl/explorer` | Spec explorer (HTML) |
| `https://w3id.org/specl/spec#` | **Retired.** Redirects to the migration guide |

### About the retired namespace

Until specl 0.3.0, every specification minted its items under
`https://w3id.org/specl/spec#`, so `#R1.1` from one specification collided with
`#R1.1` from another. Each specification now declares its own base. The old
namespace is not reassigned to anything, and its rule is kept so that graphs
distributed before the change still resolve, now to the migration guide.

### About the versioned URIs

The version in `ns/1` and `shapes/2` is the graph contract, not the release.
Every emitted graph names the contract it conforms to with `dct:conformsTo`, and
a contract changes only in a release designated for breaking changes. The
unversioned `ns` and `shapes` URIs always serve the current contract.

## Repository

<https://github.com/zwelz3/specl>

## Contact

Zachary Welz 
  - GitHub: [@zwelz3](https://github.com/zwelz3)