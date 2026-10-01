# /midas-catalog/
This [W3ID](https://w3id.org) provides a persistent URI namespace for the
MIDAS Coordination Center catalog. It issues persistent identifiers for catalog
records and resolves the identifiers those records carry to their current
locations.

## What resolves here
- **`/midas-catalog/{id}`** — a catalog record's persistent identifier →
  its landing page at `catalog.midasnetwork.us/collection/{id}`.
- **`/midas-catalog/schema/…`** — the schema.org JSON-LD schema (catalog-hosted).
- **`/midas-catalog/linkml/…`** — the LinkML model: reference docs, JSON Schema,
  JSON-LD context, OWL, and source YAML, published to GitHub Pages
  ([midas-catalog-linkml](https://github.com/midas-network/midas-catalog-linkml)).

The catalog is described in two independent renderings of the same records —
a schema.org JSON-LD product and a LinkML-native product — and this namespace
resolves the identifiers common to both.

## Contact / maintainers
This space is administered by:

**Jeff Stazer** — GitHub [@jeffstazer](https://github.com/jeffstazer)
<jbs82@pitt.edu>

**MIDAS Coordination Center**
[MIDAS Network](https://midasnetwork.us/) · <questions@midasnetwork.us>
GitHub org: [midas-network](https://github.com/midas-network)
