import {createUserName} from "./components/user-name";
import {createMenu} from "./components/menu";
import {createFilmList} from "./components/film-list";
import {createFilmCard} from "./components/film-card";
import {createShowButton} from "./components/show-button";
import {createFooterStatistics} from "./components/footer-statistics";
import {createFilmDetails} from "./components/film-details";

const TASK_COUNT = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

render(header, createUserName());
render(siteMainElement, createMenu());

const films = siteMainElement.querySelector(`.films`);
render(films, createFilmList());

const filmsList = films.querySelector(`.films-list`);
const filmsContainer = films.querySelector(`.films-list__container`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(filmsContainer, createFilmCard());
}

render(filmsList, createShowButton());
const footer = document.querySelector(`.footer`);
render(footer, createFooterStatistics());

render(document.body, createFilmDetails());
