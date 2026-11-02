/**
 * w3id.org is a shared redirect service. A contributor's `.htaccess` runs on
 * the same server as everyone else's, so directives that reach outside the
 * redirect use case -- executing code, serving local files, proxying, altering
 * access control -- are refused rather than reviewed case by case.
 */

// Directives with no legitimate use in a redirect-only namespace.
const DENIED = new Map([
  ['rewritemap', 'defines a server-wide lookup map'],
  ['include', 'pulls in another configuration file'],
  ['includeoptional', 'pulls in another configuration file'],
  ['addhandler', 'makes the server execute matching files'],
  ['sethandler', 'makes the server execute matching files'],
  ['action', 'makes the server execute a script for matching requests'],
  ['script', 'makes the server execute a script for matching requests'],
  ['alias', 'maps a URL onto a filesystem path'],
  ['scriptalias', 'maps a URL onto an executable filesystem path'],
  ['authtype', 'changes access control'],
  ['authname', 'changes access control'],
  ['authuserfile', 'changes access control'],
  ['authgroupfile', 'changes access control'],
  ['authbasicprovider', 'changes access control'],
  ['satisfy', 'changes access control'],
  ['php_flag', 'configures a PHP interpreter'],
  ['php_value', 'configures a PHP interpreter'],
  ['php_admin_flag', 'configures a PHP interpreter'],
  ['php_admin_value', 'configures a PHP interpreter']
]);

// `Options` arguments that enable code execution or directory listing.
const DENIED_OPTIONS = new Set([
  'execcgi', 'includes', 'includesnoexec', 'all'
]);

export default {
  id: 'htaccess/allowed-directives',
  description: 'Only redirect-related Apache directives may be used',
  tags: ['htaccess', 'security'],
  severity: 'error',
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    denied:
      '{{directive}} is not allowed here: it {{reason}}. w3id.org only ' +
      'redirects requests -- it does not serve or execute content -- and ' +
      'this file runs on a server shared with every other identifier.',
    deniedOption:
      'Options {{option}} is not allowed here: it enables server-side ' +
      'execution or directory listing on a server shared with every other ' +
      'identifier. This namespace only needs redirects.',
    proxyFlag:
      'The [P] flag makes w3id.org fetch {{target}} and serve it as its own ' +
      'response, turning the service into an open proxy. Use a redirect ' +
      '([R=302] or [R=303]) so the visitor\'s browser goes to the ' +
      'destination itself.'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }

    for(const directive of parsed.directives) {
      const name = directive.name.toLowerCase();
      const reason = DENIED.get(name);
      if(reason !== undefined) {
        report({
          messageId: 'denied',
          line: directive.line,
          data: {directive: directive.name, reason}
        });
        continue;
      }
      if(name === 'options') {
        for(const arg of directive.args) {
          // Options arguments may carry a leading + or -; a disabled option
          // is not a problem.
          if(arg.startsWith('-')) {
            continue;
          }
          if(DENIED_OPTIONS.has(arg.replace(/^\+/, '').toLowerCase())) {
            report({
              messageId: 'deniedOption',
              line: directive.line,
              data: {option: arg}
            });
          }
        }
      }
    }

    for(const rule of parsed.rewriteRules()) {
      if(rule.flags.has('P') || rule.flags.has('PROXY')) {
        report({
          messageId: 'proxyFlag',
          line: rule.line,
          data: {target: rule.substitution}
        });
      }
    }
  }
};
