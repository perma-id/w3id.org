/**
 * Minimal glob matching for repository-relative paths.
 *
 * Supports the handful of constructs the rules and configuration actually use:
 * `**` (any number of path segments, including none), `*` (any run of
 * characters within one segment), `?` (one character within one segment) and
 * `[...]` character classes.
 *
 * Unlike minimatch, a leading dot is not special: `**` and `*` match dotfiles.
 * Every interesting file in this repository is named `.htaccess`, so treating
 * dotfiles as hidden would be exactly wrong here.
 */

const cache = new Map();

/** Whether a path matches a glob pattern. */
export function minimatch(filePath, pattern) {
  return toRegExp(pattern).test(filePath);
}

/** Whether a path matches any of several glob patterns. */
export function matchesAny(filePath, patterns) {
  return patterns.some(pattern => minimatch(filePath, pattern));
}

function toRegExp(pattern) {
  let re = cache.get(pattern);
  if(re === undefined) {
    re = new RegExp('^' + compile(pattern) + '$');
    cache.set(pattern, re);
  }
  return re;
}

function compile(pattern) {
  let out = '';
  let i = 0;
  while(i < pattern.length) {
    const c = pattern[i];

    if(c === '*') {
      const isGlobstar = pattern[i + 1] === '*';
      if(isGlobstar) {
        i += 2;
        // `a/**/b` must also match `a/b`, so consume the following slash and
        // make the whole segment run optional.
        if(pattern[i] === '/') {
          ++i;
          out += '(?:[^/]+/)*';
        } else {
          // A trailing `**` matches the rest of the path, separators included.
          out += '.*';
        }
      } else {
        ++i;
        out += '[^/]*';
      }
      continue;
    }

    if(c === '?') {
      ++i;
      out += '[^/]';
      continue;
    }

    if(c === '[') {
      const end = pattern.indexOf(']', i + 1);
      if(end !== -1) {
        let body = pattern.slice(i + 1, end);
        if(body.startsWith('!')) {
          body = '^' + body.slice(1);
        }
        out += '[' + body.replace(/\\/g, '\\\\') + ']';
        i = end + 1;
        continue;
      }
      // An unclosed bracket is a literal.
    }

    out += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
    ++i;
  }
  return out;
}
