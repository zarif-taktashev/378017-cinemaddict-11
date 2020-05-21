import UserComponent from "./components/user-name";
import FooterComponent from "./components/footer-statistics";
import FilmsComponent from "./components/films";
import FilmBoardController from "./controllers/page-controller";
import SortComponent from "./components/sort";
import LoadingComponent from "./components/loading-component";
import FilmListComponent from "./components/film-list";
import FilterController from "./controllers/filter-controller";
import MoviesModel from "./models/movies";
import {render, replace, remove} from "./utils/render";
import API from "./api.js";


const header = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(header, new UserComponent());

const AUTHORIZATION = `Basic 23123`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const api = new API(END_POINT, AUTHORIZATION);

const filmsData = new MoviesModel();

const filters = new FilterController(siteMainElement, filmsData);
const film = new FilmsComponent();
const sort = new SortComponent();
const filmList = new FilmListComponent();
const load = new LoadingComponent();
const footerComp = new FooterComponent();

filters.render();
render(siteMainElement, sort);
render(siteMainElement, film);
render(film.getElement(), filmList);
render(filmList.getElement(), load);
render(footer, footerComp);

api.getFilms()
  .then((films) => {
    filmsData.setFilms(films);

    remove(load);
    replace(new FooterComponent(films.length), footerComp);

    filters.render();
    const filmBoard = new FilmBoardController(filmList, filmsData, sort, api);
    filmBoard.render();
  });
