const FIRST_ARRAY_INDEX = 0;
const DEFLACTION = 1;
const MIN_RANGE = 0;
const MAX_RANGE = 10;
const HOUR = 60;

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInt(FIRST_ARRAY_INDEX, array.length - DEFLACTION);
  return array[randomIndex];
};

export const getArrayItems = (array, val) => {
  const randomInt = getRandomInt(FIRST_ARRAY_INDEX, array.length - DEFLACTION);
  const lenghtArr = val ? randomInt + getRandomInt(FIRST_ARRAY_INDEX, val) : array.length;
  return array.slice(randomInt, lenghtArr);
};

export const getRandomRange = () => {
  const even = getRandomInt(MIN_RANGE, MAX_RANGE);

  if (even < 10) {
    const tenth = getRandomInt(MIN_RANGE, MAX_RANGE - DEFLACTION);
    return `${even}.${tenth}`;
  }
  return `${even}.0`;
};

export const createArray = (number) => {
  return new Array(number).fill(``);
};

export const getRandomDuration = (min, max) => {
  const duration = getRandomInt(min, max);

  if (duration >= HOUR) {
    const quotient = Math.floor(duration / HOUR);
    const remainder = duration % HOUR;
    return `${quotient}h ${remainder}m`;
  }
  return `${duration}m`;
};
