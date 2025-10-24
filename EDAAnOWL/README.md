# EDAAN — EDAAnOWL
**Persistent identifier (PID) home** for the EDAAnOWL ontology and related resources.

This directory hosts the redirection rules (via `.htaccess`) that resolve the PID
<https://w3id.org/EDAAnOWL> to:

- Human-readable documentation (HTML) on GitHub Pages.
- Machine-readable serializations (OWL/RDF, Turtle, N-Triples, JSON-LD) hosted in GitHub.

## 🔗 Target resources

- **Docs (HTML):**  
  `https://khaosresearch.github.io/EDAAnOWL/ontology/index-en.html`

- **Raw files (main):**
  - OWL/RDF (RDF/XML):  
    `https://raw.githubusercontent.com/KhaosResearch/EDAAnOWL/refs/heads/main/docs/ontology/ontology.owl`
  - Turtle:  
    `https://raw.githubusercontent.com/KhaosResearch/EDAAnOWL/refs/heads/main/docs/ontology/ontology.ttl`
  - N-Triples:  
    `https://raw.githubusercontent.com/KhaosResearch/EDAAnOWL/refs/heads/main/docs/ontology/ontology.nt`
  - JSON-LD:  
    `https://raw.githubusercontent.com/KhaosResearch/EDAAnOWL/refs/heads/main/docs/ontology/ontology.json`


## 📦 Content negotiation

The `.htaccess` provides standard content negotiation:

- Browsers / HTML Accept → **HTML docs**.
- `Accept: application/ld+json` → **JSON-LD**.
- `Accept: text/turtle` → **Turtle**.
- `Accept: application/n-triples` → **N-Triples**.
- `Accept: application/rdf+xml` → **RDF/XML (OWL)**.
- Fallback: base URI → HTML; other URIs → RDF/XML.

## 🧭 Scope

**EDAAN** is an ontology aligned with **IDSA** and connected to **BIGOWL** (Data, Algorithms, Problems, Workflows).  
It models data assets, data apps, profiles, and workflows.

Typical entry points:

- Base: <https://w3id.org/EDAAnOWL> (content-negotiated)
- Terms: <https://w3id.org/EDAAnOWL/SomeClassOrProperty> (HTML anchors in docs or RDF via negotiation)

## 👥 Maintainers

- Martín J. Salvachúa — <martinjs@uma.es> · <https://github.com/MartinM10>
