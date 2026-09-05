# w3id.org/fyndling

Persistent identifiers for **Fyndling**, a digital edition of medieval cooking
recipes in TEI-P5.

The edition currently holds **2315 recipes from 34 manuscripts and early
prints**, dating from the 14th to the 16th century. Every recipe carries a
diplomatic transcription of its source, a modern German translation, ingredient
normdata with recorded provenance, and editorial notes that keep open readings
open instead of resolving them silently.

- Dataset, one TEI file per recipe: https://github.com/neongrau/fyndling-tei
- Human readable edition: https://fyndling.de/rezepte/

## Identifier scheme

```
https://w3id.org/fyndling/{recipe-id}
```

A recipe id is a book prefix, a hyphen, and a number, with an optional letter
for sub-recipes:

| Identifier | Resolves to |
|---|---|
| `https://w3id.org/fyndling/bgs-001` | recipe 1 of *Das Buch von guter Speise* (Wuerzburg, ca. 1350) |
| `https://w3id.org/fyndling/bgs-074a` | sub-recipe 74a of the same book |
| `https://w3id.org/fyndling/ri15632-001` | recipe 1 of Vienna, ONB Cod. 15632 |

The identifiers are stable by construction. They are derived from the source
book and the recipe's position in its edition, not from a database key, and
they do not change when metadata, translation or annotations are revised.

## Content negotiation

| Accept | Target |
|---|---|
| `application/tei+xml` | `https://fyndling.de/rezepte-data/tei/{id}.xml` |
| anything else | `https://fyndling.de/rezepte/{id}/` |

All redirects are `302`. The identifier is the stable part; the targets may
move, and a temporary redirect keeps that possible without stale caches.

Only `application/tei+xml` selects the TEI branch. The generic `application/xml`
and `text/xml` are deliberately not matched, because browsers send
`application/xml;q=0.9` in their default Accept header and would otherwise be
sent to the source file instead of the page.

Example:

```sh
curl -sI -H "Accept: application/tei+xml" https://w3id.org/fyndling/bgs-001
curl -sI                                  https://w3id.org/fyndling/bgs-001
```

## Licence

The edition is mixed licensed and every TEI file states its own licence
machine readably in
`teiHeader/fileDesc/publicationStmt/availability/licence/@target`:

- 2297 recipes under CC BY-SA 4.0
- 18 recipes under CC BY-NC-SA 4.0

The historical texts themselves are in the public domain. The transcriptions
are third party work and are credited per file in `sourceDesc`, chiefly to
CoReMA (Cooking Recipes of the Middle Ages, ed. Helmut W. Klug, University of
Graz, CC BY 4.0) and to Thomas Gloning, University of Giessen. Translations,
annotations and normdata are ours.

## Contact

- GitHub: [@neongrau](https://github.com/neongrau)
- Project imprint with postal address and email:
  https://fyndling.de/impressum.html

Please report problems with the identifiers as an issue on
https://github.com/neongrau/fyndling-tei.
