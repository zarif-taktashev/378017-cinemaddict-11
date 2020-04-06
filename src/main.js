
"use strict";

const TASK_COUNT = 5;

const createUserName = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createMenu = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>

    <section class="films"></section>`
  );
};

const createFilmList = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

const createFilmCard = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
      <p class="film-card__rating">2.3</p>
      <p class="film-card__info">
        <span class="film-card__year">1964</span>
        <span class="film-card__duration">1h 21m</span>
        <span class="film-card__genre">Comedy</span>
      </p>
      <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
      <a class="film-card__comments">465 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createShowButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const footerStatistics = () => {
  return (
    `<section class="footer__statistics">
      <p>130 291 movies inside</p>
    </section>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

const siteMainElement = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

render(header, createUserName(), `beforeend`);
render(siteMainElement, createMenu(), `beforeend`);

const films = siteMainElement.querySelector(`.films`);
render(films, createFilmList(), `beforeend`);

const filmsList = films.querySelector(`.films-list`);
const filmsContainer = films.querySelector(`.films-list__container`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(filmsContainer, createFilmCard(), `beforeend`);
}

render(filmsList, createShowButton(), `beforeend`);
const footer = document.querySelector(`.footer`);
render(footer, footerStatistics(), `beforeend`);
