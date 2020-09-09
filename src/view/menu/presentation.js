import Element from '../element';

export default class MenuPresentationComponent extends Element {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return this._createPresentationTemplate();
  }

  _createPresentationTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>`
    );
  }
}
