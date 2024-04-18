import axios from 'axios';
import { PapersResponse } from '../src/client';
import { handler } from '../src/commands/papers';
import { extractIds } from './utils';

const spy = jest.fn();

console.log = spy;

beforeEach(() => {
  jest.clearAllMocks();
});

it('should retrieve papers by DOIs', async () => {
  const doi = ['10.1007/s10616-007-9104-1', '10.1002/bio.4224'];
  const res = await axios.post('https://api.scite.ai/papers', doi);

  await handler({ doi, target: false, $0: 'scite-cli', _: ['papers'] });

  const calls = spy.mock.calls;

  expect(spy).toHaveBeenCalledTimes(1);
  expect(calls[0]).toHaveLength(1);

  const arg = calls[0][0];

  expect(typeof arg).toBe('string');

  const data: PapersResponse = res.data;

  const expected = extractIds(Object.values(data.papers));
  const actual = extractIds(JSON.parse(arg));

  expect(actual).toStrictEqual(expected);
});

it('should retrieve papers citing a given DOI', async () => {
  const doi = '10.1007/s10616-007-9104-1';
  const res = await axios.get(`https://api.scite.ai/papers/sources/${doi}`);

  await handler({ doi: [doi], target: true, $0: 'scite-cli', _: ['papers'] });

  const calls = spy.mock.calls;

  expect(spy).toHaveBeenCalledTimes(1);
  expect(calls[0]).toHaveLength(1);

  const arg = calls[0][0];

  expect(typeof arg).toBe('string');

  const data: PapersResponse = res.data;

  const expected = extractIds(Object.values(data.papers));
  const actual = extractIds(JSON.parse(arg));

  expect(actual).toStrictEqual(expected);
});

it("should throw when the doi doesn't exist", async () => {
  const promise = handler({
    doi: ['non-existant-doi'],
    target: true,
    $0: 'scite-cli',
    _: ['papers'],
  });

  await expect(promise).rejects.toThrow();
});

it('should throw when DOIs are empty strings', async () => {
  let promise = handler({
    doi: ['', ''],
    target: false,
    $0: 'scite-cli',
    _: ['papers'],
  });

  await expect(promise).rejects.toThrow();

  promise = handler({
    doi: [''],
    target: true,
    $0: 'scite-cli',
    _: ['papers'],
  });

  await expect(promise).rejects.toThrow();
});
