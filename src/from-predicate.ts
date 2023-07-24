import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

/**
 * predicate - It's a function that takes a value of some type A and returns a boolean
 * indicating whether the value satisfies some condition
 * (a: A) => boolean
 */

/**
 * When a predicate is provide to O.fromPredicate, we get back a function that 
 * takes A and returns an Option<A>
 * 
 * If the predicate returns true, then O.Some<A> is returned, otherwise, O.none is returned
 */
const isEven = (a: number) => a % 2 === 0;
const getEven = O.fromPredicate(isEven);
getEven(4); // O.some(4)
getEven(5); // O.none

type Discount = {
  percentage: number;
  expired: boolean;
}
const isDiscountValid = (discount: Discount) => !discount.expired;
const getDiscountText = (discount: Discount): O.Option<string> => (
  pipe(
    discount,
    O.fromPredicate(isDiscountValid), // O.Option<Discount>
    O.map(discount => `${discount.percentage}% DISCOUNT`)
  )
);

getDiscountText({ percentage: 50, expired: false }); // O.some('50% DISCOUNT')
getDiscountText({ percentage: 10, expired: true }); // O.none

/**
 * We can also call O.fromPredicate with a refinement, which is a predicate that
 * refines a type
 */
type Circle = { type: 'Circle'; };
type Square = { type: 'Square'; };
type Shape = Circle | Square;

const isCircle = (shape: Shape): shape is Circle => shape.type === 'Circle';
const getCircle = O.fromPredicate(isCircle); // (shape: Shape) => O.Option<Circle>

getCircle({ type: 'Circle' }) // O.Some<Circle> 
getCircle({ type: 'Square' }) // O.None
