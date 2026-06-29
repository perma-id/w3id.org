# /jeswr/

This W3ID provides a persistent URI namespace for a family of **experimental
Solid vocabularies** maintained by [@jeswr](https://github.com/jeswr) — the
ontologies used across @jeswr's Solid application + Pod-Manager suite (the
federation, task, core, and sector vocabularies). They are early/unstable and
not yet proposed as community standards; this namespace gives them a stable home
under the maintainer's own identity in the meantime.

It is a **catch-all** namespace: every path under `https://w3id.org/jeswr/` is
redirected, path-preserving, to a base on the maintainer's own permanent domain.
New ontologies and content negotiation (Turtle / JSON-LD / HTML) are handled
entirely on the owner's side, so adding a vocabulary never requires another
change to this `.htaccess`.

## Redirect target

* <https://jeswr.org/ns/> — a base on the maintainer's permanent domain
  (`jeswr.org`, which also hosts the maintainer's WebID
  <https://jeswr.org/#me>); the vocabularies are authored at
  <https://github.com/jeswr/solid-federation-vocab> and served under that domain.

## Contact

* Jesse Wright ([@jeswr](https://github.com/jeswr))
