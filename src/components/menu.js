import AbstractComponent from "./abstract-component.js";
import {ANKOR} from "../utils/render";

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

