---
title: News
---

<script setup>
import {data as posts} from './posts.data.js';
</script>

# News

Infrequent announcements about w3id.org: changes to the service, to the rules
a contribution has to follow, to the tooling, and to who runs it.

This is not a changelog of individual identifiers. Those are visible in the
[repository history](https://github.com/perma-id/w3id.org/commits/master).

## Posts

<ul v-if="posts.length" class="news-list">
  <li v-for="post in posts" :key="post.id">
    <h3><a :href="post.url">{{ post.title }}</a></h3>
    <div class="news-meta">
      <time :datetime="post.date">{{ post.displayDate }}</time>
      <span v-for="category in post.categories" :key="category">
        · {{ category }}</span>
    </div>
    <p>{{ post.summary }}</p>
  </li>
</ul>
<p v-else>There are no posts yet.</p>

## Subscribe

- [RSS](/news/rss.xml) — `https://docs.w3id.org/news/rss.xml`
- [Atom](/news/atom.xml) — `https://docs.w3id.org/news/atom.xml`

<style scoped>
.news-list {
  list-style: none;
  padding: 0;
}
.news-list li + li {
  margin-top: 2rem;
}
/* The theme gives an h3 a 32px top margin, which belongs between sections
   rather than between the list item and its own title. */
.news-list h3 {
  margin-top: 0;
}
.news-meta {
  color: var(--vp-c-text-2);
  font-size: 0.875em;
  margin-top: 0.25rem;
}
.news-list p {
  margin-top: 0.5rem;
}
</style>
