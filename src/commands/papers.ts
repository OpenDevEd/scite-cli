import fs from 'fs/promises';
import { Argv } from 'yargs';
import * as scite from '../client';
import { InferArguments } from '../types';
import { readConfig, serialize } from '../utils';

export const command = 'papers <doi...>';

export const description = `Retrieve paper metadata by DOI(s).`;

export function builder(yargs: Argv) {
  return yargs
    .string('output')
    .alias('output', 'o')
    .describe('output', 'File path to save output to')
    .default('doi', undefined) // removes "[default: []]" from description
    .positional('doi', { type: 'string' })
    .array('doi')
    .demandOption('doi')
    .describe('doi', 'The DOI(s) of the paper(s) to retrieve.')
    .boolean('target')
    .describe('target', 'Get papers citing a given DOI.');
}

export async function handler(argv: InferArguments<typeof builder>) {
  const config = await readConfig();
  const api = new scite.PapersApi(config);
  let data: scite.PapersResponse;

  if (argv.target) {
    data = await api.getTargetSourcesPapersSourcesTargetDoiGet({
      targetDoi: argv.doi[0],
    });
  } else {
    data = await api.getPapersPapersPost({ requestBody: argv.doi });
  }

  const papers = Object.values(data.papers).map((paper) => {
    const { _abstract, ...rest } = paper;
    return { abstract: _abstract, ...rest };
  });

  if (argv.output) {
    fs.writeFile(argv.output, serialize(papers));
  } else {
    console.log(serialize(papers));
  }
}
