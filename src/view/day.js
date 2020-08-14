import {createElement} from '../utils/create-element';

export default class Days {
  constructor(event, dayNumber) {
    this._element = null;
    this._event = event;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return this._createDayTemplate(this._event, this._dayNumber);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  _createDayTemplate(event, dayNumber) {

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayNumber}</span>
          <time class="day__date" datetime="${event.startDatetime.year}-${event.startDatetime.monthNumber}-${event.startDatetime.day}">${event.startDatetime.month} ${event.startDatetime.day}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>`
    );
  }

  removeElement() {
    this._element = null;
  }
}
