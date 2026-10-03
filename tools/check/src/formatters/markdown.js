import {describeScope} from './stylish.js';

/**
 * Markdown report, for the Actions job summary and, later, a pull request
 * comment.
 *
 * The audience is a first-time contributor who has just been shown a red X,
 * so the report leads with what to do and keeps the rule machinery secondary.
 */

const HEADING = {
  error: 'Must be fixed',
  warning: 'Worth fixing',
  notice: 'For information'
};

const BLURB = {
  error:
    'These block the pull request. Each one either breaks the identifier ' +
    'or breaks the repository for other people.',
  warning:
    'These do not block the pull request, but a maintainer will probably ' +
    'ask about them.',
  notice:
    'Nothing here needs action from you. Findings marked pre-existing were ' +
    'already in the files you touched.'
};

// Almost everyone who sees this report is contributing once and will not see
// it again, so the invitation has to be here rather than somewhere they could
// go and look. Two different reports are wanted, and each needs its own
// clause: a rule that is wrong reads to a contributor as a rule they failed,
// and a check that should exist is only ever noticed by somebody looking at a
// run that passed.
function feedback(summary) {
  if(summary.feedbackUrl === undefined) {
    return null;
  }
  return 'Wrong about your files, or missing a check it should have made? ' +
    `Please [open an issue](${summary.feedbackUrl}) -- a false positive is a ` +
    'bug in the rule, not something to work around.';
}

export default function markdown(result) {
  const {findings, summary} = result;
  const out = [];
  const invitation = feedback(summary);

  out.push('## w3id.org checks', '');

  if(findings.length === 0) {
    out.push(`All checks passed. ${scopeSentence(summary)}`, '');
    if(invitation !== null) {
      out.push(invitation, '');
    }
    return out.join('\n');
  }

  out.push(overview(summary), '');

  for(const severity of ['error', 'warning', 'notice']) {
    const group = findings.filter(f => f.severity === severity);
    if(group.length === 0) {
      continue;
    }
    out.push(`### ${HEADING[severity]} (${group.length})`, '', BLURB[severity], '');
    out.push('| Where | What | Rule |', '| --- | --- | --- |');
    for(const f of group) {
      out.push(`| ${cell(location(f))} | ${cell(f.message)} | ` +
        `[${cell(f.ruleId)}](${f.docsUrl}) |`);
    }
    out.push('');
  }

  out.push('<details><summary>What was checked</summary>', '');
  out.push(`${scopeSentence(summary)}`, '');
  out.push('Rules run:', '');
  for(const id of summary.ruleIds) {
    out.push(`- \`${id}\``);
  }
  out.push('', '</details>', '');
  // After the findings, not before: the reader came here to be told what to
  // fix, and this must not compete with that for attention.
  if(invitation !== null) {
    out.push('', invitation, '');
  }
  return out.join('\n');
}

function overview(summary) {
  const {counts} = summary;
  if(counts.error > 0) {
    return `**${counts.error} problem${counts.error === 1 ? '' : 's'} must ` +
      'be fixed before this can be merged.** ' + scopeSentence(summary);
  }
  return 'No blocking problems. ' + scopeSentence(summary);
}

function scopeSentence(summary) {
  return `Checked ${describeScope(summary)} against ${summary.rulesRun} rules.`;
}

function location(f) {
  if(f.file === null) {
    return 'this pull request';
  }
  const suffix = f.line === null ? '' : `:${f.line}`;
  return '`' + f.file + suffix + '`';
}

// Table cells cannot contain a raw pipe or newline.
function cell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
}
