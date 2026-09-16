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
| `/campop/place/{HCS}.{Place}` | Place | `/campop/place/AGL.Beaumaris` |
| `/campop/context` | JSON-LD context document | |

Places and the context both resolve to <https://docuracy.github.io/CAMPOP-Places/>.

### Place identifiers

A place identifier is **`{HCS}.{Place}`** — a three-letter
[Historic Counties Standard](https://historiccountiestrust.co.uk/standard) county code and the
modern place name, e.g. `AGL.Beaumaris`. The county code leads so that a column of identifiers
sorts into county order.

**The whole string is authoritative**, and the identifier is deliberately human-legible: it can
be read, checked and argued with in a footnote rather than only looked up.

## Content negotiation

- `Accept: application/ld+json` or `application/json` → 303 redirect to static
  JSON(-LD) files served from GitHub Pages.
- Default → 303 redirect to an HTML entity resolver page.

Data is published as [Linked Places
Format](https://github.com/LinkedPasts/linked-places). The context at `/campop/context`
imports the Linked Places context and adds the terms this dataset needs that it does not
define — `feature_type`, `feature_detail`, `OS_gridref`, `uri`, and the `distance` on a
match. Importing rather than copying keeps those 71 LP terms defined by LP.
