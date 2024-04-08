import chalk from 'chalk';
import { Argv } from 'yargs';
import * as scite from '../client';
import { fromResponseError, isResponseError, readConfig } from '../utils';
import { InferArguments } from '../types';

export const command = 'papers <doi...>';

export const description = `Retrieve paper metadata by DOI(s).`;

export function builder(yargs: Argv) {
  return yargs
    .positional('doi', { type: 'string', array: true, demandOption: true })
    .describe('doi', 'The DOI(s) of the paper(s) to retrieve.')
    .boolean('target')
    .describe('target', 'Get papers citing a given DOI.');
}

async function main(argv: InferArguments<typeof builder>) {
  process.stderr.write('reading config file ... ');

  const config = await readConfig();

  console.error(chalk.stderr.green('success'));

  const api = new scite.PapersApi(config);

  process.stderr.write('sending api query ... ');

  let data: scite.PapersResponse;

  if (argv.target) {
    data = await api.getTargetSourcesPapersSourcesTargetDoiGet({
      targetDoi: argv.doi[0],
    });
  } else {
    data = await api.getPapersPapersPost({ requestBody: argv.doi });
  }

  console.error(chalk.stderr.green('success'));
  console.error();

  const papers = Object.values(data.papers);

  await console.log(JSON.stringify(papers, null, 2));
}

export async function handler(argv: InferArguments<typeof builder>) {
  try {
    await main(argv);
  } catch (error) {
    console.error(`${chalk.stderr.red('error')}\n`);
    if (!isResponseError(error)) throw error;
    throw await fromResponseError(error);
  }
}