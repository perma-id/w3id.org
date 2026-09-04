# /fairenoughbook/

Permanent identifiers for the running example of the book *FAIR Enough: A practical
guide to make data FAIR(er)* (Springer).

The book follows one dataset, WildObs, through a complete FAIRification: from two
untidy spreadsheets to a published, assessed FAIR resource. The identifiers minted
during that process are printed in the book, so they need to resolve. This namespace
provides them.

## Redirection

| Request | Response |
|---------|----------|
| `https://w3id.org/fairenoughbook/` | Namespace documentation (HTML) |
| `https://w3id.org/fairenoughbook/wildobs/...` with `Accept: text/turtle` | The WildObs graph in Turtle (303) |
| `https://w3id.org/fairenoughbook/wildobs/...` from a browser | Namespace documentation (HTML) |

The target is the GitHub Pages site of the book's companion repository,
<https://luizbonino.github.io/FAIREnough-companion/ns/>.

## Resource patterns

| Pattern | What it identifies |
|---------|--------------------|
| `wildobs/occurrence/{id}` | One occurrence record, i.e., one sighting |
| `wildobs/taxon/{name}` | A taxon as held locally, before reconciliation to a taxonomic authority |
| `wildobs/country/{name}` | A country as held locally, before reconciliation to a country register |
| `wildobs/agent/{name}` | An observer as held locally, before reconciliation to ORCID |

## Note on the data

WildObs is a teaching example. Its records are synthetic, its observer names and
e-mail addresses are invented, and its coordinates do not report real locations of
threatened species.

## Contact

This space is administered by:

Luiz Olavo Bonino da Silva Santos<br>
l.o.boninodasilvasantos@utwente.nl<br>
GitHub username: [luizbonino](https://github.com/luizbonino)
