/**
 * Recovery of maintainer GitHub usernames from unstructured text.
 *
 * There is no agreed format. Across the tree maintainers are recorded in at
 * least fifteen shapes -- `GitHub username: x`, `(GitHub: x)`, a bare
 * `@handle`, a profile URL, a markdown link whose text is a person's name,
 * numbered lists, markdown tables, emoji headings -- in `.htaccess` comments,
 * in READMEs, or in neither.
 *
 * This module is deliberately lenient: it answers "is there a plausible GitHub
 * username recorded here at all", which is what the pull request template
 * actually asks for. It is the seam a structured metadata format would replace
 * later, so callers depend on `findUsernames` and not on any of these regexes.
 */

// GitHub's own rule: 1-39 alphanumerics or hyphens, no leading or trailing
// hyphen, no consecutive hyphens.
const USERNAME = '[A-Za-z\\d](?:[A-Za-z\\d]|-(?=[A-Za-z\\d])){0,38}';

// Words that follow "GitHub" as a label, appear as a github.com path prefix,
// or are otherwise never a person's account name. Without these the loose
// patterns below happily report "username", "com" and "repository".
const NOT_A_USER = new Set([
  // Label words: "GitHub username:", "GitHub ID:", "GitHub Repository:".
  'username', 'user', 'users', 'id', 'ids', 'account', 'handle', 'profile',
  'profiles', 'repository', 'repositories', 'repo', 'repos', 'org', 'orgs',
  'organization', 'organisation', 'organizations', 'team', 'teams', 'name',
  'page', 'pages', 'link', 'url', 'com', 'http', 'https', 'www',
  // github.com paths that are the site itself rather than an account.
  'apps', 'about', 'features', 'topics', 'collections', 'sponsors',
  'settings', 'notifications', 'explore', 'marketplace', 'pricing', 'login',
  'join', 'search', 'issues', 'pulls', 'blog', 'contact', 'security',
  'readme', 'gist', 'raw', 'assets', 'site', 'gh-pages'
]);

const PATTERNS = [
  // GitHub username: x / GitHub user: x / GitHub ID: @x / github: @x
  new RegExp(
    `\\bgit\\s?hub\\s*(?:user)?(?:name|id|account|handle|profile)?\\s*[:=]\\s*@?(${USERNAME})\\b`,
    'gi'),
  // (GitHub: x) / [GitHub: x] / - GitHub - x
  // A separator that excludes '.' so that `github.com/x` is left to the
  // URL pattern below rather than yielding "com".
  new RegExp(`\\bgit\\s?hub\\b[^A-Za-z\\d.\\n]{1,4}@?(${USERNAME})\\b`, 'gi'),
  // https://github.com/x, github.com/x, with or without a scheme or trailing
  // repository path.
  new RegExp(
    `(?:https?://)?(?:www\\.)?github\\.com/(${USERNAME})(?:[/)\\]>,.\\s]|$)`,
    'gi'),
  // A bare @handle, as used in maintainer lists.
  new RegExp(`(?:^|[\\s(\\[<,;])@(${USERNAME})\\b`, 'gm')
];

/**
 * Every plausible GitHub username mentioned in a block of text.
 *
 * @param {string} text
 * @returns {Set<string>} usernames, lower-cased for comparison.
 */
export function findUsernames(text) {
  const found = new Set();
  if(typeof text !== 'string') {
    return found;
  }
  for(const pattern of PATTERNS) {
    // Each pattern carries the global flag, so reset between texts.
    pattern.lastIndex = 0;
    let m;
    while((m = pattern.exec(text)) !== null) {
      const name = m[1];
      if(NOT_A_USER.has(name.toLowerCase())) {
        continue;
      }
      found.add(name.toLowerCase());
    }
  }
  return found;
}

/**
 * Maintainer usernames recorded anywhere in a namespace.
 *
 * Only `.htaccess` comments are considered, not its directives: a redirect
 * target such as `https://github.com/someone/repo` names a repository owner,
 * who need not be the person responsible for the identifier.
 *
 * @returns {{usernames: Set<string>, sources: string[]}}
 */
export function namespaceMaintainers(ctx, namespace, paths) {
  const usernames = new Set();
  const sources = [];

  for(const path of paths) {
    const text = ctx.read(path);
    if(text === null) {
      continue;
    }
    const searchable = path.endsWith('.htaccess') ?
      ctx.htaccess(path)?.comments.map(c => c.text).join('\n') ?? '' : text;
    const found = findUsernames(searchable);
    if(found.size === 0) {
      continue;
    }
    for(const name of found) {
      usernames.add(name);
    }
    sources.push(path);
  }

  return {usernames, sources};
}
