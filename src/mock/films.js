import {FILM_NAMES, GENRES, AUTHORS, POSTERS, EMOTIONS, DESCRIPTIONS, COUNTRIES} from '../data.js';
import {getRandomInt, getRandomArrayItem, getRandomRange, createArray, getArrayItems, getRandomDuration} from '../utils.js';

const MIN_DURATION = 0;
const MAX_DURATION = 180;
const MAX_QUAN_COM = 0;
const MIN_QUAN_COM = 100;
const MIN_COM = 0;
const MAX_COM = 5;

const createComments = (number) => {
  return createArray(number)
  .map(() => {
    return {
      author: getRandomArrayItem(AUTHORS),
      text: getRandomArrayItem(DESCRIPTIONS),
      emotion: getRandomArrayItem(EMOTIONS),
      date: new Date(),
    };
  });
};

const crateFilm = () => {
  return {
    name: getRandomArrayItem(FILM_NAMES),
    range: getRandomRange(),
    date: new Date(),
    director: getRandomArrayItem(AUTHORS),
    duration: getRandomDuration(MIN_DURATION, MAX_DURATION),
    genres: getArrayItems(GENRES),
    poster: getRandomArrayItem(POSTERS),
    description: getArrayItems(DESCRIPTIONS),
    commentsQuantity: getRandomInt(MIN_QUAN_COM, MAX_QUAN_COM),
    countries: getRandomArrayItem(COUNTRIES),
    writers: getArrayItems(AUTHORS),
    actors: getArrayItems(AUTHORS),
    comments: createComments(getRandomInt(MIN_COM, MAX_COM)),
  };
};

const createFilms = (number) => {
  return createArray(number)
    .map(crateFilm);
};

export {createFilms};
