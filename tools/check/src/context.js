/**
 * Shared, lazily populated view of the repository that rules run against.
 *
 * Everything here is computed at most once per run and cached: the tree is
 * ~5200 files and ~22MB, so a full read is cheap, but rules should not each
 * pay for it.
 */
import {readFileSync, statSync} from 'node:fs';
import path from 'node:path';
import * as git from './git.js';
import {parse as parseHtaccess} from './htaccess.js';
import {matchesAny} from './glob.js';

export class Context {
  /**
   * @param {object} opts
   * @param {string} opts.root - repository root.
   * @param {object} opts.config - resolved configuration.
   * @param {string|null} opts.base - base commit, or null for a whole-tree run.
   * @param {string|null} opts.head - head commit.
   * @param {string[]|null} opts.scope - repository-relative path prefixes to
   *   report on, or null for the whole repository.
   * @param {boolean} opts.includeWorkingTree - whether uncommitted edits and
   *   untracked files count as part of the change. False gives a reproducible
   *   audit of committed content.
   */
  constructor({root, config, base = null, head = null, scope = null,
    includeWorkingTree = true}) {
    this.root = root;
    this.config = config;
    this.base = base;
    this.head = head;
    this.scope = scope;
    this.includeWorkingTree = includeWorkingTree;
    this.idsDir = config.idsDir;
    this._cache = new Map();
  }

  /**
   * Whether a path is one this run reports on.
   *
   * Rules are deliberately not restricted to the scope -- they need the whole
   * tree to answer questions like "does this name collide with an existing
   * one" -- so the scope is applied to their findings instead.
   */
  inScope(relPath) {
    if(this.scope === null) {
      return true;
    }
    return this.scope.some(
      prefix => relPath === prefix || relPath.startsWith(prefix + '/'));
  }

  _memo(key, fn) {
    if(!this._cache.has(key)) {
      this._cache.set(key, fn());
    }
    return this._cache.get(key);
  }

  /**
   * Every path in the repository, less the ignored ones.
   *
   * Tracked files, plus untracked ones and minus deleted ones when the working
   * tree counts -- so a namespace that exists only on disk is still checked.
   * Filtering here rather than in each rule means a rule cannot forget.
   */
  get tree() {
    return this._memo('tree', () => {
      const ignore = this.config.ignorePaths ?? [];
      let files = git.listFiles(this.root);

      if(this.includeWorkingTree) {
        const deleted = new Set();
        const added = [];
        for(const change of this.workingTreeChanges) {
          if(change.status === 'D') {
            deleted.add(change.path);
          } else {
            added.push(change.path);
          }
        }
        files = [...new Set([...files, ...added])]
          .filter(p => !deleted.has(p))
          .sort();
      }

      return ignore.length === 0 ? files :
        files.filter(p => !matchesAny(p, ignore));
    });
  }

  /** Paths differing between HEAD and the working tree. */
  get workingTreeChanges() {
    return this._memo('workingTreeChanges', () => this.includeWorkingTree ?
      git.workingTreeStatus(this.root) : []);
  }

  /**
   * Paths carrying uncommitted edits, for the "what was checked" line.
   *
   * Deletions are excluded: there is no file left to report against.
   */
  get uncommittedPaths() {
    return this._memo('uncommittedPaths', () => {
      const ignore = this.config.ignorePaths ?? [];
      return new Set(this.workingTreeChanges
        .filter(c => c.status !== 'D')
        .map(c => c.path)
        .filter(p => !matchesAny(p, ignore)));
    });
  }

  /** Tracked paths under the identifier directory. */
  get idPaths() {
    return this._memo('idPaths',
      () => this.tree.filter(p => p.startsWith(this.idsDir + '/')));
  }

  /**
   * Every rule id registered for this run.
   *
   * Set by the runner; `meta/rule-docs-exist` needs it to compare the
   * registry against the published documentation.
   */
  get allRuleIds() {
    return this._allRuleIds ?? [];
  }

  set allRuleIds(ids) {
    this._allRuleIds = ids;
  }

  /** Absolute path for a repository-relative path. */
  abs(relPath) {
    return path.join(this.root, relPath);
  }

  /** File contents, cached. Returns null if the file cannot be read. */
  read(relPath) {
    return this._memo('read:' + relPath, () => {
      try {
        return readFileSync(this.abs(relPath), 'utf8');
      } catch {
        return null;
      }
    });
  }

  /** File size in bytes, or null if it cannot be stat'ed. */
  size(relPath) {
    return this._memo('size:' + relPath, () => {
      try {
        return statSync(this.abs(relPath)).size;
      } catch {
        return null;
      }
    });
  }

  /** Parsed `.htaccess`, cached. Returns null if the file cannot be read. */
  htaccess(relPath) {
    return this._memo('htaccess:' + relPath, () => {
      const text = this.read(relPath);
      return text === null ? null : parseHtaccess(text);
    });
  }

  /**
   * The identifier namespace a path belongs to, e.g. `ids/my-project`.
   *
   * Returns null for paths outside the identifier directory.
   */
  namespaceOf(relPath) {
    const prefix = this.idsDir + '/';
    if(!relPath.startsWith(prefix)) {
      return null;
    }
    const rest = relPath.slice(prefix.length);
    const slash = rest.indexOf('/');
    return prefix + (slash === -1 ? rest : rest.slice(0, slash));
  }

  /** Whether this run has a commit range to compare against. */
  get hasRange() {
    return this.base !== null && this.head !== null;
  }

  /**
   * Everything this run considers changed: the commit range, the working tree,
   * or both.
   */
  get changes() {
    return this._memo('changes', () => {
      const committed = this.hasRange ?
        git.changedFiles(this.base, this.head, this.root) : [];
      if(!this.includeWorkingTree) {
        return committed;
      }
      const byPath = new Map(committed.map(c => [c.path, c]));
      for(const change of this.workingTreeChanges) {
        const committedEntry = byPath.get(change.path);
        // A file this change created stays "added" even if it was edited
        // again afterwards; only a deletion overrides that.
        if(committedEntry?.status === 'A' && change.status !== 'D') {
          continue;
        }
        byPath.set(change.path, change);
      }
      return [...byPath.values()];
    });
  }

  /** Paths present at head that the range added, modified or renamed. */
  get changedPaths() {
    return this._memo('changedPaths', () => {
      const ignore = this.config.ignorePaths ?? [];
      return new Set(this.changes
        .filter(c => c.status !== 'D')
        .map(c => c.path)
        .filter(p => !matchesAny(p, ignore)));
    });
  }

  /** Namespaces the range touches. */
  get changedNamespaces() {
    return this._memo('changedNamespaces', () => {
      const out = new Set();
      for(const c of this.changes) {
        const ns = this.namespaceOf(c.path);
        if(ns !== null) {
          out.add(ns);
        }
      }
      return out;
    });
  }

  /**
   * Map of path -> Set of line numbers this change added or modified.
   *
   * Unions the commit range with the working tree, so a line edited but not
   * yet committed is one the author is answerable for.
   */
  get addedLines() {
    return this._memo('addedLines', () => {
      const merged = new Map();
      const absorb = source => {
        for(const [path, lines] of source) {
          if(!merged.has(path)) {
            merged.set(path, new Set());
          }
          const target = merged.get(path);
          for(const line of lines) {
            target.add(line);
          }
        }
      };
      if(this.hasRange) {
        absorb(git.addedLines(this.base, this.head, this.root));
      }
      if(this.includeWorkingTree) {
        absorb(git.workingTreeAddedLines(this.root));
      }
      return merged;
    });
  }

  /** Paths the range created outright. */
  get addedPaths() {
    return this._memo('addedPaths', () => new Set(
      this.changes.filter(c => c.status === 'A').map(c => c.path)));
  }

  /** Commits in the range. */
  get commits() {
    return this._memo('commits', () => this.hasRange ?
      git.commits(this.base, this.head, this.root) : []);
  }

  /**
   * Commits the branch point lags the upstream default branch by.
   *
   * Returns null when the upstream ref is not available, which is the normal
   * case in a shallow or detached checkout.
   */
  get behindUpstream() {
    return this._memo('behindUpstream', () => {
      if(this.base === null) {
        return null;
      }
      for(const ref of ['origin/master', 'origin/main', 'master', 'main']) {
        if(git.resolve(ref, this.root) === null) {
          continue;
        }
        const count = git.behindCount(this.base, ref, this.root);
        if(count !== null) {
          return {ref, count};
        }
      }
      return null;
    });
  }
}
