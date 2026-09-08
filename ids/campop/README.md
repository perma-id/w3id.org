# /campop/ — Cambridge Group for the History of Population and Social Structure

Permanent identifiers for research datasets published by **CAMPOP**, the Cambridge
Group for the History of Population and Social Structure, Department of Geography,
University of Cambridge.

## Maintainer

- **Stephen Gadd** — <https://github.com/docuracy>

## Homepage

<https://www.campop.geog.cam.ac.uk/>

## Namespace layout

Identifiers are grouped by **entity type**, not by dataset: a place is the same place
whichever dataset attests it, so partitioning places per dataset would mint two
identifiers for one place as soon as a second dataset described it. Datasets are
recorded in the data as sources and contributors rather than in the URI path.

| Pattern | Entity type | Example | Status |
|---------|-------------|---------|--------|
| `/campop/` | CAMPOP homepage | | enabled |
| `/campop/place/{slug}-{QID}` | Place | `/campop/place/glo-chipping-sodbury-Q1076537` | forthcoming |
| `/campop/source/{id}` | Source — a published list or record series | `/campop/source/blome-1673` | forthcoming |
| `/campop/criterion/{id}` | Named, versioned selection criterion | `/campop/criterion/candidate-towns-2017` | forthcoming |
| `/campop/context` | JSON-LD context document | | forthcoming |

The rules marked *forthcoming* are **not yet enabled**: they will be added in a follow-up
pull request when the static API they resolve to is deployed, so that every rule in
`.htaccess` has a live target. That API will be served from GitHub Pages, initially at
<https://docuracy.github.io/markets/>.

### Place identifiers

Only the trailing Wikidata QID is authoritative; the leading slug is decorative, so that
identifiers are human-readable without becoming unstable when a spelling is corrected. Any
slug — including an outdated one — resolves to the same place, and the HTML view redirects
to the current canonical form. The slug begins with a three-letter
[Historic Counties Standard](https://historiccountiestrust.co.uk/standard) county code, so
that a column of identifiers sorts into county order.

## Content negotiation

Following the pattern already used by the `/mlca/` namespace:

- `Accept: application/ld+json` or `application/json` → 303 redirect to static
  JSON(-LD) files served from GitHub Pages.
- Default → 303 redirect to an HTML entity resolver page.

Data will be published as an application profile of
[PLATO, the Place Attestation Ontology](https://doi.org/10.5281/zenodo.21688313),
with Linked Places Format and CSV offered as interchange formats.
