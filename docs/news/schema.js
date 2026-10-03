// What a news post must look like, and the check that enforces it.
//
// Kept out of posts.data.js because VitePress rewrites a `*.data.js` module
// down to its `data` export alone -- any other named export from that file
// would silently disappear.
//
// `validatePosts` is called from both posts.data.js and
// .vitepress/buildEnd.js, so a bad post stops `npm run dev` as well as
// `npm run build`, and the feeds can never be written from posts that have
// not been checked.

// The categories a post may declare. The key is what a post writes in its
// `categories:` frontmatter; the value is the display name, used on the index
// and as the category name in the RSS and Atom feeds.
export const CATEGORIES = {
  service: 'Service and operations',
  policy: 'Policy and rules',
  tooling: 'Tooling',
  governance: 'Governance'
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * A post's date, as an ISO day and as the string the page shows.
 *
 * Both are computed the same way in the loader and in the PostMeta
 * component, so the two places that display a date agree. Deliberately not
 * `Intl`: this runs once during the static build and again in the visitor's
 * browser during hydration, and anything that consults an ambient locale,
 * timezone or ICU version can differ between the two. Spelling the format
 * out cannot.
 *
 * @param {Date|string} value - a `date` from post frontmatter, which YAML
 *   parses to a Date when unquoted and leaves as a string when quoted.
 *
 * @returns {{iso: string, display: string}} the day as `YYYY-MM-DD`, and as
 *   `10 September 2026`.
 */
export function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  const iso = date.toISOString().slice(0, 10);
  const [year, month, day] = iso.split('-');
  return {
    iso,
    display: `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`
  };
}

// RFC 4122 section 3: a UUID should be generated in lowercase, and the
// `urn:uuid:` form is the URI spelling of one. Lowercase is required here
// rather than merely accepted, because RFC 4287 says Atom ids are compared
// character by character -- to a conforming reader, changing the case of an
// id makes it a different post.
const URN_UUID = new RegExp(
  '^urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');

// Mint one with `uuidgen` (which prints the bare lowercase form; add the
// `urn:uuid:` prefix yourself) or with node's crypto.randomUUID().
const HOW_TO_MINT =
  'Mint one with `uuidgen` and write it as `id: urn:uuid:<the uuid>`.';

/**
 * Check every news post, and throw naming the file if any is wrong.
 *
 * @param {Array<object>} posts - createContentLoader output, one per post,
 *   each with `url` and `frontmatter`.
 *
 * @throws {Error} on the first file that fails, with every problem in it.
 */
export function validatePosts(posts) {
  const problems = [];
  const seen = new Map();

  for(const {url, frontmatter} of posts) {
    const where = frontmatter?.title ?
      `${url} ("${frontmatter.title}")` : url;

    for(const field of ['title', 'date', 'summary']) {
      if(!frontmatter?.[field]) {
        problems.push(`${where}: no \`${field}\` in the frontmatter.`);
      }
    }

    const {id} = frontmatter ?? {};
    if(!id) {
      problems.push(
        `${where}: no \`id\`. Every post needs a permanent identifier, so ` +
        `that a feed reader still recognises it if the post ever moves. ` +
        HOW_TO_MINT);
    } else if(!URN_UUID.test(id)) {
      problems.push(
        `${where}: \`id\` is \`${id}\`, which is not a lowercase ` +
        `\`urn:uuid:\`. ` + HOW_TO_MINT);
    } else if(seen.has(id)) {
      // The one that cannot be repaired later: two posts sharing an id
      // collide into a single entry in every subscriber's reader, and those
      // readers have already cached it by the time anybody notices.
      problems.push(
        `${where}: \`id\` ${id} is already used by ${seen.get(id)}. ` +
        `Each post needs its own.`);
    } else {
      seen.set(id, where);
    }

    const categories = frontmatter?.categories;
    if(!Array.isArray(categories) || categories.length === 0) {
      problems.push(
        `${where}: no \`categories\`. Write a list, e.g. ` +
        `\`categories: [tooling]\`.`);
    } else {
      for(const category of categories) {
        if(!(category in CATEGORIES)) {
          problems.push(
            `${where}: unknown category \`${category}\`. ` +
            `Use one of: ${Object.keys(CATEGORIES).join(', ')}.`);
        }
      }
    }
  }

  if(problems.length > 0) {
    throw new Error(
      `docs/news: ${problems.length} problem(s) in the news posts:\n  ` +
      problems.join('\n  '));
  }

  return posts;
}
