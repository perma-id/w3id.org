/** Configuration loading and severity policy resolution. */
import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import {rules} from './rules/index.js';

export const SEVERITIES = ['error', 'warning', 'notice'];
export const PROVENANCES = ['introduced', 'touched', 'preexisting'];

const CONFIG_NAMES = ['.w3id-check.yaml', '.w3id-check.yml'];

const DEFAULTS = {
  docsBaseUrl: 'https://w3id.org/docs/rules/',
  idsDir: 'ids',
  policy: {
    introduced: 'as-declared',
    touched: 'warning',
    preexisting: 'off'
  },
  rules: {},
  options: {},
  allowedPaths: [],
  // Paths no rule ever examines. These should not be tracked at all, but a
  // stray `git add -A` in a checkout with installed dependencies has put them
  // in before, and 900 findings from inside node_modules would bury the ones
  // that matter.
  ignorePaths: ['**/node_modules/**']
};

/**
 * Load configuration from the repository root.
 *
 * A missing file is not an error: the defaults are a usable policy.
 */
export function loadConfig(root, overrides = {}) {
  let fileConfig = {};
  let source = null;
  for(const name of CONFIG_NAMES) {
    const candidate = path.join(root, name);
    if(existsSync(candidate)) {
      const parsed = YAML.parse(readFileSync(candidate, 'utf8'));
      // An empty config file parses to null.
      fileConfig = parsed ?? {};
      source = name;
      break;
    }
  }

  const config = {
    ...DEFAULTS,
    ...fileConfig,
    policy: {...DEFAULTS.policy, ...(fileConfig.policy ?? {})},
    rules: {...DEFAULTS.rules, ...(fileConfig.rules ?? {})},
    options: {...DEFAULTS.options, ...(fileConfig.options ?? {})},
    allowedPaths: fileConfig.allowedPaths ?? DEFAULTS.allowedPaths,
    ignorePaths: fileConfig.ignorePaths ?? DEFAULTS.ignorePaths,
    source,
    root
  };

  validate(config);
  return {...config, ...overrides};
}

function validate(config) {
  const allowed = new Set([...SEVERITIES, 'off']);
  // Checked against the whole registry rather than the rules a given run
  // enables, because a single-rule run must not declare the rest unknown.
  const known = new Set(rules.map(rule => rule.id));
  for(const [id, severity] of Object.entries(config.rules)) {
    // A key naming no rule does nothing at all: severities are looked up by
    // id, so a stale one is never consulted. Silence there is dangerous --
    // renaming a rule would quietly turn a deliberate "off" back on -- and
    // this is the one place naming rule ids that no membership check covers.
    if(!known.has(id)) {
      throw new Error(
        `${config.source}: rules."${id}" names no rule. It may have been ` +
        'renamed or removed; run --list-rules to see the current set.');
    }
    if(!allowed.has(severity)) {
      throw new Error(
        `${config.source}: rules.${id} is "${severity}"; expected one of ` +
        `${[...allowed].join(', ')}`);
    }
  }
  for(const [provenance, value] of Object.entries(config.policy)) {
    if(!PROVENANCES.includes(provenance)) {
      throw new Error(
        `${config.source}: unknown policy key "${provenance}"; expected one ` +
        `of ${PROVENANCES.join(', ')}`);
    }
    if(value !== 'as-declared' && !allowed.has(value)) {
      throw new Error(
        `${config.source}: policy.${provenance} is "${value}"; expected ` +
        `"as-declared" or one of ${[...allowed].join(', ')}`);
    }
  }
}

/**
 * Resolve the severity a finding is actually reported at.
 *
 * A rule's configured severity replaces its declared one; the provenance
 * policy then decides whether that severity survives.
 *
 * Critical rules -- security problems, and redirects that are dead in
 * production -- are the exception. They ignore `preexisting: off` for anything
 * the change touches, so that somebody editing an identifier is told it does
 * not resolve even though they are not the one who broke it. That is reported
 * as a notice: informative, never blocking. Critical findings elsewhere in the
 * tree are still suppressed, because a first-time contributor cannot act on
 * them; `--triage` is what surfaces those, to maintainers.
 *
 * @returns {string|null} the severity to report at, or null to suppress.
 */
export function resolveSeverity(args) {
  return explainSeverity(args).severity;
}

/**
 * The same decision, with the reason it went that way.
 *
 * `--why` needs to name which of several suppressions applied, and the only
 * way for its explanation to stay true is for it to come from the code that
 * makes the decision. Deriving the reason separately would be a second copy
 * of this policy, correct on the day it was written.
 *
 * @returns {{severity: string|null, reason: string}} `reason` is `shown` when
 *   a severity survived, and otherwise names the suppression.
 */
export function explainSeverity({rule, provenance, config, auditAll}) {
  const declared = config.rules[rule.id] ?? rule.severity ?? 'warning';
  if(declared === 'off') {
    return {severity: null, reason: 'rule-off'};
  }
  // `--all` holds the whole tree to each rule's declared severity.
  if(auditAll) {
    return {severity: declared, reason: 'shown'};
  }
  if(rule.critical) {
    if(provenance === 'introduced') {
      return {severity: declared, reason: 'shown'};
    }
    return provenance === 'touched' ?
      {severity: 'notice', reason: 'shown'} :
      {severity: null, reason: 'critical-preexisting'};
  }
  const policy = config.policy[provenance] ?? 'off';
  if(policy === 'off') {
    return {severity: null, reason: `${provenance}-off`};
  }
  const effective = policy === 'as-declared' ? declared : policy;
  // The policy exists to soften findings a contributor did not cause, never
  // to sharpen them. Without this clamp, `touched: warning` would promote a
  // rule that declares itself a notice -- a suggestion -- into a warning, on
  // precisely the lines it is most likely to fire on.
  return {severity: lessSevereOf(effective, declared), reason: 'shown'};
}

const SEVERITY_RANK = {error: 0, warning: 1, notice: 2};

function lessSevereOf(a, b) {
  return SEVERITY_RANK[a] >= SEVERITY_RANK[b] ? a : b;
}

/** Per-rule options from the config file. */
export function ruleOptions(config, ruleId) {
  return config.options[ruleId] ?? {};
}
