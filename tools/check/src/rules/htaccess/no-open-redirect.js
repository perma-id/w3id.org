/**
 * Detects redirect targets whose hostname is partly chosen by the requester.
 *
 * A rule such as
 *
 *     RewriteRule ^([^/]+)/schema/(.*)$ https://service.$1/$2
 *
 * lets anyone craft https://w3id.org/<ns>/evil.example/schema/x and be sent to
 * a host they control, with w3id.org's reputation behind the link. Because
 * w3id.org is a long-lived identifier service, such a redirect is a durable
 * phishing primitive.
 *
 * Whether a backreference is actually dangerous depends on where in the
 * authority it lands and what its capture group is allowed to match, so both
 * are analysed rather than flagging every `$N` near a hostname.
 */

// Probes for a group that ends the authority: matching any of these means the
// requester can extend or replace the hostname.
const SUFFIX_PROBES = ['evil.example', '.evil.example', 'evil.example/path'];

// Probes for a group followed by fixed hostname text: only a slash can cut
// that text off and leave a hostname the requester chose.
const TRUNCATING_PROBES = ['/', 'evil.example/', 'x/y'];

export default {
  id: 'htaccess/no-open-redirect',
  description:
    'A redirect target hostname must not be built from the requested URL',
  tags: ['htaccess', 'security'],
  severity: 'error',
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    openRedirect:
      'The redirect target {{target}} builds its hostname from {{ref}}, ' +
      'which comes from the requested URL. A visitor can craft a ' +
      'w3id.org link that redirects to a host they control. Send requests ' +
      'to a hostname written literally in this file, and use the captured ' +
      'value only in the path.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const redirect of parsed.redirects()) {
      const finding = analyse(redirect.target, patternOf(redirect));
      if(finding === null) {
        continue;
      }
      report({
        messageId: 'openRedirect',
        line: redirect.line,
        data: {target: redirect.target, ref: finding.ref}
      });
    }
  }
};

// RewriteRule captures come from its own pattern; Redirect and RedirectMatch
// capture from theirs, which is the argument before the target.
function patternOf(redirect) {
  return redirect.kind === 'RewriteRule' ?
    redirect.args[0] ?? '' : redirect.args.at(-2) ?? '';
}

/**
 * Analyse one redirect target.
 *
 * @returns {{ref: string}|null} the offending backreference, or null if the
 *   hostname cannot be influenced by the requester.
 */
export function analyse(target, pattern) {
  // Only absolute or protocol-relative targets carry a hostname; everything
  // else redirects within w3id.org.
  const m = /^(?:[a-z][a-z0-9+.-]*:)?\/\/([^/?#]*)/i.exec(target);
  if(m === null) {
    return null;
  }
  const authority = m[1];

  const groups = captureGroups(pattern);
  const refPattern = /\$(\d)/g;
  let ref;
  while((ref = refPattern.exec(authority)) !== null) {
    const index = Number.parseInt(ref[1], 10);
    const group = groups[index - 1];
    // A backreference to a group that does not exist expands to nothing.
    if(group === undefined) {
      continue;
    }
    const after = authority.slice(ref.index + ref[0].length);
    const probes = after === '' ? SUFFIX_PROBES : TRUNCATING_PROBES;
    if(admits(group, probes)) {
      return {ref: ref[0]};
    }
  }
  return null;
}

/**
 * Source text of each capturing group in a regular expression, outermost
 * first, which is the order backreferences use.
 */
export function captureGroups(pattern) {
  const groups = [];
  const open = [];
  for(let i = 0; i < pattern.length; ++i) {
    const c = pattern[i];
    if(c === '\\') {
      ++i;
      continue;
    }
    if(c === '[') {
      // Skip a character class; brackets inside it are literals.
      while(i < pattern.length && pattern[i] !== ']') {
        i += pattern[i] === '\\' ? 2 : 1;
      }
      continue;
    }
    if(c === '(') {
      // Non-capturing and lookaround groups take no backreference number.
      const capturing = pattern[i + 1] !== '?';
      open.push(capturing ? {start: i + 1, index: groups.length} : null);
      if(capturing) {
        groups.push(null);
      }
      continue;
    }
    if(c === ')') {
      const frame = open.pop();
      if(frame) {
        groups[frame.index] = pattern.slice(frame.start, i);
      }
    }
  }
  // An unclosed group cannot be analysed; treat its body as the remainder.
  return groups.map(g => g ?? '.*');
}

/** Whether a capture group can match any of the given strings. */
function admits(groupSource, probes) {
  let re;
  try {
    re = new RegExp('^(?:' + groupSource + ')$');
  } catch {
    // An expression this tool cannot compile is not one it can clear.
    return true;
  }
  return probes.some(probe => re.test(probe));
}
