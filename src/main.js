import {createDayTemplate} from './view/day.js';
import {createDaysListTemplate} from './view/daysList.js';
import {createEventTemplate} from './view/event.js';
import {createEventEditingTemplate} from './view/eventEditing.js';
import {cteateFilterTemplate} from './view/filter.js';
import {createMenuTemplate} from './view/menu.js';
import {createPriceTemplate} from './view/price.js';
import {createSortingTemplate} from './view/sorting.js';
import {createTripTemplate} from './view/trip.js';
import {createTripInfoTemplate} from './view/tripInfo.js';

const EVENTS_AMOUNT = 3;

const renderElement = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

const infoContainerELement = document.querySelector(`.trip-main`);
const controlsContainerElement = document.querySelector(`.trip-controls`);
const eventsContainerElement = document.querySelector(`.trip-events`);

renderElement(infoContainerELement, createTripInfoTemplate(), `afterbegin`);

const tripInfoContainerELement = document.querySelector(`.trip-main__trip-info`);

renderElement(tripInfoContainerELement, createTripTemplate(), `afterbegin`);
renderElement(tripInfoContainerELement, createPriceTemplate(), `beforeend`);

renderElement(controlsContainerElement, createMenuTemplate(), `afterbegin`);
renderElement(controlsContainerElement, cteateFilterTemplate(), `beforeend`);

renderElement(eventsContainerElement, createEventEditingTemplate(), `afterbegin`);
renderElement(eventsContainerElement, createSortingTemplate(), `afterbegin`);
renderElement(eventsContainerElement, createDaysListTemplate(), `beforeend`);

const daysListElement = document.querySelector(`.trip-days`);

renderElement(daysListElement, createDayTemplate(), `beforeend`);

const dayEventsListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_AMOUNT; i++) {
  renderElement(dayEventsListElement, createEventTemplate(), `beforeend`);
}
