/**
 * Thin wrapper around the `git` command.
 *
 * Spawning git rather than depending on a JS implementation keeps the tool
 * small and guarantees identical behaviour to what contributors and CI runners
 * already have installed.
 */
import {execFileSync} from 'node:child_process';

const MAX_BUFFER = 256 * 1024 * 1024;

export class GitError extends Error {}

/**
 * Run git and return stdout.
 *
 * Arguments are passed as an array, never interpolated into a shell string.
 */
export function git(args, {cwd = process.cwd(), allowFailure = false} = {}) {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      maxBuffer: MAX_BUFFER,
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch(e) {
    if(allowFailure) {
      return null;
    }
    const stderr = (e.stderr || '').toString().trim();
    throw new GitError(`git ${args.join(' ')} failed: ${stderr || e.message}`);
  }
}

/** Absolute path of the working tree root, or null outside a repository. */
export function repoRoot(cwd = process.cwd()) {
  const out = git(['rev-parse', '--show-toplevel'], {cwd, allowFailure: true});
  return out === null ? null : out.trim();
}

/** Every tracked path, repository-relative. */
export function listFiles(cwd) {
  return git(['ls-files', '-z'], {cwd}).split('\0').filter(p => p !== '');
}

/**
 * Index mode of every tracked path, keyed by path.
 *
 * `ls-files -s` prints `<mode> <sha> <stage>\t<path>`. With `-z` the path is
 * written verbatim -- no `core.quotePath` escaping, so no question of what a
 * backslash meant -- and splitting at the first tab is exact for every byte a
 * path may contain, spaces and non-ASCII included. The three fields before it
 * cannot contain a tab, so the first one found is always the separator.
 *
 * The index is what a commit is built from, which makes it the authority on
 * what will land in the repository. Where git does not record the executable
 * bit at all, it is also the only thing that means anything.
 *
 * Only stage 0 is kept. A conflicted path appears once per stage and has no
 * settled mode until the merge is resolved; leaving it out reports it as
 * unknown rather than as whichever side happened to be parsed last.
 */
export function listFileModes(cwd) {
  const modes = new Map();
  const out = git(['ls-files', '-s', '-z'], {cwd, allowFailure: true});
  if(out === null) {
    return modes;
  }
  for(const record of out.split('\0')) {
    if(record === '') {
      continue;
    }
    const tab = record.indexOf('\t');
    if(tab === -1) {
      continue;
    }
    const [mode, , stage] = record.slice(0, tab).split(' ');
    if(stage !== '0') {
      continue;
    }
    modes.set(record.slice(tab + 1), mode);
  }
  return modes;
}

/**
 * Whether git records the executable bit in this working tree.
 *
 * False on Windows, on FAT and exFAT volumes, and on some network mounts.
 * There the bit on disk is not part of the file as far as this repository is
 * concerned: it cannot be committed, and no command a contributor runs will
 * clear it. A finding about it would be a finding with no fix.
 */
export function fileModeRecorded(cwd) {
  const out = git(['config', '--type=bool', '--get', 'core.fileMode'],
    {cwd, allowFailure: true});
  // Unset: git's own compiled default, which is true everywhere but Windows.
  return out === null ? process.platform !== 'win32' : out.trim() === 'true';
}

/** Whether a repository-relative file or directory exists in a commit. */
export function existsInCommit(sha, relPath, cwd) {
  return git(['cat-file', '-e', `${sha}:${relPath}`],
    {cwd, allowFailure: true}) !== null;
}

/** Whether `ancestor` is `descendant` or one of its ancestors. */
export function isAncestor(ancestor, descendant, cwd) {
  return git(['merge-base', '--is-ancestor', ancestor, descendant],
    {cwd, allowFailure: true}) !== null;
}

/**
 * Every path in a commit, repository-relative: `listFiles` for a commit that
 * is not checked out.
 */
export function listFilesAt(sha, cwd) {
  return git(['ls-tree', '-r', '-z', '--name-only', sha], {cwd})
    .split('\0').filter(p => p !== '');
}

/** File modes as a commit records them, by path: see `listFileModes`. */
export function listFileModesAt(sha, cwd) {
  const modes = new Map();
  const out = git(['ls-tree', '-r', '-z', sha], {cwd, allowFailure: true});
  if(out === null) {
    return modes;
  }
  for(const record of out.split('\0')) {
    const tab = record.indexOf('\t');
    if(tab !== -1) {
      modes.set(record.slice(tab + 1), record.slice(0, tab).split(' ')[0]);
    }
  }
  return modes;
}

/** A file's contents in a commit, or null where it is not a file. */
export function readAt(sha, relPath, cwd) {
  return git(['cat-file', 'blob', `${sha}:${relPath}`],
    {cwd, allowFailure: true});
}

/** A file's size in bytes in a commit, or null where it is not there. */
export function sizeAt(sha, relPath, cwd) {
  const out = git(['cat-file', '-s', `${sha}:${relPath}`],
    {cwd, allowFailure: true});
  return out === null ? null : Number(out.trim());
}

/** Resolve a ref to a full SHA, or null if it does not exist. */
export function resolve(ref, cwd) {
  const out = git(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`],
    {cwd, allowFailure: true});
  return out === null ? null : out.trim();
}

/** Best common ancestor of two refs, or null if they are unrelated. */
export function mergeBase(a, b, cwd) {
  const out = git(['merge-base', a, b], {cwd, allowFailure: true});
  return out === null ? null : out.trim();
}

/** Number of commits `ref` is behind `upstream`, or null if unknown. */
export function behindCount(ref, upstream, cwd) {
  const out = git(['rev-list', '--count', `${ref}..${upstream}`],
    {cwd, allowFailure: true});
  return out === null ? null : Number.parseInt(out.trim(), 10);
}

/**
 * Files changed between two commits.
 *
 * Returns entries of {status, path, oldPath}. Status is a single letter:
 * A added, M modified, D deleted, R renamed, C copied, T type-changed.
 */
export function changedFiles(base, head, cwd) {
  const out = git(
    ['diff', '--name-status', '--find-renames', '-z', base, head], {cwd});
  const fields = out.split('\0');
  const entries = [];
  for(let i = 0; i < fields.length; ++i) {
    const status = fields[i];
    if(status === '') {
      continue;
    }
    // Rename and copy statuses carry a similarity score and, unlike every
    // other status, occupy two path fields.
    if(status[0] === 'R' || status[0] === 'C') {
      entries.push({
        status: status[0], oldPath: fields[++i], path: fields[++i]
      });
    } else {
      entries.push({status: status[0], path: fields[++i], oldPath: null});
    }
  }
  return entries;
}

/**
 * Line numbers added or modified between two commits, per file.
 *
 * `--unified=0` makes every hunk exactly the changed lines, so a hunk header's
 * new-file range is precisely the set of lines this change is answerable for.
 * Returns a Map of path -> Set of 1-based line numbers.
 */
export function addedLines(base, head, cwd) {
  return diffAddedLines([base, head], cwd);
}

/**
 * Line numbers added or modified in the working tree relative to HEAD.
 *
 * Covers staged and unstaged edits together, which is what somebody looking at
 * their editor means by "my changes". Untracked files do not appear in a diff
 * at all and are handled as whole-file additions instead.
 */
export function workingTreeAddedLines(cwd) {
  return diffAddedLines(['HEAD'], cwd);
}

function diffAddedLines(revs, cwd) {
  const out = git(
    ['diff', '--unified=0', '--find-renames', '--no-color', ...revs],
    {cwd, allowFailure: true});
  // A repository with no commits has no HEAD to diff against.
  if(out === null) {
    return new Map();
  }
  const byFile = new Map();
  let current = null;
  for(const line of out.split('\n')) {
    if(line.startsWith('+++ ')) {
      const path = line.slice(4);
      current = path === '/dev/null' ? null : stripDiffPrefix(path);
      if(current !== null && !byFile.has(current)) {
        byFile.set(current, new Set());
      }
      continue;
    }
    if(current === null || !line.startsWith('@@')) {
      continue;
    }
    // @@ -oldStart,oldCount +newStart,newCount @@
    const m = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(line);
    if(!m) {
      continue;
    }
    const start = Number.parseInt(m[1], 10);
    const count = m[2] === undefined ? 1 : Number.parseInt(m[2], 10);
    const lines = byFile.get(current);
    // A pure deletion has count 0 and contributes no answerable lines.
    for(let i = 0; i < count; ++i) {
      lines.add(start + i);
    }
  }
  return byFile;
}

// Diff paths carry a b/ prefix unless the file is outside the repository.
function stripDiffPrefix(path) {
  return path.startsWith('b/') ? path.slice(2) : path;
}

// A record separator that cannot occur in any git log field.
const REC = '\x1e';
const FIELD = '\x1f';

/**
 * Commits reachable from `head` but not `base`.
 *
 * Returns entries of {sha, parents, author, date, subject, files}. The commit
 * body is deliberately not captured: it may span lines, which would make the
 * `--name-only` file list ambiguous to parse.
 */
export function commits(base, head, cwd) {
  const format = ['%H', '%P', '%an', '%aI', '%s'].join(FIELD);
  const out = git(
    ['log', '--name-only', `--format=${REC}${format}`, `${base}..${head}`],
    {cwd});
  const result = [];
  for(const chunk of out.split(REC)) {
    if(chunk.trim() === '') {
      continue;
    }
    // The subject cannot contain a newline, so metadata is exactly one line
    // and every remaining line is a changed path.
    const newline = chunk.indexOf('\n');
    const meta = newline === -1 ? chunk : chunk.slice(0, newline);
    const tail = newline === -1 ? '' : chunk.slice(newline + 1);
    const [sha, parents, author, date, subject] = meta.split(FIELD);
    result.push({
      sha,
      parents: parents === '' ? [] : parents.split(' '),
      author,
      date,
      subject: subject ?? '',
      // A merge commit produces no --name-only output; that is expected.
      files: tail.split('\n').map(l => l.trim()).filter(l => l !== '')
    });
  }
  return result;
}

/**
 * Paths that differ between HEAD and the working tree.
 *
 * Returns the same {status, path, oldPath} shape as `changedFiles`, so callers
 * can union the two without special-casing.
 *
 * `--no-renames` keeps every record to a single `XY path` field, so a rename
 * arrives as a delete plus an add rather than a two-field record.
 * `--untracked-files=all` lists new files individually instead of collapsing a
 * new directory into one entry, and still honours .gitignore -- which is what
 * keeps `node_modules/` out.
 */
export function workingTreeStatus(cwd) {
  const out = git(
    ['status', '--porcelain=v1', '-z', '--untracked-files=all', '--no-renames'],
    {cwd, allowFailure: true});
  if(out === null) {
    return [];
  }
  const entries = [];
  for(const record of out.split('\0')) {
    if(record === '') {
      continue;
    }
    // Porcelain v1: exactly two status characters, a space, then the path.
    const index = record[0];
    const worktree = record[1];
    entries.push({
      status: statusOf(index, worktree),
      path: record.slice(3),
      oldPath: null
    });
  }
  return entries;
}

function statusOf(index, worktree) {
  // Untracked and staged-new are both "this file is new in this change".
  if(index === '?' || index === 'A') {
    return 'A';
  }
  if(index === 'D' || worktree === 'D') {
    return 'D';
  }
  return 'M';
}
