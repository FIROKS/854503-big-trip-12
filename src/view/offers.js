import {createElement} from "../utils/create-element";

const MAX_OFFERS_NUMBER = 3;

const OFFERS_PRICES = new Map([
  [`addLuggage`, 30],
  [`comfortClass`, 100],
  [`addMeal`, 15],
  [`chooseSeats`, 5],
  [`travelByTrain`, 40],
]);

export default class Offers {
  constructor(offers) {
    this._element = null;
    this._offers = offers;
  }

  getTemplate() {
    return this._createOfferListTemplate(this._offers);
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


  _createOfferListTemplate(offers) {
    return Array.from(offers)
      .slice(0, MAX_OFFERS_NUMBER)
      .map((offer) => this._createOfferTemplate(offer, OFFERS_PRICES.get(offer)))
      .join(``);
  }

  _createOfferTemplate(title, price) {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${title}</span>
        +
        €&nbsp;<span class="event__offer-price">${price}</span>
      </li>`
    );
  }
}
