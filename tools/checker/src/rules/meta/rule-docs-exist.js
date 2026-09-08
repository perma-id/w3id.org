import {existsSync} from 'node:fs';
import path from 'node:path';

/**
 * Keeps the rule registry and the published rule documentation in step.
 *
 * The documentation lives in `docs/rules/<rule id>.md` and is maintained
 * separately from this tool, so this rule stays silent until that directory
 * exists. Once it does, a rule with no page -- or a page with no rule -- is a
 * broken documentation link in every report the checker prints.
 */
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
      'docs/rules/{{relPath}} documents "{{ruleId}}", which is not a rule ' +
      'this checker implements. Remove the page, or correct its name.'
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
      const id = p.slice('docs/rules/'.length, -'.md'.length);
      if(ids.has(id)) {
        continue;
      }
      report({
        file: p,
        messageId: 'orphanPage',
        data: {ruleId: id, relPath: p.slice('docs/rules/'.length)}
      });
    }
  }
};
