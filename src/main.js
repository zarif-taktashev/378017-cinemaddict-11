import User from "./components/user-name";
import Menu from "./components/menu";
import FooterStatistics from "./components/footer-statistics";
import Films from "./components/films";
import FilmList from "./components/film-list";
import FilmCard from "./components/film-card";
import ShowButton from "./components/show-button";
import FilmDetails from "./components/film-details";
import {createFilms} from "./mock/films.js";
import {generateFilters} from "./mock/filters.js";
import {render} from "./utils.js";

const FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;
const FILMS_COUNT = 20;
const filmsData = createFilms(FILMS_COUNT);
const filters = generateFilters();

const siteMainElement = document.querySelector(`.main`);
const header = document.querySelector(`.header`);

render(header, new User().getElement());
render(siteMainElement, new Menu(filters).getElement());

const footer = document.querySelector(`.footer`);
render(footer, new FooterStatistics(FILMS_COUNT).getElement());

const renderFilm = (filmCardComponent, filmCardData) => {
  const onCardClick = (evt) => {
    evt.preventDefault();
    document.body.appendChild(filmDetails.getElement());
  };

  const onCloseClick = (evt) => {
    evt.preventDefault();
    document.body.removeChild(filmDetails.getElement());
  };

  const filmCard = new FilmCard(filmCardData);
  const filmDetails = new FilmDetails(filmCardData);

  const filmPoster = filmCard.getElement().querySelector(`.film-card__poster`);
  filmPoster.addEventListener(`click`, onCardClick);
  const filmTitle = filmCard.getElement().querySelector(`.film-card__title`);
  filmTitle.addEventListener(`click`, onCardClick);
  const filmComments = filmCard.getElement().querySelector(`.film-card__comments`);
  filmComments.addEventListener(`click`, onCardClick);

  const filmClose = filmDetails.getElement().querySelector(`.film-details__close-btn`);
  filmClose.addEventListener(`click`, onCloseClick);

  render(filmCardComponent, filmCard.getElement());
};

const renderFilmList = (filmComponent, data) => {
  let filmCount = FILM_COUNT_ON_START;
  const showButton = new ShowButton().getElement();


  render(filmComponent.getElement(), new FilmList().getElement());

  const filmListElement = filmComponent.getElement().querySelector(`.films-list`);
  const filmsContainer = filmListElement.querySelector(`.films-list__container`);

  for (let i = 0; i < filmCount; i++) {
    renderFilm(filmsContainer, data[i]);
  }

  render(filmListElement, showButton);
  showButton.addEventListener(`click`, () => {
    const prevTasksCount = filmCount;
    filmCount = prevTasksCount + SHOWING_FILM_COUNT_BY_BUTTON;
    filmsData.slice(prevTasksCount, filmCount)
    .forEach((filmMore) => renderFilm(filmsContainer, filmMore));
    if (filmCount >= filmsData.length) {
      showButton.remove();
    }
  });

};

const film = new Films();
render(siteMainElement, film.getElement());
renderFilmList(film, filmsData);
