import AbstractComponent from "./abstract-component.js";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilters = (filtersInf) => {
  return filtersInf.map((it) => {
    return (`
      <a href="#filter__${it.name}" id="filter__${it.name}" class="main-navigation__item ${it.checked ? `main-navigation__item--active` : ``}">
        ${it.name}
        ${it.name !== `All` ? `<span class="main-navigation__item-count">${it.count}</span>` : ``}
      </a>
    `);
  }).join(`\n`);
};

const createMenu = (filters) => {
  const filtersMarkup = createFilters(filters);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
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

  setFilterClickHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}
