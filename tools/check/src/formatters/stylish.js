/** Human-readable terminal output. */
import pc from 'picocolors';

const MARK = {
  error: () => pc.red('error'),
  warning: () => pc.yellow('warning'),
  notice: () => pc.blue('notice')
};

export default function stylish(result, {quiet = false} = {}) {
  const {findings, summary} = result;
  const out = [];

  const byFile = new Map();
  for(const f of findings) {
    const key = f.file ?? '(this pull request)';
    if(!byFile.has(key)) {
      byFile.set(key, []);
    }
    byFile.get(key).push(f);
  }

  for(const [file, group] of byFile) {
    out.push(pc.underline(file));
    for(const f of group) {
      const location = f.line === null ? '' :
        `${f.line}${f.column === null ? '' : ':' + f.column}`;
      out.push(`  ${pc.dim(location.padStart(7))}  ${MARK[f.severity]()}  ` +
        wrap(f.message, 4));
      // "already there" rather than "already in this file": a finding may be
      // reported against a directory or a namespace, not only a file.
      const tag = f.provenance === 'preexisting' ? pc.dim(' (pre-existing)') :
        f.provenance === 'touched' ? pc.dim(' (already there)') : '';
      out.push(`  ${' '.repeat(7)}  ${pc.dim(f.ruleId)}${tag}`);
      out.push(`  ${' '.repeat(7)}  ${pc.dim(f.docsUrl)}`);
    }
    out.push('');
  }

  out.push(renderSummary(summary, {quiet}));
  return out.join('\n');
}

/** The "what was checked" line every run prints, clean or not. */
export function renderSummary(summary, {quiet = false} = {}) {
  const {counts, rulesRun, critical} = summary;
  const scope = describeScope(summary);

  const parts = [];
  for(const severity of ['error', 'warning', 'notice']) {
    if(counts[severity] > 0) {
      parts.push(`${counts[severity]} ${severity}` +
        (counts[severity] === 1 ? '' : 's'));
    }
  }

  const head = `Checked ${scope} against ${rulesRun} rules.`;
  if(parts.length === 0) {
    return pc.green(`${head} No problems found.`);
  }

  const lines = [`${head} Found ${parts.join(', ')}.`];
  if(quiet && counts.warning + counts.notice > 0) {
    lines.push(pc.dim('Run without --quiet to see warnings and notices.'));
  }
  if(critical > 0) {
    lines.push(pc.dim(
      `${critical} finding${critical === 1 ? '' : 's'} ` +
      `${critical === 1 ? 'affects' : 'affect'} whether an identifier ` +
      'resolves at all; run with --triage for the full list.'));
  }
  return lines.join('\n');
}

/**
 * What this run looked at, for the opening line of every report.
 *
 * A clean run has to be informative rather than merely silent, so this names
 * the scope, the file count, and how much of it is not committed yet.
 */
export function describeScope(summary) {
  const {mode, filesChecked, namespaces, scope, uncommitted} = summary;
  const dirty = uncommitted > 0 ? `, ${uncommitted} not yet committed` : '';
  const plural = filesChecked === 1 ? '' : 's';
  const kind = mode === 'range' ?
    `changed file${plural}` : `file${plural}`;

  // Naming the paths first reads correctly whether the scope is one
  // directory, several, or a single file.
  if(scope !== null && scope !== undefined) {
    return `${scope.join(', ')} (${filesChecked} ${kind}${dirty})`;
  }
  if(mode === 'range') {
    return `${filesChecked} ${kind}${dirty}`;
  }
  // An unscoped whole-tree run counts namespaces, the more meaningful number
  // at that size.
  return `${namespaces} namespaces${dirty}`;
}

// Keep long messages readable without depending on a wrapping library.
function wrap(text, indent, width = 76) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for(const word of words) {
    if(line !== '' && line.length + 1 + word.length > width) {
      lines.push(line);
      line = '';
    }
    line += (line === '' ? '' : ' ') + word;
  }
  if(line !== '') {
    lines.push(line);
  }
  return lines.join('\n' + ' '.repeat(indent + 9));
}
