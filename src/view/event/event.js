import {createElement} from "../../utils/create-element";

export default class EventComponent {
  constructor(eventInfo, offerListTemplate) {
    this._eventInfo = eventInfo;
    this._offerListTemplate = offerListTemplate;
    this._element = null;
  }

  getTemplate() {
    return this._createEventTemplate(this._eventInfo, this._offerListTemplate);
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

  _createEventTemplate(eventInfo, offerListTemplate) {
    return (
      `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventInfo.typeInfo.eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventInfo.typeInfo.eventType} ${eventInfo.typeInfo.preposition} ${eventInfo.destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${eventInfo.timeInfo.startDatetime.year}-${eventInfo.timeInfo.startDatetime.month}-${eventInfo.timeInfo.startDatetime.day}T${eventInfo.timeInfo.startDatetime.hour}:${eventInfo.timeInfo.startDatetime.minute}">${eventInfo.timeInfo.start}</time>
            —
            <time class="event__end-time" datetime="${eventInfo.timeInfo.endDatetime.year}-${eventInfo.timeInfo.endDatetime.month}-${eventInfo.timeInfo.endDatetime.day}T${eventInfo.timeInfo.endDatetime.hour}:${eventInfo.timeInfo.endDatetime.minute}">${eventInfo.timeInfo.end}</time>
          </p>
          <p class="event__duration">${eventInfo.timeInfo.duration}</p>
        </div>

        <p class="event__price">
          €&nbsp;<span class="event__price-value">${eventInfo.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerListTemplate}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`
    );
  }
}
