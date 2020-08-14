import { createElement } from "../utils/create-element";

export default class TripInfo {
  constructor() {
    this._element = null;
  };

  getTemplate() {
    return this._createTripInfoTemplate();
  };

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  };
  
  _createTripInfoTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
      </section>`
    );
  };

  removeElement() {
    this._element = null;
  };
};
