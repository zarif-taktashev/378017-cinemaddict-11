export const FilterType = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  FAVORITES: `Favorites`,
  HISTORY: `History`
};

const RATING = {
  MOVIE_BUFF: 21,
  FAN: 20,
  NOVICE: 10,
  START: 1
};

export const getClientRate = (film) => {
  if (film >= RATING.MOVIE_BUFF) {
    return `Movie Buff`;
  } else if (film <= RATING.FAN && film >= RATING.NOVICE) {
    return `fan`;
  } else if (film >= RATING.START && film <= RATING.NOVICE) {
    return `novice`;
  }

  return ``;
};

export const getIsWatchlist = (films) => {
  return films.filter((film) => film.isWatchlist);
};

export const getIsFavoriteFilms = (films) => {
  return films.filter((film) => film.isFavorite);
};

export const getIsHistoryFilms = (films) => {
  return films.filter((film) => film.isHistory);
};

export const getTasksByFilter = (films, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getIsWatchlist(films);
    case FilterType.FAVORITES:
      return getIsFavoriteFilms(films);
    case FilterType.HISTORY:
      return getIsHistoryFilms(films);
  }

  return films;
};
