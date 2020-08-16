import {createElement} from '../../utils/create-element';

export default class DaysListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return this._createDaysListTemplate();
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

  _createDaysListTemplate() {
    return (
      `<ul class="trip-days">
      </ul>`
    );
  }
}
