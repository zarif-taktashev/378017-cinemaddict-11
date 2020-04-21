import {createUserName} from "./components/user-name";
import {createMenu} from "./components/menu";
import {createFilmList} from "./components/film-list";
import {createFilmCard} from "./components/film-card";
import {createShowButton} from "./components/show-button";
import {createFooterStatistics} from "./components/footer-statistics";
import {createFilmDetails} from "./components/film-details";
import {createFilms} from "./mock/films.js";
import {generateFilters} from "./mock/filters.js";
import {COUNT} from "./data.js";

const FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const filmsData = createFilms(COUNT);
const filters = generateFilters();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

render(header, createUserName());
render(siteMainElement, createMenu(filters));

const films = siteMainElement.querySelector(`.films`);
render(films, createFilmList());

const filmsList = films.querySelector(`.films-list`);
const filmsContainer = films.querySelector(`.films-list__container`);

let filmCount = FILM_COUNT_ON_START;
for (let i = 0; i < filmCount; i++) {
  render(filmsContainer, createFilmCard(filmsData[i]));
}

render(filmsList, createShowButton());
const footer = document.querySelector(`.footer`);
render(footer, createFooterStatistics());

//render(document.body, createFilmDetails(filmsData[0]));

const showMore = filmsList.querySelector(`.films-list__show-more`);

showMore.addEventListener(`click`, () => {
  const prevTasksCount = filmCount;
  filmCount = prevTasksCount + SHOWING_FILM_COUNT_BY_BUTTON;
  filmsData.slice(prevTasksCount, filmCount)
  .forEach((film) => render(filmsContainer, createFilmCard(film)));

  if (filmCount >= filmsData.length) {
    showMore.remove();
  }
});
