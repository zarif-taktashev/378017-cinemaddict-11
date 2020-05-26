import AbstractSmartComponent from "./abstract-smart-component";
import {ANKOR} from "../utils/render";

export const SortType = {
  RATE: `rate`,
  DATE: `date-up`,
  DEFAULT: `default`,
};

const createSort = (currenSortType) => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${currenSortType === `default` ? `sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${currenSortType === `date-up` ? `sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATE}" class="sort__button ${currenSortType === `rate` ? `sort__button--active` : ``}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractSmartComponent {
  constructor() {
    super();

    this._currenSortType = SortType.DEFAULT;
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._settedSortType);
  }

  getTemplate() {
    return createSort(this._currenSortType);
  }

  getSortType() {
    return this._currenSortType;
  }

  hide() {
    this._currenSortType = SortType.DEFAULT;
    this.rerender();
    super.hide();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== ANKOR) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      this._settedSortType = handler;
      handler(this._currenSortType);
    });
  }
}
