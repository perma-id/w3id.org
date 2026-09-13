import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import { buildEnd } from './buildEnd.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'w3id.org',
  titleTemplate: ':title | w3id.org docs',
  description:
    'Documentation for w3id.org, the permanent identifier redirection service ' +
    'run by the W3C Permanent Identifier Community Group.',
  lang: 'en-US',

  // This site is served from the custom domain docs.w3id.org, so it lives at
  // the root. If the custom domain is ever dropped and the site falls back to
  // https://perma-id.github.io/w3id.org/, this must become '/w3id.org/' or
  // every asset on every page will 404.
  base: '/',

  // GitHub Pages serves /foo from foo.html directly, with no redirect.
  cleanUrls: true,

  // README.md documents this directory for somebody reading the repository
  // on GitHub. It is not a page of the site: without this it would build as
  // /README, appear in the sitemap, get a canonical URL and be folded into
  // llms.txt. The nav check in tools/check reads this list, so a file
  // excluded here is also not expected to have a sidebar entry.
  srcExclude: ['README.md'],

  // Requires `fetch-depth: 0` in .github/workflows/docs.yaml.
  lastUpdated: true,

  sitemap: {
    hostname: 'https://docs.w3id.org/'
  },

  head: [
    ['meta', { name: 'author', content: 'W3C Permanent Identifier Community Group' }],

    // Feed autodiscovery. Declared site-wide on purpose: a reader should find
    // the feed from whatever page somebody happened to link them.
    ['link', {
      rel: 'alternate', type: 'application/rss+xml', title: 'w3id.org news',
      href: 'https://docs.w3id.org/news/rss.xml'
    }],
    ['link', {
      rel: 'alternate', type: 'application/atom+xml', title: 'w3id.org news',
      href: 'https://docs.w3id.org/news/atom.xml'
    }]
  ],

  // The canonical URL has to be per-page. Everything in `head` above is
  // injected into every page, so a canonical link there would tell search
  // engines that every page is a duplicate of whichever single URL it named.
  transformPageData(pageData) {
    const url = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: `https://docs.w3id.org/${url}` }])
  },

  // Writes news/rss.xml and news/atom.xml into the build output.
  buildEnd,

  themeConfig: {
    nav: [
      { text: 'Overview', link: '/overview/', activeMatch: '/overview/' },
      { text: 'Guides', link: '/guides/', activeMatch: '/guides/' },
      { text: 'Rules', link: '/rules/', activeMatch: '/rules/' },
      { text: 'FAQ', link: '/faq' },
      { text: 'News', link: '/news/', activeMatch: '/news/' },
      { text: 'w3id.org', link: 'https://w3id.org/' }
    ],

    sidebar: [
      {
        text: 'Overview',
        collapsed: false,
        items: [
          { text: 'What is w3id.org?', link: '/overview/' },
          { text: 'Purpose', link: '/overview/purpose' },
          { text: 'Scope', link: '/overview/scope' }
        ]
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/guides/' },
          { text: 'Creating an identifier', link: '/guides/create-an-id' },
          { text: 'Writing .htaccess rules', link: '/guides/htaccess' },
          { text: 'Content negotiation', link: '/guides/content-negotiation' },
          { text: 'Maintaining an identifier', link: '/guides/maintain-an-id' },
          { text: 'Testing your changes', link: '/guides/testing' },
          { text: 'Running a local server', link: '/guides/local-server' }
        ]
      },
      // Grouped to match the headings in docs/rules/index.md. Rule ids are
      // namespaced, and within any one group the namespace is constant, so the
      // sidebar shows the short name and the group carries the rest. Every
      // group opens with an "Overview" entry pointing at its namespace's index
      // page. The htaccess namespace spans four groups whose titles do not all
      // say so, so each of those anchors the section of the index it belongs
      // to -- otherwise there is nothing in the sidebar tying them together.
      {
        text: 'Rules',
        collapsed: false,
        items: [
          { text: 'Rule catalogue', link: '/rules/' },
          {
            text: 'Files and directories',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/files/' },
              { text: 'only-allowed-names', link: '/rules/files/only-allowed-names' },
              { text: 'no-empty-htaccess', link: '/rules/files/no-empty-htaccess' },
              { text: 'htaccess-required', link: '/rules/files/htaccess-required' },
              { text: 'prefer-readme-md', link: '/rules/files/prefer-readme-md' }
            ]
          },
          {
            text: 'Repository shape',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/tree/' },
              { text: 'no-case-collision', link: '/rules/tree/no-case-collision' },
              { text: 'only-own-identifier', link: '/rules/tree/only-own-identifier' }
            ]
          },
          {
            text: '.htaccess syntax',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/htaccess#syntax' },
              { text: 'no-flag-whitespace', link: '/rules/htaccess/no-flag-whitespace' },
              { text: 'valid-rewrite-flags', link: '/rules/htaccess/valid-rewrite-flags' },
              { text: 'no-inline-comment', link: '/rules/htaccess/no-inline-comment' },
              { text: 'uppercase-rewrite-flags', link: '/rules/htaccess/uppercase-rewrite-flags' }
            ]
          },
          {
            text: 'Rules that never match',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/htaccess#rules-that-never-match' },
              { text: 'rewrite-engine-required', link: '/rules/htaccess/rewrite-engine-required' },
              { text: 'pattern-relative-to-dir', link: '/rules/htaccess/pattern-relative-to-dir' },
              { text: 'anchor-patterns', link: '/rules/htaccess/anchor-patterns' },
              { text: 'no-greedy-capture', link: '/rules/htaccess/no-greedy-capture' },
              { text: 'escape-literal-dots', link: '/rules/htaccess/escape-literal-dots' }
            ]
          },
          {
            text: 'Redirect targets',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/htaccess#redirect-targets' },
              { text: 'no-open-redirect', link: '/rules/htaccess/no-open-redirect' },
              { text: 'https-target', link: '/rules/htaccess/https-target' },
              { text: 'github-raw-target', link: '/rules/htaccess/github-raw-target' },
              { text: 'no-double-slash', link: '/rules/htaccess/no-double-slash' },
              { text: 'no-self-redirect', link: '/rules/htaccess/no-self-redirect' },
              { text: 'avoid-permanent-redirect', link: '/rules/htaccess/avoid-permanent-redirect' }
            ]
          },
          {
            text: 'Directives and negotiation',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/htaccess#directives-and-negotiation' },
              { text: 'allowed-directives', link: '/rules/htaccess/allowed-directives' },
              { text: 'valid-cors-header', link: '/rules/htaccess/valid-cors-header' },
              { text: 'no-406-fallback', link: '/rules/htaccess/no-406-fallback' },
              { text: 'no-options-directive', link: '/rules/htaccess/no-options-directive' }
            ]
          },
          {
            text: 'File format',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/format/' },
              { text: 'no-bom', link: '/rules/format/no-bom' },
              { text: 'no-crlf', link: '/rules/format/no-crlf' },
              { text: 'final-newline', link: '/rules/format/final-newline' },
              { text: 'no-trailing-whitespace', link: '/rules/format/no-trailing-whitespace' },
              { text: 'no-excessive-blank-lines', link: '/rules/format/no-excessive-blank-lines' }
            ]
          },
          {
            text: 'Markdown',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/markdown/' },
              { text: 'prefer-list-over-line-breaks', link: '/rules/markdown/prefer-list-over-line-breaks' }
            ]
          },
          {
            text: 'Pull request shape',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/git/' },
              { text: 'minimal-commits', link: '/rules/git/minimal-commits' },
              { text: 'no-merge-commits', link: '/rules/git/no-merge-commits' },
              { text: 'descriptive-commit-message', link: '/rules/git/descriptive-commit-message' },
              { text: 'branch-not-stale', link: '/rules/git/branch-not-stale' }
            ]
          },
          {
            text: 'Metadata',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/rules/meta/' },
              { text: 'document-identifier-root', link: '/rules/meta/document-identifier-root' },
              { text: 'maintainer-github-username', link: '/rules/meta/maintainer-github-username' },
              { text: 'rule-docs-exist', link: '/rules/meta/rule-docs-exist' }
            ]
          }
        ]
      },
      { text: 'FAQ', link: '/faq' },

      // A plain link, not a group. The news index lists every post already,
      // generated from the post files, so enumerating them here too would be
      // a second copy of the same list maintained by hand.
      { text: 'News', link: '/news/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/perma-id/w3id.org' }
    ],

    editLink: {
      pattern: 'https://github.com/perma-id/w3id.org/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },

    // A client-side index. No third-party account, no API key to rotate, and
    // nothing to keep paying for -- appropriate for a service whose whole
    // premise is still being here in twenty years.
    search: {
      provider: 'local'
    },

    outline: [2, 3],

    footer: {
      message:
        'Operated by the <a href="https://www.w3.org/community/perma-id/">' +
        'W3C Permanent Identifier Community Group</a>. ' +
        'The W3C is not involved in the support or management of this service.'
    }
  },

  vite: {
    plugins: [llmstxt({
      domain: 'https://docs.w3id.org',

      // News posts are listed in llms.txt, so an agent can see that a section
      // exists and fetch a post whose title looks relevant, but they are kept
      // out of the full-text bundle: llms-full.txt is the rules and the
      // guides, and announcements would accumulate in it permanently.
      // Patterns are matched with minimatch against the path relative to
      // docs/, and a single `*` does not cross a `/`, so `news/**` is what
      // covers the whole subtree.
      ignoreFilesPerOutput: { llmsFullTxt: ['news/**'] }
    })]
  }
})
