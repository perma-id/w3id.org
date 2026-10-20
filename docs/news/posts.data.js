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
import {CATEGORIES, formatDate, validatePosts} from './schema.js';

export default createContentLoader('news/*.md', {
  // The feeds carry the full text of each post, not just a summary.
  render: true,
  transform(raw) {
    // index.md lives in this directory and is not a post.
    const posts = raw.filter(page => page.url !== '/news/');

    // Throws, naming the file, on a missing or duplicate id, an unknown
    // category, or a missing title, date or summary. Doing it here means
    // `npm run dev` fails as soon as the file is saved.
    validatePosts(posts);

    return posts
      .sort((a, b) =>
        +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .map(page => {
        // `iso` for <time datetime>, `display` for what the page shows.
        const {iso, display} = formatDate(page.frontmatter.date);
        return {
          url: page.url,
          html: page.html,
          id: page.frontmatter.id,
          title: page.frontmatter.title,
          summary: page.frontmatter.summary,
          categories: page.frontmatter.categories
            .map(slug => CATEGORIES[slug]),
          date: iso,
          displayDate: display
        };
      });
  }
});
