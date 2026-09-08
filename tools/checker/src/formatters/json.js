/**
 * Machine-readable output.
 *
 * This is the artifact payload a later privileged workflow reads to post a
 * pull request comment, and the form `--stats` is tracked in over time. It is
 * treated as untrusted data by that workflow: it must never be executed, and
 * every string in it may contain text a contributor chose.
 */
export default function json(result) {
  const {findings, summary, stats, triage} = result;
  return JSON.stringify({
    version: 1,
    summary,
    ...(stats === undefined ? {} : {stats}),
    ...(triage === undefined ? {} : {triage}),
    findings
  }, null, 2);
}
