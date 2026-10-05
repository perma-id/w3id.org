# /usgs/
Multiple rewrite cases for assets of the U.S. Geological Survey

## Geographic Names Information System (GNIS) Linked Open Data
GNIS-LD was created by the UCSB STKO Lab in collaboration with the USGS Center for Excellence in Geospatial Information Science (CEGIS).

### Uses
Handles dereferencing logic, redirection, and SPARQL query proxying for the GNIS-LD implementation.

### Links
With "$1" being a unique identifier from the GNIS-LD implementation of the GNIS ontology...

Links in the form `https://w3id.org/usgs/$1`
* Redirect to `http://gnis-ld.org/lod/$1`

### Contacts
* [About the GNIS-LD project](https://gnis-ld.org/about)

## GeoArchive collection of NI 43-101 Technical Reports (/4530692/)
This W3ID namespace provides persistence to scientific reference assets that we know will need to move to different technologies over time. It is one of a number of collections USGS is setting up as part of a "GeoArchive." We are currently leveraging the Zotero reference manager for metadata/file storage using the web interface as human links for reference strings in reports and articles and the API for machine access in supported formats.

### Uses
This namespace starts with the unique identifier for the Zotero Group Library containing bibliographic metadata and documents for  National Instrument (NI) 43-101 Technical Reports used as scientific references and in need of a persistent citation source.

### Links
With `$1` being a unique Zotero library identifier and `$2` being a unique item identifier within that library...

Links in the form `https://w3id.org/usgs/z/$1/$2`
* No `Accept` header or `text/html` -> `https://www.zotero.org/groups/$1/usgs_ni_43-101_reports/items/$2`
* Using `Accept` header `application/json` -> `https://api.zotero.org/groups/$1/items/$2?format=json`
* Using `Accept` header `application/atom+xml` -> `https://api.zotero.org/groups/$1/items/$2?format=atom`

### Contacts
* Sky Bristol
  * sbristol@usgs.gov
  * Github: [https://github.com/skybristol](skybristol)
  * ORCID: [https://orcid.org/0000-0003-1682-4031](0000-0003-1682-4031)

## ScienceBase
ScienceBase uses a UUID form of identifier that is reasonably permanent as long as ScienceBase continues to exist and operate with its domain and path. Given the possibility of future architecture changes in ScienceBase, the w3id.org rewrite rule can allow for some degree of flexibility in continuing to use the UUID identifiers for an item but redirecting to another infrastructure domain and path in future.

### Uses
This namespace simply includes the UUID identifier under the `/usgs/sb/` path and redirects to the item in ScienceBase under `/catalog/item/`. It was set up for cases where ScienceBase is being used as a long-term archive for items that do not have a DOI and the URLs will be used in and referenced from other third party systems.

### Links
With `$1` being the ScienceBase UUID for a Catalog item...

Links in the form `https://w3id.org/usgs/sb/$1`
* No `Accept` header or `text/html` -> `https://www.sciencebase.gov/catalog/item/$1`
* Using `Accept` header `application/json` -> `https://www.sciencebase.gov/catalog/item/$1?format=json`

### Contacts
* Sky Bristol
  * sbristol@usgs.gov
  * Github: [https://github.com/skybristol](skybristol)
  * ORCID: [https://orcid.org/0000-0003-1682-4031](0000-0003-1682-4031)

## Geoscience Knowledgebase (GeoKB)
USGS is building a working knowledge graph where we are currently partnering on the wikibase.cloud project to instantiate the "Geoscience Knowledgebase" in a Wikibase instance. Over time, we expect original entities in this instantiation to be linked to from many other locations using their QID and PID identifiers. We leverage the w3id.org rewrite space at a `/usgs/geokb/` path resolving to the `/entity/` path in the Wikibase instance. This is a general resolver for Wikibase instances that takes "Q" identifiers for items and "P" identifiers for properties and resolves them as appropriate. This includes calling the entities via "file extension" paths for JSON, TTL, and other encodings (see below for options).

### Uses
This namespace includes the Wikibase identifier under the `/usgs/geokb/` path and redirects to the item in the GeoKB Wikibase instance under `/entity/`. It is set up to support more persistent linking to entities which may be housed under alternate infrastructure at some point.

We are also making extensive use of the wiki page functionality for "item talk" pages associated with entities in the Wikibase instance to provide specific documentation and additional details about an item that are not otherwise available as linked data in statements/claims. To help sustain this entity-specific functionality into the future, we also include the `/usgs/geokb/doc/` path rewrite rule.

### Links
With `$1` being the QID or PID for a Wikibase item...

Links in the form `https://w3id.org/usgs/geokb/$1`
* No `Accept` header or `text/html` -> `https://geokb.wikibase.cloud/entity/$1`
* Using `Accept` header `application/json` -> `https://geokb.wikibase.cloud/entity/$1.json`
* Using `Accept` header `application/ld+json` -> `https://geokb.wikibase.cloud/entity/$1.jsonld`
* Using `Accept` header `application/n-triples` -> `https://geokb.wikibase.cloud/entity/$1.nt`
* Using `Accept` header `text/ttl` -> `https://geokb.wikibase.cloud/entity/$1.ttl`
* Using `Accept` header `text/n3` -> `https://geokb.wikibase.cloud/entity/$1.n3`

Links in the form `https://w3id.org/usgs/geokb/doc/$1`
* No `Accept` header or `text/html` -> `https://geokb.wikibase.cloud/wiki/Item_talk:$1`
* Using `Accept` header `application/json` -> `https://geokb.wikibase.cloud/w/api.php?action=query&format=json&prop=revisions&rvprop=ids%7Ctimestamp%7Cflags%7Ccomment%7Cuser%7Ccontent&rvslots=*&rvlimit=1&titles=Item_talk%3A$1`

### Contacts
* Sky Bristol
  * sbristol@usgs.gov
  * Github: [https://github.com/skybristol](skybristol)
  * ORCID: [https://orcid.org/0000-0003-1682-4031](0000-0003-1682-4031)

## ScienceBase
ScienceBase uses a UUID form of identifier that is reasonably permanent as long as ScienceBase continues to exist and operate with its domain and path. Given the possibility of future architecture changes in ScienceBase, the w3id.org rewrite rule can allow for some degree of flexibility in continuing to use the UUID identifiers for an item but redirecting to another infrastructure domain and path in future.

### Uses
This namespace simply includes the UUID identifier under the /usgs/sb/ path and redirects to the item in ScienceBase under /catalog/item/. It was set up for cases where ScienceBase is being used as a long-term archive for items that do not have a DOI and the URLs will be used in and referenced from other third party systems.

### Links
With `$1` being the ScienceBase UUID for a Catalog item...

Links in the form `https://w3id.org/usgs/sb/$1`
* No `Accept` header or `text/html` -> `https://www.sciencebase.gov/catalog/item/$1`
* Using `Accept` header `application/json` -> `https://www.sciencebase.gov/catalog/item/$1?format=json`

### Contacts

* Sky Bristol
  * sbristol@usgs.gov
  * Github: [https://github.com/skybristol](skybristol)
  * ORCID: [https://orcid.org/0000-0003-1682-4031](0000-0003-1682-4031)
