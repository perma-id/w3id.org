# DirectKG persistent identifier namespace

`https://w3id.org/directkg/` is the persistent namespace root for
[OntoUML DirectKG](https://github.com/pedropaulofb/ontouml-directkg), a project
for converting supported OntoUML JSON models into domain-oriented RDF/OWL.

The following redirects are configured with HTTP 302:

| Persistent identifier | Destination |
| --- | --- |
| `https://w3id.org/directkg/` | `https://pedropaulofb.github.io/ontouml-directkg/` |
| `https://w3id.org/directkg/docs` | `https://pedropaulofb.github.io/ontouml-directkg/` |
| `https://w3id.org/directkg/git` | `https://github.com/pedropaulofb/ontouml-directkg` |
| `https://w3id.org/directkg/pypi` | `https://pypi.org/project/ontouml-directkg/` |
| `https://w3id.org/directkg/releases/latest` | `https://github.com/pedropaulofb/ontouml-directkg/releases/latest` |
| `https://w3id.org/directkg/releases/vX.Y.Z` | `https://github.com/pedropaulofb/ontouml-directkg/releases/tag/vX.Y.Z` |

For release-specific identifiers, `X`, `Y`, and `Z` denote nonnegative integer
major, minor, and patch versions without leading zeroes. The version rule
matches stable release tags only; it does not cover prerelease or build suffixes.
A request for `https://w3id.org/directkg` without the trailing slash first
receives Apache's normal directory-slash redirect. Unrecognized subpaths are
not redirected.

The documentation, PyPI, and GitHub release targets require their respective
resources to be published. Until then, these configured redirects may lead to
unavailable destinations; their publication should be verified before requesting
upstream deployment. This registration does not configure `/directkg/vocab`,
RDF content negotiation, or vocabulary dereferencing.

## Maintainer

- Pedro Paulo Favato Barcelos — GitHub: [@pedropaulofb](https://github.com/pedropaulofb)
