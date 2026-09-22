# SRCNet Semantic Model (SRC)

This W3ID provides a persistent identifier for **SRC**, the semantic model developed to describe the SKA Regional Centre Network (SRCNet), including regional nodes, computing, storage, networking and energy resources, and local and global service catalogues.

## Persistent identifier and namespace

- Ontology identifier: `https://w3id.org/srcnet`
- Namespace for ontology terms: `https://w3id.org/srcnet#`

For example, a term named `SRCNode` is identified as:

```text
https://w3id.org/srcnet#SRCNode
```

The persistent identifier supports HTTP content negotiation:

| Accept media type | Representation |
| --- | --- |
| `application/ld+json` or `application/json` | JSON-LD |
| `text/turtle` or `application/x-turtle` | Turtle |
| `text/html`, browser requests, or unsupported media types | Repository model directory |

Explicit representation identifiers are also available:

- `https://w3id.org/srcnet/srcnet.jsonld`
- `https://w3id.org/srcnet/srcnet.ttl`
- `https://w3id.org/srcnet/SRCnode_model.jsonld`
- `https://w3id.org/srcnet/SRCnode_model.ttl`

## Source files

- JSON-LD: `Model/SRCnode_model.jsonld`
- Turtle: `Model/SRCnode_model.ttl`

Ontology source and project documentation:

- https://github.com/Edgar25-coder/SRCNet-SemanticModel

## Maintainers

- Edgar Ribeiro João ([@Edgar25-coder](https://github.com/Edgar25-coder))
- Manuel Parra-Royón ([@manuparra](https://github.com/manuparra))
- Julián Garrido ([@julian-garrido](https://github.com/julian-garrido))

## License

The SRCNet Semantic Model repository is distributed under the MIT License.
