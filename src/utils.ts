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

export async function readConfig() {
  const home = os.homedir();
  const filepath = path.join(home, '.config', name, 'config.json');
  const content = await fs.readFile(filepath, 'utf8');
  const json = JSON.parse(content);

  return new scite.Configuration({ basePath: 'https://api.scite.ai', ...json });
}

export function isResponseError(error: unknown): error is scite.ResponseError {
  return error instanceof Error && error.name === 'ResponseError';
}

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

export function validateDateString(date: string, format: string | string[]) {
  format = Array.isArray(format) ? format : [format];
  const isValid = dayjs(date, format, true).isValid();

  if (isValid) return date;

  throw new Error(
    `Validation error: Date must be in the format ${format.join(' or ')} and must be a valid date.`,
  );
}
