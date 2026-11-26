# w3id.org/segnaletica-rpe

Persistent identifiers for the signposts (*pali*) of the hiking trail network catalogued by the
**Portale Segnaletica Rete Sentieristica**, which manages trail signage of the Piedmont regional hiking
network (RPE).

Each signpost carries a small plate with a QR code. The QR code points to a permanent address:

    https://w3id.org/segnaletica-rpe/p/<signpost code>

for example `https://w3id.org/segnaletica-rpe/p/TOS5-0357`. The plates are printed and installed
outdoors for many years, so the printed address must not depend on where the portal is hosted.

## Redirects

| Identifier | Redirects to |
|---|---|
| `https://w3id.org/segnaletica-rpe/p/{code}` | the public page of the signpost, `https://catasto-segnaletica-rpe.ngrok.dev/consulta/palo/{code}` (302) |

Signpost codes contain only letters, digits and hyphens (e.g. `TOS5-0357`).

## Contacts

- Marco Caparello — GitHub: @marcocaparello-wq — sentieristica@marcocaparello.it
