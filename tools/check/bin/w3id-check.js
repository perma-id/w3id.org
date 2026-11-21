#!/usr/bin/env node
import {main} from '../src/cli.js';

// A reader that stops early, as `| head` does, closes the pipe. That is not
// a failure: stop writing, and exit with whatever status the run reached.
process.stdout.on('error', e => {
  if(e.code !== 'EPIPE') {
    throw e;
  }
  process.exit();
});

process.exitCode = await main(process.argv.slice(2));
