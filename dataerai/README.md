# `dataerai` — w3id.org permanent-identifier namespace

Registers the **`dataerai`** namespace on [w3id.org](https://w3id.org) (the W3C
Permanent Identifier Community Group's redirect service) so Dataerai DIDs have a
stable, vendor-neutral citation URL that redirects to the environment's DID
resolve API.

## What it does

`https://w3id.org/dataerai/[<env>/]<kind>/<subject>` → the public, host-agnostic
resolve API on that environment's app host, with the full DID reconstructed from
the path:

| DID | w3id citation URL | Resolves to |
|-----|-------------------|-------------|
| `did:dataerai:asset:<subj>` (prod) | `w3id.org/dataerai/asset/<subj>` | `https://app.dataerai.com/api/identity/resolve/did:dataerai:asset:<subj>/` |
| `did:dataerai:dev:asset:<subj>` | `w3id.org/dataerai/dev/asset/<subj>` | `https://dev.dataerai.com/api/identity/resolve/did:dataerai:dev:asset:<subj>/` |
| `did:dataerai:beta:asset:<subj>` | `w3id.org/dataerai/beta/asset/<subj>` | `https://beta.dataerai.com/api/identity/resolve/did:dataerai:beta:asset:<subj>/` |

`<kind>` ∈ {asset, dataset, person}; `<subject>` is 32 base32 chars. The env tag
mirrors `IDENTITY_ENV` (empty in production).

## Prerequisite

Each environment's app host (`<env>.dataerai.com` / `app.dataerai.com`) must
serve the console's public `GET /api/identity/resolve/<did>/` endpoint — it does
by default (`AllowAny`, **no** resolver host required). `IDENTITY_ENV` must be set
per environment (Helm `env.identityEnv` → `IDENTITY_ENV`, wired from the
`.gitlab-ci.yml` workflow rules) so DIDs — and therefore their w3id paths — carry
the correct env segment. w3id only redirects; the document lives on our host.
Adjust the hosts in [`.htaccess`](./.htaccess) if the real domains differ.

> A standards-conformant `did:web` variant (w3id → `id.<env>.dataerai.com/.../did.json`)
> is kept commented in [`.htaccess`](./.htaccess); enable it once the `id.<env>`
> resolver hosts are stood up over public HTTPS.

## How to register (one-time)

1. Confirm the app hosts in `.htaccess` and the maintainer contact below.
2. Fork <https://github.com/perma-id/w3id.org>.
3. Copy this `dataerai/` directory to the **root** of your fork.
4. Open a PR; a Community Group member reviews and merges it (w3id auto-deploys).
5. Verify:
   ```bash
   curl -sIL https://w3id.org/dataerai/beta/asset/<subj>
   # → 303 to https://beta.dataerai.com/api/identity/resolve/did:dataerai:beta:asset:<subj>/ → 200
   ```

## Maintainer

- **Org**: Dataerai
- **Contact**: `identity@dataerai.com` _(confirm or replace — w3id requires a
  long-lived address in the PR)._
- **Source of truth**: this directory in the `datatransfer-dataerai` monorepo
  (`ops/w3id/dataerai/`). Edit here and re-PR upstream on change.
