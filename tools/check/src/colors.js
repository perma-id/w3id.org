/**
 * Terminal colors, on only when output is a terminal.
 *
 * picocolors' own rule also turns them on whenever `CI` is set, piped or not,
 * and the audit workflow pipes reports into a Markdown job summary, which
 * then showed the escape codes as text. `NO_COLOR` still turns color off and
 * `FORCE_COLOR` still turns it on.
 */
import pc from 'picocolors';

const env = process.env;

export default pc.createColors(!env.NO_COLOR && (!!env.FORCE_COLOR ||
  (process.stdout.isTTY === true && env.TERM !== 'dumb')));
