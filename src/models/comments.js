
export default class Comments {
  constructor(comment) {

    if (comment) {
      this.id = comment[`id`];
      this.author = comment[`author`] || ``;
      this.text = comment[`comment`] || ``;
      this.date = comment[`date`] ? new Date(comment[`date`]) : comment[`date`];
      this.emotion = comment[`emotion`] || ``;
    }
  }

  static parseComment(comment) {
    return new Comments(comment);
  }

  static parseComments(comments) {
    return comments.map(Comments.parseComment);
  }

}
