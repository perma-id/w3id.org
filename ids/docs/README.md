# /docs/

The documentation site for [w3id.org](https://w3id.org/).

[`https://w3id.org/docs/`](https://w3id.org/docs/) redirects to
[`https://docs.w3id.org/`](https://docs.w3id.org/), and any sub-path is passed
through, so
[`https://w3id.org/docs/guides/create-an-id`](https://w3id.org/docs/guides/create-an-id)
resolves to the corresponding page.

The site is built with [VitePress](https://vitepress.dev/) from the
[`docs/`](https://github.com/perma-id/w3id.org/tree/master/docs) directory of
this repository, and published to GitHub Pages on merges to `master`.

Machine-readable copies of the whole site are published at
[`https://w3id.org/docs/llms.txt`](https://w3id.org/docs/llms.txt) and
[`https://w3id.org/docs/llms-full.txt`](https://w3id.org/docs/llms-full.txt),
and any page is available as raw Markdown by appending `.md` to its URL.

## Notes

Redirects here are **302**, not 301: the layout of the documentation site is
expected to change, and a cached permanent redirect cannot be taken back.

Requests to `https://w3id.org/docs` (no trailing slash) are redirected by Apache
to `https://w3id.org/docs/` first, and then on to the documentation site. That
extra hop is expected — see the note in `.htaccess` before trying to remove it.

## Contact

This space is administered by:

- **W3C Permanent Identifier Community Group**
- Mailing list: <public-perma-id@w3.org>
- GitHub organization: [perma-id](https://github.com/perma-id)
