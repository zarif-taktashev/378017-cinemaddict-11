import FilmListComponent from "../components/film-list";
import ShowButtonComponent from "../components/show-button";
import SortComponent, {SortType} from "../components/sort";
import MovieController, {Mode as MovieControllerMode, EmptyComment} from "./movie-controller";
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
      sortedTasks = showingFilms.sort((a, b) => b.range - a.range);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingFilms;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class PageController {
  constructor(container, model) {
    this._filmsModel = model;
    this._container = container;

    this._showedFilmsControllers = [];
    this._filmCount = FILM_COUNT_ON_START;

    this._showButton = new ShowButtonComponent();
    this._sortComponent = new SortComponent();

    this._filmList = new FilmListComponent();
    this._filmsListContainer = this._filmList.getFilmListContainer();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowButtonClick = this._onShowButtonClick.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    const films = this._filmsModel.getFilms();
    const filmList = this._filmList;
    const siteMainElement = this._container.getElement().parentElement;

    render(siteMainElement, this._sortComponent);
    render(siteMainElement, this._container);
    render(this._container.getElement(), filmList);

    this._renderFilms(films.slice(0, this._filmCount));
    this._renderShowButton();
  }

  _renderFilms(films) {
    const newFilms = rendFilms(this._filmsListContainer, films, this._onDataChange, this._onViewChange);
    this._showedFilmsControllers = this._showedFilmsControllers.concat(newFilms);
    this._filmCount = this._showedFilmsControllers.length;
  }

  _removeFilms() {
    this._showedFilmsControllers.forEach((movieController) => movieController.destroy());
    this._showedFilmsControllers = [];
  }

  _updateFilms(count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderShowButton();
  }

  _onViewChange() {
    this._showedFilmsControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _renderShowButton() {
    remove(this._showButton);

    if (this._filmCount >= this._filmsModel.getFilms().length) {
      return;
    }

    render(this._filmList.getElement(), this._showButton);

    this._showButton.setClickHandler(this._onShowButtonClick);
  }

  _onShowButtonClick() {
    const films = this._filmsModel.getFilms();
    const prevTasksCount = this._filmCount;
    this._filmCount = prevTasksCount + SHOWING_FILM_COUNT_BY_BUTTON;

    const sortedFilms = getSortedTasks(films, this._sortComponent.getSortType(), prevTasksCount, this._filmCount);
    this._renderFilms(sortedFilms);

    if (this._filmCount >= films.length) {
      remove(this._showButton);
    }
  }

  _onSortTypeChange(sortType) {
    this._filmCount = SHOWING_FILM_COUNT_BY_BUTTON;

    const sortedFilms = getSortedTasks(this._filmsModel.getFilms(), sortType, 0, this._filmCount);

    this._sortComponent.rerender();
    this._removeFilms();
    this._renderFilms(sortedFilms);
    this._renderShowButton();
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_FILM_COUNT_BY_BUTTON);
  }
}
