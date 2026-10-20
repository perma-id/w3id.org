/**
 * A large share of commits arrive with the message GitHub's web editor filled
 * in by default. Across a repository this size, "Update .htaccess" is
 * unsearchable and says nothing about which identifier changed.
 * The repository README already asks contributors to replace it.
 */

// Messages the GitHub web interface generates when the author types nothing.
const DEFAULT_MESSAGE =
  /^(Create|Update|Delete|Add|Rename)\s+(\S+\s+to\s+\S+|[^\s/]+)$/i;
const UPLOAD_MESSAGE = /^Add files via upload$/i;
const REVIEW_MESSAGE = /^(Apply suggestions? from|Apply suggestion from|Update)\b.*\bcode review\b/i;

// Filenames that make a default message uninformative here, because every
// identifier in the repository has one.
const UBIQUITOUS = /^(\.htaccess|readme(\.md|\.txt)?)$/i;

export default {
  id: 'git/descriptive-commit-message',
  description: 'Commit messages should name the identifier being changed',
  tags: ['git', 'pr'],
  severity: 'warning',
  scope: 'git',
  messages: {
    defaultMessage:
      'Commit {{sha}} still has GitHub\'s default message, "{{subject}}". ' +
      'Every identifier here has an .htaccess and a README, so this does ' +
      'not say what changed. Name the identifier, for example ' +
      '"{{example}}".',
    upload:
      'Commit {{sha}} has the message "{{subject}}", which GitHub generates ' +
      'for drag-and-drop uploads. Name the identifier being added, for ' +
      'example "{{example}}".'
  },
  check(ctx, report) {
    if(!ctx.hasRange) {
      return;
    }
    for(const commit of ctx.commits) {
      // A merge commit's generated subject is a separate problem.
      if(commit.parents.length > 1) {
        continue;
      }
      const subject = commit.subject.trim();
      const example = exampleFor(commit, ctx);

      if(UPLOAD_MESSAGE.test(subject)) {
        report({
          messageId: 'upload',
          data: {sha: commit.sha.slice(0, 8), subject, example}
        });
        continue;
      }

      const m = DEFAULT_MESSAGE.exec(subject);
      if(m === null || REVIEW_MESSAGE.test(subject)) {
        continue;
      }
      // "Update the-thing-i-changed" is a fine message; only the generic
      // filenames every identifier shares are uninformative.
      const target = m[2].split(/\s+to\s+/i).pop();
      if(!UBIQUITOUS.test(target)) {
        continue;
      }
      report({
        messageId: 'defaultMessage',
        data: {sha: commit.sha.slice(0, 8), subject, example}
      });
    }
  }
};

// Build a suggestion from whatever the commit actually touched.
function exampleFor(commit, ctx) {
  for(const file of commit.files) {
    const ns = ctx.namespaceOf(file);
    if(ns !== null && ns !== ctx.idsDir) {
      return `Add redirect for ${ns.slice(ctx.idsDir.length + 1)}`;
    }
  }
  return 'Add redirect for my-project';
}
