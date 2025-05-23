# Iprok Ontology PURL Redirection (w3id.org/iprok/)

This directory configures the persistent URL (PURL) `https://w3id.org/iprok/` for the Iprok Ontology. It uses an `.htaccess` file to redirect requests to the appropriate ontology serializations or HTML documentation hosted on GitHub.

## Persistent URL (PURL)

The primary persistent URL for the Iprok Ontology is:

**`https://w3id.org/iprok/`**

## Redirection Behavior

Accessing the PURL `https://w3id.org/iprok/` (or versioned PURLs like `https://w3id.org/iprok/1.0/`) will result in the following redirections based on HTTP content negotiation:

1.  **HTML Documentation (Default for Browsers):**
    * Requests with an `Accept` header of `text/html` (typical for web browsers) or when no specific content type is strongly preferred.
    * Redirects to the main HTML documentation hosted on GitHub Pages.

2.  **Turtle (TTL):**
    * Requests with an `Accept` header of `text/turtle`.
    * Redirects to the `ontology.ttl` file hosted on GitHub (raw content).

3.  **RDF/XML (OWL):**
    * Requests with an `Accept` header of `application/rdf+xml`.
    * Redirects to the `ontology.owl` file hosted on GitHub (raw content).

4.  **JSON-LD:**
    * Requests with an `Accept` header of `application/ld+json`.
    * Redirects to the `ontology.jsonld` file hosted on GitHub (raw content).

5.  **N-Triples (NT):**
    * Requests with an `Accept` header of `application/n-triples`.
    * Redirects to the `ontology.nt` file hosted on GitHub (raw content).

## Ontology Files & Documentation Hosted At:

The source files for the Iprok ontology and its documentation are hosted on GitHub:

* **HTML Documentation:** [https://konevenkatesh.github.io/IprokDoc/main.html](https://konevenkatesh.github.io/IprokDoc/main.html)
* **Turtle (TTL):** [https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.ttl](https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.ttl)
* **RDF/XML (OWL):** [https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.owl](https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.owl)
* **JSON-LD:** [https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.jsonld](https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.jsonld)
* **N-Triples (NT):** [https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.nt](https://raw.githubusercontent.com/konevenkatesh/IprokDoc/main/ontology.nt)

## Configuration

The redirection logic is managed by the `.htaccess` file located in this directory (`iprok/.htaccess` within the `perma-id/w3id.org` GitHub repository).

## Maintainer / Contact

* Kone Venkatesh
* GitHub: [konevenkatesh](https://github.com/konevenkatesh)
* Email: konevenkatesh92@gmail.com
