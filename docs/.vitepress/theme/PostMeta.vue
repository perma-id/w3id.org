<script setup>
import {computed} from 'vue';
import {useData} from 'vitepress';
import {CATEGORIES, formatDate} from '../../news/schema.js';

const {page, frontmatter} = useData();

// Only on a news post -- not on the news index, and not on any other page of
// the site. This component is rendered into a slot of the shared layout, so
// without this guard it would appear on every page.
//
// `relativePath` is the source path (`news/2026-09-10-slug.md`), which does
// not depend on `cleanUrls` or on any rewrite, unlike the route path.
const isPost = computed(() =>
  page.value.relativePath.startsWith('news/') &&
  page.value.relativePath !== 'news/index.md');

// Shared with the index page, so the two places a date appears agree, and
// deterministic, so the static build and the browser produce the same string.
const published = computed(() => formatDate(frontmatter.value.date));

const categories = computed(() =>
  (frontmatter.value.categories ?? [])
    .map(slug => CATEGORIES[slug] ?? slug));
</script>

<template>
  <div v-if="isPost" class="post-meta">
    <time :datetime="published.iso">{{ published.display }}</time>
    <span v-for="category in categories" :key="category">
      · {{ category }}</span>
  </div>
</template>

<style scoped>
/* No negative margin here. The theme resets every heading to `margin: 0` and
   gives `.vp-doc h1` `position: relative`, so pulling the content up does not
   just close the gap -- the title paints on top of this line. */
.post-meta {
  color: var(--vp-c-text-2);
  font-size: 0.875em;
  margin-bottom: 0.5rem;
}
</style>
