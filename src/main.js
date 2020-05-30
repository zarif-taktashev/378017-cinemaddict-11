import UserComponent from "./components/user-name";
import FooterComponent from "./components/footer-statistics";
import FilmsComponent from "./components/films";
import FilmBoardController from "./controllers/page-controller";
import SortComponent from "./components/sort";
import MenuComponent from "./components/menu";
import StatisticsComponent from "./components/statistics";
import LoadingComponent from "./components/loading-component";
import FilmListComponent from "./components/film-list";
import FilterController from "./controllers/filter-controller";
import MoviesModel from "./models/movies";
import {render, replace, remove} from "./utils/render";
import API from "./api.js";

const AUTHORIZATION = `Basic 23123`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const api = new API(END_POINT, AUTHORIZATION);
const filmsData = new MoviesModel();

const user = new UserComponent();
const menu = new MenuComponent();
const filters = new FilterController(menu.getElement(), filmsData);
const film = new FilmsComponent();
const sort = new SortComponent();
const filmList = new FilmListComponent();
const load = new LoadingComponent();
const footerComp = new FooterComponent();

render(headerElement, user);
render(siteMainElement, menu);
filters.render();
render(siteMainElement, sort);
render(siteMainElement, film);
render(film.getElement(), filmList);
render(filmList.getElement(), load);
render(footerElement, footerComp);

api.getFilms()
  .then((films) => {
    filmsData.setFilms(films);

    let newUser = new UserComponent(filmsData.getWatchedFilms().length);
    replace(newUser, user);
    filmsData.setDataChangeHandler(() => {
      let oldUser = newUser;
      newUser = new UserComponent(filmsData.getWatchedFilms().length);
      replace(newUser, oldUser);
    });

    remove(load);
    replace(new FooterComponent(films.length), footerComp);

    filters.render();
    const filmBoard = new FilmBoardController(filmList, filmsData, sort, api);
    filmBoard.render();

    const statisticks = new StatisticsComponent(filmsData);
    render(siteMainElement, statisticks);
    statisticks.hide();

    menu.setOnChange((menuItem) => {
      if (menuItem) {
        statisticks.hide();
        filmBoard.show();
      } else {
        filmBoard.hide();
        statisticks.show();
      }
    });
  });
