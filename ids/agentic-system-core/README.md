# w3id.org/agentic-system-core

Permanent identifiers for **AgenticSystemCore**, a specification for publishing machine-discoverable
knowledge bundles. The vocabulary, the profile and the link relations it defines are named under
`https://w3id.org/agentic-system-core/`, so that the names stay stable even if the documentation moves.

Every identifier redirects with `303 See Other` to a static file on `https://agenticsystemcore.com/`.
The vocabulary is served in the format the client asks for in its `Accept` header.

| Identifier | Redirects to |
|---|---|
| `/ns` with `Accept: text/turtle` | `https://agenticsystemcore.com/ns/agsc.ttl` |
| `/ns` with `Accept: application/ld+json` | `https://agenticsystemcore.com/ns/context.jsonld` |
| `/ns` with `Accept: application/rdf+xml` | `https://agenticsystemcore.com/ns/agsc.rdf` |
| `/ns` from a browser, or any other `Accept` | `https://agenticsystemcore.com/ns/` (HTML documentation) |
| `/ns#<Term>` | the same as `/ns`; the browser then scrolls to the term |
| `/ns/<Term>` | `https://agenticsystemcore.com/ns/#<Term>` |
| `/ns/<version>`, e.g. `/ns/1.0.0-draft.1` | the fixed copy of that version, with the same `Accept` table (`/ns/<version>/agsc.ttl`, `…/context.jsonld`, `…/agsc.rdf`, or `…/`) |
| `/ns/<file>` for a vocabulary file (`.ttl`, `.jsonld`, `.json`, `.rdf`, `.nt`, `.owl`, `.html`), and any `/ns/<version>/<path>` | that file under `https://agenticsystemcore.com/ns/` |
| `/profile/agentic-knowledge` | `https://agenticsystemcore.com/specs/agentic-knowledge/` |
| `/rel#<name>` | `https://agenticsystemcore.com/specs/agentic-knowledge/`; the browser then scrolls to `#<name>` |
| `/specs/mcp/` | `https://agenticsystemcore.com/specs/mcp/` (the MCP extension) |
| `/specs/agentic-knowledge/` | `https://agenticsystemcore.com/specs/agentic-knowledge/` (the profile) |
| `/` | `https://agenticsystemcore.com/` |
| anything else | `https://agenticsystemcore.com/ns/` |

`application/x-turtle` is accepted as Turtle and `application/json` as JSON-LD. A version is
`<major>.<minor>.<patch>` with an optional pre-release suffix such as `-draft.1`.

Later versions need no change to these rules: each new vocabulary version is served at
`/ns/<version>`, a link relation added by a later version is `/rel#<name>` and lands on its own
anchor of the same page, and the profile URI stays the same.

## Maintainer

Andrei N. Besleaga — GitHub: [@andreibesleaga](https://github.com/andreibesleaga)
