import fs from 'fs/promises';
import path from 'path';
import { Argv } from 'yargs';
import { InferArguments } from '../types';
import { configPath, serialize } from '../utils';

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

export async function handler(argv: InferArguments<typeof builder>) {
  const { command, key, value } = argv;
  let json;

  try {
    const content = await fs.readFile(configPath, 'utf8');
    json = JSON.parse(content);
  } catch (error) {
    json = {};
  }

  switch (command) {
    case 'set':
      if (value === undefined)
        throw new Error('Please provide a value for the key');

      json[key] = value;
      break;

    case 'get':
      if (!(key in json))
        throw new Error(`The value of ${JSON.stringify(key)} does not exist`);

      console.log(json[key]);
      return;

    case 'unset':
      delete json[key];
      break;
  }

  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, serialize(json));
}
