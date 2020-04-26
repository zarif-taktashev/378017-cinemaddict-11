import AbstractComponent from "./abstract-component.js";

const createShowButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowButton extends AbstractComponent {
  getTemplate() {
    return createShowButton();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
