import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

/**
 * Keeps the rule registry and the published rule documentation in step.
 *
 * Every rule the checker implements needs a page, because every finding it
 * reports links to one. The reverse is not quite symmetric: a page may describe
 * a rule that is documented but not yet mechanized, which is what
 * `status: proposed` means. Only an `enforced` page claims a check exists, and
 * only that claim is checked here.
 *
 * Silent until `docs/rules/` exists, so the checker works in a tree that does
 * not carry the documentation.
 */
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

export default {
  id: 'meta/rule-docs-exist',
  description: 'Every rule must have a documentation page, and vice versa',
  tags: ['meta', 'self'],
  severity: 'warning',
  scope: 'tree',
  messages: {
    missingPage:
      'Rule {{ruleId}} has no documentation page. Every finding it reports ' +
      'links to {{url}}, which would 404. Add docs/rules/{{ruleId}}.md.',
    orphanPage:
      'docs/rules/{{relPath}} is marked "status: enforced", but no rule with ' +
      'the id "{{ruleId}}" exists. Either the check was removed and the page ' +
      'should say "status: proposed", or the id no longer matches.',
    idMismatch:
      'docs/rules/{{relPath}} declares "id: {{declared}}", but its path says ' +
      'the id is "{{expected}}". The id and the filename are the same thing ' +
      '-- that is what lets a check derive the URL from the rule it ran.'
  },
  check(ctx, report) {
    const docsRoot = path.join(ctx.root, 'docs', 'rules');
    if(!existsSync(docsRoot)) {
      return;
    }

    const ids = new Set(ctx.allRuleIds);

    for(const id of ids) {
      if(existsSync(path.join(docsRoot, id + '.md'))) {
        continue;
      }
      report({
        file: 'docs/rules',
        messageId: 'missingPage',
        data: {ruleId: id, url: ctx.config.docsBaseUrl + id}
      });
    }

    for(const p of ctx.tree) {
      if(!p.startsWith('docs/rules/') || !p.endsWith('.md')) {
        continue;
      }
      const relPath = p.slice('docs/rules/'.length);
      // The catalogue and the per-namespace landing pages are not rules.
      if(path.basename(relPath) === 'index.md') {
        continue;
      }
      const expected = relPath.slice(0, -'.md'.length);
      const front = frontmatterOf(ctx.read(p));

      if(front.id !== undefined && front.id !== expected) {
        report({
          file: p,
          messageId: 'idMismatch',
          data: {relPath, declared: front.id, expected}
        });
      }
      // A page that does not claim to be enforced is allowed to have no check
      // behind it; that is the whole point of `proposed`.
      if(front.status === 'enforced' && !ids.has(expected)) {
        report({
          file: p,
          messageId: 'orphanPage',
          data: {relPath, ruleId: expected}
        });
      }
    }
  }
};

/** The handful of frontmatter fields this rule needs, or an empty object. */
function frontmatterOf(text) {
  if(text === null) {
    return {};
  }
  const match = FRONTMATTER.exec(text);
  if(match === null) {
    return {};
  }
  const fields = {};
  for(const line of match[1].split('\n')) {
    const at = line.indexOf(':');
    if(at === -1) {
      continue;
    }
    fields[line.slice(0, at).trim()] =
      line.slice(at + 1).trim().replace(/^["']|["']$/g, '');
  }
  return fields;
}
