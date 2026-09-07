# https://w3id.org/vcf-core/

Permanent identifier for the **VCF Core Vocabulary**: an RDF vocabulary and SHACL profile for representing
VCF 4.5 files, headers, records, call assessments, and genotype data, with expanded per-sample and condensed
cohort representations.

- Namespace: `https://w3id.org/vcf-core/vocab#` (prefix `vcfc:`)
- Source: <https://github.com/ecrum19/vcf-core-vocabulary>
- License: CC BY 4.0

This namespace supersedes `https://w3id.org/vcf-rdfizer/`, which remains configured separately and serves a
deprecation document rather than redirecting here.

## Resolution

- `https://w3id.org/vcf-core/vocab` returns the HTML vocabulary reference to web browsers and the complete
  Turtle vocabulary bundle when the client requests `text/turtle` or `application/x-turtle`.
- `https://w3id.org/vcf-core/vocab.ttl` always returns the complete Turtle vocabulary bundle.
- `/alleles`, `/genotypes`, `/sv`, and `/reserved-keys` expose the additive Turtle modules.
- `/shapes` and its subpaths expose the portable, SPARQL, consistency, and VCF-version SHACL profiles.
- The redirect target is the companion site at <https://ecrum19.github.io/vcf-core-vocabulary/>.

## Maintainer

Elias Crum — IDLab, Department of Electronics and Information Systems, Ghent University — imec, Belgium.
<elias.crum@ugent.be>
Github: ecrum19