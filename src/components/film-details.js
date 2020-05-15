import {MONTH_NAMES} from '../data';
import AbstractSmartComponent from "./abstract-smart-component";

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
  const description = film.description.join(` `);
  const filmYear = film.date.getFullYear();
  const filmMonth = film.date.getUTCMonth();
  const fiilDay = film.date.getDate();
  const fiilDate = `${fiilDay} ${MONTH_NAMES[filmMonth]} ${filmYear}`;

  const genresMarkup = createGenresList(film.genres);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${film.poster}" alt="${alt}">

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.name}</h3>
                  <p class="film-details__title-original">Original: ${film.name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.range}</p>
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
                  <td class="film-details__cell">${fiilDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${film.duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.countries}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${genresMarkup}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">

        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this.setCloseDetailClick(this.closeHandler);
  }

  rerender() {
    super.rerender();
  }

  getTemplate() {
    return createFilmDetails(this._film);
  }

  setCloseDetailClick(handler) {
    const filmClose = this.getElement().querySelector(`.film-details__close-btn`);
    filmClose.addEventListener(`click`, handler);

    this.closeHandler = handler;
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
