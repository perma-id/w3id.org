# dataerai

Persistent identifiers for Dataerai decentralized identifiers (DIDs) of the
form `did:dataerai:[<env>:]<kind>:<subject>`, where `<env>` is `dev` or `beta`
(absent in production), `<kind>` is one of `asset`, `dataset`, `person`, or
`project`, and `<subject>` is 32 lowercase base32 characters (`[a-z2-7]`).

`https://w3id.org/dataerai/[<env>/]<kind>/<subject>` 303-redirects to the
public DID resolve API on the matching Dataerai environment:

| w3id URL | Redirects to |
|----------|--------------|
| `w3id.org/dataerai/<kind>/<subj>` | `https://app.dataerai.com/api/identity/resolve/did:dataerai:<kind>:<subj>/` |
| `w3id.org/dataerai/dev/<kind>/<subj>` | `https://dev.dataerai.com/api/identity/resolve/did:dataerai:dev:<kind>:<subj>/` |
| `w3id.org/dataerai/beta/<kind>/<subj>` | `https://beta.dataerai.com/api/identity/resolve/did:dataerai:beta:<kind>:<subj>/` |

The bare namespace `https://w3id.org/dataerai/` redirects to the documentation
at <https://docs.dataerai.com/identity/overview>.

## Maintainers

Maintained by [Dataerai](https://github.com/Dataerai). The source of truth is
the `ops/w3id/dataerai/` directory of the `datatransfer-dataerai` repository;
changes are re-submitted from there.

- Joshua C Agar — [@jagar2](https://github.com/jagar2)
- Chad Peiper — [@kinor](https://github.com/kinor)

Contact: <identity@dataerai.com>
