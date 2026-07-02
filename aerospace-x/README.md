# Project

## Description
This repository manages permanent identifiers (Perma-IDs) for the Aerospace-X project, providing stable, resolvable URIs for semantic models and ontologies in the aerospace domain. The service operates as a Semantic Hub, enabling seamless data exchange and interoperability within the Aerospace-X ecosystem and beyond.

Key Features
Persistent URIs: Stable, long-term identifiers for semantic resources that never break
Content Negotiation: Automatic format selection based on HTTP Accept headers
Multi-Format Support: JSON-LD, Turtle/RDF, JSON Schema, and AASX packages
Standards Compliance: Built on W3C Linked Data principles and SAMM (Semantic Aspect Meta Model)
Gaia-X Integration: Aligned with the Gaia-X Ontology for European data infrastructure

This project utilizes and references concepts and data from the [Gaia-X Ontology](https://docs.gaia-x.eu/ontology/development/). The Gaia-X Ontology provides a framework for interoperability and standardization of data in the context of Gaia-X.



Morover this Perma-ID works as Semantic Hub redirecting Data Products for the project [Aerospace-X](https://www.aerospace-x.net/). It enables  data exchange in the Ecosystem.

## URL Structure

URL Structure
Aerospace-X Models
https://w3id.org/aerospace-x/data-product-model/{model-name}/{version}

Examples:
```bash
https://w3id.org/aerospace-x/data-product-model/identification/1.0.0
https://w3id.org/aerospace-x/data-product-model/materials/1.0.0
https://w3id.org/aerospace-x/data-product-model/sustainability/1.0.0
```

## Content Negotiation

| Accept Header | Format | File Extension |
|---------------|--------|----------------|
| `application/ld+json` | JSON-LD Context | `.json` |
| `text/turtle` | Turtle/RDF | `.ttl` |
| `application/schema+json` | JSON Schema | `.schema.json` |
| `application/asset-administration-shell-package` | AASX Package | `.aasx` |
| Default (no header) | HTML| `.html` |

## Usage
```
# Fetch JSON-LD context
curl -H "Accept: application/ld+json" \
  https://w3id.org/aerospace-x/data-product-model/identification/1.0.0

# Fetch Turtle/RDF
curl -H "Accept: text/turtle" \
  https://w3id.org/aerospace-x/data-product-model/materials/1.0.0

# Fetch JSON Schema
curl -H "Accept: application/schema+json" \
  https://w3id.org/aerospace-x/data-product-model/sustainability/1.0.0

# Download AASX Package
curl -H "Accept: application/asset-administration-shell-package" \
  -o identification.aasx \
  https://w3id.org/aerospace-x/data-product-model/identification/1.0.0
```

This Perma-ID service is part of the Aerospace-X initiative to create a sovereign, interoperable data infrastructure for the European aerospace industry.
## Contact 

[hennberg](https://github.com/hennberg)
