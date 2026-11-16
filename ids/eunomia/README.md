Maintainer: [caparicio-esd](https://github.com/caparicio-esd)

# Eunomia

This directory configures the `https://w3id.org/eunomia` permanent identifier.

It redirects to the JSON-LD contexts, vocabularies, and ontologies modeling data governance, self-sovereign identity (SSI), and data spaces requirements developed by the Next Generation Internet Group (GING) at Universidad Politécnica de Madrid (UPM) for the Eunomia project.

## Redirects

| Identifier | Target |
| --- | --- |
| `https://w3id.org/eunomia/vds/v1` | VDS JSON-LD context, `https://eunomiaupm.github.io/vds-rdf/vds-v1.jsonld` |
| `https://w3id.org/eunomia/vad/v1` | VAD JSON-LD context, `https://eunomiaupm.github.io/vds-rdf/vad-v1.jsonld` |
| `https://w3id.org/eunomia/vds/ns`, `vds/ns/<Term>` | VDS vocabulary: `vocab.ttl` for `Accept: text/turtle`, otherwise `vocab.html` (`vocab.html#<Term>` for a term), both under `https://eunomiaupm.github.io/vds-rdf/` |
| `https://w3id.org/eunomia/*` (anything else) | `https://servicios-ging.dit.upm.es/json-ld/*` |
