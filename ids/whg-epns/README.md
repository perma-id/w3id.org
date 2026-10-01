# /whg-epns/

Persistent identifiers for the **DEEP** (*Digital Exposure of English Place-names*) digitisation of the
English Place-Name Society survey: 539,372 place records and 429,536 dated citations of their historical
spellings (1,414,328 attestations in PLATO's sense, counting every sourced claim), from the EPNS county
volumes as digitised in 2011–13 by DEEP and released in 2017 by Jisc, the UK higher-education technology
body. Nottingham's Institute for Name-Studies continues to develop its own Digital Survey of the same
material; this namespace serves the 2017 release as open data.

The corpus was published with its own URIs, `http://placenames.org.uk/id/placename/{county}/{serial}`,
one for every record and every name form, numbered in a single county-wide sequence. That domain has
since changed hands and now serves an unrelated commercial site, and the project's record pages at
`epns.nottingham.ac.uk` answer HTTP 200 with the university home page for every path, which a
link-checker reports as fine. This namespace gives those identifiers a working home. **The path is
DEEP's own pair, unchanged**: a citation made against a 2013 URI maps to its w3id by prefix substitution
alone.

## Behaviour

| Path | Behaviour |
|---|---|
| `/` | 303 to the explorer, `https://worldhistoricalgazetteer.github.io/epns/`. |
| `/downloads` | 303 to the downloads page. |
| `/release/{name}` | 303 to that data release's page (`/release/data-2026-09-28`). Each release is a frozen snapshot of the gazetteer, never regenerated in place, and its data names this IRI as its gazetteer, with `isVersionOf` the namespace root and `previousVersion` the release before. |
| `/release/{name}/{file}` | 303 to one file of that release, fixed for good: `/release/data-2026-09-28/deep-plato.nt.gz`. |
| `/data/plato`, `/data/plato-counties`, `/data/rdf`, `/data/parquet`, `/data/duckdb`, `/data/lpf`, `/data/lpf-counties`, `/data/manifest` | 303 to the corresponding whole-corpus file of the **latest** data release (`/releases/latest/download/…`), so a regeneration needs no change here. The manifest names the PLATO release each file was validated against and the sha256 of every file. |
| `/{county}/{serial}` | Content-negotiated, 303: `text/html` → the record on the map; `application/ld+json` or `application/json` → the record as a PLATO place-centric document (lossless); `application/geo+json` → the record as a Linked Places Format FeatureCollection (lossy; the site states what is lost); `application/xml` or `text/xml` → the original MADS element from the DEEP file; `*/*` or no `Accept` → PLATO, for the reasons given in the `.htaccess`. |
| `/{county}/{serial}.html`, `.json`, `.geojson`, `.xml` | The same four targets by explicit suffix, which wins over any `Accept` header. |
| `/source/…`, `/volume/{county}`, `/agent/deep` | 303 to the source's (or the agent's) JSON-LD file, whatever the `Accept` header; a `.json` suffix reaches the same file. The scheme is below. |
| `*` | 404. Nothing falls through to the site root. |

`{county}` is two digits and `{serial}` six, exactly as DEEP numbered them. `https://w3id.org/whg-epns/02/000002`
is Bunsty Hundred, Buckinghamshire, whose 2013 URI was `http://placenames.org.uk/id/placename/02/000002`;
`02/000003` is *Bonestou*, its Domesday spelling, and resolves to the same record.

## What exists behind the machine formats

The targets are static files on GitHub Pages, which cannot negotiate content, so every branch above
lands on a file that has to exist. Per-record PLATO, LPF and MADS files are published for the
**15,587 records at parish level and above** (counties, hundreds and their kin, parishes, boroughs,
county towns, townships, chapelries), which are the records anyone cites by identifier. For the
remaining minor names and field-names, and for name-form serials, the HTML view is always available
and generates the same three formats in the browser, while a machine request answers **404**,
honestly, with a page that carries a person to the record. Three machine formats for every record
would be 1.6 million static files; the cut is stated here and in the site's README rather than hidden
behind a redirect to a neighbouring record.

## Sources

Every citation in the corpus names the document a spelling was read in, and each of those documents
has its own IRI, so a graph can say which places one source names. There are two kinds, and the
difference matters:

| IRI | What it names |
|---|---|
| `/source/{abbrev}` | A **national** source: one archive series or one printed work, the same whichever volume cites it. `/source/DB` is Domesday Book, `/source/Pat` the Calendar of Patent Rolls. A curated list of 78. |
| `/source/{county}/{id}` | A source **as one county volume cites it**, keyed by DEEP's own per-county source id (`/source/52/do41`). This covers every abbreviation that names a kind of record rather than one document: *Ct* is the court rolls of whichever manor an entry concerns, *TA* a tithe award per parish, so *Ct* in Cheshire and *Ct* in Dorset are different documents. Where DEEP gave a citation no id, the abbreviation stands in: `/source/{county}/x-{abbrev}`. |
| `{source}/witness/{ms}-{date}` | The **copy** a form is read in, derived from the work, such as manuscript B of the Anglo-Saxon Chronicle in a copy of c. 1000 (`/source/ASC/witness/B-c-1000`). |
| `/volume/{county}` | The EPNS county volume itself. |
| `/agent/deep` | The DEEP project as an **agent**: who made the 2013 matches to GeoNames. The dataset, `/source/deep`, is the evidence; the agent is who asserted the match. |
| `/source/gazetteer/{name}`, `/source/deep` | The gazetteers DEEP matched coordinates against, and the DEEP project. |

How often a source is cited cannot tell the two kinds apart: tithe awards are cited in 59 counties
and court rolls in 43, as widely as many national series. So the national list is curated and errs
towards more nodes rather than false merges: an abbreviation that is not on it is treated as the
county volume's own. Path segments keep ASCII letters and digits and turn every other run into one
hyphen, except that a `?` in a copy date is kept as `q`, because `?14` and `14` make different claims.

## Licence of what resolves

The data: *"Digitisation of English Placenames MADS data is licensed to Jisc by the English Place
Names Society and released under a Creative Commons Attribution-NonCommercial 4.0 International
License."* Every representation reached through this namespace is an adaptation of it and carries the
same terms.

## Contact

**[Stephen Gadd](https://www.wikidata.org/wiki/Q7609282)**<br/>
World Historical Gazetteer<br/>
<stephen.gadd@pitt.edu><br/>
GitHub: [docuracy](https://github.com/docuracy)<br/>
ORCID: [0000-0003-3060-0181](https://orcid.org/0000-0003-3060-0181)<br/>
