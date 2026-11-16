# /valor

Persistent identifiers for **Valor Ecclesiasticus (1535)**: a dataset of the whole Valor, with its benefices
linked to the historical parishes mapped by [beat](https://github.com/docuracy/beat).

- Source: https://github.com/docuracy/valor (site: https://docuracy.github.io/valor/)
- `/valor/inst/<key>`: an institution as printed in the Valor index (rectory, vicarage, chapel, chantry, prebend, college, hospital)
- `/valor/house/<key>`, `/valor/poss/<key>`: a religious house, and one possession listed under it
- `/valor/unit/<diocese|archdeaconry|deanery|jurisdiction>/<key>`: the ecclesiastical hierarchy
- `/valor/ret/<key>`: a printed figure (return); `/valor/site/<key>`: a located site
- `/valor/parish/<beat parish id>`: the Valor entries linked to a [beat](https://github.com/docuracy/beat) parish
- `/valor/ns`: the vocabulary (Turtle, JSON-LD or HTML)
- `/valor/data/...`: CSV tables, relations and manifest (plain files)
- Content negotiation: JSON for `Accept: application/json` or `application/ld+json`, HTML otherwise (303 See Other);
  an explicit `.html` or `.json` suffix selects the format directly.

Maintainer: Stephen Gadd (GitHub: docuracy), stephen@docuracy.co.uk
