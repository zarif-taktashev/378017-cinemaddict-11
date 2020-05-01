import {MONTH_NAMES} from '../data';
import AbstractSmartComponent from "./abstract-smart-component";

const IMG_HEIGHT = 55;
const IMG_WIDTH = 55;

const createFilmDetails = (film, emoji) => {
  const {poster} = film;
  const alt = poster.split(`.`)[0];
  const comments = film.comments;
  const commentsQuantity = film.comments.length;
  const writers = film.writers.join(`, `);
  const actors = film.actors.join(`, `);
  const description = film.description.join(` `);
  const filmYear = film.date.getFullYear();
  const filmMonth = film.date.getUTCMonth();
  const fiilDay = film.date.getDate();
  const fiilDate = `${fiilDay} ${MONTH_NAMES[filmMonth]} ${filmYear}`;

  const createGenresList = (genres) => {
    return genres.map((genre) => {
      return `<span class="film-details__genre">${genre}</span>`;
    }).join(` `);
  };

  const createComment = (commentsInf) => {
    return commentsInf.map((comment) => {
      const year = comment.date.getFullYear();
      const month = comment.date.getUTCMonth() + 1;
      const day = comment.date.getDate();
      const hour = comment.date.getHours() + 1;
      const minutes = comment.date.getMinutes() + 1;

      return (`
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="${comment.emotion}">
          </span>
          <div>
            <p class="film-details__comment-text">${comment.text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${year}/${month}/${day} ${hour}:${minutes}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
      `);
    }).join(`\n`);
  };

  const commentsMarkup = createComment(comments);
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
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${emoji !== null ? emoji : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._closeDetailClick = null;
    this._watchListClic = null;
    this._historyClic = null;
    this._favoriteClic = null;
    this._emoji = null;
    this._setEmojiClick();
  }

  _setEmojiClick() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const src = evt.target.attributes.src.value;
      const alt = evt.target.alt;
      evt.target.checked = true;
      const img = `<img src=${src} alt=${alt} width=${IMG_WIDTH} height=${IMG_HEIGHT}>`;
      this._emoji = img;

      this.rerender();
    });
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setCloseDetailClick(this._closeDetailClick);
    this.setWatchListClickHandler(this._watchListClic);
    this.setHistoryClickHandler(this._historyClic);
    this.setFavoriteClickHandler(this._favoriteClic);
    this._setEmojiClick();
  }

  getTemplate() {
    return createFilmDetails(this._film, this._emoji);
  }

  setCloseDetailClick(handler) {
    const filmClose = this.getElement().querySelector(`.film-details__close-btn`);
    filmClose.addEventListener(`click`, handler);

    this._closeDetailClick = handler;
  }


  setWatchListClickHandler(handler) {
    const watchlist = this.getElement().querySelector(`.film-details__control-label--watchlist`);
    watchlist.addEventListener(`click`, handler);

    this._watchListClic = handler;
  }

  setHistoryClickHandler(handler) {
    const watched = this.getElement().querySelector(`.film-details__control-label--watched`);
    watched.addEventListener(`click`, handler);

    this._historyClic = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    this._favoriteClic = handler;
  }
}
