import fs from 'fs/promises';
import { handler } from '../src/commands/config';
import { configPath, serialize, ask } from '../src/utils';

jest.mock('fs/promises');
jest.mock('../src/utils', () => ({
  ...jest.requireActual('../src/utils'),
  ask: jest.fn(),
}));

const spy = jest.fn();
const askMock = ask as jest.Mock;
const readFileMock = fs.readFile as jest.Mock;

console.log = spy;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('when file does not exist', () => {
  beforeEach(() => {
    readFileMock.mockRejectedValueOnce(new Error('File not found'));
  });

  it('should set a key-value pair', async () => {
    askMock.mockResolvedValue('value');

    await handler({
      command: 'set',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(
      configPath,
      serialize({ key: 'value' }),
    );
  });

  it('should not write a config file', async () => {
    const promise = handler({
      command: 'get',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    await expect(promise).rejects.toThrow();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('should unset a key', async () => {
    await handler({
      command: 'unset',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(configPath, serialize({}));
  });
});

describe('when file exists', () => {
  it('should set a key-value pair', async () => {
    readFileMock.mockResolvedValue(serialize({}));
    askMock.mockResolvedValue('value');

    await handler({
      command: 'set',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(
      configPath,
      serialize({ key: 'value' }),
    );
  });

  it('should not modify config file', async () => {
    readFileMock.mockResolvedValue(serialize({ key: 'value' }));

    await handler({
      command: 'get',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    expect(spy).toHaveBeenCalledWith('value');
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('should unset a key', async () => {
    readFileMock.mockResolvedValue(serialize({ key: 'value' }));

    await handler({
      command: 'unset',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(configPath, serialize({}));
  });
});

describe('when file exists and contains invalid data', () => {
  beforeEach(() => {
    readFileMock.mockResolvedValue('not an object literal');
  });

  it('should set a key-value pair', async () => {
    askMock.mockResolvedValue('value');

    await handler({
      command: 'set',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(
      configPath,
      serialize({ key: 'value' }),
    );
  });

  it('should throw when trying to get a value for a key', async () => {
    const promise = handler({
      command: 'get',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    await expect(promise).rejects.toThrow();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('should unset a key', async () => {
    await handler({
      command: 'unset',
      key: 'key',
      $0: 'scite-cli',
      _: ['config'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(configPath, serialize({}));
  });
});
