import AbstractComponent from "./abstract-component.js";
import {getClientRate} from "../utils/filter";

const createUserName = (count) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getClientRate(count)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserName extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createUserName(this._count);
  }
}
