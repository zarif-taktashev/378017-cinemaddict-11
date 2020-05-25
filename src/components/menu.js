import AbstractComponent from "./abstract-component.js";

export const MenuItem = {
  STATISTICS: `control__statistic`,
  FILMS: `control__task`,
};

const ANKOR = `A`;

const createMenu = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return createMenu();
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== ANKOR) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}

