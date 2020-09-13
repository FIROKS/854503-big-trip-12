import AbstractElement from '../abstract-element';

export default class TripInfoComponent extends AbstractElement {
  constructor(eventsList) {
    super();
    this._element = null;
    this._eventsList = eventsList;
  }

  getTemplate() {
    return this._createTripTemplate(this._eventsList);
  }

  _getPrice(events) {
    const initialValue = 0;
    return events.reduce((total, current) => total + current.price, initialValue);
  }

  _getTripList(eventsList) {
    let trip = ``;
    let lastPos;

    if (eventsList.length > 3) {
      trip = `${eventsList[0].destination} — ... — ${eventsList[eventsList.length - 1].destination}`;
    } else {
      for (let l of eventsList) {
        trip = `${trip}${l.destination} — `;
      }

      lastPos = trip.lastIndexOf(` — `);
      trip = trip.substring(0, lastPos);
    }

    return trip;
  }

  _createTripTemplate(eventsList) {
    const trip = this._getTripList(eventsList);

    return (
      `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${trip}</h1>
          <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
        </div>
        <p class="trip-info__cost">
          Total: €&nbsp;<span class="trip-info__cost-value">${this._getPrice(eventsList)}</span>
        </p>
      </section>`
    );
  }
}
