import AbstractElement from '../abstract-element';

export default class DaysListComponent extends AbstractElement {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return this._createDaysListTemplate();
  }

  _createDaysListTemplate() {
    return (
      `<ul class="trip-days"></ul>`
    );
  }
}
