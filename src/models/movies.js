import {getTasksByFilter, FilterType} from "../utils/filter.js";

export default class Movies {
  constructor(movie) {
    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._films = [];

    if (movie) {
      this.id = movie[`id`];
      this.comments = movie[`comments`] || [];
      this.name = movie[`film_info`][`title`] || ``;
      this.alternativeName = movie[`film_info`][`alternative_title`] || ``;
      this.range = movie[`film_info`][`total_rating`] || ``;
      this.poster = movie[`film_info`][`poster`] || ``;
      this.ageRate = movie[`film_info`][`age_rating`] || ``;
      this.director = movie[`film_info`][`director`] || ``;
      this.writers = movie[`film_info`][`writers`] || [];
      this.actors = movie[`film_info`][`actors`] || [];
      this.date = movie[`film_info`][`release`][`date`] ? new Date(movie[`film_info`][`release`][`date`]) : null;
      this.countries = movie[`film_info`][`release`][`release_country`] ? movie[`film_info`][`release`][`release_country`] : ``;
      this.duration = movie[`film_info`][`runtime`] || ``;
      this.genres = movie[`film_info`][`genre`] || [];
      this.description = movie[`film_info`][`description`] || ``;
      this.watchingDate = movie[`user_details`][`watching_date`] ? new Date(movie[`user_details`][`watching_date`]) : null;
      this.isHistory = movie[`user_details`][`already_watched`] || false;
      this.isWatchlist = movie[`user_details`][`watchlist`] || false;
      this.isFavorite = movie[`user_details`][`favorite`] || false;
    }
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments || [],
      "film_info": {
        "title": this.name || ``,
        "alternative_title": this.alternativeName || ``,
        "total_rating": this.range || 0,
        "poster": this.poster || ``,
        "age_rating": this.ageRate || 0,
        "director": this.director || ``,
        "writers": this.writers || ``,
        "actors": this.actors || ``,
        "release": {
          "date": this.date !== null ? this.date.toISOString() : null,
          "release_country": this.countries || ``
        },
        "runtime": this.duration || 0,
        "genre": this.genres || ``,
        "description": this.description || ``
      },
      "user_details": {
        "watchlist": this.isWatchlist,
        "already_watched": this.isHistory,
        "watching_date": this.watchingDate !== null ? this.watchingDate.toISOString() : null,
        "favorite": this.isFavorite
      }
    };
  }

  getFilms() {
    return getTasksByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = films;
    this._callHandlers(this._dataChangeHandlers);
  }

  getWatchedFilms() {
    return this._films.filter((item) => {
      return item.isHistory;
    });
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  static parseFilm(movie) {
    return new Movies(movie);
  }

  static parseFilms(movies) {
    return movies.map(Movies.parseFilm);
  }

  static clone(movie) {
    return new Movies(movie.toRAW());
  }
}
