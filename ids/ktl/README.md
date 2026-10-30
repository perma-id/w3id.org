# /ktl/

Permanent identifiers for Knowledge Trust Ladder (KTL) and its LOKF knowledge bundle.

`https://w3id.org/ktl/` redirects to <https://noelmcloughlin.github.io/knowledge-trust-ladder/>, path included.

- `https://w3id.org/ktl/knowledge/` is the bundle. A browser gets its page, `application/ld+json` gets every concept as JSON-LD, and `application/n-triples` or `text/turtle` gets the whole bundle as N-Triples.
- `https://w3id.org/ktl/knowledge/<group>/<name>` is a concept. A browser gets its page, `application/ld+json` gets its JSON-LD, and `text/markdown` gets its Markdown file.
- A path ending in `.jsonld`, `.json`, `.md` or `.nt` goes to that file on the site.

Source: <https://github.com/noelmcloughlin/knowledge-trust-ladder>

## Contact

- Noel McLoughlin
- GitHub: [@noelmcloughlin](https://github.com/noelmcloughlin)

## Sibling namespaces

- `https://w3id.org/ktl/federation/knowledge/`: the top domain of the KTL federation, a bundle whose concepts are other bundles, kept in <https://github.com/noelmcloughlin/ktl-federation>. Everything else under `https://w3id.org/ktl/federation/` goes to that repository's site, which serves the workspace built from the domain's members.
- `https://w3id.org/ktl/curator/knowledge/` and `https://w3id.org/ktl/registrar/knowledge/`: the bundles of the two Obsidian plugins, kept in <https://github.com/noelmcloughlin/obsidian-ktl-curator> and <https://github.com/noelmcloughlin/obsidian-ktl-registrar>.
- `https://w3id.org/ktl/linkml-sidecar/knowledge/`: the bundle of linkml-sidecar, the skills that give a repository a LinkML schema beside its bundle, kept in <https://github.com/noelmcloughlin/linkml-sidecar>. Everything else under `https://w3id.org/ktl/linkml-sidecar/` goes to that repository's site.

None of the five nests inside another, which is what lets a registry of bundles route an identifier to its owner by its longest matching prefix.
