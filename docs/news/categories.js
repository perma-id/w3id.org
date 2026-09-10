// The categories a news post may declare.
//
// Kept in its own module rather than in posts.data.js because VitePress
// rewrites a `*.data.js` module down to its `data` export alone -- any other
// named export from that file would silently disappear.
//
// The key is what a post writes in its `category:` frontmatter. The value is
// the heading it appears under on the index, and the name given to the item
// in the RSS and Atom feeds. The order here is the order of the sections on
// the index page.

export const CATEGORIES = {
  service: 'Service and operations',
  policy: 'Policy and rules',
  tooling: 'Tooling',
  governance: 'Governance'
};
