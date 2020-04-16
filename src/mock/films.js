const filmNames = [
  `The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`
];

const ranges = [
  `8.3`, `3.2`, `9.0`, `2.3`, `6.3`
];

const years = [
  `1929`, `1933`, `1955`, `1964`, `1936`
];

const durations = [
  `115`, `54`, `119`, `81`, `16`
];

const genres = [
  `Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`
];

const posters = [
  `the-dance-of-life.jpg`, `sagebrush-trail.jpg`, `the-man-with-the-golden-arm.jpg`,
  `santa-claus-conquers-the-martians.jpg`, `popeye-meets-sinbad.png`
];

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet varius magna, non porta ligula feugiat eget.
Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.
Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const descriptions = text.split(`.`);

const commentsQuantitys = [
  6, 58, 50, 68, 10
];

const createFilms = () => {
  return filmNames.map((it, index) => {
    return {
      name: it,
      range: ranges[index],
      year: years[index],
      duration: durations[index],
      genre: genres[index],
      poster: posters[index],
      description: descriptions.slice(Math.floor(Math.random() * descriptions.length)),
      commentsQuantity: commentsQuantitys[index]
    };
  });
};

export {createFilms};
