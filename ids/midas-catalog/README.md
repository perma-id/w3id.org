# /midas-catalog/
This [W3ID](https://w3id.org) provides a persistent URI namespace for the
MIDAS Coordination Center catalog. It issues persistent identifiers for catalog
records, for the catalog's data model and its terms, and resolves them to their
current locations.

## What resolves here
- **`/midas-catalog/{id}`** — a catalog record's persistent identifier →
  its landing page at `catalog.midasnetwork.us/collection/{id}`.
- **`/midas-catalog/model`** — the identifier of the MIDAS Catalog model →
  its reference documentation (or, by content negotiation, the model's YAML or OWL).
- **`/midas-catalog/model/{term}`** — a class or slot defined by the model →
  its page in the reference documentation.
- **`/midas-catalog/schema/…`** — the schema.org JSON-LD output schema (catalog-hosted).
- **`/midas-catalog/linkml/…`** — the model's published files: reference docs, JSON Schema,
  JSON-LD context, OWL, and source YAML, on GitHub Pages
  ([midas-catalog-linkml](https://github.com/midas-network/midas-catalog-linkml)).

The catalog publishes its records in two forms, schema.org JSON-LD and LinkML, and
this namespace resolves the identifiers both use.

## Contact / maintainers
This space is administered by:

**Jeff Stazer** — GitHub [@jeffstazer](https://github.com/jeffstazer)
<jbs82@pitt.edu>

**MIDAS Coordination Center**
[MIDAS Network](https://midasnetwork.us/) · <questions@midasnetwork.us>
GitHub org: [midas-network](https://github.com/midas-network)