import {getTasksByFilter, FilterType} from "../utils/filter.js";

export default class Movies {
  constructor(data) {
    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._films = [];

    if (data) {
      this.id = data[`id`];
      this.comments = data[`comments`] || [];
      this.name = data[`film_info`][`title`] || ``;
      this.alternativeName = data[`film_info`][`alternative_title`] || ``;
      this.range = data[`film_info`][`total_rating`] || ``;
      this.poster = data[`film_info`][`poster`] || ``;
      this.ageRate = data[`film_info`][`age_rating`] || ``;
      this.director = data[`film_info`][`director`] || ``;
      this.writers = data[`film_info`][`writers`] || [];
      this.actors = data[`film_info`][`actors`] || [];
      this.date = data[`film_info`][`release`][`date`] ? new Date(data[`film_info`][`release`][`date`]) : null;
      this.countries = data[`film_info`][`release`][`release_country`] ? data[`film_info`][`release`][`release_country`] : ``;
      this.duration = data[`film_info`][`runtime`] || ``;
      this.genres = data[`film_info`][`genre`] || [];
      this.description = data[`film_info`][`description`] || ``;
      this.watchingDate = data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null;
      this.isHistory = data[`user_details`][`already_watched`] || false;
      this.isWatchlist = data[`user_details`][`watchlist`] || false;
      this.isFavorite = data[`user_details`][`favorite`] || false;
    }
  }

  static clone(data) {
    return new Movies(data.toRAW());
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

  static parseFilm(data) {
    return new Movies(data);
  }

  static parseFilms(data) {
    return data.map(Movies.parseFilm);
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

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
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

  removeTask(id) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
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
}
