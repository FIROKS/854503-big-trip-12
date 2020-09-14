import SmartView from '../smart';
import {generateRandomText, generateRandomPhotos} from '../../utils/random';

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

const EVENT_TYPE_ARRIVAL = new Set([
  `check-in`,
  `sightseeing`,
  `restaurant`,
]);

const OFFERS_LIST = {
  addLuggage: {price: 30, title: `Add luggage`},
  comfortClass: {price: 100, title: `Switch to comfort`},
  addMeal: {price: 15, title: `Add meal`},
  chooseSeats: {price: 5, title: `Сhoose Seats`},
  travelByTrain: {price: 40, title: `Travel by train`},
};

export default class EventEditComponent extends SmartView {
  constructor(event, offerList) {
    super();
    this._event = event;
    this._offerList = offerList;

    this._data = EventEditComponent.parseEventToData(event);

    this._viewClickHandler = this._viewClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._changeEventTypeHandler = this._changeEventTypeHandler.bind(this);
    this._changeEventDestination = this._changeEventDestination.bind(this);
    this._changeEventPrice = this._changeEventPrice.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return this._createEventEditingTemplate(this._data);
  }

  setViewClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._viewClickHandler);
  }

  setResetHandler(callback) {
    this._callback.resetClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._resetClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._submitHandler);
  }

  setEscKeydown(callback) {
    this._callback.escKeydown = callback;
    document.addEventListener(`click`, this._escKeydownHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setViewClickHandler(this._callback.editClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setSubmitHandler(this._callback.submit);
    this.setEscKeydown(this._callback.escKeydown);
    this.setResetHandler(this._callback.resetClick);
  }

  reset(event) {
    this.updateData(
        EventEditComponent.parseEventToData(event)
    );
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event
    );
  }

  _resetClickHandler(evt) {
    evt.preventDefault();

    this._callback.resetClick();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`click`, this._changeEventTypeHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`change`, this._changeEventDestination);
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._changeEventPrice);
  }

  _changeEventTypeHandler(evt) {
    const newEventType = this.getElement().querySelector(`#${evt.target.getAttribute(`for`)}`).value;
    const preposition = EVENT_TYPE_ARRIVAL.has(newEventType) ? `at` : `to`;

    this.updateData({
      typeInfo: {
        eventType: newEventType,
        preposition
      }
    });
  }

  _changeEventDestination(evt) {
    evt.preventDefault();

    const newDestination = evt.target.value;

    this.updateData({
      destination: newDestination,
      destinationInfo: {
        description: generateRandomText(),
        photos: generateRandomPhotos(),
      }
    });
  }

  _changeEventPrice(evt) {
    evt.preventDefault();

    const newPrice = evt.target.value;

    this.updateData({
      price: newPrice
    });
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit();

    document.removeEventListener(`click`, this._escKeydownHandler);
  }

  _escKeydownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._callback.escKeydown();

      document.removeEventListener(`click`, this._escKeydownHandler);
    }
  }

  _viewClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventInfo.timeInfo.startDate.day}/${eventInfo.timeInfo.startDate.month}/${eventInfo.timeInfo.startDate.year.toString().substring(0, 2)} ${eventInfo.timeInfo.startDate.hour}:${eventInfo.timeInfo.startDate.minute}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventInfo.timeInfo.endDate.day}/${eventInfo.timeInfo.endDate.month}/${eventInfo.timeInfo.endDate.year.toString().substring(0, 2)} ${eventInfo.timeInfo.endDate.hour}:${eventInfo.timeInfo.endDate.minute}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventInfo.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>

          <input id="event-favorite-${eventInfo.id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._data.isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-${eventInfo.id}">
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

            ${this._offerList
              .map((offer) => this._createOfferTemplate(offer))
              .join(``)
      }
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
  }

  _createOfferTemplate(offer) {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${OFFERS_LIST[offer].price}-${this._data.id}" type="checkbox" name="${OFFERS_LIST[offer].price}-${this._data.id}">
        <label class="event__offer-label" for="${OFFERS_LIST[offer].price}-${this._data.id}">
          <span class="event__offer-title">${OFFERS_LIST[offer].title}</span>
          +
          €&nbsp;<span class="event__offer-price">${OFFERS_LIST[offer].price}</span>
        </label>
      </div>`
    );
  }

  _createEventTypeTemplate(typeInfo) {
    return (
      `<div class="event__type-item">
        <input id="event-type-${typeInfo.value}-${typeInfo.id}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${typeInfo.value}">
        <label class="event__type-label  event__type-label--${typeInfo.value}" for="event-type-${typeInfo.value}-${typeInfo.id}">${typeInfo.title}</label>
      </div>`
    );
  }
}
