/**
 * Redirect targets on RawGit, which has shut down.
 *
 * `rawgit.com` no longer serves files: a target there returns 404 today.
 * `cdn.rawgit.com` still answers, but only by forwarding to jsDelivr, which a
 * deprecated service can stop doing at any time without notice. Either way the
 * fix is the same: point at jsDelivr directly, which RawGit's archived
 * repository says to use and which it now forwards to.
 *
 * The rawgit URL may sit inside a longer target, as when a documentation
 * service is handed it as an argument, so the pattern is not anchored.
 *
 * jsDelivr serves HTML as `text/plain`, so a browser shows the source. For a
 * page meant to be read, GitHub Pages is the better target, and the message
 * says so rather than suggesting a URL that would look broken.
 */
const RAWGIT =
  /https?:\/\/(cdn\.)?rawgit(?:hub)?\.com\/([^/\s]+)\/([^/\s]+)\/([^/\s]+)\//i;

export default {
  id: 'htaccess/no-rawgit',
  description: 'Redirect targets must not use RawGit',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  // A rawgit.com target is already dead, and a cdn.rawgit.com one depends on
  // a shut-down service's forwarding.
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    dead:
      'This redirect targets rawgit.com, which has shut down: it returns 404, ' +
      'so the identifier does not resolve. {{fix}}',
    forwarded:
      'This redirect targets cdn.rawgit.com, which has shut down. It still ' +
      'forwards to jsDelivr, but a deprecated service can stop at any time. ' +
      '{{fix}}'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const redirect of parsed.redirects()) {
      const match = RAWGIT.exec(redirect.target);
      if(match === null) {
        continue;
      }
      report({
        messageId: match[1] === undefined ? 'dead' : 'forwarded',
        line: redirect.line,
        data: {fix: fixFor(redirect.target)}
      });
    }
  }
};

function fixFor(target) {
  if(/\.html?(?:$|[?#])/i.test(target)) {
    return 'jsDelivr would serve this page as plain text, so point it at ' +
      'GitHub Pages for the repository instead.';
  }
  return 'Use jsDelivr: ' + toJsdelivr(target);
}

/** The jsDelivr URL for the same file: `/gh/user/repo@ref/path`. */
export function toJsdelivr(target) {
  return target.replace(RAWGIT, 'https://cdn.jsdelivr.net/gh/$2/$3@$4/');
}
