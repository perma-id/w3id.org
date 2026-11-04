# /beat/ - British Early Administrative Traces

Permanent identifiers for **BEAT**, a research project that reads parish boundaries off the
ink of the Ordnance Survey six-inch first edition and publishes them, with a point for each
ancient parish church, as open data.

## Maintainer

- **Stephen Gadd** - <https://github.com/docuracy>

## Homepage

<https://docuracy.github.io/beat/> (source: <https://github.com/docuracy/beat>)

## Namespace layout

| Pattern | Entity type | Example |
|---------|-------------|---------|
| `/beat/` | BEAT homepage | |
| `/beat/parish/{County}.{Name}` | An ancient parish | `/beat/parish/BDF.Sandy` |

Parish identifiers follow the CAMPOP Places pattern (`/campop/place/{County}.{Place}`): a
three-letter Chapman county code and the canonical name with spaces as hyphens. Parish
resolution (HTML map page and JSON representations on GitHub Pages) is planned and will be
enabled in a later PR; only the homepage rule is live now.
