import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

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

  // Requires `fetch-depth: 0` in .github/workflows/docs.yaml.
  lastUpdated: true,

  sitemap: {
    hostname: 'https://docs.w3id.org/'
  },

  head: [
    ['meta', { name: 'author', content: 'W3C Permanent Identifier Community Group' }],
    ['link', { rel: 'canonical', href: 'https://docs.w3id.org/' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Overview', link: '/overview/', activeMatch: '/overview/' },
      { text: 'Guides', link: '/guides/', activeMatch: '/guides/' },
      { text: 'Rules', link: '/rules/', activeMatch: '/rules/' },
      { text: 'FAQ', link: '/faq' },
      { text: 'w3id.org', link: 'https://w3id.org/' }
    ],

    sidebar: [
      {
        text: 'Overview',
        collapsed: false,
        items: [
          { text: 'What w3id.org is', link: '/overview/' },
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
          { text: 'Testing your changes', link: '/guides/testing' }
        ]
      },
      // Grouped to match the headings in docs/rules/index.md. Rule ids are
      // namespaced, and within any one group the namespace is constant, so the
      // sidebar shows the short name and the group carries the rest. Each
      // namespace's own index page appears once, as that namespace's first
      // "Overview" entry.
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
              { text: 'readme-required', link: '/rules/files/readme-required' },
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
              { text: 'Overview', link: '/rules/htaccess/' },
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
              { text: 'no-trailing-whitespace', link: '/rules/format/no-trailing-whitespace' }
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
              { text: 'maintainer-github-username', link: '/rules/meta/maintainer-github-username' },
              { text: 'rule-docs-exist', link: '/rules/meta/rule-docs-exist' }
            ]
          }
        ]
      },
      { text: 'FAQ', link: '/faq' }
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
    plugins: [llmstxt({ domain: 'https://docs.w3id.org' })]
  }
})
