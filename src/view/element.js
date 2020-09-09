import {createElement} from '../utils/create-element';

export default class Element {
  constructor() {
    if (new.target === Element) {
      throw new Error(`Can't instantiate Element`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Element method not implemented: getTemplate`);
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
