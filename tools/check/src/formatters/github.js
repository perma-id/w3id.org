/**
 * GitHub Actions workflow commands.
 *
 * These are written to stdout and turned into inline annotations by the
 * runner itself, using the run's own identity. They need no token and no
 * permissions, which is why they work for pull requests from forks -- the
 * Checks API and SARIF upload do not.
 *
 * GitHub renders at most 10 annotations of each level per step and 50 per
 * job, so the most severe findings are annotated and the rest are left to the
 * job summary, with a notice saying so.
 */
import * as core from '@actions/core';

const LEVEL = {error: 'error', warning: 'warning', notice: 'notice'};

export default function github(result, {maxAnnotations = 10} = {}) {
  const {findings} = result;

  // Findings are already sorted most-severe first.
  const annotated = findings.slice(0, maxAnnotations);
  const remaining = findings.length - annotated.length;

  for(const f of annotated) {
    const properties = {
      title: `${f.ruleId}${f.provenance === 'preexisting' ?
        ' (pre-existing)' : ''}`
    };
    // A file-less finding, such as one about the commits themselves, would
    // otherwise be pinned to an arbitrary file.
    if(f.file !== null) {
      properties.file = f.file;
      if(f.line !== null) {
        properties.startLine = f.line;
        properties.endLine = f.endLine ?? f.line;
        if(f.column !== null) {
          properties.startColumn = f.column;
        }
      }
    }
    // core.* handles the %, CR, LF, : and , escaping the workflow command
    // format requires; hand-built strings get this wrong.
    core[LEVEL[f.severity]](`${f.message}\n${f.docsUrl}`, properties);
  }

  if(remaining > 0) {
    core.notice(
      `${remaining} further finding${remaining === 1 ? '' : 's'} ` +
      'not shown here: GitHub renders only a limited number of inline ' +
      'annotations. The full report is in the job summary below.',
      {title: 'w3id-check'});
  }

  return '';
}
