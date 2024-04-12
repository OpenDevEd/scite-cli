import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { z } from 'zod';
import { name } from '../package.json';
import * as scite from './client';

dayjs.extend(customParseFormat);

const home = os.homedir();
const defaultConfigPath = path.join(home, '.config', name, 'config.json');

/**
 * Reads the configuration from a file.
 * @param filepath The path to the configuration file.
 * @returns A Promise that resolves to a `scite.Configuration` instance.
 */
export async function readConfig(filepath = defaultConfigPath) {
  filepath = path.resolve(filepath);

  const content = await fs.readFile(filepath, 'utf8');
  const json = JSON.parse(content);

  return new scite.Configuration({ basePath: 'https://api.scite.ai', ...json });
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
  const body = await response.json();
  const status = response.status;
  const message = `${err.message}
Status: ${status}
Body: ${JSON.stringify(body, null, 2)}`;

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
