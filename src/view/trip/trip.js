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
      `<div class="trip-info__main">
        <h1 class="trip-info__title">${trip}</h1>

        <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
      </div>`
    );
  }
}
