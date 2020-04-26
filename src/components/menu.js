import AbstractComponent from "./abstract-component.js";

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
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenu(this._filters);
  }
}

