import {comments} from "../mock/films";

let commentsArray = comments.slice();

export default class Comments {
  constructor(data) {
    this._dataDeleteHandlers = [];
    this._dataCreateHandlers = [];

    if (data) {
      this.id = data[`id`];
      this.author = data[`author`] || ``;
      this.text = data[`comment`] || ``;
      this.date = data[`date`] ? new Date(data[`date`]) : data[`date`];
      this.emotion = data[`emotion`] || ``;
    }
  }

  static parseComment(data) {
    return new Comments(data);
  }

  static parseComments(data) {
    return data.map(Comments.parseComment);
  }

  deleteById(id) {
    const index = commentsArray.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    commentsArray = [].concat(commentsArray.slice(0, index), commentsArray.slice(index + 1));

    this._callHandlers(this._dataDeleteHandlers);

    return true;
  }

  createNewComment(comment) {
    commentsArray = [].concat(comment, commentsArray);
    this._callHandlers(this._dataCreateHandlers);
  }

  setDataDeleteHandler(handler) {
    this._dataDeleteHandlers.push(handler);
  }

  setDataCreateHandler(handler) {
    this._dataCreateHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
