
/**
 * Both pipe and flow are used to compose operations
 */
import { pipe } from 'fp-ts/function'

// ===== PIPE ===== 

/**
 * A -> B
 */
const getValueLength = (value: string) => value.length;
pipe(
  'hello', 
  getValueLength
); // Evaluates to 5


/** 
 * A -> B -> C 
*/
const isAtLeast3 = (n: number) => n >= 3;
pipe(
  'hello',
  getValueLength,
  isAtLeast3,
) // Evaluates to true

/**
 * A -> B -> C -> D
 */
const trim = (value: string) => value.trim();

pipe(
  ' hi ',
  trim, // 'hi'
  getValueLength, // 2
  isAtLeast3, // false
)

// The above operation is equivalent to:
isAtLeast3(getValueLength(trim('hello')))

// All functions passed to pipe must be unary, therefore taking only one argument
// Raw implementation without library abstraction:
export const pipeRaw = <A, B, C>(
  a: A,
  f: (a: A) => B,
  g: (b: B) => C
): C => g(f(a))

// ===== FLOW ===== 
