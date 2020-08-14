import {createElement} from "../utils/create-element";

const TRANSFER_LIST = [
  {
    title: `Taxi`,
    value: `taxi`
  },
  {
    title: `Bus`,
    value: `bus`,
  },
  {
    title: `Train`,
    value: `train`,
  },
  {
    title: `Ship`,
    value: `ship`,
  },
  {
    title: `Transport`,
    value: `transport`,
  },
  {
    title: `Drive`,
    value: `drive`,
  },
  {
    title: `Flight`,
    value: `flight`,
  },
];

const ACTIVITY_LIST = [
  {
    title: `Check-in`,
    value: `check-in`
  },
  {
    title: `Sightseeing`,
    value: `sightseeing`
  },
  {
    title: `Restaurant`,
    value: `restaurant`
  },
];

const OFFERS_LIST = [
  {
    id: `luggage`,
    title: `Add luggage`,
    price: `30`
  },
  {
    id: `comfort`,
    title: `Switch to comfort class`,
    price: `100`
  },
  {
    id: `meal`,
    title: `Add meal`,
    price: `15`
  },
  {
    id: `meal`,
    title: `Add meal`,
    price: `15`
  },
  {
    id: `train`,
    title: `Travel by train`,
    price: `40`
  },
];
// TODO: реализовать учет offers
export default class EventEditing {
  constructor(event, offers) {
    this._element = null;
    this._event = event;
    this._offers = offers;
  };

  getTemplate() {
    return this._createEventEditingTemplate(this._event);
  };

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  };

  removeElement() {
    this._element = null;
  }

  _createEventEditingTemplate(eventInfo) {
    return (
      `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${eventInfo.typeInfo.eventType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${TRANSFER_LIST
                  .map((typeInfo) => this._createEventTypeTemplate(typeInfo))
                  .join(``)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${ACTIVITY_LIST
                  .map((typeInfo) => this._createEventTypeTemplate(typeInfo))
                  .join(``)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${eventInfo.typeInfo.eventType} ${eventInfo.typeInfo.preposition}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventInfo.destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Saint Petersburg"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventInfo.timeInfo.startDatetime.day}/${eventInfo.timeInfo.startDatetime.month}/${eventInfo.timeInfo.startDatetime.year.toString().substring(0, 2)} ${eventInfo.timeInfo.startDatetime.hour}:${eventInfo.timeInfo.startDatetime.minute}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventInfo.timeInfo.endDatetime.day}/${eventInfo.timeInfo.endDatetime.month}/${eventInfo.timeInfo.endDatetime.year.toString().substring(0, 2)} ${eventInfo.timeInfo.endDatetime.hour}:${eventInfo.timeInfo.endDatetime.minute}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              € ${eventInfo.price}
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked="">
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">

            ${OFFERS_LIST
              .map((offer) => this._createOfferTemplate(offer))
              .join(``)}

            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${eventInfo.destinationInfo.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${eventInfo.destinationInfo.photos}
              </div>
            </div>
          </section>
        </section>
      </form>`
    );
  };

  _createOfferTemplate(offerInfo) {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerInfo.id}-1" type="checkbox" name="event-offer-${offerInfo.id}">
        <label class="event__offer-label" for="event-offer-${offerInfo.id}-1">
          <span class="event__offer-title">${offerInfo.title}</span>
          +
          €&nbsp;<span class="event__offer-price">${offerInfo.price}</span>
        </label>
      </div>`
    );
  };

  _createEventTypeTemplate(typeInfo) {
    return (
      `<div class="event__type-item">
        <input id="event-type-${typeInfo.value}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${typeInfo.value}">
        <label class="event__type-label  event__type-label--${typeInfo.value}" for="event-type-${typeInfo.value}-1">${typeInfo.title}</label>
      </div>`
    );
  };
};
