# EDAAnOWL
**Persistent identifier (PID) home** for the EDAAnOWL ontology and related resources.

This directory hosts the redirection rules (via `.htaccess`) that resolve the PID
<https://w3id.org/EDAAnOWL> and its associated vocabularies.

## 🔗 Resolvable Resources

This directory provides redirection for the main ontology PID and its modular vocabularies.

### Main Ontology: <https://w3id.org/EDAAnOWL>

* **HTML Docs (for browsers):**
    `https://khaosresearch.github.io/EDAAnOWL/ontology/index-en.html`
* **RDF/Turtle (for tools/machines):**
    `https://raw.githubusercontent.com/KhaosResearch/EDAAnOWL/main/docs/ontology/edaan-owl.ttl`

### Modular Vocabularies

* **PID:** <https://w3id.org/EDAAnOWL/vocabularies/sector-scheme>
    * **Target:** `https.../main/docs/vocabularies/sector-scheme.ttl`
* **PID:** <https://w3id.org/EDAAnOWL/vocabularies/agro-vocab>
    * **Target:** `https.../main/docs/vocabularies/agro-vocab.ttl`
* **PID:** <https://w3id.org/EDAAnOWL/vocabularies/observed-properties>
    * **Target:** `https.../main/docs/vocabularies/observed-properties.ttl`
* **PID:** <https://w3id.org/EDAAnOWL/vocabularies/datatype-scheme>
    * **Target:** `https.../main/docs/vocabularies/datatype-scheme.ttl`

## 📦 Content Negotiation

The `.htaccess` provides standard content negotiation based on the `Accept` header:

* **Browsers (`text/html`):** Redirected to the HTML documentation (GitHub Pages).
* **Tools (`text/turtle`, `application/rdf+xml`, etc.):** Redirected to the raw `.ttl` file for the requested URI (GitHub Raw).
* **Specific Terms (e.g., `/SomeClass`):** Redirected to the corresponding anchor in the HTML documentation.

## 🧭 Scope

**EDAAnOWL** is an ontology aligned with **IDSA** and connected to **BIGOWL** (Data, Algorithms, Problems, Workflows).
It models data assets, data apps, profiles, and workflows, using modular SKOS vocabularies for domains, data types, and observed properties.

## 👥 Maintainers

-   Martín J. Salvachúa ([@MartinM10](https://github.com/MartinM10)) - `<martinjs@uma.es>` - `<martin.salvachua1@gmail.com>`
