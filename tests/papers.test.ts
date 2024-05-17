import fs from 'fs/promises';
import { PapersResponse } from '../src/client';
import { handler } from '../src/commands/papers';
import { extractIds, get, post } from './utils';

jest.mock('fs/promises');

const writeFileMock = fs.writeFile as jest.Mock;
const spy = jest.fn();

console.log = spy;

beforeEach(() => {
  jest.clearAllMocks();
});

const cases = [
  {
    name: 'should retrieve papers by DOIs',
    args: {
      doi: ['10.1007/s10616-007-9104-1', '10.1002/bio.4224'],
      target: false,
    },
    fetcher: (doi: string[]) =>
      post<PapersResponse>('https://api.scite.ai/papers', doi),
  },
  {
    name: 'should filter out papers not found by DOI',
    args: {
      doi: ['Tk7jQTRHFU3z3mvES2X9VDjiaqAF6t', '10.1007/s10616-007-9104-1'],
      target: false,
    },
    fetcher: (doi: string[]) =>
      post<PapersResponse>('https://api.scite.ai/papers', doi),
  },
  {
    name: 'should retrieve papers citing a given DOI',
    args: {
      doi: ['10.1007/s10616-007-9104-1'],
      target: true,
    },
    fetcher: (doi: string[]) =>
      get<PapersResponse>(`https://api.scite.ai/papers/sources/${doi[0]}`),
  },
];

it.each(cases)('$name', async ({ args, fetcher }) => {
  const data = await fetcher(args.doi);

  await handler({ ...args, $0: 'scite-cli', _: ['papers'] });

  const calls = spy.mock.calls;

  expect(spy).toHaveBeenCalledTimes(1);
  expect(calls[0]).toHaveLength(1);

  const arg = calls[0][0];

  expect(typeof arg).toBe('string');

  const expected = extractIds(Object.values(data.papers));
  const actual = extractIds(JSON.parse(arg));

  expect(actual).toStrictEqual(expected);
});

it("should throw when targeting a doi that doesn't exist", async () => {
  const promise = handler({
    doi: ['non-existant-doi'],
    target: true,
    $0: 'scite-cli',
    _: ['papers'],
  });

  await expect(promise).rejects.toThrow();
});

it.each([
  { doi: ['', ''], target: false },
  { doi: [''], target: true },
])('should throw when no DOIs are provided', async (args) => {
  let promise = handler({
    ...args,
    $0: 'scite-cli',
    _: ['papers'],
  });

  await expect(promise).rejects.toThrow();
});

it('--output should write output to file', async () => {
  const output = 'output.json';
  const doi = ['10.1007/s10616-007-9104-1'];
  const data = await post<PapersResponse>('https://api.scite.ai/papers', doi);

  await handler({
    doi,
    output,
    $0: 'scite-cli',
    _: ['papers'],
  });

  const calls = writeFileMock.mock.calls;

  expect(spy).not.toHaveBeenCalled();
  expect(writeFileMock).toHaveBeenCalledTimes(1);

  const [filepath, content] = calls[0];

  expect(filepath).toBe(output);
  expect(typeof content).toBe('string');

  const expected = extractIds(Object.values(data.papers));
  const actual = extractIds(JSON.parse(content));

  expect(actual).toStrictEqual(expected);
});
