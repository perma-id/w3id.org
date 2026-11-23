/**
 * Classification of a finding against the change under review.
 *
 * This is what lets the checker hold a contributor to what they actually
 * changed while a large legacy backlog stays suppressed.
 */

/**
 * Classify a finding.
 *
 * - `introduced`  the finding sits on a line this change added or modified,
 *                 or anywhere in a file this change created. A finding with
 *                 no line number counts as introduced when its file or its
 *                 namespace was created by this change.
 * - `touched`     the finding is in a file or namespace this change touches,
 *                 but on a line it left alone.
 * - `preexisting` anywhere else.
 *
 * A run with no commit range (`--all`) treats everything as `introduced`, so
 * that an audit reports at each rule's declared severity.
 *
 * @param {object} finding - must carry `file`; `line` is optional.
 * @param {Context} ctx
 * @returns {string} one of the provenance names.
 */
export function classify(finding, ctx) {
  if(!ctx.hasRange) {
    return 'introduced';
  }

  const {file, line} = finding;

  // A finding with no file at all belongs to the change itself -- git-scope
  // rules report about the commits, not about the tree.
  if(file === undefined || file === null) {
    return 'introduced';
  }

  if(ctx.addedPaths.has(file)) {
    return 'introduced';
  }

  const changed = ctx.changedPaths.has(file);
  if(changed && typeof line === 'number') {
    const lines = ctx.addedLines.get(file);
    if(lines !== undefined && lines.has(line)) {
      return 'introduced';
    }
  }

  if(changed) {
    return 'touched';
  }

  // A rule may report against a directory or a namespace rather than a file.
  // Treat it as touched when the change reaches anywhere inside it.
  const ns = ctx.namespaceOf(file);
  if(ns !== null && ctx.changedNamespaces.has(ns)) {
    return 'touched';
  }
  for(const changedPath of ctx.changedPaths) {
    if(changedPath.startsWith(file.replace(/\/$/, '') + '/')) {
      return 'touched';
    }
  }

  return 'preexisting';
}
