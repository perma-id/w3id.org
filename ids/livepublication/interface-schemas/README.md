# LivePublication Interface Schemas

Persistent identifiers for LivePublication vocabularies and JSON-LD contexts.

## Maintainer

- **Augustus Ellerm**
- Email: ael854@aucklanduni.ac.nz
- ORCID: [0000-0001-8260-231X](https://orcid.org/0000-0001-8260-231X)
- GitHub: [@GusEllerm](https://github.com/GusEllerm)

## Description

This w3id namespace provides persistent identifiers for the LivePublication Interface Schemas, a collection of vocabularies and contexts for describing computational research workflows in a reproducible manner.

**Modules:**

- **DPC** (Distributed Processing Cluster): Hardware runtime environment descriptors
- **DSC** (Distributed Steps Container): Workflow step definitions and provenance
- **LP-DSCDPC**: Combined context integrating DPC and DSC

## URLs

### Production

- **Catalog:** https://livepublication.org/interface-schemas/
- **Repository:** https://github.com/GusEllerm/livepub-interface-schemas

### w3id Persistent Identifiers

- **Base:** https://w3id.org/livepublication/interface-schemas/
- **Example module (DPC):** https://w3id.org/livepublication/interface-schemas/dpc/
- **Example context:** https://w3id.org/livepublication/interface-schemas/dpc/contexts/v1.jsonld

## Content Negotiation

Module base URLs support content negotiation:

```bash
# Default: HTML landing page
curl https://w3id.org/livepublication/interface-schemas/dpc/

# Turtle: vocabulary
curl -H "Accept: text/turtle" \
     https://w3id.org/livepublication/interface-schemas/dpc/
```

## Redirect Rules

The `.htaccess` file uses **generic patterns** that work for:

- All current modules (dpc, dsc, contexts/lp-dscdpc)
- All future modules (no w3id updates needed)

Patterns:

- `/{module}/` → HTML landing or Turtle vocabulary (via Accept header)
- `/{module}/contexts/v{N}.jsonld` → Versioned JSON-LD context (immutable)
- `/{module}/terms.ttl` → Vocabulary definitions
- `/{module}/shapes.ttl` → SHACL validation shapes
- `/contexts/{combined}/v{N}.jsonld` → Combined contexts

## Versioning

**JSON-LD contexts are immutable once published.**

See [PUBLISHING.md](https://github.com/GusEllerm/livepub-interface-schemas/blob/main/PUBLISHING.md) for versioning policy.

## License

Interface schemas are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Contact

For issues or questions:

- **GitHub Issues:** https://github.com/GusEllerm/livepub-interface-schemas/issues
- **Email:** ael854@aucklanduni.ac.nz
