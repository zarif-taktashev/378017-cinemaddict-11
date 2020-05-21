import AbstractComponent from "./abstract-component";

const createControls = (film) => {

  return (
    `<section class="film-details__controls">
      <input type="checkbox" ${film.isWatchlist ? `checked` : ``} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" ${film.isHistory ? `checked` : ``} class="film-details__control-input visually-hidden" id="watched" name="watched">
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" ${film.isFavorite ? `checked` : ``} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createControls(this._film);
  }

  setWatchListClickHandler(handler) {
    const watchlist = this.getElement().querySelector(`.film-details__control-label--watchlist`);
    watchlist.addEventListener(`click`, handler);
  }

  setHistoryClickHandler(handler) {
    const watched = this.getElement().querySelector(`.film-details__control-label--watched`);
    watched.addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }
}
