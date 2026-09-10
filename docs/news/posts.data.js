// The list of news posts, read from the Markdown files in this directory.
//
// VitePress only treats a file as a data loader if its name matches
// `*.data.js` (or .mjs/.ts/.mts) and it default-exports the loader. The
// consuming side imports the *named* `data` export, not the default:
//
//   import {data as posts} from './posts.data.js'
//
// The index page is generated from this, so adding a post means adding one
// file and nothing else -- not the index, and not the sidebar, which links
// the index rather than the posts.

import {createContentLoader} from 'vitepress';

export default createContentLoader('news/*.md', {
  // The feeds carry the full text of each post, not just a summary.
  render: true,
  transform(raw) {
    return raw
      // index.md lives in this directory and is not a post.
      .filter(page => page.url !== '/news/')
      .sort((a, b) =>
        +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .map(page => ({
        url: page.url,
        html: page.html,
        title: page.frontmatter.title,
        summary: page.frontmatter.summary,
        category: page.frontmatter.category,
        // Frontmatter dates arrive as a Date once YAML has parsed them, and
        // as a string if quoted. Normalise to an ISO day so the page and the
        // feeds format from the same value.
        date: new Date(page.frontmatter.date).toISOString().slice(0, 10)
      }));
  }
});
