import AbstractElement from '../abstract-element';

const OFFERS_LIST = {
  addLuggage: {price: 30, title: `Add luggage`},
  comfortClass: {price: 100, title: `Switch to comfort`},
  addMeal: {price: 15, title: `Add meal`},
  chooseSeats: {price: 5, title: `Сhoose Seats`},
  travelByTrain: {price: 40, title: `Travel by train`},
};


export default class EventViewComponent extends AbstractElement {
  constructor(eventInfo, offerList) {
    super();
    this._eventInfo = eventInfo;
    this._offerList = offerList;

    this._viewClickHandler = this._viewClickHandler.bind(this);
  }

  getTemplate() {
    return this._createEventTemplate(this._eventInfo, this._offerList);
  }

  setViewClickHandler(callBack) {
    this._callback.viewClick = callBack;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._viewClickHandler);
  }

  _viewClickHandler(evt) {
    evt.preventDefault();
    this._callback.viewClick();
  }

  _createOfferTemplate(offer) {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${OFFERS_LIST[offer].title}</span>
        +
        €&nbsp;<span class="event__offer-price">${OFFERS_LIST[offer].price}</span>
      </li>`
    );
  }

  _createEventTemplate(eventInfo) {
    return (
      `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventInfo.typeInfo.eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventInfo.typeInfo.eventType} ${eventInfo.typeInfo.preposition} ${eventInfo.destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${eventInfo.timeInfo.startDate.year}-${eventInfo.timeInfo.startDate.month}-${eventInfo.timeInfo.startDate.day}T${eventInfo.timeInfo.startDate.hour}:${eventInfo.timeInfo.startDate.minute}">${eventInfo.timeInfo.startDate.hour}:${eventInfo.timeInfo.startDate.minute}</time>
            —
            <time class="event__end-time" datetime="${eventInfo.timeInfo.endDate.year}-${eventInfo.timeInfo.endDate.month}-${eventInfo.timeInfo.endDate.day}T${eventInfo.timeInfo.endDate.hour}:${eventInfo.timeInfo.endDate.minute}">${eventInfo.timeInfo.endDate.hour}:${eventInfo.timeInfo.endDate.minute}</time>
          </p>
          <p class="event__duration">${eventInfo.timeInfo.duration}</p>
        </div>

        <p class="event__price">
          €&nbsp;<span class="event__price-value">${eventInfo.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
      ${this._offerList
        .map((offer) => this._createOfferTemplate(offer))
        .join(``)
      }
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`
    );
  }
}
