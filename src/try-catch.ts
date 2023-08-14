import * as E from "fp-ts/lib/Either";

/**
 * E.tryCatch - Creates an Either from a function that might throw
 *
 * const tryCatch = <E, A>(
 *  f: () => A,
 *
 *  Transforms exception into a concrete object
 *  onThrow: (e: unknown) => E
 * ) => Either<E, A>
 */

export const jsonParse1 = (text: string): E.Either<Error, unknown> =>
  E.tryCatch(
    () => JSON.parse(text),
    // This could be replaced with E.toError
    (e) => (e instanceof Error ? e : new Error(String(e)))
  );

export const jsonParse2: (text: string) => E.Either<Error, unknown> =
  E.tryCatchK(JSON.parse, E.toError);

type JsonParseError = Readonly<{
  type: "JsonParseError";
  error: Error;
}>;

export const jsonParse3: (text: string) => E.Either<JsonParseError, unknown> =
  E.tryCatchK(JSON.parse, (e) => ({
    type: "JsonParseError",
    error: E.toError(e),
  }));
