<img src="https://topologic.app/wp-content/uploads/2023/02/topologicpy-logo-no-loop.gif" alt="topologicpy logo" width="100" loop="4">

# The topologicpy Ontology 
<p align="center">
    <img src=https://github.com/wassimj/topologicpy/blob/main/resources/top_diagram_3D.png alt="3D Diagram of the topologicpy ontology" />
</p>

## Ontology Overview
The TopologicPy 3D Spatial Modeling Ontology is designed to facilitate the detailed representation and manipulation of 3D models through non-manifold BREP (Boundary Representation) structures. Its primary purpose is to provide a comprehensive and structured framework for defining the topology of 3D models, encompassing various elements such as vertices, edges, wires, faces, shells, cells, cell complexes, and clusters. The ontology is heavily inspired by the BOT ontology (https://w3c-lbd-cg.github.io/bot/) and there are plans in the near future to add alignments with BOT. The ontology addresses the domain of computational geometry and spatial modeling, specifically targeting applications in CAD (Computer-Aided Design), BIM (Building Information Modeling), and other 3D modeling environments. By standardizing the representation of complex topological relationships, this ontology aims to enhance interoperability, data exchange, and the accuracy of 3D spatial analysis and visualization.

## Prefix and Namespace
The TopologicPy 3D Spatial Modeling Ontology uses the following prefix and namespace:

Prefix: top

Namespace URI: http://w3id.org/topologicpy/# (coming soon, hopefully!)

The full namespace declaration in Turtle (TTL) format is:
```
@prefix top: <http://w3id.org/topologicpy/#> .
@prefix bot: <https://w3id.org/bot#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
```

## Authors, Maintainers, and Contributors
### Author and Maintainer
Name: Wassim Jabi

Email: wassim.jabi@gmail.com

### Contributor
Name: Theo Dounas

Email: Theo.Dounas@uantwerpen.be

## Class Descriptions

<p align="center">
<img src="https://topologic.app/wp-content/uploads/2018/12/ClassHierarchy.jpg" alt="topologicpy Class Hierarchy" width=500 />
</p>

* Topology: The base class for all topological elements.
* Vertex: Represents a point in 3D space.
* Edge: Represents a line segment connecting two vertices.
* Wire: Represents a sequence of connected edges.
* Face: Represents a flat surface bounded by a wire and optionally containing holes.
* Shell: Represents a collection of faces forming a segmented surface.
* Cell: Represents a volumetric element bounded by faces.
* CellComplex: Represents a collection of cells forming a segmented volumetric element.
* Cluster: Represents a group of related objects.
* Grid: Represents a spatial structure dividing space into regular intervals.
* Dictionary: Represents a key-value store for metadata.
* Aperture: Represents an element indicating an opening or hole.
* Context: Represents the environment or settings in which objects exist.
* Vector: Represents a mathematical entity with magnitude and direction.
* Matrix: Represents a rectangular array of numbers used for transformations.
* Graph: Represents a collection of nodes and edges.

## Object Properties
* hasDictionary: Links a topology object to its dictionary.
* hasStartVertex: Links an edge to its start vertex.
* hasEndVertex: Links an edge to its end vertex.
* hasEdges: Links an object to its edges.
* hasVertices: Links an object to its vertices.
* hasExternalBoundary: Links an object to its external boundary.
* hasInternalBoundaries: Links an object to its internal boundaries.
* hasFaces: Links an object to its faces.
* hasWires: Links an object to its wires.
* hasShells: Links an object to its shells.
* hasCells: Links an object to its cells.
* hasClusterMember: Links a cluster to its members.
* hasFreeCells: Links a cluster to its free cells.
* hasFreeShells: Links a cluster to its free shells.
* hasFreeFaces: Links a cluster to its free faces.
* hasFreeWires: Links a cluster to its free wires.
* hasFreeEdges: Links a cluster to its free edges.
* hasFreeVertices: Links a cluster to its free vertices.
* hasKeys: Links a dictionary to its keys.
* hasValues: Links a dictionary to its values.
* Data Properties
* hasX: The X coordinate of a vertex.
* hasY: The Y coordinate of a vertex.
* hasZ: The Z coordinate of a vertex.
* hasAngle: The angle at the start vertex of an edge.
* hasLength: The length of an edge.
* hasDirection: The direction of an edge or a face (the normal to the face).
* hasArea: The surface area of a face, a shell, a cell, or a cellComplex.
* hasVolume: The volume of a cell or a cellComplex.

## Usage
This ontology provides a structured way to describe 3D models and their topological relationships. It can be used in various applications, including CAD systems, BIM (Building Information Modeling), and other 3D modeling environments.
Here is a snippet of how a top:Space (top:Cell) can connect to other top:Space elements and can contain other elements (e.g. furniture):
```
top:1edf15de-85be-5120-9ac7-187656f4f0f7 a bot:Space ;
    rdfs:label "1edf15de-85be-5120-9ac7-187656f4f0f7" ;
    top:hasVolume "18.0"^^xsd:float ;
    top:hasX "6.5"^^xsd:float ;
    top:hasY "5.0"^^xsd:float ;
    top:hasZ "4.5"^^xsd:float ;
    top:name "Bathroom"^^xsd:string ;
    bot:connectsTo top:bdbaf36b-df6b-56ff-8ece-3fccd38fb7ca,
        top:cbae882a-6b8b-590c-a838-4eab306a8a46_4 ;
    bot:containsElement top:6aa9f5cf-3a34-5cef-8e18-2947d82d896f,
        top:6b9c19ad-eca7-5b56-af62-961f4f4d0c0a,
        top:6f8202d4-d3f2-5be9-b5b9-fc0f16ee42b2 .
```
## License
This ontology is released under the MIT License. For more information, see the LICENSE file.

## Contact
For any questions or feedback, please contact wassim.jabi@gmail.com.

