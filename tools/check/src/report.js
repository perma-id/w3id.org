/**
 * Aggregate reports: `--stats` and `--triage`.
 *
 * Both exist because the default policy suppresses the legacy backlog. That
 * keeps pull requests quiet, so these are how the backlog stays visible: stats
 * for tracking whether it is shrinking, triage for the standing worklist of
 * problems that should be fixed regardless of who introduced them.
 */
import pc from 'picocolors';
import {namespaceMaintainers} from './maintainers.js';
import {isReadme, isHtaccess} from './paths.js';

/** Counts by severity, provenance, rule and namespace. */
export function buildStats(findings, {topNamespaces = 15} = {}) {
  const bySeverity = tally(findings, f => f.severity);
  const byProvenance = tally(findings, f => f.provenance);
  const byRule = tally(findings, f => f.ruleId);
  const byNamespace = tally(
    findings.filter(f => f.namespace !== null), f => f.namespace);

  const critical = findings.filter(f => f.critical);

  return {
    total: findings.length,
    bySeverity,
    byProvenance,
    byRule: sortEntries(byRule),
    byNamespace: sortEntries(byNamespace, topNamespaces),
    namespacesAffected: Object.keys(byNamespace).length,
    critical: {
      total: critical.length,
      namespaces: new Set(
        critical.map(f => f.namespace).filter(n => n !== null)).size,
      byRule: sortEntries(tally(critical, f => f.ruleId))
    }
  };
}

export function renderStats(stats) {
  const out = [];
  out.push(pc.bold('Findings'), '');
  out.push('  by severity   ' + inline(stats.bySeverity,
    ['error', 'warning', 'notice']));
  out.push('  by provenance ' + inline(stats.byProvenance,
    ['introduced', 'touched', 'preexisting']));
  out.push('');

  out.push(pc.bold('By rule'), '');
  for(const [id, count] of Object.entries(stats.byRule)) {
    out.push(`  ${String(count).padStart(6)}  ${id}`);
  }
  out.push('');

  if(Object.keys(stats.byNamespace).length > 0) {
    out.push(pc.bold(
      `Most affected namespaces (of ${stats.namespacesAffected})`), '');
    for(const [ns, count] of Object.entries(stats.byNamespace)) {
      out.push(`  ${String(count).padStart(6)}  ${ns}`);
    }
    out.push('');
  }

  out.push(pc.bold('Critical'), '');
  if(stats.critical.total === 0) {
    out.push('  none');
  } else {
    out.push(`  ${stats.critical.total} findings across ` +
      `${stats.critical.namespaces} namespaces`);
    for(const [id, count] of Object.entries(stats.critical.byRule)) {
      out.push(`  ${String(count).padStart(6)}  ${id}`);
    }
  }
  return out.join('\n');
}

/**
 * The standing worklist: every critical finding in the tree, grouped by
 * namespace, with whatever maintainer usernames could be recovered so the
 * work can be handed out or the owners contacted.
 */
export function buildTriage(findings, ctx) {
  const critical = findings.filter(f => f.critical);
  const byNamespace = new Map();

  for(const f of critical) {
    const ns = f.namespace ?? f.file ?? '(repository)';
    if(!byNamespace.has(ns)) {
      byNamespace.set(ns, []);
    }
    byNamespace.get(ns).push(f);
  }

  const entries = [];
  for(const [namespace, group] of [...byNamespace].sort()) {
    entries.push({
      namespace,
      maintainers: maintainersFor(ctx, namespace),
      findings: group.map(f => ({
        ruleId: f.ruleId,
        file: f.file,
        line: f.line,
        message: f.message
      }))
    });
  }

  // Most-broken namespaces first: that is the order the work should be done.
  entries.sort((a, b) => b.findings.length - a.findings.length ||
    a.namespace.localeCompare(b.namespace));

  return {
    total: critical.length,
    namespaces: entries.length,
    entries
  };
}

export function renderTriage(triage) {
  const out = [];
  if(triage.total === 0) {
    return pc.green('No critical findings. Nothing needs fixing out of band.');
  }
  out.push(pc.bold(
    `${triage.total} critical findings across ${triage.namespaces} ` +
    'namespaces'), '');
  out.push(pc.dim(
    'These affect whether an identifier resolves, or are security ' +
    'problems. They are reported regardless of who introduced them.'), '');

  for(const entry of triage.entries) {
    const who = entry.maintainers.length > 0 ?
      entry.maintainers.map(m => '@' + m).join(' ') :
      pc.dim('no maintainer username recorded');
    out.push(`${pc.underline(entry.namespace)}  ${who}`);
    for(const f of entry.findings) {
      const where = f.line === null ? f.file : `${f.file}:${f.line}`;
      out.push(`  ${pc.dim(where)}`);
      out.push(`    ${f.message}`);
      out.push(`    ${pc.dim(f.ruleId)}`);
    }
    out.push('');
  }
  return out.join('\n');
}

function maintainersFor(ctx, namespace) {
  if(!namespace.startsWith(ctx.idsDir + '/')) {
    return [];
  }
  const paths = ctx.idPaths.filter(
    p => (p === namespace || p.startsWith(namespace + '/')) &&
      (isReadme(p) || isHtaccess(p)));
  return [...namespaceMaintainers(ctx, namespace, paths).usernames].sort();
}

function tally(items, key) {
  const counts = {};
  for(const item of items) {
    const k = key(item);
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return counts;
}

// Descending by count, then by name, so output is stable run to run.
function sortEntries(counts, limit = Infinity) {
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return Object.fromEntries(sorted.slice(0, limit));
}

function inline(counts, order) {
  return order.map(k => `${k} ${counts[k] ?? 0}`).join(' · ');
}
