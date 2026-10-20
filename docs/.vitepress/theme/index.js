// The site's theme: the stock VitePress default theme, plus one component in
// one slot.
//
// `doc-before` renders immediately above the page's Markdown, which means the
// metadata line sits above a post's `# Title` rather than below it. There is
// no slot between the two -- the heading is inside the rendered content -- and
// putting it below would mean rewriting the Markdown during the build, which
// is a fragile trick for a cosmetic gain.

import DefaultTheme from 'vitepress/theme';
import {h} from 'vue';
import PostMeta from './PostMeta.vue';

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'doc-before': () => h(PostMeta)
  })
};
