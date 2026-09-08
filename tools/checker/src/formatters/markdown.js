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

export default function markdown(result) {
  const {findings, summary} = result;
  const out = [];

  out.push('## w3id.org checks', '');

  if(findings.length === 0) {
    out.push(`All checks passed. ${scopeSentence(summary)}`, '');
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
  const {mode, filesChecked, namespaces, rulesRun} = summary;
  return mode === 'range' ?
    `Checked ${filesChecked} changed file` +
      `${filesChecked === 1 ? '' : 's'} against ${rulesRun} rules.` :
    `Checked ${namespaces} identifier namespaces against ${rulesRun} rules.`;
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
