import Movie from "./models/movies";
import Comments from "./models/comments";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const STATUS = {
  MULTIPLE_CHOICE: 300,
  SUCCESS: 200
};

const checkStatus = (response) => {
  if (response.status >= STATUS.SUCCESS && response.status < STATUS.MULTIPLE_CHOICE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
    .then((response) => response.json())
    .then(Movie.parseFilms);
  }

  getCommentsById(id, callback) {
    return this._load({
      url: `comments/${id}`,
    })
    .then((response) => response.json())
    .then(Comments.parseComments)
    .then(callback);
  }

  createComments(filmId, data) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(({movie, comments}) => {
        return {
          movie: Movie.parseFilm(movie),
          comments: Comments.parseComments(comments)
        };
      });
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }

  updateFilms(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then((response) => response.json())
    .then(Movie.parseFilm);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};


export default API;
