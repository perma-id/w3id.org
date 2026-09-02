# shapetrees

New namespace for https://github.com/shapetrees/specification
Previously used domain expired and now someone squats it.

Serves the vocabulary at the namespace URI, content negotiated against the
Shape Trees home page, and the two documents under the `/TR/` paths the old
site used:

| Request | Redirects to |
| --- | --- |
| `/shapetrees` with an RDF `Accept` header | `https://shapetrees.github.io/specification/shapetrees.ttl` |
| `/shapetrees` from a browser | `https://shapetrees.github.io/` |
| `/shapetrees/TR/specification/` | `https://shapetrees.github.io/specification/` |
| `/shapetrees/TR/primer/` | `https://shapetrees.github.io/primer/` |

## Maintainers
* Eric Prud'hommeaux @ericprud
* Justin Bingham @justinwb
* elf Pavlik @elf-pavlik
