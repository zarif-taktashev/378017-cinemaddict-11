import UserComponent from "./components/user-name";
import MenuComponent from "./components/menu";
import FooterComponent from "./components/footer-statistics";
import FilmsComponent from "./components/films";
import PageController from "./controllers/page-controller";
import {createFilms} from "./mock/films";
import {generateFilters} from "./mock/filters";
import {render} from "./utils/render";

const FILMS_COUNT = 20;
const filmsData = createFilms(FILMS_COUNT);
const filters = generateFilters();

const siteMainElement = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

render(header, new UserComponent());
render(siteMainElement, new MenuComponent(filters));

const footer = document.querySelector(`.footer`);
render(footer, new FooterComponent(FILMS_COUNT));

const film = new FilmsComponent();
const filmBoard = new PageController(film);
render(siteMainElement, film);
filmBoard.render(filmsData);
