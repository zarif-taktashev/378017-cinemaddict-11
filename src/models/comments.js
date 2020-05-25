
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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
