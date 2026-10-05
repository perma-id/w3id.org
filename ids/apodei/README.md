# /apodei/

Persistent identifiers for **apodei**, a certify-on-use ledger of scientific claims.
The name comes from *apodeixis*, Aristotle's term for demonstration.

The ledger records scientific claims, the evidence and checks behind them, and who
vouches for them. Verification is spent only where something depends on a claim.
Its first subfield is mathematics formalized in Lean 4 and Mathlib.

## Identifiers

| URI | Redirects to |
| --- | --- |
| `https://w3id.org/apodei/` | the project home |
| `https://w3id.org/apodei/predicate/<name>/<version>` | the specification of a certificate predicate, for example `predicate/lean4-proof/v1` |
| `https://w3id.org/apodei/<cid>` | the project home for now; later the resolver of a public ledger node |

Ledger ids are CIDv1 content addresses in base32 (they start with `b`). They never
change, so the redirect target can move without breaking any identifier.

## Contact

- Stefan Decker, GitHub username: [stefanjdecker](https://github.com/stefanjdecker)
