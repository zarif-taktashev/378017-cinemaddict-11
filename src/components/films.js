import AbstractComponent from "./abstract-component.js";

const createFilm = () => {
  return (
    `<section class="films"></section>>`
  );
};

export default class Films extends AbstractComponent {
  getTemplate() {
    return createFilm();
  }
}
