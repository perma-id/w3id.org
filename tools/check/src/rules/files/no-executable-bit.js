/**
 * Nothing in this repository is executed by the service. Apache resolves
 * identifiers from `.htaccess` and serves nothing else, so the executable bit
 * on a tracked file changes no behaviour at all. It is wrong for what it says
 * rather than for what it does.
 *
 * Under `ids/` it says something plainly false: an identifier directory holds
 * an `.htaccess` and a README, and neither is a program. The bit gets there by
 * accident -- a file copied off a Windows or FAT volume, unpacked from a zip,
 * or written under a permissive umask -- and once committed it survives every
 * copy of the directory, which is how 91 of them came to carry it.
 *
 * Outside `ids/` the repository does keep programs: the checker's own entry
 * points and the local server scripts. Every one of them begins with `#!`, and
 * no file in the tree that lacks the bit begins with one -- so the shebang is
 * what separates a program from a data file here, exactly. A file with no `#!`
 * line is not something a shell can run, so the bit on it is the same
 * accident.
 */

export default {
  id: 'files/no-executable-bit',
  description: 'Tracked files are not programs and must not be executable',
  tags: ['files', 'metadata'],
  severity: 'error',
  fixable: true,
  scope: 'file',
  files: ['**/*'],
  messages: {
    inIds:
      '{{name}} is recorded as executable (mode 100755). An identifier ' +
      'directory holds an .htaccess and a README, and neither is a program -- ' +
      'w3id.org resolves identifiers and never runs anything it stores, so ' +
      'the bit does not change how this identifier behaves. It is recorded ' +
      'state that is not true, it usually arrives with a file copied off ' +
      'Windows or out of a zip, and it survives every copy of the directory. ' +
      'Clear it with: chmod 644 {{path}} -- or, where the filesystem does not ' +
      'record the bit, git update-index --chmod=-x {{path}}',
    notAScript:
      '{{name}} is recorded as executable (mode 100755) but does not begin ' +
      'with a #! line, so nothing can run it as a program. The bit breaks ' +
      'nothing -- this repository is read and served, not executed -- but it ' +
      'is recorded state that is not true, and it survives every copy of the ' +
      'file. Clear it with: chmod 644 {{path}} -- or, where the filesystem ' +
      'does not record the bit, git update-index --chmod=-x {{path}}. If this ' +
      'really is a script, add the #! line instead.'
  },
  check(ctx, report) {
    // Identity against 100755, not a test for "executable": a mode that could
    // not be established is null, and a symlink is 120000 whatever bits it
    // carries on disk. Neither is something to report.
    if(ctx.mode(ctx.file) !== '100755') {
      return;
    }
    const data = {name: ctx.file.split('/').pop(), path: ctx.file};
    // The hosted tree is never executed and holds no scripts, so there is no
    // shebang worth consulting. Only the repository's own tooling can have a
    // reason for the bit.
    if(ctx.file.startsWith(ctx.idsDir + '/')) {
      report({messageId: 'inIds', line: 1, data});
      return;
    }
    const text = ctx.read(ctx.file);
    if(text !== null && text.startsWith('#!')) {
      return;
    }
    report({messageId: 'notAScript', line: 1, data});
  }
};
