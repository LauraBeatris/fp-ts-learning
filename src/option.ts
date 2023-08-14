import * as O from "fp-ts/Option";
import { identity, pipe } from "fp-ts/lib/function";

/**
 * Represents optional values
 * type Option<A> = Some<A> | None
 *
 * If the value is present -> Some<A> -> A wrapper containing that value
 * If the value is absent -> None
 */

const inverse = (value: number): O.Option<number> =>
  value === 0 ? O.none : O.some(1 / value);
inverse(0); // O.none
inverse(2); // O.some(0.5)

/**
 * Option type can be used to avoid throwing an error
 * The possibility of an error is directly encoded in the return type of the function
 *
 * Example: There's no indication on the return type of the function bellow that the inner
 * logic of it could raise an exception
 */
export const inverseWithException = (value: number): number => {
  if (value === 0) {
    throw new Error("Cannot get inverse of 0.");
  }

  return 1 / value;
};

/**
 * O.match => Pattern matching on an option, allowing to return a value for
 * the O.None case and O.Some<A> case
 *
 * O.fold is an alias of O.match
 */

const getUiMessageWithInverse = (value: number): string =>
  pipe(
    value,
    inverse,
    O.match(
      () => `Cannot get the inverse of ${value}.`,
      (inverseValue) => `The inverse of ${value} is ${inverseValue}.`
    ) // string
  );
getUiMessageWithInverse(0); // "Cannot get the inverse of 0."
getUiMessageWithInverse(2); // "The inverse of 2 is 0.5."

/**
 * What if we just want to extract the value out of an option?
 */
const safeInverse1 = (value: number): number =>
  pipe(
    value,
    inverse, // Option<number>
    O.match(
      () => 0,
      identity // The `identity` function returns the value itself,
    ) // number
  );
safeInverse1(0); // 0
safeInverse1(2); // 0.5

/**
 * With O.match(onNone)
 *
 * W stands for widening
 *
 * The return type of the case Option on O.match can be of a different type
 * than the Option type
 */
const safeInverse2 = (value: number) =>
  pipe(
    value,
    inverse, // Option<number>
    O.matchW(
      () => 0,
      () => "hello"
    ) // string
  );
safeInverse2(0); // 'another value type'
safeInverse2(2); // 'another value type'

/**
 * With O.getOrElse(onNone)
 *
 * The return type of the case none on O.getOrElse should return the same
 * as the Option type
 */
const safeInverse3 = (value: number): number =>
  pipe(
    value,
    inverse, // O.Option<number>
    O.getOrElse(() => 0)
  );
safeInverse3(0); // 0
safeInverse3(2); // 0.5

/**
 * With O.getOrElseW(onNone)
 *
 * W stands for widening
 *
 * The return type of the case none on O.getOrElse can be of a different type
 * than the Option type
 */
const safeInverse4 = (value: number) =>
  pipe(
    value,
    inverse,
    O.getOrElseW(() => "another value type")
  );
safeInverse4(0); // 'another value type'
safeInverse4(2); // 'another value type'

/**
 * Option can also be used to be converted from a Nullable value
 *
 * type Nullable<A> = A | null | undefined
 *
 * To convert a Nullable value to a an Option
 */
const value1: number | null = 3;
const value2: number | null = null;

O.fromNullable(value1); // O.some(3)
O.fromNullable(value2); // O.none
