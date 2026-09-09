/** Shared path predicates and scope resolution. */
import path from 'node:path';
import {existsSync} from 'node:fs';
import {minimatch, matchesAny} from './glob.js';

/** Canonical README name. */
export const CANONICAL_README = 'README.md';

/**
 * The markup extensions GitHub renders when it displays a directory's README,
 * mapped to the name a person would call the format.
 *
 * Being wrong in either direction costs something. Leave one out and the rule
 * calls a working README an error; put one in that GitHub does not render and
 * the rule stays quiet about a file that shows up as raw punctuation. This is
 * the set GitHub's own markup library handles.
 */
const README_MARKUP = new Map([
  ['md', 'Markdown'],
  ['markdown', 'Markdown'],
  ['mdown', 'Markdown'],
  ['mkdn', 'Markdown'],
  ['adoc', 'AsciiDoc'],
  ['asciidoc', 'AsciiDoc'],
  ['asc', 'AsciiDoc'],
  ['rst', 'reStructuredText'],
  ['org', 'Org mode'],
  ['textile', 'Textile'],
  ['rdoc', 'RDoc'],
  ['creole', 'Creole'],
  ['mediawiki', 'MediaWiki'],
  ['wiki', 'MediaWiki'],
  ['pod', 'Pod']
]);

/** The extensions above that GitHub renders as Markdown. */
const MARKDOWN_EXTENSIONS = new Set(
  [...README_MARKUP].filter(([, format]) => format === 'Markdown')
    .map(([extension]) => extension));

/** A glob matching a word in any mix of upper and lower case. */
function anyCase(word) {
  return [...word].map(c => `[${c.toUpperCase()}${c}]`).join('');
}

/**
 * The files the format rules inspect: everything here that a person edits as
 * text.
 *
 * Derived from the list above rather than written out, so that accepting a new
 * README format cannot quietly exempt it from the format rules. A file the
 * repository is willing to keep is a file worth holding to the same standard
 * -- otherwise widening what counts as a README silently widens what may carry
 * a BOM or CRLF line endings.
 *
 * Case-insensitive, because glob matching here is not: a plain `**\/*.md`
 * pattern passes over `README.MD` entirely, and a file is no less text for
 * how its extension is capitalised. A bare `README` has no extension to
 * match, so it is named directly.
 */
export const TEXT_FILE_PATTERNS = [
  '**/.htaccess',
  `**/*.${anyCase('txt')}`,
  `**/${anyCase('readme')}`,
  ...[...README_MARKUP.keys()].map(
    extension => `**/*.${anyCase(extension)}`)
];

// `readme`, optionally followed by one recognised extension. Anything else --
// `README..md`, `README.me`, `_readme.md` -- is a file GitHub will not show as
// the directory's README, so it is not a README as far as this tool is
// concerned.
const README_NAME = new RegExp(
  `^readme(\\.(txt|${[...README_MARKUP.keys()].join('|')}))?$`, 'i');

/**
 * Whether a path names a README that GitHub would render as such.
 *
 * Deliberately generous: the checker should not call a working README an
 * error. `files/prefer-readme-md` is what nudges the survivors towards
 * README.md.
 */
export function isReadme(relPath) {
  return README_NAME.test(relPath.split('/').pop());
}

/**
 * How GitHub will treat a README with this name.
 *
 * Returns `{kind, format}` where `kind` is:
 *
 * - `markdown`   -- already Markdown, so only the name is in question;
 * - `markup`     -- rendered, but as some other syntax, so the content has to
 *                   be converted and not merely renamed;
 * - `plain-text` -- shown verbatim, whatever the content happens to be.
 */
export function readmeFormat(name) {
  const dot = name.indexOf('.');
  const extension = dot === -1 ? '' : name.slice(dot + 1).toLowerCase();
  if(MARKDOWN_EXTENSIONS.has(extension)) {
    return {kind: 'markdown', format: 'Markdown'};
  }
  const format = README_MARKUP.get(extension);
  if(format !== undefined) {
    return {kind: 'markup', format};
  }
  return {kind: 'plain-text', format: 'plain text'};
}

/** Whether a path names an `.htaccess`. */
export function isHtaccess(relPath) {
  return minimatch(relPath, '**/.htaccess');
}

/**
 * Directories inside the identifier tree that hold service infrastructure
 * rather than an identifier, and so are exempt from namespace rules.
 */
export function isInfrastructure(relPath, idsDir) {
  const rest = relPath.slice(idsDir.length + 1);
  // `.assets` and `.utils`; no identifier may begin with a dot.
  return rest.startsWith('.');
}

/** A path argument that cannot be used as a scope. */
export class ScopeError extends Error {}

/**
 * Turn path arguments into repository-relative scope prefixes.
 *
 * Arguments resolve against `cwd` rather than the repository root, so that
 * `cd ids && w3id-check foo` does what it looks like.
 *
 * A nonexistent path is an error rather than an empty scope: checking nothing
 * and reporting success is the one outcome a contributor must never get from a
 * typo.
 *
 * @param {string[]} args - raw path arguments.
 * @param {object} opts
 * @param {string} opts.root - repository root.
 * @param {string} opts.cwd - directory the arguments are relative to.
 * @returns {string[]|null} scope prefixes, or null for the whole repository.
 */
export function resolveScope(args, {root, cwd}) {
  if(args.length === 0) {
    return null;
  }

  const resolved = [];
  for(const arg of args) {
    const absolute = path.resolve(cwd, arg);
    const relative = path.relative(root, absolute);

    if(relative.startsWith('..') || path.isAbsolute(relative)) {
      throw new ScopeError(
        `"${arg}" is outside the repository at ${root}.`);
    }
    if(!existsSync(absolute)) {
      throw new ScopeError(`"${arg}" does not exist.`);
    }
    // An argument naming the repository root asks for everything, which is
    // the absence of a scope rather than a scope of one entry.
    if(relative === '') {
      return null;
    }
    resolved.push(relative.split(path.sep).join('/').replace(/\/+$/, ''));
  }

  // Sorting puts a parent before anything nested inside it, so the filter
  // below keeps the parent and drops the redundant child.
  const unique = [...new Set(resolved)].sort();
  return unique.filter(candidate =>
    !unique.some(other => other !== candidate &&
      candidate.startsWith(other + '/')));
}

/**
 * The identifier namespaces present in the tree.
 *
 * A namespace is a *directory* under the identifier tree, which in a git tree
 * means one with something inside it. A file sitting directly in `ids/` -- the
 * homepage, the global rewrite rules -- is not an identifier and has no README
 * or maintainer of its own, so it must not be mistaken for one.
 */
export function identifierNamespaces(ctx) {
  const namespaces = new Set();
  for(const p of ctx.idPaths) {
    if(isInfrastructure(p, ctx.idsDir)) {
      continue;
    }
    const namespace = ctx.namespaceOf(p);
    // `namespaceOf` works from the string alone, so for a top-level file it
    // hands back the file itself. Something has to live *inside* a namespace.
    if(namespace === null || namespace === ctx.idsDir || namespace === p) {
      continue;
    }
    namespaces.add(namespace);
  }
  return namespaces;
}
