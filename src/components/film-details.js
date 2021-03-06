import AbstractComponent from "./abstract-component";
import {HOUR} from "../utils/render";

const GenresLength = 1;

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const createGenresList = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(` `);
};

const createFilmDetails = (film) => {
  const {poster} = film;
  const alt = poster.split(`.`)[0];
  const writers = film.writers.join(`, `);
  const actors = film.actors.join(`, `);
  const description = film.description;
  const filmYear = film.date.getFullYear();
  const filmMonth = film.date.getUTCMonth();
  const filmDay = film.date.getDate();
  const filmDate = `${filmDay} ${MONTH_NAMES[filmMonth]} ${filmYear}`;

  const genresMarkup = createGenresList(film.genres);

  const rangeVal = film.range.toString().split(`.`)[1] === undefined ? film.range + `.` + `0` : film.range;
  const hours = Math.floor(film.duration / HOUR) ? Math.floor(film.duration / HOUR) + `h` : ``;
  const minutes = film.duration % HOUR !== 0 ? film.duration % HOUR + `m` : ``;
  const time = hours + ` ` + minutes;

  const ageRate = film.ageRate ? film.ageRate + `+` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${film.poster}" alt="${alt}">

              <p class="film-details__age">${ageRate}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.name}</h3>
                  <p class="film-details__title-original">Original: ${film.alternativeName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rangeVal}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${filmDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${time}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.countries}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${film.genres.length > GenresLength ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genresMarkup}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>
        </div>

        <div class="form-details__bottom-container">
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this.closeHandler = null;
    this.setCloseDetailClick(this.closeHandler);
  }

  getTemplate() {
    return createFilmDetails(this._film);
  }

  setCloseDetailClick(handler) {
    const filmCloseElement = this.getElement().querySelector(`.film-details__close-btn`);
    filmCloseElement.addEventListener(`click`, handler);

    this.closeHandler = handler;
  }

  getData() {
    const text = this.getElement().querySelector(`.film-details__comment-input`);
    const emoji = this.getElement().querySelector(`input[name="comment-emoji"]:checked`);

    return {text, emoji};
  }

  setFormSumbmitHandler(handler) {
    const formElement = this.getElement().querySelector(`.film-details__inner`);
    formElement.addEventListener(`keydown`, handler);
  }

  setEsckeydown(handler) {
    document.addEventListener(`keydown`, handler);
  }
}
