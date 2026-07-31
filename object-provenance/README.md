# object-provenance

Permanent identifiers for an object provenance vocabulary: terms describing
the recording, batching, and archival of provenance claims about physical
objects (mineral specimens, gemstones, and other collectibles).

## Namespace

    https://w3id.org/object-provenance/v1#

Hash-based. Individual terms are fragments of the versioned namespace
document, e.g. `https://w3id.org/object-provenance/v1#anchorReferences`.
The conventional prefix is `op`.

## Scope

The rule this namespace is held to: **mint only terms with no published
equivalent** — anchor references, archival transaction identifiers, snapshot
and certificate structures, and the recording mechanics specific to this
system. Attribution should use PROV-O, bibliographic metadata Dublin Core,
object description CIDOC CRM via the Object ID category set, and thesaurus
references Getty AAT and TGN.

**`v1` does not yet meet that rule, and this is stated here rather than
discovered in the context file.** Five terms duplicate published equivalents:

| Term | Should be |
|---|---|
| `op:recordIdentifier` | `dcterms:identifier` |
| `op:title` | `dcterms:title` |
| `op:description` | `dcterms:description` |
| `op:publishedAt` | `dcterms:issued` |
| `op:provenanceEvents`, `op:ownerDisplayName` | PROV-O attribution |

The mapping is scheduled and is a restructuring rather than a rename, which
is why it has not simply been done: PROV-O attribution changes the shape of
the document, not only its key strings. New records will use the mapped terms
under a later version. Records already anchored under `v1` are never remapped
— rewriting them would change their hashes, which is the failure this whole
arrangement exists to prevent.

The permanent identifier is needed either way, and is needed *before* the
first anchored record rather than after. That is the reason for requesting it
at this stage rather than waiting for a tidier vocabulary.

## Why a permanent identifier is needed

These IRIs are embedded in canonicalized JSON documents that are hashed and
committed to a public blockchain. Canonicalization is JCS (RFC 8785), which
hashes the literal key strings of the document — so the prefixed term keys
(`op:title`, `op:recordIdentifier`, …) and the `@context` value are all
inside the hash preimage. A namespace string that changes after a record is
anchored leaves that record asserting a vocabulary that no longer exists,
and there is no way to reissue it.

A permanent identifier decoupled from any organizational domain is therefore
a hard requirement, not a convenience: the alternative is a corpus of
permanent records whose vocabulary is defined only at a URL one organization
must keep paying for.

## Versioning

`v1` is frozen once records are anchored against it. Subsequent versions get
their own path segment. All published versions must continue to resolve
indefinitely, because records anchored under them remain verifiable forever.

Because canonicalization is JCS rather than RDF Dataset Canonicalization,
the verification contract for an anchored record is its exact byte-level key
set, not the expanded IRIs. Each version therefore publishes a frozen key-set
document alongside the context, and a new version never remaps the keys of an
older one.

## Redirect target

Currently `https://object-provenance.github.io/vocab/v1/`, live and serving:

- <https://object-provenance.github.io/vocab/v1/> — landing page and term list
- <https://object-provenance.github.io/vocab/v1/context.jsonld> — JSON-LD context
- <https://object-provenance.github.io/vocab/v1/KEY-SET.md> — frozen key set

The target is expected to change; the identifier is not.

Content negotiation is JSON-LD and HTML only. Every `v1` term is still
privately minted pending the mapping onto PROV-O, Dublin Core, and CIDOC CRM
described above, so an ontology serialization would describe a term set that
is still moving. Turtle and RDF/XML are added when `v1` freezes, which is the
first anchored record.

## Contact

This space is administered by:

- RelicQuery — hello@relicquery.org
- GitHub username: RichardHerold
