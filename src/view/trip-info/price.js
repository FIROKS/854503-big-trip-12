import Element from '../element';

export default class TripPriceComponent extends Element {
  constructor(events) {
    super();
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return this._createPriceTemplate(this._events);
  }

  _getPrice(events) {
    const initialValue = 0;
    return events.reduce((total, current) => total + current.price, initialValue);
  }

  _createPriceTemplate(events) {
    return (
      `<p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${this._getPrice(events)}</span>
      </p>`
    );
  }
}
