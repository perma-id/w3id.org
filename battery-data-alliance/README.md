# battery-data-alliance

Persistent Uniform Resource Locators (PURLs) for ontologies and semantic resources developed by the [Battery Data Alliance](https://lfenergy.org/projects/battery-data-alliance/), a Linux Foundation Energy project.

This `.htaccess` file defines flexible and extensible redirects under:

```
https://w3id.org/battery-data-alliance/ontology/{resource}
```

Resources such as test method ontologies, equipment vocabularies, and data model schemas may be added under the broader `battery-data-alliance` namespace in the future.

---

## Purpose

This PURL namespace provides stable, long-term IRIs for:

- Asserted ontology files
- Inferred variants
- JSON-LD context documents
- CSVW table schemas and vendor-specific column mappings
- Human-readable documentation
- Versioned variants and GitHub source references

It ensures compliance with FAIR and linked data principles, enabling machine-readable and human-readable resolution of resources. Content negotiation is supported: browsers receive HTML documentation, JSON-LD agents receive the context document, and all other agents receive Turtle by default.

---

## Redirect Logic

The `.htaccess` file uses redirect rules to support both **non-versioned** and **versioned** ontology access. Rules are numbered for clarity and traceability.

### Non-Versioned Redirects

| Rule | IRI Pattern | Accept header | Destination |
|------|-------------|---------------|-------------|
| R1 | `/ontology/{name}-inferred` | any | Inferred TTL (alternate path) |
| R2 | `/ontology/{name}` | `text/html` | HTML documentation |
| R3 | `/ontology/{name}` | `application/ld+json` | JSON-LD context |
| R4 | `/ontology/{name}` | any | TTL fallback |
| R5 | `/ontology/{name}/inferred` | any | Inferred TTL |
| R6 | `/ontology/{name}/latest` | any | Raw TTL from main branch |
| R7 | `/ontology/{name}/source` | any | Source file on GitHub |
| R8 | `/ontology/{name}/context` | any | JSON-LD context |
| R9 | `/ontology/{name}/schema/vendors/{vendor}` | any | Vendor CSVW column mapping |
| R10 | `/ontology/{name}/schema` | any | Canonical CSVW schema |

> **Note:** R1 must precede R2–R4 to prevent the catch-all from swallowing the `-inferred` alternate form.

### Versioned Redirects (`MAJOR.MINOR.PATCH`)

| Rule | IRI Pattern | Accept header | Destination |
|------|-------------|---------------|-------------|
| R11 | `/ontology/{name}/{version}/{name}-inferred` | any | Inferred TTL (alternate path) |
| R12 | `/ontology/{name}/{version}` | `text/html` | HTML documentation |
| R13 | `/ontology/{name}/{version}` | `application/ld+json` | JSON-LD context |
| R14 | `/ontology/{name}/{version}` | any | TTL fallback |
| R15 | `/ontology/{name}/{version}/{name}` | `text/html` | HTML documentation |
| R16 | `/ontology/{name}/{version}/{name}` | `application/ld+json` | JSON-LD context |
| R17 | `/ontology/{name}/{version}/{name}` | any | TTL fallback |
| R18 | `/ontology/{name}/{version}/inferred` | any | Inferred TTL |
| R19 | `/ontology/{name}/{version}/latest` | any | Raw TTL from tagged release |
| R20 | `/ontology/{name}/{version}/source` | any | Source file at tagged version |
| R21 | `/ontology/{name}/{version}/context` | any | JSON-LD context |
| R22 | `/ontology/{name}/{version}/schema/vendors/{vendor}` | any | Vendor CSVW column mapping |
| R23 | `/ontology/{name}/{version}/schema` | any | Canonical CSVW schema |

> **Note:** R11 must precede R12–R14 for the same reason as R1 above. R15–R17 handle the `owl:versionIRI` path form `/{version}/{name}`.

---

## Repository Structure (GitHub)

Each ontology is published in its own GitHub repository. This redirect scheme assumes the following structure:

```
{resource}-ontology/
├── {resource}.ttl
├── {resource}.html
├── {resource}-inferred.ttl
├── context/
│   └── context.json
├── schema/
│   ├── schema.json
│   └── vendors/
│       ├── arbin-csv.json
│       ├── biologic-mpt.json
│       └── ...
└── versions/
    └── 1.0.0/
        ├── {resource}.ttl
        ├── {resource}.html
        ├── {resource}-inferred.ttl
        ├── context/
        │   └── context.json
        └── schema/
            ├── schema.json
            └── vendors/
                └── ...
```

Replace `{resource}` with your ontology name in kebab-case (e.g., `battery-data-format`).

---

## GitHub Repositories

All redirects currently point to resources under the [battery-data-alliance](https://github.com/battery-data-alliance) GitHub organization.

Example:

- Ontology repo: https://github.com/battery-data-alliance/battery-data-format-ontology
- GitHub Pages: https://battery-data-alliance.github.io/battery-data-format-ontology/

---

## Contacts

This PURL space is maintained by the [Battery Data Alliance](https://lfenergy.org/projects/battery-data-alliance/).

Current maintainers:

- [Gabe Hege](https://github.com/pghege) – NVIDIA, AmpLabs  
- [Simon Clark](https://github.com/jsimonclark) – SINTEF

To request changes, open an issue or pull request on the relevant ontology repository under https://github.com/battery-data-alliance/.
