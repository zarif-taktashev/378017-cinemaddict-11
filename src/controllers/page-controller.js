import FilmListComponent from "../components/film-list";
import ShowButtonComponent from "../components/show-button";
import SortComponent, {SortType} from "../components/sort";
import MovieController from "./movie-controller";
import {render, remove} from "../utils/render";

const FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

const rendFilms = (filmsContainer, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movie = new MovieController(filmsContainer, onDataChange, onViewChange);
    movie.render(film);
    return movie;
  });
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

export default class PageController {
  constructor(container) {
    this._films = [];
    this._showedFilmsControllers = [];
    this._container = container;
    this._filmCount = FILM_COUNT_ON_START;

    this._showButton = new ShowButtonComponent();
    this._sortComponent = new SortComponent();

    this._filmList = new FilmListComponent();
    this._filmsListContainer = this._filmList.getFilmListContainer();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;
    const filmList = this._filmList;
    const siteMainElement = this._container.getElement().parentElement;

    render(siteMainElement, this._sortComponent);
    render(siteMainElement, this._container);
    render(this._container.getElement(), filmList);

    const newFilms = rendFilms(this._filmsListContainer, this._films.slice(0, this._filmCount), this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
    this._renderShowButton();
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    this._showedFilmsControllers[index].render(this._films[index]);
  }

  _renderShowButton() {
    if (this._filmCount >= this._films.length) {
      return;
    }

    render(this._filmList.getElement(), this._showButton);

    this._showButton.setClickHandler(() => {
      const prevTasksCount = this._filmCount;
      this._filmCount = prevTasksCount + SHOWING_FILM_COUNT_BY_BUTTON;
      const newFilms = rendFilms(this._filmsListContainer, this._films.slice(prevTasksCount, this._filmCount), this._onDataChange, this._onViewChange);
      this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
      if (this._filmCount >= this._films.length) {
        remove(this._showButton);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._filmCount = SHOWING_FILM_COUNT_BY_BUTTON;
    this._filmsListContainer.innerHTML = ``;

    const sortedFilms = getSortedTasks(this._films, sortType, 0, this._filmCount);

    const newFilms = rendFilms(this._filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
    this._renderShowButton();
  }
}
