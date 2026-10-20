# /docs/

The documentation site for [w3id.org](https://w3id.org/).

[`https://w3id.org/docs/`](https://w3id.org/docs/) redirects to
[`https://docs.w3id.org/`](https://docs.w3id.org/), and any sub-path is passed
through unchanged.

Redirects here are **302**, not 301: the layout of the documentation site is
expected to change, and a cached permanent redirect cannot be taken back.

Requests to `https://w3id.org/docs` with no trailing slash are redirected by
Apache to `https://w3id.org/docs/` first, and then on to the site. That extra
hop is expected, and it is why the `.htaccess` must not set `DirectorySlash
Off` or `Options -Indexes` — either one stops the rewrite rule running for the
bare URL.

The site is built from the
[`docs/`](https://github.com/perma-id/w3id.org/tree/master/docs) directory of
this repository, which has its own README.

## Contact

This space is administered by:

- **W3C Permanent Identifier Community Group**
- Mailing list: <public-perma-id@w3.org>
- GitHub organization: [perma-id](https://github.com/perma-id)
