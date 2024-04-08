import { ArgumentsCamelCase, BuilderCallback } from 'yargs';

/**
 * Infers the argument types from a builder callback type.
 * @template B The builder callback type.
 * @returns Arguments type, with camelcased keys
 */
export type InferArguments<B> =
  B extends BuilderCallback<unknown, infer R> ? ArgumentsCamelCase<R> : never;
