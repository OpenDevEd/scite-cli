import chalk from 'chalk';
import { Argv } from 'yargs';
import * as scite from '../client';
import { InferArguments } from '../types';
import { readConfig, serialize } from '../utils';

export const command = 'papers <doi...>';

export const description = `Retrieve paper metadata by DOI(s).`;

export function builder(yargs: Argv) {
  return yargs
    .default('doi', undefined) // removes "[default: []]" from description
    .positional('doi', { type: 'string' })
    .array('doi')
    .demandOption('doi')
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

  const papers = Object.values(data.papers).map(paper => {
    const { _abstract, ...rest } = paper;
    return { abstract: _abstract, ...rest };
  });

  console.log(serialize(papers));
}

export async function handler(argv: InferArguments<typeof builder>) {
  try {
    await main(argv);
  } catch (error) {
    console.error(`${chalk.stderr.red('error')}`);
    throw error;
  }
}
