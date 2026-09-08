import {CANONICAL_README, README_PATTERNS} from '../../paths.js';

export default {
  id: 'files/readme-canonical-name',
  description: 'READMEs should be named README.md',
  tags: ['files', 'style'],
  severity: 'warning',
  scope: 'file',
  files: README_PATTERNS,
  messages: {
    rename:
      'Rename {{name}} to README.md. GitHub renders a directory listing\'s ' +
      'README only for recognised spellings, and tooling looks for README.md.'
  },
  check(ctx, report) {
    if(!ctx.file.startsWith(ctx.idsDir + '/')) {
      return;
    }
    const name = ctx.file.split('/').pop();
    if(name === CANONICAL_README) {
      return;
    }
    report({messageId: 'rename', line: 1, data: {name}});
  }
};
