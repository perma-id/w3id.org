/** Shared path predicates for identifier namespaces. */
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
