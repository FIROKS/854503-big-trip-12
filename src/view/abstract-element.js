import {createElement} from '../utils/create-element';

export default class AbstractElement {
  constructor() {
    if (new.target === AbstractElement) {
      throw new Error(`Can't instantiate AbstractElement`);
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
