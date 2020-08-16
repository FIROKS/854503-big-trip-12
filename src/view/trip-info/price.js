import {createElement} from "../../utils/create-element";

export default class PriceComponent {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return this._createPriceTemplate(this._events);
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

  _getPrice(events) {
    const initialValue = 0;
    return events.reduce((total, current) => total + current.price, initialValue);
  }

  _createPriceTemplate(events) {
    return (
      `<p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${this._getPrice(events)}</span>
      </p>`
    );
  }
}
