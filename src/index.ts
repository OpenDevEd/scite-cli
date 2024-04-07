import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .commandDir('commands', { extensions: ['js', 'ts'] })
  .strict()
  .demandCommand()
  .recommendCommands()
  .completion()
  .help()
  .showHelpOnFail(false, 'Specify --help for available options.')
  .parse();
