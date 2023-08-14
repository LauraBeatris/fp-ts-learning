import * as O from "fp-ts/Option";
import { head } from "fp-ts/lib/ReadonlyArray";
import { pipe } from "fp-ts/lib/function";

/**
 * Essential operations: map, flatten and chain
 */

/**
 * O.map - Used to perform transformation in a option value
 *
 * It takes a function which maps the received option value, if present, to a new value,
 * otherwise returns O.none
 */
const getBestMovie = (titles: ReadonlyArray<string>): O.Option<string> =>
  pipe(
    titles,
    head, // O.Option<string>
    O.map((value) => value.toUpperCase()),
    O.map((value) => `BEST - ${value}`)
  );

getBestMovie(["Harry Potter", "Lord of the Rings"]); // O.some('BEST - HARRY POTTER')
getBestMovie([]); // O.none

const inverse = (value: number): O.Option<number> =>
  value === 0 ? O.none : O.some(1 / value);

/**
 * O.flatten - can be used to flatten nested Options
 */
export const inverseHead1 = (value: ReadonlyArray<number>): O.Option<number> =>
  pipe(
    value,
    head, // O.Option<number>
    O.map(inverse), // O.Option<O.Option<number>>
    O.flatten // O.Option<number>
  );

O.flatten(O.some(O.some(3))); // O.some(3)
O.flatten(O.some(O.none)); // O.none
O.flatten(O.none); // O.none

/**
 * O.chain - It takes a function which maps the current Option value into a
 * another Option and returns back the flattened option
 */
pipe(O.some(5), O.chain(inverse));
export const inverseHead2 = (value: ReadonlyArray<number>): O.Option<number> =>
  pipe(value, head, O.chain(inverse));
