# https://w3id.org/vcf-rdfizer/

**Retired namespace.** This was the namespace of the VCF-RDFizer Vocabulary, versions 1.0.x and 1.1.0. The
vocabulary continues as the **VCF Core Vocabulary** at <https://w3id.org/vcf-core/>, renamed so that the
model is identified independently of any one converter.

This configuration is intentionally **not** a redirect to the successor namespace. Every IRI here resolves
to a legacy document in which that IRI is still defined, marked `owl:deprecated`, and linked to its
successor with `owl:equivalentClass`, `owl:equivalentProperty` or `owl:sameAs`.

- Successor: <https://w3id.org/vcf-core/>
- Source: <https://github.com/ecrum19/vcf-core-vocabulary>
- License: CC BY 4.0

## Resolution

The legacy namespace serves the static deprecation document at
`legacy/legacy-vcf-rdfizer.ttl`. It is deliberately kept separate from the VCF Core namespace so that
existing `vcfr:` IRIs continue to resolve to a document that defines them.


## Maintainer

Elias Crum — IDLab, Department of Electronics and Information Systems, Ghent University — imec, Belgium.
<elias.crum@ugent.be>
Github: ecrum19
