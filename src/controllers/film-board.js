import FilmListComponent from "../components/film-list";
import FilmCardComponent from "../components/film-card";
import ShowButtonComponent from "../components/show-button";
import FilmDetailsComponent from "../components/film-details";
import SortComponent, {SortType} from "../components/sort";
import {render, remove} from "../utils/render";

const FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

const renderFilm = (filmCardComponent, filmCardData) => {
  const onCardClick = (evt) => {
    evt.preventDefault();
    document.body.appendChild(filmDetails.getElement());
  };

  const onCloseClick = (evt) => {
    evt.preventDefault();
    document.body.removeChild(filmDetails.getElement());
  };

  const filmCard = new FilmCardComponent(filmCardData);
  const filmDetails = new FilmDetailsComponent(filmCardData);

  filmCard.setPosterClickHandler(onCardClick);
  filmCard.setTitleClickHandler(onCardClick);
  filmCard.setCommentsClickHandler(onCardClick);

  filmDetails.setCloseDetailClick(onCloseClick);

  render(filmCardComponent, filmCard);
};

const rendFilms = (filmsContainer, arr) => {
  arr.forEach((filmMore) => renderFilm(filmsContainer, filmMore));
};

const getSortedTasks = (films, sortType, from, to) => {
  let sortedTasks = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedTasks = showingFilms.sort((a, b) => a.date - b.date);
      break;
    case SortType.RATE:
      sortedTasks = showingFilms.sort((a, b) => a.range - b.range);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingFilms;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class FilmBoardController {
  constructor(container) {
    this._container = container;

    this._showButton = new ShowButtonComponent();
    this._filmList = new FilmListComponent();
    this._sortComponent = new SortComponent();
  }

  render(films) {
    const renderShowButton = () => {
      if (filmCount >= films.length) {
        return;
      }

      render(filmListElement, showButton);

      showButton.setClickHandler(() => {
        const prevTasksCount = filmCount;
        filmCount = prevTasksCount + SHOWING_FILM_COUNT_BY_BUTTON;
        rendFilms(filmsContainer, films.slice(prevTasksCount, filmCount));
        if (filmCount >= films.length) {
          remove(showButton);
        }
      });
    };

    let filmCount = FILM_COUNT_ON_START;
    const showButton = this._showButton;
    const filmList = this._filmList;
    const siteMainElement = document.querySelector(`.main`);

    render(siteMainElement, this._sortComponent);
    render(this._container.getElement(), filmList);
    render(siteMainElement, this._container);

    const filmListElement = filmList.getFilmListElement();
    const filmsContainer = filmList.getFilmListContainer();

    rendFilms(filmsContainer, films.slice(0, filmCount));
    renderShowButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      filmCount = SHOWING_FILM_COUNT_BY_BUTTON;
      filmsContainer.innerHTML = ``;

      const sortedFilms = getSortedTasks(films, sortType, 0, filmCount);

      rendFilms(filmsContainer, sortedFilms);
      renderShowButton();
    });
  }
}
