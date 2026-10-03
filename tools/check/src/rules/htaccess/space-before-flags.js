import {looksLikeFlagList} from '../../rewrite-flags.js';

/**
 * A flag list welded onto the end of the argument before it.
 *
 * Apache splits a directive on spaces and tabs, so `https://example.org/a` and
 * `[R=303,L]` written with nothing between them are not a substitution and a
 * flag list. They are one argument. There is no flag list at all, and every
 * flag in it is lost -- the status the `R` asked for, the `NE` that would have
 * stopped the URL being escaped, the `L` that would have stopped later rules
 * running.
 *
 * What makes this worth an error is that it does not look like a failure. The
 * substitution is an absolute URL, so mod_rewrite still issues an external
 * redirect; the identifier answers 302 and a HEAD request looks healthy. The
 * client is simply sent somewhere that does not exist, because the brackets
 * are escaped onto the end of the URL. Every instance in this repository was
 * committed once and never corrected.
 *
 * No other rule can see it. Apache parses no flag list here, so the parser
 * reports none, so the three rules that judge flags have nothing to judge.
 *
 * Reported through the tokenizer rather than by scanning the line, for the
 * reason `htaccess/no-flag-whitespace` gives: a bracket is overwhelmingly a
 * character class. 159 arguments in this tree contain one, and a line-level
 * search for a bracket after a non-space matches 2557 lines against 11 real
 * cases.
 */

const FLAGGED_DIRECTIVES = new Set(['rewriterule', 'rewritecond']);

/**
 * A `[...]` group ending an argument, with something other than `[` before it.
 *
 * The character before the bracket has to exist, so an argument that *is* a
 * flag list -- a `RewriteRule` with its substitution missing -- does not
 * match; that is a different mistake. The group may not contain whitespace,
 * which leaves `[R=302, L]` to `htaccess/no-flag-whitespace`.
 */
const FUSED = /^(.*[^[])(\[[^[\]\s]+\])$/;

/**
 * The Unicode spaces that actually arrive by paste -- out of a word
 * processor, a PDF, a rendered web page. Anything else is named by its code
 * point alone, which is still enough to find it.
 */
const SPACE_NAMES = new Map([
  [' ', 'no-break space'],
  [' ', 'ogham space mark'],
  [' ', 'figure space'],
  [' ', 'narrow no-break space'],
  [' ', 'medium mathematical space'],
  ['　', 'ideographic space'],
  ['﻿', 'zero width no-break space']
]);

function describe(ch) {
  const point =
    'U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
  const name = SPACE_NAMES.get(ch);
  return name === undefined ?
    `Unicode space character ${point}` : `${name} (${point})`;
}

/**
 * What happens instead, which differs enough that asserting one of them would
 * be wrong about the others.
 */
const EFFECT = {
  external:
    'clients are still redirected, which is what hides this -- but to that ' +
    'URL with the brackets escaped onto the end as %5B...%5D, which is not a ' +
    'URL that exists, and at mod_rewrite\'s default 302 rather than the ' +
    'status the R flag asked for',
  internal:
    'the request is rewritten to that path with the brackets still in it, ' +
    'and nothing serves it, so the identifier returns 404 instead of ' +
    'redirecting',
  condition:
    'the brackets become part of the condition pattern, where they are a ' +
    'regular expression character class and not flags, so the condition ' +
    'tests something other than what it reads as'
};

function effectFor(directive, before) {
  if(directive.name.toLowerCase() === 'rewritecond') {
    return EFFECT.condition;
  }
  // An absolute URL still produces an external redirect, to the wrong place
  // and with the wrong status. A relative one does not redirect at all.
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(before) ?
    EFFECT.external : EFFECT.internal;
}

export default {
  id: 'htaccess/space-before-flags',
  description: 'A rewrite flag list must be separated from the argument ' +
    'before it',
  tags: ['htaccess', 'correctness'],
  severity: 'error',
  // The redirect still happens, which is exactly what makes this dangerous:
  // the client is sent to the target with %5B...%5D appended, so the
  // identifier resolves to a 404 while a HEAD request looks healthy. Nothing
  // else reports it, so without this it is found only by whoever follows the
  // link.
  critical: true,
  scope: 'file',
  files: ['**/.htaccess'],
  messages: {
    fused:
      'The flag list {{group}} is joined onto the end of the argument before ' +
      'it on this {{directive}}, with nothing in between. Apache splits a ' +
      'directive on spaces and tabs, so it does not see a flag list here at ' +
      'all -- it sees one long argument -- and every flag in {{group}} is ' +
      'silently lost. What happens instead is that {{effect}}. Put a space ' +
      'before the bracket: {{expected}}',
    invisibleGap:
      'The flag list {{group}} on this {{directive}} is separated from the ' +
      'argument before it by a {{character}}, which looks like a space and ' +
      'is not one. Apache splits a directive on ASCII spaces and tabs only, ' +
      'so it sees one long argument and no flag list, and every flag in ' +
      '{{group}} is silently lost. What happens instead is that {{effect}}. ' +
      'Delete the {{character}} and type an ordinary space: {{expected}}'
  },
  check(ctx, report) {
    const parsed = ctx.htaccess(ctx.file);
    if(parsed === null) {
      return;
    }
    for(const directive of parsed.directives) {
      if(!FLAGGED_DIRECTIVES.has(directive.name.toLowerCase())) {
        continue;
      }
      // `RewriteRule pattern substitution [flags]` and
      // `RewriteCond test condition [flags]`: in both, the flag list is the
      // third argument, so exactly two arguments is the signature of Apache
      // seeing no flag list at all. That is what makes the message's claim
      // true, and it is also what keeps this rule off a character class in
      // the pattern of an otherwise well-formed directive.
      if(directive.args.length !== 2) {
        continue;
      }
      const match = FUSED.exec(directive.args[1]);
      if(match === null) {
        continue;
      }
      const [, before, group] = match;
      if(!looksLikeFlagList(group)) {
        continue;
      }
      // An argument cannot contain a space or a tab -- those ended it. So any
      // whitespace left here is one of the Unicode spaces Apache does not
      // split on, which is the whole distinction between the two messages.
      const gap = before.at(-1);
      const invisible = /\s/.test(gap);
      report({
        messageId: invisible ? 'invisibleGap' : 'fused',
        line: directive.line,
        data: {
          directive: directive.name,
          group,
          effect: effectFor(directive, before),
          character: describe(gap),
          // The repaired line, to copy. The invisible character has to come
          // out rather than have a space added after it.
          expected: `${before.replace(/\s+$/, '')} ${group}`
        }
      });
    }
  }
};
