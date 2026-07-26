LinkedParticles
===============

An open standard for provenance-tracked, uncertainty-modelled knowledge claims
("particles"), with confidence and source attribution as first-class schema
fields. Colloquially "Particles"; the namespace, the distribution, and the
maintaining organization all carry the distinctive **LinkedParticles** name.

This namespace identifies the standard's normative machine-readable artifacts:

- `https://w3id.org/linkedparticles/schemas/particle.schema.json` — JSON Schema for
  the core particle / subject model
- `https://w3id.org/linkedparticles/schemas/trust_lens.schema.json` — JSON Schema for
  trust-lens definitions
- `https://w3id.org/linkedparticles/schemas/context.jsonld` — the canonical JSON-LD
  `@context`
- `https://w3id.org/linkedparticles/vocab#` — the vocabulary namespace, used by the
  JSON-LD context and by five normative SHACL shapes

Homepage:

- https://github.com/LinkedParticles

Redirection:

- The `.htaccess` currently issues a **302** to the maintaining organization,
  because the standard repository and its GitHub Pages deployment are not yet
  public. It will be repointed, path-preserving, at the published artifacts once
  they are. A temporary redirect is deliberate: the hosting is expected to move,
  while the IRIs themselves are permanent.

Contacts:

- Jeff Gage <jeff@gage.org>
