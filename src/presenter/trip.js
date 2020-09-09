import {renderElement} from '../utils/renderElement';
import {replaceElement} from '../utils/replaceElement';

import {groupEventsByDays} from '../utils/group-events';

import DaysItemComponent from '../view/days/item';

import EventViewComponent from '../view/event/view';
import EventEditComponent from '../view/event/edit';
import EventOfferComponent from '../view/event/offer';

import DaysListComponent from '../view/days/list';
import MenuSortingComponent from '../view/menu/sorting';

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

  _renderEvent(parentNode, eventInDay) {
    const offers = eventInDay.offers;
    const offerComponent = new EventOfferComponent(offers);
    const offerTemplate = offerComponent.getTemplate();

    const eventViewComponent = new EventViewComponent(eventInDay, offerTemplate);
    const eventEditComponent = new EventEditComponent(eventInDay, offerComponent);

    const replaceEventToEditing = () => {
      replaceElement(eventEditComponent, eventViewComponent);
    };

    const replaceEditingToEvent = () => {
      replaceElement(eventViewComponent, eventEditComponent);
    };

    eventViewComponent.setViewClickHandler(() => {
      replaceEventToEditing();
    });

    eventEditComponent.setEditClickHandlet(() => {
      replaceEditingToEvent();
    });

    renderElement(parentNode, eventViewComponent, `beforeend`);
  }

  _renderEvents(daysListElement) {
    const eventDayGroups = groupEventsByDays(this._events);

    eventDayGroups.forEach((eventDayGroup, i) => {
      const dayElement = new DaysItemComponent(eventDayGroup[0].timeInfo, i + 1).getElement();
      const container = dayElement.querySelector(`.trip-events__list`);

      renderElement(daysListElement, dayElement, `beforeend`);

      for (let eventDay of eventDayGroup) {
        this._renderEvent(container, eventDay);
      }
    });
  }
}
