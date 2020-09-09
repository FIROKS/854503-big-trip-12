import Element from '../element';

export default class DaysListComponent extends Element {
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
