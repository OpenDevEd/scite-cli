import fs from 'fs/promises';
import { handler } from '../src/commands/config';
import { configPath, serialize } from '../src/utils';

jest.mock('fs/promises');

const spy = jest.fn();
const readFileMock = fs.readFile as jest.Mock;

console.log = spy;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('when file does not exist', () => {
  it('should set a key-value pair', async () => {
    readFileMock.mockRejectedValueOnce(new Error('File not found'));

    await handler({
      command: 'set',
      key: 'key',
      value: 'value',
      $0: 'config',
      _: ['set', 'key', 'value'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(
      configPath,
      serialize({ key: 'value' }),
    );
  });

  it('should not write a config file', async () => {
    readFileMock.mockRejectedValueOnce(new Error('File not found'));

    const promise = handler({
      command: 'get',
      key: 'key',
      value: undefined,
      $0: 'config',
      _: ['get', 'key'],
    });

    await expect(promise).rejects.toThrow();
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('should unset a key', async () => {
    readFileMock.mockRejectedValueOnce(new Error('File not found'));

    await handler({
      command: 'unset',
      key: 'key',
      value: undefined,
      $0: 'config',
      _: ['unset', 'key'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(configPath, serialize({}));
  });
});

describe('when file exists', () => {
  it('should set a key-value pair', async () => {
    readFileMock.mockResolvedValue(serialize({}));

    await handler({
      command: 'set',
      key: 'key',
      value: 'value',
      $0: 'config',
      _: ['set', 'key', 'value'],
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
      value: undefined,
      $0: 'config',
      _: ['get', 'key'],
    });

    expect(spy).toHaveBeenCalledWith('value');
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('should unset a key', async () => {
    readFileMock.mockResolvedValue(serialize({ key: 'value' }));

    await handler({
      command: 'unset',
      key: 'key',
      value: undefined,
      $0: 'config',
      _: ['unset', 'key'],
    });

    expect(fs.writeFile).toHaveBeenCalledWith(configPath, serialize({}));
  });
});
