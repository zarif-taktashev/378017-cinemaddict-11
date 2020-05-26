import AbstractComponent from "./abstract-component";

const createControls = (film) => {

  return (
    `<form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.isWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  ${film.isHistory ? `film-card__controls-item--active` : ``}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite  ${film.isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>`
  );
};

export default class CardControl extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createControls(this._film);
  }

  setWatchListClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setHistoryClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
