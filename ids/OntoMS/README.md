# Onto-MS.github.io
This repository houses the documentation and files related to Onto-MS.

# **OntoMS: Ontology for Multi-Scale Simulation in Materials Science**  

**OntoMS** is an ontology designed to structure and integrate knowledge related to multi-scale simulation methods in materials science. It models the key processes, entities, and relationships essential for understanding and executing simulations across scales. The ontology facilitates efficient decision-making, data sharing, and interoperability in the domain.

---

## **Key Features**
- **Comprehensive Modeling**: Captures concepts such as simulation tasks, models, algorithms, and materials across multiple scales.
- **Semantic Integration**: Aligns with established ontologies like **EMMO** for consistency and interoperability.
- **Facilitates Decision-Making**: Enables semantic reasoning to improve simulation workflows.
- **Support for Tools**: Designed for use with tools like **Protégé** (offline) and **WebWOWL** (online).

---

## **Core Concepts**
1. **Task**: Refers to an activity or assignment requiring effort and undertaken to reach a specific outcome within a particular domain or context. And connects with:
   - **Material** (e.g., shapes, properties)
   - **Time Interval**  
   - **Task Objective** etc. through appropriate object properties. 
2. **Model**: a representation or abstraction of a real-world system, phenomenon, or process designed to mimic or simulate its behavior and characteristics. And connects with
   - Types (e.g., Mathematical, Numerical)
   - Model Entities (e.g., Atomistic, Micro, Nano, Macro)
   - Input for simulation (Initial Conditions, Boundary Conditions, Parameters)
   - Solver (For model implementation)
3. **Algorithm**: Specify solvers like **Monte Carlo** or **Time-Dependent Solvers**.
4. **Measurement Results** Specified as raw and inferred measurement results. 

---

## **Use Cases**
- Multi-scale simulation for materials and devices.
- Interdisciplinary research collaboration across physics, chemistry, and engineering.
- Semantic reasoning for data integration and workflow optimization.

---

## **How to Access**
- **Online Viewer**: Explore the ontology using **WebWOWL** for interactive browsing.
- **Offline Use**: Import into **Protégé** for detailed editing and exploration.  

---

## **Alignment and Interoperability**
OntoMS is aligned with upper-level ontologies like **EMMO**,**PROV-O**, and **BattINFO**, ensuring compatibility with existing standards and frameworks. It addresses challenges such as:
- Semantic mismatches.
- Data heterogeneity.
- Lack of interconnections in simulation workflows.

---

## **Benefits**
- Enhances collaboration by standardizing terminology and structure.
- Facilitates data reuse and sharing.
- Enables inference and reasoning for advanced decision-making.
- Improves research reproducibility and documentation.

---

## **Technical Details**
- **Format**: OWL (Web Ontology Language)
- **Namespace**: `https://w3id.org/OntoMS/`
- **Version**: 1.0.0

---

## **Ontology Documentation and Access Details**

## Documentation:
[OntoMS Ontology Specification](https://kit-mms.github.io/Onto-MS.github.io/)

## Redirections:

### HTML: Visit documentation
- **URL**: [https://w3id.org/OntoMS](https://w3id.org/OntoMS)  
  **Redirects to**: [https://kit-mms.github.io/Onto-MS.github.io/](https://kit-mms.github.io/Onto-MS.github.io/)

### Turtle, RDF/XML, N-Triples, JSON-LD: Access respective ontology via content negotiation
- **URL**: [https://w3id.org/OntoMS](https://w3id.org/OntoMS)  
  **With HTTP headers**:
  - `Accept: text/turtle` → Turtle (.ttl)  
    **Redirects to**: [https://kit-mms.github.io/Onto-MS.github.io/ontology.ttl](https://kit-mms.github.io/Onto-MS.github.io/ontology.ttl)
  - `Accept: application/rdf+xml` → RDF/XML (.owl)  
    **Redirects to**: [https://kit-mms.github.io/Onto-MS.github.io/ontology.owl](https://kit-mms.github.io/Onto-MS.github.io/ontology.owl)
  - `Accept: application/n-triples` → N-Triples (.nt)  
    **Redirects to**: [https://kit-mms.github.io/Onto-MS.github.io/ontology.nt](https://kit-mms.github.io/Onto-MS.github.io/ontology.nt)
  - `Accept: application/ld+json` → JSON-LD (.jsonld)  
    **Redirects to**: [https://kit-mms.github.io/Onto-MS.github.io/ontology.jsonld](https://kit-mms.github.io/Onto-MS.github.io/ontology.jsonld)

### Fallback:
- Any unsupported or unspecified `HTTP_ACCEPT` header will redirect to the HTML documentation:  
  **Redirects to**: [https://kit-mms.github.io/Onto-MS.github.io/](https://kit-mms.github.io/Onto-MS.github.io/)

---
## **Contact and Contribution**
We welcome feedback and contributions!
- **Maintainer**: [@KIT-MMS](https://github.com/KIT-MMS)
- **Author**: Hafiz Muhammad Noman  
- **Email**: noman@kit.edu

Feel free to submit issues, feature requests, or pull requests to improve OntoMS.
