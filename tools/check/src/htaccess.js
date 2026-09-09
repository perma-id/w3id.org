/**
 * Normalizer and tokenizer for Apache `.htaccess` files.
 *
 * The corpus is not line-clean: dozens of files use CRLF endings, a handful
 * join directives with trailing backslashes, and a few put `#` comments after
 * directive arguments (which Apache does not support -- the text becomes an
 * argument). Rules need a normalized view to work against, so this module
 * produces one, and records each of those facts so that rules can report them
 * rather than have them silently smoothed away.
 */

/** Directives whose arguments are a rewrite pattern plus a substitution. */
const REWRITE_DIRECTIVES = new Set(['rewriterule']);

/**
 * Parse an `.htaccess` file.
 *
 * @param {string} text - raw file contents.
 * @returns {object} the parsed representation.
 */
export function parse(text) {
  const hasBOM = text.charCodeAt(0) === 0xfeff;
  if(hasBOM) {
    text = text.slice(1);
  }

  const rawLines = text.split('\n');
  // A trailing newline yields a final empty element that is not a real line.
  const hasFinalNewline = rawLines.length > 1 && rawLines.at(-1) === '';
  if(hasFinalNewline) {
    rawLines.pop();
  }

  const crlfLines = [];
  const trailingWhitespaceLines = [];
  const lines = rawLines.map((line, i) => {
    if(line.endsWith('\r')) {
      crlfLines.push(i + 1);
      line = line.slice(0, -1);
    }
    if(line !== line.replace(/[ \t]+$/, '')) {
      trailingWhitespaceLines.push(i + 1);
    }
    return line;
  });

  const directives = [];
  const comments = [];
  const continuationLines = [];

  for(let i = 0; i < lines.length; ++i) {
    const startLine = i + 1;
    const trimmed = lines[i].trim();

    if(trimmed === '') {
      continue;
    }
    if(trimmed.startsWith('#')) {
      comments.push({line: startLine, text: trimmed.replace(/^#+\s?/, '')});
      continue;
    }

    // Join backslash continuations into one logical directive.
    let joined = lines[i];
    while(/\\\s*$/.test(joined) && i + 1 < lines.length) {
      continuationLines.push(i + 1);
      joined = joined.replace(/\\\s*$/, ' ') + lines[++i];
    }

    const tokens = tokenize(joined);
    if(tokens.length === 0) {
      continue;
    }

    // Apache has no inline comment syntax: a `#` token after the directive
    // name is passed through as an argument.
    const commentIndex = tokens.findIndex(
      (t, idx) => idx > 0 && !t.quoted && t.value.startsWith('#'));
    const inlineComment = commentIndex === -1 ? null : {
      index: commentIndex,
      text: tokens.slice(commentIndex).map(t => t.value).join(' ')
    };

    const values = tokens.map(t => t.value);
    directives.push({
      name: values[0],
      args: values.slice(1),
      line: startLine,
      endLine: i + 1,
      raw: joined,
      inlineComment
    });
  }

  return new Htaccess({
    text,
    lines,
    directives,
    comments,
    hasBOM,
    hasFinalNewline: text === '' ? true : hasFinalNewline,
    crlfLines,
    trailingWhitespaceLines,
    continuationLines
  });
}

/**
 * Split a directive line into tokens, honouring Apache's double-quoting.
 *
 * Returns entries of {value, quoted}; `quoted` matters because a `#` inside
 * quotes is data, not a stray comment.
 */
function tokenize(line) {
  const tokens = [];
  let i = 0;
  while(i < line.length) {
    while(i < line.length && /\s/.test(line[i])) {
      ++i;
    }
    if(i >= line.length) {
      break;
    }
    let value = '';
    let quoted = false;
    if(line[i] === '"') {
      quoted = true;
      ++i;
      while(i < line.length && line[i] !== '"') {
        // Apache honours backslash escapes inside quoted arguments.
        if(line[i] === '\\' && i + 1 < line.length) {
          ++i;
        }
        value += line[i++];
      }
      ++i;
    } else {
      while(i < line.length && !/\s/.test(line[i])) {
        value += line[i++];
      }
    }
    tokens.push({value, quoted});
  }
  return tokens;
}

class Htaccess {
  constructor(fields) {
    Object.assign(this, fields);
  }

  /** Every directive with the given name, compared case-insensitively. */
  find(name) {
    const wanted = name.toLowerCase();
    return this.directives.filter(d => d.name.toLowerCase() === wanted);
  }

  /** Whether any directive with the given name is present. */
  has(name) {
    return this.find(name).length > 0;
  }

  /**
   * Whether mod_rewrite is switched on.
   *
   * Apache treats any value other than `off` as enabling it, and the last
   * occurrence in the file wins.
   */
  rewriteEnabled() {
    const found = this.find('RewriteEngine');
    if(found.length === 0) {
      return false;
    }
    return (found.at(-1).args[0] ?? '').toLowerCase() !== 'off';
  }

  /**
   * RewriteRule directives, with pattern, substitution and flags split out.
   */
  rewriteRules() {
    return this.directives
      .filter(d => REWRITE_DIRECTIVES.has(d.name.toLowerCase()))
      .map(d => ({
        ...d,
        pattern: d.args[0] ?? '',
        substitution: d.args[1] ?? '',
        flags: parseFlags(d.args[2])
      }));
  }

  /**
   * Directives that redirect: RewriteRule, Redirect, RedirectMatch,
   * RedirectPermanent and RedirectTemp.
   *
   * Each entry carries a `target`: the argument that is the destination.
   */
  redirects() {
    const out = [];
    for(const d of this.directives) {
      const name = d.name.toLowerCase();
      if(name === 'rewriterule') {
        out.push({...d, kind: 'RewriteRule', target: d.args[1] ?? ''});
      } else if(name === 'redirect' || name === 'redirectmatch' ||
        name === 'redirectpermanent' || name === 'redirecttemp') {
        // The status argument is optional, so the destination is simply the
        // last argument.
        out.push({...d, kind: d.name, target: d.args.at(-1) ?? ''});
      }
    }
    return out;
  }
}

/**
 * Parse a rewrite flag list such as `[R=302,NE,L]`.
 *
 * Returns a Map of upper-cased flag name to its value (or true), plus the raw
 * spelling of each flag so that casing rules can inspect it.
 */
export function parseFlags(arg) {
  const flags = new Map();
  if(typeof arg !== 'string' || !arg.startsWith('[') || !arg.endsWith(']')) {
    return flags;
  }
  for(const part of arg.slice(1, -1).split(',')) {
    const raw = part.trim();
    if(raw === '') {
      continue;
    }
    const eq = raw.indexOf('=');
    const name = eq === -1 ? raw : raw.slice(0, eq);
    const value = eq === -1 ? true : raw.slice(eq + 1);
    flags.set(name.toUpperCase(), {value, raw, name});
  }
  return flags;
}

/** Whether a directive's last argument looks like a rewrite flag list. */
export function hasFlagList(directive) {
  const last = directive.args.at(-1);
  return typeof last === 'string' && last.startsWith('[') &&
    last.endsWith(']');
}
