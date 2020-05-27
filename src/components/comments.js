import AbstractSmartComponent from "./abstract-smart-component";
import {encode} from "he";

const IMG_HEIGHT = 55;
const IMG_WIDTH = 55;
const IMG_NODE = `IMG`;

const DefaultData = {
  error: false,
};

const createCommentList = (commentsInf) => {
  return commentsInf.map((comment) => {
    const year = comment.date.getFullYear();
    const month = comment.date.getUTCMonth() + 1;
    const day = comment.date.getDate();
    const hour = comment.date.getHours() + 1;
    const minutes = comment.date.getMinutes() + 1;
    const text = encode(comment.text);

    return (
      `<li data-id="${comment.id}" class="film-details__comment">
        <span class="film-details__comment-emoji">
        ${comment.emotion ? `<img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="${comment.emotion}">` : ``}
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${year}/${month}/${day} ${hour}:${minutes}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`);
  }).join(`\n`);
};

const createComments = (comments, options = {}) => {
  const {emoji, emojiId, externalData} = options;
  const commentsQuantity = comments.length;

  const commentsMarkup = createCommentList(comments);

  return (
    `<section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQuantity}</span></h3>

      <ul class="film-details__comments-list">
        ${commentsMarkup}
      </ul>

      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
          ${emoji !== null ? emoji : ``}
        </div>

        <label class="film-details__comment-label">
          <textarea class="${externalData.error ? `film-details__comment-input-error` : ``}  film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input ${emojiId === `emoji-smile` ? `checked` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input ${emojiId === `emoji-sleeping` ? `checked` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input ${emojiId === `emoji-puke` ? `checked` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input ${emojiId === `emoji-angry` ? `checked` : ``} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </div>
    </section>
  `);
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;

    this._emoji = null;
    this._emojiId = null;
    this._commentText = null;
    this._externalData = DefaultData;
    this._setEmojiClick();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._emoji = null;
    this._emojiId = null;
    this._commentText = null;

    this.rerender();
  }

  recoveryListeners() {
    this.setDeleteComment(this._deleteButtonClickHandler);
    this._setEmojiClick();
    this.getElement().querySelector(`.film-details__comment-input`).value = this._commentText;
  }

  getTemplate() {
    return createComments(this._comments, {
      emoji: this._emoji,
      emojiId: this._emojiId,
      commentText: this._commentText,
      externalData: this._externalData,
    });
  }

  setData(redBorder) {
    this._externalData = Object.assign({}, DefaultData, redBorder);
    this._commentText = this.getElement().querySelector(`.film-details__comment-input`).value;
    this.rerender();
  }

  _setEmojiClick() {
    const element = this.getElement();
    element.querySelector(`.film-details__emoji-list`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.nodeName === IMG_NODE) {
        const src = evt.target.attributes.src.value;
        const alt = evt.target.alt;
        const emojiId = evt.target.parentNode.attributes.for.value;
        const img = `<img src=${src} alt=${alt} width=${IMG_WIDTH} height=${IMG_HEIGHT}>`;
        this._commentText = this.getElement().querySelector(`.film-details__comment-input`).value;
        this._emoji = img;
        this._emojiId = emojiId;

        this.rerender();
      }
    });
  }

  setDeleteComment(handler) {
    const element = this.getElement();
    element.querySelector(`.film-details__comments-list`)
    .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }
}
