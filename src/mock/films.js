import {FILM_NAMES, GENRES, AUTHORS, POSTERS, EMOTIONS, DESCRIPTIONS, COUNTRIES} from '../data.js';
import {getRandomInt, getRandomArrayItem, getRandomRange, createArray, getArrayItems, getRandomDuration} from '../utils/common';

const MIN_DURATION = 0;
const MAX_DURATION = 180;
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
    id: String(new Date() + Math.random()),
    name: getRandomArrayItem(FILM_NAMES),
    range: getRandomRange(),
    date: new Date(),
    director: getRandomArrayItem(AUTHORS),
    duration: getRandomDuration(getRandomInt(MIN_DURATION, MAX_DURATION)),
    genres: getArrayItems(GENRES),
    poster: getRandomArrayItem(POSTERS),
    description: getArrayItems(DESCRIPTIONS),
    countries: getRandomArrayItem(COUNTRIES),
    writers: getArrayItems(AUTHORS),
    actors: getArrayItems(AUTHORS),
    isHistory: Math.random() > 0.5,
    isWatchlist: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: createComments(getRandomInt(MIN_COM, MAX_COM)),
  };
};

const createFilms = (number) => {
  return createArray(number)
    .map(crateFilm);
};

export {createFilms};
