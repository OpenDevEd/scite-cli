import { ArgumentsCamelCase, BuilderCallback } from 'yargs';

/**
 * Infers the keys of the type `T` that have a non-undefined value.
 * This is useful for types that represent the arguments to a function,
 * where some arguments may be optional.
 *
 * @template T The type to extract the mandatory keys from.
 * @returns The keys of `T` that have a non-undefined value.
 */
type MandatoryKeys<T> = {
  [P in keyof T]: T[P] extends Exclude<T[P], undefined> ? P : never;
}[keyof T];

/**
 * Converts any undefined properties in the type `T` to be optional.
 * This is useful for types that represent the arguments to a function,
 * where some arguments may be optional.
 *
 * @template T The type to convert.
 * @returns The type `T` with any undefined properties made optional.
 */
type UndefinedToOptional<T> = Pick<T, MandatoryKeys<T>> &
  Partial<Omit<T, MandatoryKeys<T>>>;

/**
 * Infers the argument types from a builder callback type.
 * @template B The builder callback type.
 * @returns Arguments type, with camelcased keys
 */
export type InferArguments<B> =
  B extends BuilderCallback<unknown, infer R>
    ? ArgumentsCamelCase<UndefinedToOptional<R>>
    : never;
