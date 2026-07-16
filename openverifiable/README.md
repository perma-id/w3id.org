# /openverifiable/

This [W3ID](https://w3id.org) namespace provides **stable URLs** for [OpenVerifiable](https://openverifiable.ai/) JSON-LD context documents used in subject-only provenance records (e.g. the WordPress AI [C2PA Monitor](https://github.com/WordPress/ai) experiment's `_wpai_monitor_record` postmeta).

## Identifiers

| W3ID | Target (302) |
|------|----------------|
| [https://w3id.org/openverifiable/](https://w3id.org/openverifiable/) | [https://openverifiable.ai/](https://openverifiable.ai/) (project home) |
| [https://w3id.org/openverifiable/v1](https://w3id.org/openverifiable/v1) | [wpai-monitor-record `context.json`](https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/community-schemas/WordPress/schemas/wpai-monitor-record/context.json) on the DIF [credential-schemas](https://github.com/decentralized-identity/credential-schemas) `main` branch |
| [https://w3id.org/openverifiable/v1.jsonld](https://w3id.org/openverifiable/v1.jsonld) | same as `v1` |

The v1 context is the **editorial** JSON-LD mapping for the WordPress monitor record; it extends the OpenVerifiable `ove:` vocabulary and Schema.org. Machine-readable JSON Schema for the same shape lives alongside it in the DIF repo (`schema.json`).

**Note:** Future versions may add redirects for a dedicated `openverifiable/contexts` host or a CMS-agnostic context only; v1 remains a stable redirect target once published per OpenVerifiable governance (immutability policy TBD in the `contexts` repository).

## Maintainers

This namespace is maintained by:

- [@lnispel](https://github.com/lnispel) — OpenVerifiable

GitHub organization: [OpenVerifiable](https://github.com/OpenVerifiable)

## Contact

**OpenVerifiable**

- Website: [https://openverifiable.ai/](https://openverifiable.ai/)
- GitHub: [https://github.com/OpenVerifiable](https://github.com/OpenVerifiable)
- Source of truth for context bytes (until a separate contexts repo is published): [DIF credential-schemas - `WordPress/schemas/wpai-monitor-record/`](https://github.com/decentralized-identity/credential-schemas/tree/main/community-schemas/WordPress/schemas/wpai-monitor-record)

For w3id.org namespace administration, open an issue on [perma-id/w3id.org](https://github.com/perma-id/w3id.org) and tag the maintainers listed in the parent repository [README](https://github.com/perma-id/w3id.org#management).