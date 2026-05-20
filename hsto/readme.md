# Historic Structure Ontology (HSTO)

The **Historic Structure Ontology (HSTO)** provides a formal knowledge representation of the physical configuration of historic masonry aggregates, explicitly modelling the relationships among their structural components.

## Namespace

```
https://w3id.org/hsto#
```

## Description

HSTO is organised around the central class `hsto:StructuralPart`, from which two main subclasses are derived:

- **Facade** — models the exterior wall surface of a structural unit, capturing opening layout, masonry typology variations, and damage patterns; linked to historic openings and their heritage-specific components (jamb, sill, lintel, arch)
- **Horizontal Structure** — models floor and roof assemblies (timber floors and masonry vaults) providing diaphragm rigidity to the aggregate

Structural connections are modelled as explicit first-class objects (`hsto:Connection`), with two specialised subtypes — `hsto:Quoin` (interlocking corner stones) and `hsto:Tie` (metallic/wooden anchors) — and a connection quality property to inform FEM modelling strategies.

Each structural part supports:
- datation (absolute and relative)
- accessibility assessment
- damage description via DOT
- traditional construction technique via HSV

## Dependencies

| Prefix | Ontology | Namespace |
|--------|----------|-----------|
| `hsv` | Historic Survey Ontology | https://w3id.org/hsv# |
| `beo` | Building Element Ontology | https://w3id.org/beo# |
| `dot` | Damage Typology Ontology | https://w3id.org/dot# |
| `hmo` | Historic Masonry Ontology | https://w3id.org/hmo# |

## Files

| File | Description |
|------|-------------|
| `hsto.ttl` | Ontology serialised in Turtle |

## Maintainer

- [@mlaura1996](https://github.com/mlaura1996)

## Authors

Maria Laura Leonardi, Stefano Cursi, Letizia Martinelli, Elena Gigliarelli, Miguel Azenha, Daniel V. Oliveira


## License

[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
