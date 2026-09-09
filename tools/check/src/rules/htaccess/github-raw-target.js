/**
 * Redirect targets that point at GitHub's web interface rather than the file.
 *
 * `github.com/user/repo/blob/main/vocab.ttl` returns an HTML page with syntax
 * highlighting and a comment box. A triple store fetching the ontology IRI gets
 * that HTML and fails to parse it -- the redirect looks right, the URL opens
 * fine in a browser, and every machine client breaks.
 *
 * The `refs/heads/` segment is a separate, milder point: GitHub's interface
 * sometimes produces raw URLs containing it, they work, and the extra segment
 * is an undocumented routing detail rather than a stable URL shape. That one is
 * about redundancy, not breakage, and the message says so.
 *
 * Deliberately not checked: whether the target names a branch or a tag. A
 * branch is the right answer when you want whatever is current, so preferring
 * a tag is advice a rule cannot give without knowing the intent.
 */
const BLOB = /^https?:\/\/(?:www\.)?github\.com\/[^/]+\/[^/]+\/blob\//i;
const REFS_HEADS = /^https?:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/refs\/heads\//i;

export default {
  id: 'htaccess/github-raw-target',
  description: 'GitHub targets must be raw file URLs',
  tags: ['htaccess', 'correctness'],
  severity: 'warning',
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    blob: 'This redirect targets a GitHub /blob/ URL, which serves an HTML ' +
      'page rather than the file itself. Anything fetching this identifier ' +
      'to parse it -- a triple store, a JSON-LD processor, a validator -- ' +
      'gets a web page and fails, while the URL still looks fine in a ' +
      'browser. Use raw.githubusercontent.com instead: {{suggestion}}',
    refsHeads:
      'This target contains a refs/heads/ segment. It works, but it is an ' +
      'undocumented detail of GitHub\'s routing rather than a stable URL ' +
      'shape, and it makes the target harder to read. Drop it: {{suggestion}}'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const redirect of parsed.redirects()) {
      const target = redirect.target;
      if(BLOB.test(target)) {
        report({
          messageId: 'blob',
          line: redirect.line,
          data: {suggestion: toRaw(target)}
        });
        continue;
      }
      if(REFS_HEADS.test(target)) {
        report({
          messageId: 'refsHeads',
          line: redirect.line,
          data: {suggestion: target.replace(/\/refs\/heads\//i, '/')}
        });
      }
    }
  }
};

function toRaw(target) {
  return target
    .replace(/^(https?:\/\/)(?:www\.)?github\.com\//i,
      '$1raw.githubusercontent.com/')
    .replace(/\/blob\//i, '/');
}
