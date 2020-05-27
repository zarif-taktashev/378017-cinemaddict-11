import AbstractSmartComponent from "./abstract-smart-component";
import {HOUR} from "../utils/render";

const createFilmCard = (film) => {
  const {name, range, date, duration, genres, poster, description} = film;
  const alt = poster.split(`.`)[0];
  const year = date.getFullYear();
  const descriptionVal = description.length > 140 ? description.substring(0, 139) + `...` : description;

  const hours = Math.floor(duration / HOUR) ? Math.floor(duration / HOUR) + `h` : ``;
  const minutes = duration % HOUR !== 0 ? duration % HOUR + `m` : ``;
  const time = hours + ` ` + minutes;

  const rangeVal = range.toString().split(`.`)[1] === undefined ? range + `.` + `0` : range;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rangeVal}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${time}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./${poster}" alt="${alt}" class="film-card__poster">
      <p class="film-card__description">${descriptionVal}</p>
      <a class="film-card__comments">${film.comments.length} comments</a>
    </article>`
  );
};

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._posterHandler = null;
    this._titleHandler = null;
    this._commentsHandler = null;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setPosterClickHandler(this._posterHandler);
    this.setTitleClickHandler(this._titleHandler);
    this.setCommentsClickHandler(this._commentsHandler);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  setData(film) {
    this._film = Object.assign({}, this._film, film);
    this.rerender();
  }

  setPosterClickHandler(handler) {
    this._posterHandler = handler;
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this._titleHandler = handler;
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this._commentsHandler = handler;
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }
}
