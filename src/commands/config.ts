import fs from 'fs/promises';
import ora from 'ora';
import path from 'path';
import { Argv } from 'yargs';
import { z } from 'zod';
import { InferArguments } from '../types';
import { ask, configPath, readConfigFile, serialize } from '../utils';

export const command = 'config <command> <key>';

export const description = 'Get, set, and unset configuration options';

export enum CommandEnum {
  Get = 'get',
  Set = 'set',
  Unset = 'unset',
}

export const schema = z
  .object({
    command: z.nativeEnum(CommandEnum),
    key: z.string().min(1),
  })
  .partial();

export function builder(yargs: Argv) {
  return yargs
    .positional('command', { type: 'string' })
    .choices('command', Object.values(CommandEnum))
    .demandOption('command')
    .describe('command', 'The command to execute')
    .positional('key', { type: 'string' })
    .demandOption('key')
    .describe('key', 'The configuration key')
    .check((argv) => schema.parse(argv));
}

async function main(argv: InferArguments<typeof builder>, spinner: ora.Ora) {
  spinner.text = 'reading config';

  const { command, key } = argv;
  const config = await readConfigFile();

  switch (command) {
    case CommandEnum.Set:
      spinner.stop();
      config[key] = await ask(`Enter the value for ${JSON.stringify(key)}: `);
      config[key] = config[key].trim();
      break;

    case CommandEnum.Get:
      if (!(key in config))
        throw new Error(`The value of ${JSON.stringify(key)} does not exist`);

      spinner.stop();
      console.log(config[key]);
      return;

    case CommandEnum.Unset:
      delete config[key];
      break;
  }

  spinner.text = 'updating config';
  spinner.start();

  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, serialize(config));

  spinner.succeed(`updated ${JSON.stringify(key)}`);
}

export async function handler(argv: InferArguments<typeof builder>) {
  const spinner = ora().start();

  try {
    await main(argv, spinner);
  } catch (error) {
    spinner.fail('error');
    throw error;
  }
}
