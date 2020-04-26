import AbstractComponent from "./abstract-component.js";

const createFooterStatistics = (count) => {
  return (
    `<section class="footer__statistics">
      <p>${count} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterStatistics(this._count);
  }
}
