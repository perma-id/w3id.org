# TopologicPy Ontology

This directory defines the persistent identifiers and redirects for the TopologicPy ontology.

TopologicPy is an open-source Python software library for the integrated representation and analysis of geometry, topology, graphs, and semantics, with applications in architecture, engineering, construction, urban modelling, spatial analysis, graph machine learning, and AI-assisted reasoning.

The ontology provides a formal semantic framework for representing:

- geometric and topological entities;
- spatial and architectural concepts;
- graph structures and relationships;
- semantic metadata and provenance;
- building information modelling (BIM) entities;
- graph analytics and spatial metrics;
- interoperability with linked data ecosystems.

The ontology is designed to support:

- TopologicPy computational workflows;
- IFC and BIM interoperability;
- graph databases such as Neo4j and Kùzu;
- RDF and semantic web technologies;
- GraphRAG and AI reasoning systems;
- architectural and urban spatial analysis;
- graph machine learning pipelines.

---

## Canonical Namespace

```ttl
@prefix top: <http://w3id.org/topologicpy#> .
```

Namespace URI:

```text
http://w3id.org/topologicpy#
```

Ontology document:

```text
http://w3id.org/topologicpy
```

---

## Redirect Target

The ontology is physically hosted using GitHub Pages at:

```text
https://wassimj.github.io/topologicpy/ontology/topologicpy.ttl
```

Versioned ontology releases are hosted at:

```text
https://wassimj.github.io/topologicpy/ontology/versions/
```

---

## Main Repository

TopologicPy source code:

```text
https://github.com/wassimj/topologicpy
```

Ontology source folder:

```text
https://github.com/wassimj/topologicpy/tree/main/ontology
```

---

## Ontology Scope

The ontology includes:

### Core Topology

- Vertex
- Edge
- Wire
- Face
- Shell
- Cell
- CellComplex
- Cluster
- Aperture
- Dictionary
- Graph

### Spatial Concepts

- Site
- Building
- Storey
- Space
- Room
- ThermalZone
- Interface

### Building Elements

- Wall
- Door
- Window
- Slab
- Roof
- Beam
- Column
- Stair
- Railing
- Furniture
- Equipment

### Graph Concepts

- Node
- Relationship
- SpatialGraph
- AdjacencyGraph
- VisibilityGraph
- CirculationGraph
- ConnectivityGraph
- KnowledgeGraph

### Analysis and Metrics

- area
- volume
- length
- centroid
- normal
- compactness
- isovist metrics
- graph centrality metrics
- community structure
- shortest path metrics

### Provenance and BIM

- IFC class mappings
- IFC GlobalIds
- source provenance
- derivation relationships
- semantic annotations

---

## Alignment

The ontology aligns with and interoperates with:

- BOT (Building Topology Ontology)
- Brick Schema
- RDF / RDFS
- OWL
- IFC / BIM workflows
- Linked Building Data standards

---

## Persistence Policy

The namespace:

```text
http://w3id.org/topologicpy#
```

is intended to remain persistent independently of any hosting provider, institutional website, or software infrastructure.

If hosting locations change in the future, the redirect rules in this repository will be updated while preserving the canonical namespace.

---

## Maintainer

Professor Wassim Jabi  
Welsh School of Architecture  
Cardiff University  

GitHub:

```text
https://github.com/wassimj
```

Project repository:

```text
https://github.com/wassimj/topologicpy
```

---

## License

The ontology is distributed under the same license as TopologicPy unless otherwise specified.
