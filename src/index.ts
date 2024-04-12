#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { fromResponseError, isResponseError } from './utils';

async function fail(msg: string, err?: Error) {
  if (err instanceof ZodError) {
    err = fromZodError(err, {
      issueSeparator: '\n- ',
      prefixSeparator: ':\n\n- ',
    });
  }

  if (isResponseError(err)) err = await fromResponseError(err);

  if (err) msg = err.message;

  console.error(`\n${msg}\n`);
  console.error('Specify --help for available options.');
  process.exit(1);
}

yargs(hideBin(process.argv))
  .commandDir('commands', { extensions: ['js', 'ts'] })
  .strict()
  .demandCommand()
  .recommendCommands()
  .completion()
  .help()
  .fail(fail)
  .parse();
