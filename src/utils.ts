import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import readline from 'readline';
import { z } from 'zod';
import { name } from '../package.json';
import * as scite from './client';

dayjs.extend(customParseFormat);

const home = os.homedir();
export const configPath = path.join(home, '.config', name, 'config.json');

/**
 * Reads the configuration file.
 * @returns The parsed JSON object from the config file.
 */
export async function readConfigFile() {
  try {
    const content = await fs.readFile(configPath, 'utf8');
    const json = JSON.parse(content);

    // json is an object literal
    if (typeof json === 'object' && !Array.isArray(json)) return json;

    return {};
  } catch (error) {
    return {};
  }
}

/**
 * Reads the configuration from the config file.
 * @returns A Promise that resolves to a `scite.Configuration` instance.
 */
export async function readConfig() {
  const config = await readConfigFile();

  return new scite.Configuration({
    basePath: config['base-path'] || 'https://api.scite.ai',
    accessToken: config['access-token'],
  });
}

/**
 * Checks if an error is an instance of ResponseError.
 * @param error The error to check.
 * @returns True if the error is an instance of ResponseError, false otherwise.
 */
export function isResponseError(error: unknown): error is scite.ResponseError {
  return error instanceof Error && error.name === 'ResponseError';
}

/**
 * Converts a ResponseError to a a user friendly Error object.
 * @param err The ResponseError to convert.
 * @returns A new Error object with the error message, status, and body information.
 */
export async function fromResponseError(err: scite.ResponseError) {
  const response = err.response;
  const body = await response.json().catch(() => response.statusText);
  const status = response.status;
  const message = `${err.message}
Status: ${status}
Body: ${serialize(body)}`;

  return new Error(message);
}

/**
 * Validates a date string using the specified format(s).
 * @param format The format(s) to validate the date against.
 * @returns A Zod string schema with a refinement to validate the date.
 */
export function ZodDateString(format: string | string[]) {
  format = Array.isArray(format) ? format : [format];

  const isValid = (date: string) => dayjs(date, format, true).isValid();
  const stringified = format.map((f) => JSON.stringify(f));
  const message = `Date must be in the format ${stringified.join(' or ')} and must be a valid date.`;

  return z.string().refine(isValid, { message });
}

/**
 * Serializes an object to a JSON string with indentation.
 * @param obj The object to serialize.
 * @returns A JSON string representation of the object.
 */
export function serialize(obj: unknown) {
  return JSON.stringify(obj, null, 2);
}

/**
 * Prompts the user for input and returns the response.
 * @param prompt The prompt to display to the user.
 * @returns A Promise that resolves to the user's input.
 */
export function ask(prompt: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

/**
 * Outputs data to a file or the console.
 * @param data The data to output.
 * @param filepath The optional file path to write the data to. If not provided, the data will be logged to the console.
 */
export async function output(data: unknown, filepath?: string) {
  if (filepath) {
    await fs.writeFile(filepath, serialize(data));
  } else {
    console.log(serialize(data));
  }
}

export async function expand(query: string[]) {
  let searchQuery = '';

  for (let i = 0; i < query.length; i++) {
    const match = query[i].match(/(\w+)\.\.\./);
    if (match) {
      const key = match[1];

      let file = 'searchterms/' + key + '.txt';
      if (!(await exists(file))) {
        file = `${os.homedir()}/.config/scite-cli/searchterms/${key}.txt`;
      }
      let result = (await exists(file)) ? await fs.readFile(file, 'utf8') : key;
      const resultarr = result.split(/\r?\n/);
      result = '';
      let operator = '';
      let useoperator = false;
      for (let j = 0; j < resultarr.length; j++) {
        const match = resultarr[j].match(/#(OR|AND)\s*$/);

        if (match) {
          operator = ' ' + match[1] + ' ';
          useoperator = true;
        }
        if (resultarr[j].match(/#(-)\s*$/)) {
          useoperator = true;
          operator = ' ';
        }
        const term = sanitise(resultarr[j].replace(/#.+$/g, ''));
        if (term != '') {
          result +=
            (result.match(/[\w")]\s+$/) && !term.match(/^\s*\)/)
              ? operator
              : '') +
            (useoperator ? quoteIfNeeded(term) : term) +
            ' ';
        }
      }
      result = query[i].replace(RegExp(key + '\\.\\.\\.'), result);
      searchQuery += ` ${result}`;
    } else {
      searchQuery += ` ${quoteIfNeeded(query[i])} `;
    }
  }

  searchQuery = searchQuery.replace(/\[/gs, '(');
  searchQuery = searchQuery.replace(/\]/gs, ')');
  return searchQuery;
}

async function exists(f: string) {
  try {
    await fs.stat(f);
    return true;
  } catch {
    return false;
  }
}

function sanitise(str: string) {
  let term = str;
  term = term.replace(/\t+/gs, ' ');
  term = term.replace(/ +/gs, ' ');
  term = term.replace(/^ +/gs, '');
  term = term.replace(/ +$/gs, '');
  return term;
}

function quoteIfNeeded(term: string) {
  if (term.match(/ /) && !term.match(/^".*"$/)) {
    term = `"${term}"`;
  }
  return term;
}
