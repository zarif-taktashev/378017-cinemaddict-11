import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import {render, replace, remove} from "../utils/render.js";

const Mode = {
  CLOSE: `close`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.CLOSE;

    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSE) {
      this._onCloseDetailClick();
    }
  }

  render(film) {
    const oldfilmCardComponent = this._filmCardComponent;
    const oldfilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setPosterClickHandler((evt) => {
      evt.preventDefault();
      this._onCardClick();
    });
    this._filmCardComponent.setTitleClickHandler((evt) => {
      evt.preventDefault();
      this._onCardClick();
    });
    this._filmCardComponent.setCommentsClickHandler((evt) => {
      evt.preventDefault();
      this._onCardClick();
    });

    this._filmCardComponent.setWatchListClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmCardComponent.setHistoryClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmCardComponent.setFavoriteClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setCloseDetailClick((evt) => {
      evt.preventDefault();
      this._onCloseDetailClick();
    });

    this._filmDetailsComponent.setWatchListClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._filmDetailsComponent.setHistoryClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isHistory: !film.isHistory,
      }));
    });

    this._filmDetailsComponent.setFavoriteClickHandler(() => {
      this._onDataChange(film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    if (oldfilmCardComponent && oldfilmDetailsComponent) {
      replace(this._filmCardComponent, oldfilmCardComponent);
      replace(this._filmDetailsComponent, oldfilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }

  }

  _onCardClick() {
    this._onViewChange();
    this._mode = Mode.OPEN;
    render(document.body, this._filmDetailsComponent);
  }

  _onCloseDetailClick() {
    this._mode = Mode.CLOSE;
    this._filmDetailsComponent.reset();
    remove(this._filmDetailsComponent);
  }
}
