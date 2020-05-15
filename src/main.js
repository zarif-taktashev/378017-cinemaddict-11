import UserComponent from "./components/user-name";
import FooterComponent from "./components/footer-statistics";
import FilmsComponent from "./components/films";
import FilmBoardController from "./controllers/page-controller";
import FilterController from "./controllers/filter-controller";
import MoviesModel from "./models/movies";
import {createFilms} from "./mock/films";
import {render} from "./utils/render";

const FILMS_COUNT = 20;
const filmsArr = createFilms(FILMS_COUNT);
const filmsData = new MoviesModel();
filmsData.setFilms(filmsArr);

const header = document.querySelector(`.header`);
render(header, new UserComponent());

const footer = document.querySelector(`.footer`);
render(footer, new FooterComponent(FILMS_COUNT));

const siteMainElement = document.querySelector(`.main`);
const filters = new FilterController(siteMainElement, filmsData);
filters.render();

const film = new FilmsComponent();
render(siteMainElement, film);

const filmBoard = new FilmBoardController(film, filmsData);
filmBoard.render();
