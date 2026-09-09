/** Test helpers: throwaway git repositories and in-process CLI runs. */
import {mkdtempSync, mkdirSync, writeFileSync, rmSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {loadConfig} from '../src/config.js';
import {Context} from '../src/context.js';
import {run} from '../src/engine.js';
import {ruleIds} from '../src/rules/index.js';

const created = [];

process.on('exit', () => {
  for(const dir of created) {
    rmSync(dir, {recursive: true, force: true});
  }
});

/** Create an empty git repository in a temporary directory. */
export function makeRepo() {
  const dir = mkdtempSync(path.join(tmpdir(), 'w3id-check-'));
  created.push(dir);
  const run_ = args => execFileSync('git', args, {cwd: dir, stdio: 'ignore'});
  run_(['init', '-q', '-b', 'master']);
  run_(['config', 'user.email', 'test@example.com']);
  run_(['config', 'user.name', 'Test']);
  run_(['config', 'commit.gpgsign', 'false']);
  return {
    dir,
    git: args => execFileSync('git', args,
      {cwd: dir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']}),
    /** Write a file, creating parent directories. */
    write(relPath, content) {
      const full = path.join(dir, relPath);
      mkdirSync(path.dirname(full), {recursive: true});
      writeFileSync(full, content);
    },
    /** Delete a file from the working tree, leaving it committed. */
    remove(relPath) {
      rmSync(path.join(dir, relPath), {force: true});
    },
    /** Stage everything and commit. */
    commit(message) {
      run_(['add', '-A']);
      execFileSync('git', ['commit', '-q', '-m', message],
        {cwd: dir, stdio: 'ignore'});
      return execFileSync('git', ['rev-parse', 'HEAD'],
        {cwd: dir, encoding: 'utf8'}).trim();
    },
    branch(name) {
      run_(['checkout', '-q', '-b', name]);
    },
    checkout(name) {
      run_(['checkout', '-q', name]);
    }
  };
}

/**
 * Run rules against a repository.
 *
 * @param {object} opts
 * @param {string} opts.dir - repository root.
 * @param {object[]} opts.rules - rules to run.
 * @param {string} [opts.base] - base ref; omit for a whole-tree run.
 * @param {string} [opts.head] - head ref.
 * @param {object} [opts.config] - configuration overrides.
 * @param {boolean} [opts.auditAll]
 * @param {string[]|null} [opts.scope] - paths to report on.
 * @param {boolean} [opts.includeWorkingTree] - count uncommitted edits.
 */
export function check({dir, rules, base = null, head = null, config = {},
  auditAll = base === null, scope = null, includeWorkingTree = false}) {
  const resolved = {...loadConfig(dir), ...config};
  const ctx = new Context({
    root: dir, config: resolved, base, head, scope, includeWorkingTree
  });
  ctx.allRuleIds = ruleIds;
  const result = run({rules, ctx, config: resolved, auditAll});
  if(result.errors.length > 0) {
    throw result.errors[0].error;
  }
  return result;
}

/** Findings for a single rule, as compact strings for easy assertion. */
export function findingsOf(result, ruleId) {
  return result.findings
    .filter(f => ruleId === undefined || f.ruleId === ruleId)
    .map(f => `${f.file ?? '-'}:${f.line ?? '-'}:${f.severity}`);
}

/** A minimal, entirely valid identifier namespace. */
export function goodNamespace(repo, id = 'example') {
  repo.write(`ids/${id}/.htaccess`,
    '# Example identifier\n' +
    '#\n' +
    '# GitHub username: octocat\n' +
    '\n' +
    'RewriteEngine on\n' +
    `RewriteRule ^$ https://example.com/${id} [R=302,L]\n`);
  repo.write(`ids/${id}/README.md`,
    `# ${id}\n\nMaintained by [octocat](https://github.com/octocat).\n`);
}
