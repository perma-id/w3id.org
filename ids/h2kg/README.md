# H₂KG W3ID Redirect Configuration

Project: `H₂KG Domain Ontology for Hydrogen Electrochemical Systems`

This directory documents the established `https://w3id.org/h2kg/` namespace
and its current H₂KG release targets.

## Namespace policy

- Active strategy: `preserve_hash_namespace`
- Main ontology IRI: `https://w3id.org/h2kg/hydrogen-ontology`
- Main namespace URI: `https://w3id.org/h2kg/hydrogen-ontology#`
- Existing term IRIs are preserved

## Redirect targets

### Canonical H₂KG namespace

- Browser / HTML: `https://vimilabs.github.io/AIMWORKS/hydrogen-ontology.html`
- Turtle: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/h2kg-v2-taxonomy.ttl`
- JSON-LD: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/h2kg-v2-taxonomy.jsonld`

### Shared core module

- Route: `https://w3id.org/h2kg/hydrogen-ontology/core`
- Turtle: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/core_schema.ttl`
- JSON-LD: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/core_schema.jsonld`

### PEMFC profile namespace

- Browser / HTML: `https://vimilabs.github.io/AIMWORKS/pemfc/hydrogen-ontology.html`
- Turtle: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/pemfc_schema.ttl`
- JSON-LD: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/pemfc_schema.jsonld`

### PEMWE profile namespace

- Browser / HTML: `https://vimilabs.github.io/AIMWORKS/pemwe/hydrogen-ontology.html`
- Turtle: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/pemwe_schema.ttl`
- JSON-LD: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/pemwe_schema.jsonld`

### H₂KG 2.3.1 release

- Version IRI: `https://w3id.org/h2kg/hydrogen-ontology/releases/2.3.1`
- Browser / HTML: `https://github.com/ViMiLabs/AIMWORKS/releases/tag/v2.3.1`
- Turtle: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/v2.3.1/ontology_release/output/ontology/h2kg-v2-taxonomy.ttl`
- JSON-LD: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/v2.3.1/ontology_release/output/ontology/h2kg-v2-taxonomy.jsonld`
- Compatibility Turtle: `https://raw.githubusercontent.com/ViMiLabs/AIMWORKS/main/ontology_release/output/ontology/h2kg-v2-compatibility.ttl`
- Version routing: one semantic-version rule resolves `releases/X.Y.Z` to immutable Git tag `vX.Y.Z`.

## Contact and maintenance

- Repository: `https://github.com/ViMiLabs/AIMWORKS`
- Docs base: `https://vimilabs.github.io/AIMWORKS/`
- Maintainers:
  - [Marjan Kohandani](https://orcid.org/0009-0005-5173-202X) (`@Marjanknd`) - affiliations a, b, c
  - [Mohammad J. Eslamibidgoli](https://orcid.org/0000-0002-5057-2993) (`@meslamib3`) - affiliations a, b
  - [Kourosh Malek](https://www.fz-juelich.de/profile/malek_k) - affiliations a, b
  - [Michael Eikerling](https://orcid.org/0000-0002-0764-8948) - affiliations a, b, c
- Affiliations:
  - `a`: Theory and Computation of Energy Materials (IET-3), Institute of Energy Technologies, Forschungszentrum Jülich GmbH, 52425 Jülich, Germany
  - `b`: Centre for Advanced Simulation and Analytics (CASA), Simulation and Data Science Lab for Energy Materials (SDL-EM), Forschungszentrum Jülich GmbH, 52425 Jülich, Germany
  - `c`: Chair of Theory and Computation of Energy Materials, Faculty of Georesources and Materials Engineering, RWTH Aachen University, 52062 Aachen, Germany

## Notes

Hash IRIs such as `https://w3id.org/h2kg/hydrogen-ontology#FixedBedReactor`
resolve through the namespace document `https://w3id.org/h2kg/hydrogen-ontology`.
The target HTML page therefore needs exact term-fragment anchors, which the
current documentation build provides.
