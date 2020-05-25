import AbstractComponent from "./abstract-component.js";

const createFilm = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};

export default class NoDataComponent extends AbstractComponent {
  getTemplate() {
    return createFilm();
  }
}
