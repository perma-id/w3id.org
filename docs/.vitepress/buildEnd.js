// RSS and Atom feeds for docs/news/.
//
// Kept out of config.js because it is procedural code rather than
// configuration. VitePress calls `buildEnd(siteConfig)` once the pages have
// been written, which is why the feeds can be assembled from the same
// content loader the index page uses -- `createContentLoader` is an ordinary
// Node function and does not need to run inside a `*.data.js` module.

import {mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {Feed} from 'feed';
import {createContentLoader} from 'vitepress';
import {CATEGORIES} from '../news/categories.js';

const SITE = 'https://docs.w3id.org';

// Rendered post HTML carries root-relative URLs (`/rules/htaccess/...`). In a
// feed reader those resolve against whatever origin the reader is on, or
// against nothing at all, so every one of them has to be made absolute.
function absolutise(html) {
  return html.replace(/\b(href|src)="\//g, `$1="${SITE}/`);
}

export async function buildEnd(siteConfig) {
  const posts = await createContentLoader('news/*.md', {render: true})
    .load();

  const items = posts
    .filter(page => page.url !== '/news/')
    .sort((a, b) =>
      +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));

  const feed = new Feed({
    title: 'w3id.org news',
    description:
      'Announcements about the w3id.org permanent identifier service: the ' +
      'service itself, the rules for contributing, the tooling, and its ' +
      'governance.',
    id: `${SITE}/news/`,
    link: `${SITE}/news/`,
    language: 'en',
    favicon: `${SITE}/favicon.ico`,
    copyright: 'W3C Permanent Identifier Community Group',
    feedLinks: {
      rss: `${SITE}/news/rss.xml`,
      atom: `${SITE}/news/atom.xml`
    }
  });

  for(const {url, html, frontmatter} of items) {
    const category = CATEGORIES[frontmatter.category];
    feed.addItem({
      title: frontmatter.title,
      id: `${SITE}${url}`,
      link: `${SITE}${url}`,
      description: frontmatter.summary,
      content: absolutise(html),
      date: new Date(frontmatter.date),
      // An unknown category is a mistake in the post, and the index page
      // says so out loud. Here it is simply left off rather than emitted as
      // an empty term.
      category: category ? [{name: category}] : undefined
    });
  }

  // buildEnd runs after the pages are emitted, so this directory will
  // normally exist already. It will not if every post is ever removed.
  const dir = path.join(siteConfig.outDir, 'news');
  mkdirSync(dir, {recursive: true});
  writeFileSync(path.join(dir, 'rss.xml'), feed.rss2());
  writeFileSync(path.join(dir, 'atom.xml'), feed.atom1());

  siteConfig.logger.info(
    `feeds: wrote ${items.length} item(s) to news/rss.xml and news/atom.xml`);
}
