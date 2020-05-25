import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import CommentsComponent from "../components/comments";
import ControlsComponent from "../components/details-controls";
import MoviesModel from "../models/movies";
import {render, replace, remove} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;
const Delete = `Deleting...`;

const POINTER_VENTS = {
  NONE: `none`,
  AUTO: `auto`
};

const ELEMEMTS = {
  BUTTON: `BUTTON`,
  LI_ELEM: `li`
};

const EVT_KEY = {
  ESCAPE: `Escape`,
  ESC: `Esc`
};

const Mode = {
  CLOSE: `close`,
  OPEN: `open`,
};

const ENTER_KEY_KODE = 13;

const parseFormData = ({text, emoji}) => {
  return {
    "comment": text.value,
    "emotion": emoji !== null ? emoji.value : ``,
    "date": new Date()
  };
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._commentsComponent = null;
    this._controlsComponent = null;
    this._film = null;
    this._filmId = null;
    this._comments = null;
    this.shakedElelment = null;
    this._mode = Mode.CLOSE;

    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._setComments = this._setComments.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  setDefaultView() {
    if (this._mode !== Mode.CLOSE) {
      this._onCloseDetailClick();
    }
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._filmId = film.id;
    this._film = film;

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

    this._filmCardComponent.setWatchListClickHandler((evt) => {
      evt.preventDefault();
      const newFilm = MoviesModel.clone(this._film);
      newFilm.isWatchlist = !newFilm.isWatchlist;
      this._onDataChange(this, this._film, newFilm);
    });

    this._filmCardComponent.setHistoryClickHandler((evt) => {
      evt.preventDefault();
      const newFilm = MoviesModel.clone(this._film);
      newFilm.isHistory = !newFilm.isHistory;
      this._onDataChange(this, this._film, newFilm);
    });

    this._filmCardComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      const newFilm = MoviesModel.clone(this._film);
      newFilm.isFavorite = !newFilm.isFavorite;
      this._onDataChange(this, this._film, newFilm);
    });

    this._filmDetailsComponent.setCloseDetailClick((evt) => {
      evt.preventDefault();
      this._onCloseDetailClick();
    });

    this._filmDetailsComponent.setFormSumbmitHandler((evt) => {
      if (evt.ctrlKey && evt.keyCode === ENTER_KEY_KODE) {
        evt.currentTarget.style.pointerEvents = POINTER_VENTS.NONE;
        const data = this._filmDetailsComponent.getData();
        const parseData = parseFormData(data);
        const form = evt.currentTarget;
        this._api.createComments(this._filmId, parseData)
          .then(({movie, comments}) => {
            this._film = movie;
            form.style.pointerEvents = POINTER_VENTS.AUTO;
            this._setComments(comments);
          }).catch(() => {
            this.shakedElelment = form;
            form.style.pointerEvents = POINTER_VENTS.AUTO;
            this.shake();
            this._commentsComponent.setData({
              error: true,
            });
          });
      }
    });

    render(this._container, this._filmCardComponent);
  }

  updateData(film) {
    const oldControlsComponent = this._controlsComponent;
    this._controlsComponent = new ControlsComponent(film);

    this._controlsComponent.setWatchListClickHandler((evt) => {
      evt.preventDefault();
      const newFilm = MoviesModel.clone(this._film);
      newFilm.isWatchlist = !newFilm.isWatchlist;
      this._onDataChange(this, this._film, newFilm);
    });

    this._controlsComponent.setHistoryClickHandler((evt) => {
      evt.preventDefault();
      const newFilm = MoviesModel.clone(this._film);
      newFilm.isHistory = !newFilm.isHistory;
      this._onDataChange(this, this._film, newFilm);
    });

    this._controlsComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      const newFilm = MoviesModel.clone(this._film);
      newFilm.isFavorite = !newFilm.isFavorite;
      this._onDataChange(this, this._film, newFilm);
    });

    const controlControls = this._filmDetailsComponent.getElement().querySelector(`.form-details__top-container`);

    if (oldControlsComponent) {
      replace(this._controlsComponent, oldControlsComponent);
      this._film = film;
    } else {
      render(controlControls, this._controlsComponent);
    }
  }

  destroy() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    remove(this._filmDetailsComponent);
    remove(this._filmCardComponent);
  }

  _onCardClick() {
    this._onViewChange();
    this._mode = Mode.OPEN;
    render(document.body, this._filmDetailsComponent);
    this.updateData(this._film);
    this._filmDetailsComponent.setEsckeydown(this._onEscKeyDown);
    this._api.getCommentsById(this._filmId, this._setComments);
  }

  _setComments(comments) {
    this._comments = comments;
    const commentsContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

    const oldCommentsComponent = this._commentsComponent;

    this._commentsComponent = new CommentsComponent(comments);
    this._commentsComponent.setDeleteComment((evt) => {
      evt.preventDefault();

      if (evt.target.tagName === ELEMEMTS.BUTTON) {
        const target = evt.target.closest(ELEMEMTS.LI_ELEM).dataset.id;
        this.shakedElelment = evt.target.closest(ELEMEMTS.LI_ELEM);
        evt.target.innerText = Delete;

        this._api.deleteComment(target).then(() => {
          const index = this._comments.findIndex((it) => it.id === target);
          if (index !== -1) {
            const newComments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
            this._film.comments = newComments;
            this._setComments(newComments);
          }
        }).catch(() => {
          this.shake();
          this._commentsComponent.rerender();
        });
      }
    });

    if (oldCommentsComponent) {
      replace(this._commentsComponent, oldCommentsComponent);
    } else {
      render(commentsContainer, this._commentsComponent);
    }
  }

  shake() {
    this.shakedElelment.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this.shakedElelment.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _onCloseDetailClick() {
    this._mode = Mode.CLOSE;
    this._commentsComponent.reset();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    remove(this._filmDetailsComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === EVT_KEY.ESCAPE || evt.key === EVT_KEY.ESC;

    if (isEscKey) {
      this._onCloseDetailClick();
    }
  }
}
