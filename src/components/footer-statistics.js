import {COUNT} from "../data.js";

export const createFooterStatistics = () => {
  return (
    `<section class="footer__statistics">
      <p>${COUNT} movies inside</p>
    </section>`
  );
};
