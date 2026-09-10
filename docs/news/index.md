---
title: News
---

<script setup>
import {data as posts} from './posts.data.js';
import {CATEGORIES} from './categories.js';

// One section per category, in the order categories.js declares them, with
// the empty ones dropped. Posts arrive newest first and stay that way.
const sections = Object.entries(CATEGORIES)
  .map(([slug, heading]) => ({
    slug, heading,
    posts: posts.filter(post => post.category === slug)
  }))
  .filter(section => section.posts.length > 0);

// A post whose `category:` is missing or misspelled would otherwise vanish
// from this page without a word. Show it rather than lose it.
const uncategorised = posts.filter(post => !(post.category in CATEGORIES));
</script>

# News

Infrequent announcements about w3id.org: changes to the service, to the rules
a contribution has to follow, to the tooling, and to who runs it.

This is not a changelog of individual identifiers. Those are visible in the
[repository history](https://github.com/perma-id/w3id.org/commits/master).

## Subscribe

- [RSS feed](/news/rss.xml) — `https://docs.w3id.org/news/rss.xml`
- [Atom feed](/news/atom.xml) — `https://docs.w3id.org/news/atom.xml`

Both carry the full text of every post. Your reader will find them from any
page on this site without you pasting a URL.

<div v-if="posts.length">

## Posts

<p v-if="sections.length > 1">
  <template v-for="(section, i) in sections" :key="section.slug">
    <a :href="'#' + section.slug">{{ section.heading }}</a><span
      v-if="i < sections.length - 1"> · </span>
  </template>
</p>

<section v-for="section in sections" :key="section.slug">
  <h3 :id="section.slug">{{ section.heading }}</h3>
  <ul>
    <li v-for="post in section.posts" :key="post.url">
      <a :href="post.url">{{ post.title }}</a>
      <br><small><time :datetime="post.date">{{ post.date }}</time> — {{ post.summary }}</small>
    </li>
  </ul>
</section>

<section v-if="uncategorised.length">
  <h3 id="uncategorised">Uncategorised</h3>
  <p>
    These posts declare no category, or one that
    <code>docs/news/categories.js</code> does not list. That is a mistake in
    the post's frontmatter.
  </p>
  <ul>
    <li v-for="post in uncategorised" :key="post.url">
      <a :href="post.url">{{ post.title }}</a>
      <br><small><time :datetime="post.date">{{ post.date }}</time> — {{ post.summary }}</small>
    </li>
  </ul>
</section>

</div>
<div v-else>

There are no posts yet.

</div>
