# /bimei/

Permanent identifiers for the **BIMei Ontology (ONT)** — the canonical Action Statement registry of the BIM
Excellence ecosystem.

IRIs take the form `https://w3id.org/bimei/{type}/{slug}` — e.g. `https://w3id.org/bimei/action/conduct`,
`https://w3id.org/bimei/term/...`, `https://w3id.org/bimei/statement/...`. They are readable, **minted once and never
renamed** (a relabel changes the label, not the slug), and **language- and version-neutral**: language is content-
negotiated (`Accept-Language`) and a pinned version is selected with `?version=`. The `register`
(canonical | instrument | communication) is a property of the resolved object, **never part of the IRI**.

`.htaccess` 302-redirects every `/bimei/*` path (query string preserved) to the backing host
`https://ontology.bimexcellence.org/`, which runs the ONT resolver. 302 (temporary) keeps the `w3id.org/bimei/` IRI the
permanent citable identity while the backing host remains relocatable.

## Contact

- Bilal Succar — Change Agents
- GitHub: [@bsuccar](https://github.com/bsuccar)
- Email: bsuccar@changeagents.com.au
