import {renderElement} from '../utils/renderElement';
import {groupEventsByDays} from '../utils/group-events';
import {updateItem} from '../utils/updateItem';

import DaysItemComponent from '../view/days/item';

import DaysListComponent from '../view/days/list';
import MenuSortingComponent from '../view/menu/sorting';
import EventPresenter from './eventPresenter';

export default class TripPresenter {
  constructor(container) {

    this._container = container;
    this._daysList = new DaysListComponent();
    this._menuSorting = new MenuSortingComponent();
    this._updateEventHandler = this._updateEventHandler.bind(this);
    this._eventPresenter = {};
  }

  init(events) {
    this._events = events.slice();
    this._sourceEvents = events.slice();

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

  _updateEventHandler(updateEvent) {
    this._events = updateItem(this._events, updateEvent);
    this._sourceEvents = updateItem(this._sourceEvents, updateEvent);
    this._eventPresenter[updateEvent.id].init(updateEvent);
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderEvents(daysListElement) {
    const eventDayGroups = groupEventsByDays(this._events);

    eventDayGroups.forEach((eventDayGroup, i) => {
      const dayElement = new DaysItemComponent(eventDayGroup[0].timeInfo, i + 1).getElement();
      const container = dayElement.querySelector(`.trip-events__list`);

      renderElement(daysListElement, dayElement, `beforeend`);

      for (let eventDay of eventDayGroup) {
        const event = new EventPresenter(container, this._updateEventHandler);
        event.init(eventDay);
        this._eventPresenter[eventDay.id] = event;
      }
    });
  }
}
