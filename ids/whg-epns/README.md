# /whg-epns/

Persistent identifiers for the **DEEP** digitisation of the English Place-Name Society survey: 539,372
place records and 1,414,328 dated attestations of their spellings, from the EPNS county volumes as
digitised by the Jisc-funded *Digital Exposure of English Place-names* project (2011–13) and released
by Jisc in 2017.

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
| `/data/plato`, `/data/plato-counties`, `/data/parquet`, `/data/duckdb`, `/data/lpf`, `/data/lpf-counties`, `/data/manifest` | 303 to the corresponding whole-corpus file of the **latest** data release (`/releases/latest/download/…`), so a regeneration needs no change here. The manifest names the PLATO release each file was validated against and the sha256 of every file. |
| `/{county}/{serial}` | Content-negotiated, 303: `text/html` → the record on the map; `application/ld+json` or `application/json` → the record as a PLATO place-centric document (lossless); `application/geo+json` → the record as a Linked Places Format FeatureCollection (lossy; the site states what is lost); `application/xml` or `text/xml` → the original MADS element from the DEEP file; `*/*` or no `Accept` → PLATO, for the reasons given in the `.htaccess`. |
| `/{county}/{serial}.html`, `.json`, `.geojson`, `.xml` | The same four targets by explicit suffix, which wins over any `Accept` header. |
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
