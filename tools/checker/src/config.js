/** Configuration loading and severity policy resolution. */
import {readFileSync, existsSync} from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

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
  for(const [id, severity] of Object.entries(config.rules)) {
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
export function resolveSeverity({rule, provenance, config, auditAll}) {
  const declared = config.rules[rule.id] ?? rule.severity ?? 'warning';
  if(declared === 'off') {
    return null;
  }
  // `--all` holds the whole tree to each rule's declared severity.
  if(auditAll) {
    return declared;
  }
  if(rule.critical) {
    if(provenance === 'introduced') {
      return declared;
    }
    return provenance === 'touched' ? 'notice' : null;
  }
  const policy = config.policy[provenance] ?? 'off';
  if(policy === 'off') {
    return null;
  }
  return policy === 'as-declared' ? declared : policy;
}

/** Per-rule options from the config file. */
export function ruleOptions(config, ruleId) {
  return config.options[ruleId] ?? {};
}
