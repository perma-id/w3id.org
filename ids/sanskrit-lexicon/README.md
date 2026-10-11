# /sanskrit-lexicon/

Permanent identifier namespace for Linked Open Data derived from the
[Cologne Digital Sanskrit Dictionaries](https://www.sanskrit-lexicon.uni-koeln.de/)
(CDSL), a long-running digitisation of the major printed Sanskrit lexica.

Namespace index: <https://w3id.org/sanskrit-lexicon/>

## Sub-namespaces

| IRI | Dataset |
|---|---|
| `https://w3id.org/sanskrit-lexicon/pwg-ru/` | **PWG→RU** — the Petersburg Dictionary (Böhtlingk–Roth, *Sanskrit-Wörterbuch*) with Russian sense definitions. Modelled in OntoLex-Lemon with a LiLa-style lemma bank, PROV-O evidence grades, first-class source citations, Renou stratum dating, `vartrans` sense relations, and Digital Corpus of Sanskrit frequency data. |

Further sub-namespaces (other CDSL dictionaries) will be added to this same
directory as they are published.

## Resolution

Instances use slash IRIs and resolve with **303 See Other** under content
negotiation — an RDF media type (`text/turtle`, `application/rdf+xml`,
`application/n-triples`) is served Turtle, anything else HTML. The hash form
(`vocab#term`) is reserved for the project vocabulary document.

Redirects point at GitHub Pages
([gasyoun.github.io/pwg-ru-lod](https://gasyoun.github.io/pwg-ru-lod/)) so that
the identifiers remain independent of any project domain or hosting arrangement.
The target is expected to move to an institutional endpoint in future; that
change will not affect any IRI.

## Current publication state

The namespace and its IRI scheme are stable and already in use by the graph
generator and its test fixtures. At the time of registration the published
target carries the namespace index and the SHACL profile; instance data is
withheld pending an editorial approval pass, and is documented as such on the
index page. The namespace is being registered ahead of the data precisely so
that the identifiers minted from here never have to change.

## Maintainer

Dr. Mārcis Gasūns
rusamskrtam@gmail.com
[ORCID 0000-0003-4513-884X](https://orcid.org/0000-0003-4513-884X)
GitHub: [@gasyoun](https://github.com/gasyoun)
