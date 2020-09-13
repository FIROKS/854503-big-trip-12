import {renderElement} from '../utils/renderElement';

import {groupEventsByDays} from '../utils/group-events';

import DaysItemComponent from '../view/days/item';

import DaysListComponent from '../view/days/list';
import MenuSortingComponent from '../view/menu/sorting';
import TripEvent from '../presenter/event';

export default class Trip {
  constructor(container, events) {

    this._container = container;
    this._events = events;
    this._daysList = new DaysListComponent();
    this._menuSorting = new MenuSortingComponent();
  }

  init() {
    this._renderDaysList();
    this._renderSorting();

    const daysListElement = document.querySelector(`.trip-days`);

    this._renderEvents(daysListElement);
  }

  _renderDaysList() {
    renderElement(this._container, this._daysList, `beforeend`);
  }

  _renderSorting() {
    renderElement(this._container, this._menuSorting);
  }

  _renderEvents(daysListElement) {
    const eventDayGroups = groupEventsByDays(this._events);

    eventDayGroups.forEach((eventDayGroup, i) => {
      const dayElement = new DaysItemComponent(eventDayGroup[0].timeInfo, i + 1).getElement();
      const container = dayElement.querySelector(`.trip-events__list`);

      renderElement(daysListElement, dayElement, `beforeend`);

      for (let eventDay of eventDayGroup) {
        const event = new TripEvent(container, eventDay);
        event.init();
      }
    });
  }
}
