/**
 * The rule registry.
 *
 * Rules are listed explicitly rather than discovered from the filesystem so
 * that the set running in CI is reviewable in a diff, and so that adding a
 * rule is a deliberate act.
 */
import filesOnlyAllowedNames from './files/only-allowed-names.js';
import filesReadmeCanonicalName from './files/readme-canonical-name.js';
import filesHtaccessRequired from './files/htaccess-required.js';
import filesReadmeRequired from './files/readme-required.js';
import filesNoEmptyHtaccess from './files/no-empty-htaccess.js';

import treeNoCaseCollision from './tree/no-case-collision.js';

import formatFinalNewline from './format/final-newline.js';
import formatNoCrlf from './format/no-crlf.js';
import formatNoTrailingWhitespace from './format/no-trailing-whitespace.js';

import gitMinimalCommits from './git/minimal-commits.js';
import gitNoMergeCommits from './git/no-merge-commits.js';
import gitBranchNotStale from './git/branch-not-stale.js';
import gitDescriptiveCommitMessage from './git/descriptive-commit-message.js';

import htaccessRewriteEngineRequired from './htaccess/rewrite-engine-required.js';
import htaccessValidRewriteFlags from './htaccess/valid-rewrite-flags.js';
import htaccessUppercaseRewriteFlags from './htaccess/uppercase-rewrite-flags.js';
import htaccessNoInlineComment from './htaccess/no-inline-comment.js';
import htaccessPatternNoLeadingSlash from './htaccess/pattern-no-leading-slash.js';
import htaccessHttpsTarget from './htaccess/https-target.js';
import htaccessNoOpenRedirect from './htaccess/no-open-redirect.js';
import htaccessValidCorsHeader from './htaccess/valid-cors-header.js';
import htaccessNoSelfRedirect from './htaccess/no-self-redirect.js';
import htaccessAllowedDirectives from './htaccess/allowed-directives.js';

import metaMaintainerGithubUsername from './meta/maintainer-github-username.js';
import metaRuleDocsExist from './meta/rule-docs-exist.js';

export const rules = [
  filesOnlyAllowedNames,
  filesReadmeCanonicalName,
  filesHtaccessRequired,
  filesReadmeRequired,
  filesNoEmptyHtaccess,

  treeNoCaseCollision,

  formatFinalNewline,
  formatNoCrlf,
  formatNoTrailingWhitespace,

  gitMinimalCommits,
  gitNoMergeCommits,
  gitBranchNotStale,
  gitDescriptiveCommitMessage,

  htaccessRewriteEngineRequired,
  htaccessValidRewriteFlags,
  htaccessUppercaseRewriteFlags,
  htaccessNoInlineComment,
  htaccessPatternNoLeadingSlash,
  htaccessHttpsTarget,
  htaccessNoOpenRedirect,
  htaccessValidCorsHeader,
  htaccessNoSelfRedirect,
  htaccessAllowedDirectives,

  metaMaintainerGithubUsername,
  metaRuleDocsExist
];

/** Every rule id, in registry order. */
export const ruleIds = rules.map(r => r.id);

/** Every tag any rule declares, sorted. */
export const ruleTags =
  [...new Set(rules.flatMap(r => r.tags ?? []))].sort();

// A duplicate id would silently shadow a rule in every id-keyed lookup.
const seen = new Set();
for(const rule of rules) {
  if(seen.has(rule.id)) {
    throw new Error(`duplicate rule id: ${rule.id}`);
  }
  seen.add(rule.id);
}
