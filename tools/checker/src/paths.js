/** Shared path predicates and scope resolution. */
import path from 'node:path';
import {existsSync} from 'node:fs';
import {minimatch, matchesAny} from './glob.js';

/** Canonical README name. */
export const CANONICAL_README = 'README.md';

/**
 * Every README spelling that has landed in the tree.
 *
 * `files/only-allowed-names` rejects anything outside this set;
 * `files/readme-canonical-name` nudges the survivors towards README.md.
 */
export const README_PATTERNS = [
  '**/[Rr][Ee][Aa][Dd][Mm][Ee]',
  '**/[Rr][Ee][Aa][Dd][Mm][Ee].[Mm][Dd]',
  '**/[Rr][Ee][Aa][Dd][Mm][Ee].[Tt][Xx][Tt]'
];

/** Whether a path names a README of any accepted spelling. */
export function isReadme(relPath) {
  return matchesAny(relPath, README_PATTERNS);
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
