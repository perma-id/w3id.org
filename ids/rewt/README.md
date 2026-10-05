# /rewt/ — REWT: Rivers of England and Wales, Temporally

Permanent identifiers for **REWT**, a routable reconstruction of the river network of
England and Wales, built so that the water in it can reach the sea, and worked backwards
from the present-day channel to a series of dated cross-sections between Domesday and 1900.

## Maintainer

- **Stephen Gadd** — <https://github.com/docuracy>

## Homepage

<https://docuracy.github.io/REWT/>

## Namespace layout

Identifiers are grouped by **entity type**, not by edition. The dataset is published in
successive editions which add evidence and dates to the same watercourses, and a stretch
of river present in two editions must carry the same identifier in both; partitioning the
URI space by edition would mint a second identifier for a reach the moment a later edition
described it again. Editions are recorded in the data, not in the URI path.

| Pattern | Entity type | Example | Status |
|---------|-------------|---------|--------|
| `/rewt/` | Project documentation | | enabled |
| `/rewt/docs/{path}` | A documentation page | `/rewt/docs/evidence` | enabled |
| `/rewt/link/{id}` | Watercourse link — one stretch of channel | `/rewt/link/4385554389` | forthcoming |
| `/rewt/node/{id}` | Hydro node — a junction, source or tidal terminus | `/rewt/node/daf1236ba7` | forthcoming |
| `/rewt/basin/{id}` | Delineated basin | `/rewt/basin/4385554389` | forthcoming |
| `/rewt/course/{id}` | A reconstructed historical course | | forthcoming |
| `/rewt/correction/{id}` | A curated judgement, with its reason and evidence | | forthcoming |
| `/rewt/context` | JSON-LD context document | | forthcoming |

The rules marked *forthcoming* are **not yet enabled**: they will be added in a follow-up
pull request when the static API and map viewer they resolve to are deployed, so that
every rule in `.htaccess` has a live target.

### Identifiers

Identifiers in the published data are already CURIE-shaped — `rewt:basin:4385554389` —
and expand to this namespace by replacing the colons after the prefix with slashes.
Identifiers carrying an `os:` prefix are the Ordnance Survey's own and are not minted
here; REWT mints its own wherever an identifier has to remain stable across editions,
because the Ordnance Survey's technical specification states that the GUID it assigns to
a watercourse link "is not persistent".

## Content negotiation

Following the pattern already used by the `/mlca/` and `/campop/` namespaces:

- `Accept: application/ld+json` or `application/json` → 303 redirect to static
  JSON(-LD) files served from GitHub Pages.
- Default → 303 redirect to the map viewer, which resolves the entity in a hash route.

Dates on evidence are recorded in the Linked Places Format `when` object — timespans with
an optional `start` and `end`, each either `in` a year or bounded by `earliest` and
`latest`, with a `certainty` — chosen so that a source which knows only one bound is not
forced to invent the other. The model is inter-convertible with
[PLATO, the Place Attestation Ontology](https://doi.org/10.5281/zenodo.21688313).

## Licence

The dataset is built only from openly licensed sources and is intended for public release;
required attributions travel with it. Documentation and data are published from
<https://github.com/docuracy/REWT>.
