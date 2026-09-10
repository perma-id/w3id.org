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
    <a :href="post.url">{{ post.title }}</a>
    <div class="news-meta">
      <time :datetime="post.date">{{ post.displayDate }}</time>
      <span v-for="category in post.categories" :key="category">
        · {{ category }}</span>
    </div>
    <div>{{ post.summary }}</div>
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
.news-list li {
  margin: 0 0 1.25rem;
}
.news-meta {
  color: var(--vp-c-text-2);
  font-size: 0.875em;
}
</style>
