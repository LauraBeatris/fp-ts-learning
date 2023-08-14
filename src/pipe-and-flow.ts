/**
 * Both pipe and flow are used to compose operations
 */
import { flow, pipe } from "fp-ts/function";

// ===== PIPE =====

/**
 * A -> B
 */
const getValueLength = (value: string) => value.length;
pipe("hello", getValueLength); // Evaluates to 5

/**
 * A -> B -> C
 */
const isAtLeast3 = (n: number) => n >= 3;
pipe("hello", getValueLength, isAtLeast3); // Evaluates to true

/**
 * A -> B -> C -> D
 */
const trim = (value: string) => value.trim();

pipe(
  " hi ",
  trim, // 'hi'
  getValueLength, // 2
  isAtLeast3 // false
);

// The above operation is equivalent to:
isAtLeast3(getValueLength(trim("hello")));

// All functions passed to pipe must be unary, therefore taking only one argument
// Raw implementation without library abstraction:
export const pipeRaw = <A, B, C>(a: A, f: (a: A) => B, g: (b: B) => C): C =>
  g(f(a));

// ===== FLOW =====

/**
 * The `flow` function performs function composition
 *
 * In general, if a function receives a single argument (unary) and pipes it
 * into a series of functions, it's possible to replace it with `flow`
 */

// Example: Composing two functions
// A -> B -> C
const isLongEnough = flow(getValueLength, isAtLeast3);
isLongEnough("hello"); // Evaluates to true

// Example: Composing three functions
// A -> B -> C
const isValid1 = flow(trim, getValueLength, isAtLeast3);
isValid1(" hello "); // Evaluates to true

// Example: Composing four functions, and the first one receives 2 arguments
// A -> B -> C -> D
const concat = (value1: string, value2: string) => value1 + value2;
const isValid2 = flow(concat, trim, getValueLength, isAtLeast3);
isValid2("hey", "hey"); // Evaluates to true

// Raw implementation without library abstraction:
export const flowRaw =
  <A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
  (a: A): C =>
    g(f(a));
