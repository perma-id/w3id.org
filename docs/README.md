# `docs/`

Source for the w3id.org documentation site, <https://docs.w3id.org/>, also
reachable at <https://w3id.org/docs/>. Built with
[VitePress](https://vitepress.dev/) and published to GitHub Pages on merges to
`master`.

This directory is **only** for the documentation site. Adding or updating an
identifier needs no Node, no npm, and no build step — see the root
[`README.md`](../README.md).

```sh
npm ci
npm run dev      # local preview
npm run build    # what CI runs; fails on dead internal links
```

## Layout

| Path | |
| --- | --- |
| `.vitepress/config.js` | Site config, and the hand-written nav and sidebar. |
| `.vitepress/buildEnd.js` | Writes the RSS and Atom feeds after a build. |
| `overview/`, `guides/`, `rules/` | The pages. |
| `news/` | Announcements. `schema.js` validates each post; `posts.data.js` builds the index. |
| `public/` | Copied verbatim, including the `CNAME`. |

## Two things that catch people out

**Every new page needs a sidebar entry** in `.vitepress/config.js`. A page with
none is unreachable, so a test fails and names the file. The exception is a
directory with a `*.data.js` content loader — `news/` generates its own index,
so posts are not listed by hand.

**A news post needs a permanent `id`** in its frontmatter, a lowercase
`urn:uuid:`. It identifies the post to feed readers, so it must not change if
the post is renamed. Mint one with `uuidgen`. `news/schema.js` rejects a post
without one, during `npm run dev` as well as `npm run build`.

Contributor and agent instructions are in
[`AGENTS.md`](../AGENTS.md) at the repository root.
