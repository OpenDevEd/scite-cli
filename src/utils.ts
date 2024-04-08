import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
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
Body: ${JSON.stringify(body, null, 2)}
`;

  return new Error(message);
}

/**
 * Creates a parser function for a given Zod schema.
 * @param schema The Zod schema to use for parsing.
 * @returns A parser function that validates and parses the input data.
 */
export function createParser<T>(schema: z.ZodType<T>) {
  return function parse(data: unknown) {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw fromZodError(error);
      }

      throw error;
    }
  };
}

/**
 * Validates a date string against a given format.
 * @param date The date string to validate.
 * @param format The format or an array of formats to validate against.
 * @throws An error if the date is not in the specified format or is not a valid date.
 * @returns The validated date string.
 */
export function validateDateString(date: string, format: string | string[]) {
  format = Array.isArray(format) ? format : [format];
  const isValid = dayjs(date, format, true).isValid();

  if (isValid) return date;

  throw new Error(
    `Validation error: Date must be in the format ${format.join(' or ')} and must be a valid date.`,
  );
}
