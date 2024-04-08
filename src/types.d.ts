import { ArgumentsCamelCase, BuilderCallback } from 'yargs';

export type InferArguments<B> =
  B extends BuilderCallback<unknown, infer R> ? ArgumentsCamelCase<R> : never;
