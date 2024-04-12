import chalk from 'chalk';
import fs from 'fs/promises';
import { Argv } from 'yargs';
import { InferArguments } from '../types';
import { configPath } from '../utils';

export const command = 'config <command> <key> [value]';

export const description = 'Get, set, and unset configuration options';

export function builder(yargs: Argv) {
  return yargs
    .positional('command', { type: 'string' })
    .choices('command', ['get', 'set', 'unset'] as const)
    .demandOption('command')
    .describe('command', 'The command to execute')
    .positional('key', { type: 'string' })
    .demandOption('key')
    .describe('key', 'The configuration key')
    .positional('value', { type: 'string' })
    .describe('value', 'The value to set for the key');
}

export async function main(argv: InferArguments<typeof builder>) {
  const { command, key, value } = argv;

  process.stderr.write('reading config ... ');

  const content = await fs.readFile(configPath, 'utf8');
  const json = JSON.parse(content);

  console.error(chalk.stderr.green('success'));

  const skey = JSON.stringify(key);
  const svalue = JSON.stringify(value);

  switch (command) {
    case 'set':
      if (value === undefined) {
        console.log(chalk.stderr.red(`Please provide a value for the key`));
        return;
      }

      json[key] = value;

      console.log(
        `setting ${skey} to ${svalue} ... ${chalk.stderr.green('success')}`,
      );
      break;

    case 'get':
      if (key in json) {
        const value = JSON.stringify(json[key]);
        console.log(`The value of ${skey} is ${chalk.stderr.green(value)}`);
      } else {
        console.log(chalk.stderr.red(`The value of ${skey} does not exist`));
      }
      return;

    case 'unset':
      delete json[key];
      console.log(`unsetting ${skey} ... ${chalk.stderr.green('success')}`);
      break;
  }

  process.stderr.write('writing config ... ');

  await fs.writeFile(configPath, JSON.stringify(json, null, 2));

  console.error(chalk.stderr.green('success'));
}

export async function handler(argv: InferArguments<typeof builder>) {
  try {
    await main(argv);
  } catch (error) {
    console.error(`${chalk.stderr.red('error')}`);
    throw error;
  }
}
