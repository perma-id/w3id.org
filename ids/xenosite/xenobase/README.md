# /xenosite/xenobase/

Permanent IRIs for [XenoBase](https://swami.wustl.edu/xenobase/) catalogue
records. Each stable accession CURIE expands to a path under this namespace and
redirects (HTTP 302) to the corresponding page on the live site.

| CURIE prefix | IRI path | Target |
| --- | --- | --- |
| `xbr:` | `reaction/{id}` | `https://swami.wustl.edu/xenobase/reaction/{id}` |
| `xbm:` | `molecule/{id}` | `https://swami.wustl.edu/xenobase/molecule/{id}` |
| `xbn:` | `network/{id}` | `https://swami.wustl.edu/xenobase/network/{id}` |
| `xbs:` | `site/{id}` | `https://swami.wustl.edu/xenobase/sites/{id}` |

`{id}` is the numeric local part (legacy 7-digit or current 12-digit). The
`xbs:` IRI uses singular `site/`; the HTML app serves those tables under
`/sites/`.

Other paths under this directory (for example vocabulary IRIs) currently
redirect to the XenoBase home page until dedicated pages exist.

## Maintainer

#### S. Joshua Swamidass
- GitHub username: [swamidass](https://github.com/swamidass)
- Organization: [swamidasslab](https://github.com/swamidasslab)
- Contact: https://github.com/swamidasslab/w3id.org/issues
