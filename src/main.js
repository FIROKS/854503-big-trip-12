import {generateDay} from './view/day.js';
import {createDaysListTemplate} from './view/daysList.js';
import {createEventEditingTemplate} from './view/eventEditing.js';
import {cteateFilterTemplate} from './view/filter.js';
import {createMenuTemplate} from './view/menu.js';
import {createPriceTemplate} from './view/price.js';
import {createSortingTemplate} from './view/sorting.js';
import {createTripTemplate} from './view/trip.js';
import {createTripInfoTemplate} from './view/tripInfo.js';
import {renderElement} from './utils/renderElement.js';
import {generateEvents} from './utils/mock.js';

const events = generateEvents();

const infoContainerELement = document.querySelector(`.trip-main`);
const controlsContainerElement = document.querySelector(`.trip-controls`);
const eventsContainerElement = document.querySelector(`.trip-events`);

renderElement(infoContainerELement, createTripInfoTemplate(), `afterbegin`);

const tripInfoContainerELement = document.querySelector(`.trip-main__trip-info`);

renderElement(tripInfoContainerELement, createTripTemplate(events), `afterbegin`);
renderElement(tripInfoContainerELement, createPriceTemplate(events), `beforeend`);

renderElement(controlsContainerElement, createMenuTemplate(), `afterbegin`);
renderElement(controlsContainerElement, cteateFilterTemplate(), `beforeend`);

renderElement(eventsContainerElement, createEventEditingTemplate(events[0]), `afterbegin`);
renderElement(eventsContainerElement, createSortingTemplate(), `afterbegin`);
renderElement(eventsContainerElement, createDaysListTemplate(), `beforeend`);

generateDay(events);
