import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import CommentsComponent from "../components/comments";
import ControlsComponent from "../components/details-controls";
import MoviesModel from "../models/movies";
import CommentsModel from "../models/comments";
import {render, replace, remove} from "../utils/render.js";

const Mode = {
  CLOSE: `close`,
  OPEN: `open`,
};

const ENTER_KEY_KODE = 13;

const parseFormData = ({text, emoji}) => {
  return {
    comment: text.value,
    emotion: emoji !== null ? emoji.value : ``,
    date: new Date()
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
    this._deleteCommentId = null;
    this._createdCommentId = null;
    this._mode = Mode.CLOSE;

    this._onViewChange = onViewChange;
    this._onDataChange = onDataChange;
    this._commentsModel = new CommentsModel();
    this._commentsModel.setDataDeleteHandler(this._deleteComment.bind(this));
    this._commentsModel.setDataCreateHandler(this._createComment.bind(this));
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

    this._filmDetailsComponent.setFormSumbmitHandler(() => {
      if (event.ctrlKey && event.keyCode === ENTER_KEY_KODE) {
        const data = this._filmDetailsComponent.getData();
        const parseData = parseFormData(data);
        this._createdCommentId = data.id;
        this._commentsModel.createNewComment(parseData);
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
    const commentsContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);

    this._commentsComponent = new CommentsComponent(comments);
    this._commentsComponent.setDeleteComment((evt) => {
      evt.preventDefault();
      const target = evt.target.dataset.id;
      this._deleteCommentId = target;
      this._commentsModel.deleteById(target);
    });

    render(commentsContainer, this._commentsComponent);
  }

  _deleteComment() {
    const index = this._film.comments.findIndex((it) => it === this._deleteCommentId);

    if (index !== -1) {
      const newComments = [].concat(this._film.comments.slice(0, index), this._film.comments.slice(index + 1));

      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        comments: newComments,
      }));
      remove(this._commentsComponent);
      this._commentsModel.getCommentsById(newComments, this._setComments);
    }
  }

  _createComment() {
    const newComments = [].concat(this._createdCommentId, this._film.comments);
    this._onDataChange(this, this._film, Object.assign({}, this._film, {
      comments: newComments,
    }));
    remove(this._commentsComponent);
    this._commentsModel.getCommentsById(newComments, this._setComments);
  }

  _onCloseDetailClick() {
    this._mode = Mode.CLOSE;
    this._commentsComponent.reset();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    remove(this._commentsComponent);
    remove(this._filmDetailsComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onCloseDetailClick();
    }
  }
}
