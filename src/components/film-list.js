import AbstractComponent from "./abstract-component.js";

const createFilmList = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmList();
  }

  getFilmListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
