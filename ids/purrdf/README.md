# /purrdf/

Permanent identifiers for vocabulary namespaces published by the
[PurRDF](https://github.com/Blackcat-Informatics/purrdf) project.

## Identifiers

| Identifier | Resolves to | What it is |
| --- | --- | --- |
| `https://w3id.org/purrdf/markdown` | https://blackcatinformatics.ca/purrdf/markdown | Vocabulary for the structural Markdown-to-RDF 1.2 slicing law |
| `https://w3id.org/purrdf/` | https://blackcatinformatics.ca/purrdf/ | The project page |

## markdown

`https://w3id.org/purrdf/markdown#` is a hash namespace: terms are named by
fragment — `#Document`, `#cites`, `#headingText` and so on. A fragment is never
sent to a server, so the base URL `https://w3id.org/purrdf/markdown` is the only
one that is ever dereferenced, and one rewrite rule covers the whole vocabulary.

The namespace identifies the vocabulary of a specification that defines a
deterministic, stand-off function from the bytes of a Markdown document to an
RDF 1.2 graph projected along that document's own structure. The specification
is published in the PurRDF repository at `crates/markdown/SPEC.md`.

It is a specification published by this project and offered for use. It is not
a standard, and it has not been ratified or endorsed by any standards body.

## Why 302 rather than 301

The target is provisional. It currently issues a 303 onward to the PurRDF
project page. When a vocabulary document (`markdown.ttl` and siblings) is
generated, the rule at the origin changes shape while this w3id entry stays
exactly as filed. A 301 would pin a location that is intended to move.

## Maintainer

Patrick Audley, Blackcat Informatics Inc. — paudley@blackcat.ca,
GitHub: [@paudley](https://github.com/paudley)
