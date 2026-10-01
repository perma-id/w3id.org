# /formal-companion/

Permanent identifiers for the formal-companion annotation format.

A Lean companion is a Lean 4 repository that formalises a book, lecture notes
or a paper. The formal-companion annotation format is one JSON document per
companion that says which Lean declarations formalise which items of which
sources, and where those items sit in the sources. Its specification, JSON
Schema and checker are in
[mathlib-initiative/formal-companion-annotations](https://github.com/mathlib-initiative/formal-companion-annotations).

## Identifiers

| identifier | redirects to |
|---|---|
| `https://w3id.org/formal-companion/annotations/v1.0/schema.json` | `https://raw.githubusercontent.com/mathlib-initiative/formal-companion-annotations/main/schema/annotations-v1.0.schema.json` |
| `https://w3id.org/formal-companion/annotations/v<major>.<minor>/schema.json` | the schema file of that version, in the same directory of the repository |
| `https://w3id.org/formal-companion/annotations` | `https://github.com/mathlib-initiative/formal-companion-annotations` |
| `https://w3id.org/formal-companion` | the same repository |

The first form is the `$id` of the format's JSON Schema, one per version of
the format. A released schema file never changes, so the redirect can point
at the repository's default branch. All redirects are 302.

## Contact

- Jack McCarthy, GitHub username [Deicyde](https://github.com/Deicyde)
