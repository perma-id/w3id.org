# DirectKG persistent identifier namespace

`https://w3id.org/directkg/` is the persistent namespace root for
[OntoUML DirectKG](https://github.com/pedropaulofb/ontouml-directkg), a project
for converting supported OntoUML JSON models into domain-oriented RDF/OWL.

The namespace root redirects (HTTP 302) to the project's GitHub repository.
The bare URL `https://w3id.org/directkg` is expected to receive Apache's
usual directory trailing-slash redirect before the namespace rule applies.

The namespace is intended to accommodate future subordinate identifiers under
`https://w3id.org/directkg/`. No catch-all redirect is installed: subordinate
paths are not asserted to resolve until a suitable published HTTPS target has
been verified and a specific rule has been added. In particular, this
registration does not establish ontology or vocabulary dereferencing or RDF
content negotiation. The repository's current Turtle vocabulary refers to
`https://w3id.org/directkg/vocab`, but that URI's definitive publication and
resolution policy remains to be established.

## Maintainer

- Pedro Paulo Favato Barcelos — GitHub: [@pedropaulofb](https://github.com/pedropaulofb)

Project repository: https://github.com/pedropaulofb/ontouml-directkg
