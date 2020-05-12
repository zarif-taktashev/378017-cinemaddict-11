export const FilterType = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  FAVORITES: `Favorites`,
  HISTORY: `History`
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
