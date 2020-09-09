import Element from '../element';

export default class DayComponent extends Element {
  constructor(event, dayNumber) {
    super();
    this._event = event;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return this._createDayTemplate(this._event, this._dayNumber);
  }

  _createDayTemplate(event, dayNumber) {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayNumber}</span>
          <time class="day__date" datetime="${event.startDate.year}-${event.startDate.monthNumber}-${event.startDate.day}">${event.startDate.month} ${event.startDate.day}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>`
    );
  }
}
