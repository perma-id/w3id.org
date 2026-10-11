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

| Pattern | Entity type | Example |
|---------|-------------|---------|
| `/campop/` | CAMPOP homepage | |
| `/campop/place/{County}.{Place}` | Place | `/campop/place/AGY.Beaumaris` |
| `/campop/context` | JSON-LD context document | |

Places and the context both resolve to <https://docuracy.github.io/CAMPOP-Places/>.

### Place identifiers

A place identifier is **`{County}.{Place}`** — a three-letter
[Chapman code](https://en.wikipedia.org/wiki/Chapman_code) for the historic county and the
place's canonical name with spaces as hyphens, e.g. `AGY.Beaumaris`, `NFK.Kings-Lynn`. The name is
a curated Wikidata label where one matched strongly, and otherwise a spelling checked by hand, so
it is not always the modern form. The county code leads so that a column of identifiers
sorts into county order.

**The whole string is authoritative**, and the identifier is deliberately human-legible: it can
be read, checked and argued with in a footnote rather than only looked up.

## Content negotiation

- `Accept: application/ld+json` or `application/json` → 303 redirect to static
  JSON(-LD) files served from GitHub Pages.
- Default → 303 redirect to an HTML entity resolver page.

Data is published as [Linked Places
Format](https://github.com/LinkedPasts/linked-places). The context at `/campop/context`
imports the Linked Places context and adds the seven terms this dataset needs that it does not
define — `uri`, `feature_type`, `OS_gridref`, `distance`, `citation`, `previous_uris` and
`split_from`. Importing rather than copying keeps
Linked Places' own 71 definitions defined by Linked Places.
