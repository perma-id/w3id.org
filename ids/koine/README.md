# /koine/

Permanent identifiers for **Koine** — an agnostic *neuro-symbolic interchange fabric*: a set of
open specifications by which independent AI systems exchange **identity, knowledge, media, and
capability**. Koine is contracts only — protocols, not programs — and each participant implements
them in its own codebase.

* **Specifications (redirect target):** <https://github.com/danieldekerlegand/koine>

## What resolves here

| Identifier | Resolves to |
|---|---|
| `https://w3id.org/koine/kcb/manifest/<version>` | KCB §2, *The capability manifest* |
| `https://w3id.org/koine/kinp/…` | KINP — Koine Identity & Naming Protocol |
| `https://w3id.org/koine/kgp/…` | KGP — Koine Grounding Pack (knowledge plane) |
| `https://w3id.org/koine/kcb/…` | KCB — Koine Capability-Bus Protocol (control plane) |
| `https://w3id.org/koine/kmi/…` | KMI — Koine Media Interchange (media plane) |
| `https://w3id.org/koine/kcs/…` | KCS — Koine Conformance Scenario |
| `https://w3id.org/koine/kft/…` | KFT — Koine Fine-Tuning profile |
| anything else under `/koine/` | the specification repository root |

## Why these identifiers need to be permanent

The busiest identifier in this namespace is the KCB **manifest extension URI**
(`https://w3id.org/koine/kcb/manifest/0.3`). A Koine capability manifest is published as a named
extension of an [A2A](https://a2a-protocol.org/) `AgentCard` — one entry in the card's
`capabilities.extensions[]` array — and a consumer finds that entry by **string-matching its
`uri`**. The URI is therefore a *matching key*, not a fetch target: implementations embed the
literal string, and changing it is a breaking change for every consumer that has shipped it.

A matching key of that kind must not depend on a private domain registration staying renewed.
That is exactly what a w3id permanent identifier is for, and it is why this entry exists.

## Maintainer

Daniel DeKerlegand — GitHub [@danieldekerlegand](https://github.com/danieldekerlegand),
<dldekerl@gmail.com>. Sole maintainer of the Koine specifications; issues and questions are
welcome at <https://github.com/danieldekerlegand/koine/issues>.