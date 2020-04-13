import {createUserName} from "./components/user-name";
import {createMenu} from "./components/menu";
import {createFilmList} from "./components/film-list";
import {createFilmCard} from "./components/film-card";
import {createShowButton} from "./components/show-button";
import {footerStatistics} from "./components/footer-statistics";

const TASK_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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
