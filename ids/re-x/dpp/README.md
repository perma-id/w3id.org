# RE-X DPP W3ID namespace

Namespace: `https://w3id.org/re-x/dpp/`

Persistent identifiers for Digital Product Passports (DPPs) of reusable
building elements in the Re-X Digital Material Bank. The identifiers are
encoded in QR codes printed on physical elements, so they must stay stable
even if the application moves to a new host.

## Redirects

| Request | Target |
|---|---|
| `https://w3id.org/re-x/dpp/{uuid}` | `https://bank.rexbuildings.com/passport/p/{uuid}` (303) |
| `https://w3id.org/re-x/dpp/` | `https://www.rexbuildings.com` (302) |

Only canonical UUIDs (8-4-4-4-12 hex) are redirected. Anything else returns 404.

## Contacts

- Organisation: TalTech-FinEst, https://github.com/TalTech-FinEst
- Repository: https://github.com/TalTech-FinEst/rex-digital-material-bank
- Maintainer: GitHub `@KMKgit`

If the individual maintainers cannot be reached, the maintainers of the
TalTech-FinEst GitHub organisation are responsible for this namespace.
