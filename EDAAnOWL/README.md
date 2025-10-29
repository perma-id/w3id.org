# EDAAnOWL
**Persistent identifier (PID) home** for the EDAAnOWL ontology and related resources.

This directory hosts the redirection rules (via `.htaccess`) that resolve the PID
<https://w3id.org/EDAAnOWL> and its associated versions and vocabularies.

## 🔗 Resolvable Resources

### Main Ontology (Latest & Versioned)

The base PID <https://w3id.org/EDAAnOWL> redirects to the **latest** version. Specific versions can be accessed via `/<version>` (e.g., <https://w3id.org/EDAAnOWL/0.2.1>).

* **HTML Docs (for browsers):**
    * Latest: `https://khaosresearch.github.io/EDAAnOWL/latest/index.html`
    * Versioned: `https://khaosresearch.github.io/EDAAnOWL/<version>/index.html`
* **RDF Serializations (for tools):** Direct links to raw files:
    * **Turtle (.ttl):** `.../docs/<latest_or_version>/ontology.ttl`
    * **RDF/XML (.xml):** `.../docs/<latest_or_version>/ontology.xml`
    * **N-Triples (.nt):** `.../docs/<latest_or_version>/ontology.nt`
    * **JSON-LD (.jsonld):** `.../docs/<latest_or_version>/ontology.jsonld`

### Modular Vocabularies

Vocabulary PIDs (e.g., <https://w3id.org/EDAAnOWL/vocabularies/sector-scheme>) resolve to their respective `.ttl` files.

* Latest: `.../docs/latest/vocabularies/<vocab-name>.ttl`
* Versioned: `.../docs/<version>/vocabularies/<vocab-name>.ttl`

## 📦 Content Negotiation

The `.htaccess` provides content negotiation based on the `Accept` header:
* `text/html` → HTML documentation.
* `text/turtle` → Turtle file (`ontology.ttl`).
* `application/rdf+xml` → RDF/XML file (`ontology.xml`).
* `application/n-triples` → N-Triples file (`ontology.nt`).
* `application/ld+json` → JSON-LD file (`ontology.jsonld`).
* Default/Fallback → Turtle file (`ontology.ttl`).

## 🧭 Scope

**EDAAnOWL** is an ontology aligned with **IDSA** and connected to **BIGOWL** (Data, Algorithms, Problems, Workflows).
It models data assets, data apps, profiles, and workflows, using modular SKOS vocabularies for domains, data types, and observed properties.

## 👥 Maintainers

-   Martín J. Salvachúa ([@MartinM10](https://github.com/MartinM10)) - `<martinjs@uma.es>` - `<martin.salvachua1@gmail.com>`
