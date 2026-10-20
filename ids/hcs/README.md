# /hcs/

Permanent identifiers for the HCS Registry: the body of knowledge of HCS (Hatox
Control Systems) about its products, the machines they serve and the documents
that describe them.

All paths redirect (302) to <https://registry.hatoxsolutions.com/>.

| Path | Resolves to |
|---|---|
| `https://w3id.org/hcs/id/{code}` | an item in the registry (product family, variant, machine type, device kind, unit, …). Codes are opaque, six characters (Crockford base32, case-insensitive), never reused. A sub-path after the code is kept. |
| `https://w3id.org/hcs/vocab/{area}#{Term}` | a class or relation of the HCS vocabulary. |
| `https://w3id.org/hcs/data/{area}/{key}` | a record that is not an identity. |
| anything else | the registry home page. |

## Contact

- Yakuphan Sarıkaya, Techsafe Solutions
- GitHub: [@YakuphanSrky](https://github.com/YakuphanSrky)

- Ruhan Ağar, Techsafe Solutions
- <r.agar@techsafe-solutions.com>
