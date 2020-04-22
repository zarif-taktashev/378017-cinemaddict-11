import {createElement} from "../utils.js";

const createFooterStatistics = (count) => {
  return (
    `<section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistics(this._count);
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
