# Sunbird RC

Permanent identifiers for vocabularies published by
[Sunbird RC](https://github.com/Sunbird-RC), an open-source registry and verifiable
credential platform, and by its reference implementations.

## Identifiers

| Identifier | Resolves to |
| --- | --- |
| `https://w3id.org/sunbird-rc/agriculture/v1` | JSON-LD context document for the Agriculture credentials |

The vocabulary namespace for the Agriculture terms is the same identifier with a fragment,
`https://w3id.org/sunbird-rc/agriculture/v1#`, so a term such as `farmerReference` expands to
`https://w3id.org/sunbird-rc/agriculture/v1#farmerReference`.

## Stability

The identifier and the `v1` term semantics are permanent. A change in meaning will be
published under a new path rather than by editing `v1`: the expanded term IRIs are covered by
the signatures on credentials already issued, so redefining one would invalidate them.

Redirects use `302`. The identifier is permanent, but the hosting location is expected to move
from the current fork to the official Sunbird RC organisation, and a cached `301` would
outlive that move. The identifier and the content it resolves to will not change when it does.

## Contact

Kartheek Palla — GitHub [@pallakartheekreddy](https://github.com/pallakartheekreddy)

Project: <https://github.com/Sunbird-RC/sunbird-rc-reference-implementations>
