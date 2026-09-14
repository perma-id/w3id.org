# catalysis-data-format

**Catalysis Data Format (CDF)**, a standardised tabular format for electrochemical
catalysis (electrolysis) time-series data, extending the
[Battery Data Format](https://w3id.org/battery-data-alliance/ontology/battery-data-format).

| Field | Value |
|-------|-------|
| Namespace | `https://w3id.org/catalysis-data-format/` |
| Organisation | Empa, Materials for Energy Conversion |
| GitHub | https://github.com/EmpaEconversion/catalysis-data-format-ontology |

## Maintainers

- Corsin Battaglia (https://github.com/CorsinBattaglia), Empa
- Graham Kimbell (https://github.com/g-kimbell) - Empa

## Namespace structure

| Path | Resolves to |
|------|-------------|
| `/ontology` | Turtle (machines), JSON-LD context (`application/ld+json`), repo (browsers) |
| `/ontology#{term}` | Term IRIs, dereference to the ontology above |
| `/context` | JSON-LD context |
| `/schema` | CSVW table schema |
| `/schema/vendors/{vendor}` | Instrument-specific column mapping |
| `/source` | Turtle from the default branch |
| `/{version}/...` | Versioned snapshot of any of the above |
