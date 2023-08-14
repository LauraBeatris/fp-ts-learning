import * as O from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";

/**
 * Using Either/Option helps to reduce the amount of unexpected runtime errors
 */

/**
 * O.alt(f)
 *
 * Takes a fallback function which performs an alternative computation which returns
 * another Option
 *
 * This alternative computation is executed only when the received Option is O.None
 */

type Movie = Readonly<{
  title: string;
  releaseYear: number;
  ratingPosition: number;
  award?: string;
}>;

const getMovieAwardHighlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie.award,
    O.fromNullable,
    O.map((award) => `Awarded with ${award}`)
  );

const getMovieTop10Highlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie,
    O.fromPredicate(({ ratingPosition }) => ratingPosition <= 10),
    O.map(({ ratingPosition }) => `In TOP 10 at position: ${ratingPosition}`)
  );

const getMovieHighlight = (movie: Movie): string =>
  pipe(
    movie,
    getMovieAwardHighlight,
    O.alt(() => getMovieTop10Highlight(movie)),
    O.getOrElse(() => `Released in ${movie.releaseYear}`)
  );

const movie1: Movie = {
  title: "Harry Potter",
  releaseYear: 1998,
  ratingPosition: 1,
  award: "Oscar",
};
getMovieHighlight(movie1); // 'Awarded with Oscar'

const movie2: Movie = {
  title: "Lord of the Rings",
  releaseYear: 2002,
  ratingPosition: 2,
};
getMovieHighlight(movie2); // 'In TOP 10 at position: 2'

const movie3: Movie = {
  title: "Dumb movie",
  releaseYear: 2000,
  ratingPosition: 80,
};
getMovieHighlight(movie3); // 'Released in 2000'
