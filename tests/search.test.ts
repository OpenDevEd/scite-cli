import camelCaseKeys from 'camelcase-keys';
import fs from 'fs/promises';
import { SearchResultsResponse } from '../src/client';
import { builder, handler } from '../src/commands/search';
import { InferArguments } from '../src/types';
import { serialize } from '../src/utils';
import { extractIds, get } from './utils';

type Arguments = InferArguments<typeof builder>;

const cases = [
  {
    name: 'should retrieve 25 results starting from 100',
    args: {
      offset: 100,
      limit: 25,
    },
  },
  {
    name: 'should search for documents matching a term',
    args: {
      term: 'mitosis',
    },
  },
  {
    name: 'should handle no search results',
    args: {
      term: 'Tk7jQTRHFU3z3mvES2X9VDjiaqAF6t',
    },
  },
  {
    name: 'should sort results by date',
    args: {
      term: 'mitosis',
      sort: 'date',
    },
  },
  {
    name: 'should filter by author',
    args: {
      author: 'John Doe',
    },
  },
  {
    name: 'should filter by journal',
    args: {
      journal: 'Nature',
    },
  },
  {
    name: 'should filter by citation types',
    args: {
      'citation-types': [
        'supporting',
        'contrasting',
      ] as Arguments['citation-types'],
    },
  },
  {
    name: 'should filter by title',
    args: {
      title: 'Cell division',
    },
  },
  {
    name: 'should filter by abstract',
    args: {
      abstract: 'mitosis abstract text',
    },
  },
  {
    name: 'should filter by date range',
    args: {
      'date-from': '2020-01-01',
      'date-to': '2022-12-31',
    },
  },
  {
    name: 'should filter by citation count ranges',
    args: {
      'supporting-from': 10,
      'supporting-to': 100,
      'mentioning-from': 10,
      'mentioning-to': 100,
      'contrasting-from': 10,
      'contrasting-to': 100,
    },
  },
  {
    name: 'should filter by publication metadata',
    args: {
      'paper-type': 'research article',
      section: 'results',
      affiliation: 'Stanford University',
    },
  },
  {
    name: 'should filter by aggregations',
    args: {
      aggregations: ['authors', 'journals'],
    },
  },
  {
    name: 'should filter by author and date range',
    args: {
      author: 'John Doe',
      'date-from': '2018-01-01',
      'date-to': '2020-12-31',
    },
  },
  {
    name: 'should filter by abstract and citation counts',
    args: {
      abstract: 'cancer research',
      'supporting-from': 5,
      'supporting-to': 50,
      'mentioning-from': 10,
      'mentioning-to': 100,
    },
  },
  {
    name: 'should filter by title, abstract and metadata',
    args: {
      title: 'AI in Healthcare',
      abstract: 'machine learning',
      'paper-type': 'review article',
      section: 'introduction',
      affiliation: 'MIT',
    },
  },
  {
    name: 'should filter by multiple parameters',
    args: {
      title: 'Climate Change',
      author: 'Jane Smith',
      'date-from': '2010-01-01',
      'date-to': '2015-12-31',
      'supporting-from': 20,
      'supporting-to': 100,
      'paper-type': 'editorial',
      journal: 'Nature',
    },
  },
  {
    name: 'should filter by author, journal and citation counts',
    args: {
      author: 'John Doe',
      journal: 'Science',
      'mentioning-from': 5,
      'mentioning-to': 20,
    },
  },
  {
    name: 'should filter by title, date range, paper type and affiliation',
    args: {
      title: 'AI Ethics',
      'date-from': '2020-01-01',
      'date-to': '2022-12-31',
      'paper-type': 'research article',
      affiliation: 'MIT',
    },
  },
  {
    name: 'should filter by abstract, author, journal and supporting citations',
    args: {
      abstract: 'climate change',
      author: 'Jane Smith',
      journal: 'Nature Climate Change',
      'supporting-from': 10,
      'supporting-to': 50,
    },
  },
] as const;

jest.mock('fs/promises');

const readFileMock = fs.readFile as jest.Mock;
const writeFileMock = fs.writeFile as jest.Mock;
const spy = jest.fn();

// empty config file
readFileMock.mockResolvedValue(serialize({}));

console.log = spy;

beforeEach(() => {
  jest.clearAllMocks();
});

it.each(cases)('$name', async ({ args }) => {
  const data = await get<SearchResultsResponse>(
    'https://api.scite.ai/search',
    args,
  );

  await handler({
    $0: 'scite-cli',
    _: ['search'],
    offset: 0,
    limit: 10,
    output: 'output.json',
    ...args,
    ...camelCaseKeys(args), // simulate yargs parsing
  });

  const calls = spy.mock.calls;

  expect(spy).toHaveBeenCalledTimes(1);
  expect(calls[0]).toHaveLength(1);

  const arg = calls[0][0];

  expect(typeof arg).toBe('string');

  const expected = extractIds(data.hits);
  const actual = extractIds(JSON.parse(arg));

  expect(actual).toStrictEqual(expected);
});

it('--output should write output to file', async () => {
  const output = 'output.json';
  const data = await get<SearchResultsResponse>('https://api.scite.ai/search');

  await handler({
    $0: 'scite-cli',
    _: ['search'],
    offset: 0,
    limit: 10,
    output,
  });

  const calls = writeFileMock.mock.calls;

  expect(spy).not.toHaveBeenCalled();
  expect(writeFileMock).toHaveBeenCalledTimes(1);

  const [filepath, content] = calls[0];

  expect(filepath).toBe(output);
  expect(typeof content).toBe('string');

  const expected = extractIds(data.hits);
  const actual = extractIds(JSON.parse(content));

  expect(actual).toStrictEqual(expected);
});

it('--count should return the number of results that match the query', async () => {
  const data = await get<SearchResultsResponse>('https://api.scite.ai/search');

  await handler({
    $0: 'scite-cli',
    _: ['search'],
    offset: 0,
    limit: 10,
    count: true,
    output: 'output.json',
  });

  const calls = spy.mock.calls;

  expect(spy).toHaveBeenCalledTimes(1);
  expect(calls[0]).toHaveLength(1);

  const arg = calls[0][0];

  expect(arg).toBe(data.count.toString());
});
