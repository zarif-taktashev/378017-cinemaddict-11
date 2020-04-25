import {createElement} from "../utils.js";

const createMenu = (filters) => {
  const createFilters = (filtersInf) => {
    return filtersInf.map((it) => {
      return (`
        <a href="#watchlist" class="main-navigation__item">
          ${it.name}
          ${it.count <= 5 ? `<span class="main-navigation__item-count">${it.count}</span>` : ``}
        </a>
      `);
    }).join(`\n`);
  };

  const filtersMarkup = createFilters(filters);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Menu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createMenu(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

