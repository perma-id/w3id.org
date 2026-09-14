# H2KG w3id Redirect Configuration

Project: `H2KG Application Ontology for Hydrogen Electrochemical Systems`

This directory is intended for a future pull request to `perma-id/w3id.org` to
register the `https://w3id.org/h2kg/` namespace.

## Namespace policy

- Active strategy: `preserve_hash_namespace`
- Main ontology IRI: `https://w3id.org/h2kg/hydrogen-ontology`
- Main namespace URI: `https://w3id.org/h2kg/hydrogen-ontology#`
- Existing term IRIs are preserved

## Redirect targets

### Shared H2KG namespace

- Browser / HTML: `https://vimilabs.github.io/AIMWORKS/hydrogen-ontology.html`
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

## Contact and maintenance

- Repository: `https://github.com/ViMiLabs/AIMWORKS`
- Docs base: `https://vimilabs.github.io/AIMWORKS/`
- Maintainers:
  - Marjan Kohandani (`@Marjanknd`) - Theory and Computation of Energy Materials (IET-3), Institute of Energy Technologies, Forschungszentrum Juelich GmbH, 52425 Juelich, Germany
  - Mohammad J. Eslamibidgoli (`@meslamib3`) - Centre for Advanced Simulation and Analytics (CASA), Simulation and Data Science Lab for Energy Materials (SDL-EM), Forschungszentrum Juelich GmbH, 52425 Juelich, Germany

## Notes

Hash IRIs such as `https://w3id.org/h2kg/hydrogen-ontology#FixedBedReactor`
resolve through the namespace document `https://w3id.org/h2kg/hydrogen-ontology`.
The target HTML page therefore needs exact term-fragment anchors, which the
current documentation build provides.
