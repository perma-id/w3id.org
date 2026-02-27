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
- CSVW table schemas
- Human-readable documentation
- Versioned variants and GitHub source references

It ensures compliance with FAIR and linked data principles, enabling machine-readable and human-readable resolution of resources.

---

## Redirect Logic

The `.htaccess` file uses redirect rules to support both **non-versioned** and **versioned** ontology access. Rules are numbered for clarity and traceability.

### Non-Versioned Redirects

| Rule | IRI Pattern                          | Description                                |
|------|--------------------------------------|--------------------------------------------|
| R1   | `/ontology/{name}`                  | HTML view if browser Accepts HTML          |
| R2   | `/ontology/{name}`                  | TTL fallback                               |
| R3   | `/ontology/{name}/inferred`         | Inferred TTL                               |
| R4   | `/ontology/{name}-inferred`         | Alternate path to inferred TTL             |
| R5   | `/ontology/{name}/latest`           | Raw TTL from main branch                   |
| R6   | `/ontology/{name}/source`           | Source file on GitHub                      |
| R7   | `/ontology/{name}/context`          | JSON-LD context                            |
| R8   | `/ontology/{name}/schema`           | CSVW schema                                |

### Versioned Redirects (`MAJOR.MINOR.PATCH`)

| Rule | IRI Pattern                                           | Description                                |
|------|--------------------------------------------------------|--------------------------------------------|
| R9   | `/ontology/{name}/{version}`                         | HTML view if browser Accepts HTML          |
| R10  | `/ontology/{name}/{version}`                         | TTL fallback                               |
| R11  | `/ontology/{name}/{version}/{name}`                  | Alternate path for HTML                    |
| R12  | `/ontology/{name}/{version}/{name}`                  | Alternate path for TTL                     |
| R13  | `/ontology/{name}/{version}/inferred`                | Inferred TTL                               |
| R14  | `/ontology/{name}/{version}/{name}-inferred`         | Alternate path to inferred TTL             |
| R15  | `/ontology/{name}/{version}/latest`                  | Raw TTL from tagged release branch         |
| R16  | `/ontology/{name}/{version}/source`                  | Source file on GitHub at tagged version    |
| R17  | `/ontology/{name}/{version}/context`                 | JSON-LD context for specific version       |
| R18  | `/ontology/{name}/{version}/schema`                  | CSVW schema for specific version           |

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
│   └── schema.json
└── versions/
    └── 0.1.0/
        ├── {resource}.ttl
        ├── {resource}.html
        ├── {resource}-inferred.ttl
        ├── context/
        │   └── context.json
        └── schema/
            └── schema.json
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
