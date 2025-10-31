# EDAAnOWL
**Persistent identifier (PID) home** for the EDAAnOWL ontology and related resources.

This directory hosts the redirection rules (via `.htaccess`) that resolve the PID
<https://w3id.org/EDAAnOWL> and its associated versions and vocabularies.

## 🔗 Resolvable Resources

The redirection rules point to the ontology documentation and files hosted on GitHub Pages:
**`https://khaosresearch.github.io/EDAAnOWL/`**

### Main Ontology (Latest & Versioned)

The base PID <https://w3id.org/EDAAnOWL> redirects to the **latest** version. Specific versions can be accessed via `/<version>` (e.g., <https://w3id.org/EDAAnOWL/0.0.1>).

* **HTML Docs (for browsers):**
    * `https://w3id.org/EDAAnOWL/` (Redirects to latest docs)
    * `https://w3id.org/EDAAnOWL/0.0.1/` (Redirects to versioned docs)

* **RDF Serializations (for tools, using `Accept` header):**
    * **Turtle (.ttl):** `https://khaosresearch.github.io/EDAAnOWL/latest/ontology.ttl`
    * **RDF/XML (.owl):** `https://khaosresearch.github.io/EDAAnOWL/latest/ontology.owl`
    * **N-Triples (.nt):** `https://khaosresearch.github.io/EDAAnOWL/latest/ontology.nt`
    * **JSON-LD (.jsonld):** `https://khaosresearch.github.io/EDAAnOWL/latest/ontology.jsonld`

### Modular Vocabularies

Vocabulary PIDs are resolvable *per version*. For example:
<https://w3id.org/EDAAnOWL/latest/vocabularies/sector-scheme>

This PID will redirect to the raw `.ttl` file:
* `https://khaosresearch.github.io/EDAAnOWL/latest/vocabularies/sector-scheme.ttl`
* `https://khaosresearch.github.io/EDAAnOWL/0.0.1/vocabularies/agro-vocab.ttl`

## 📦 Content Negotiation

The `.htaccess` provides content negotiation based on the `Accept` header:
* `text/html` → HTML documentation (e.g., `.../latest/index.html`)
* `text/turtle` → Turtle file (e.g., `.../latest/ontology.ttl`)
* `application/rdf+xml` → RDF/XML file (e.g., `.../latest/ontology.owl`)
* `application/n-triples` → N-Triples file (e.g., `.../latest/ontology.nt`)
* `application/ld+json` → JSON-LD file (e.g., `.../latest/ontology.jsonld`)
* Default/Fallback → Turtle file (e.g., `.../latest/ontology.ttl`)

## 🧭 Scope

**EDAAnOWL** is an ontology aligned with **IDSA** and connected to **BIGOWL** (Data, Algorithms, Problems, Workflows).
It models data assets, data apps, profiles, and workflows, using modular SKOS vocabularies for domains, data types, and observed properties.

## 👥 Maintainers

-   Martín J. Salvachúa ([@MartinM10](https://github.com/MartinM10)) - `<martinjs@uma.es>` - `<martin.salvachua1@gmail.com>`