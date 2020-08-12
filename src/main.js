import {createDaysTemplate} from './view/day';
import {createDaysListTemplate} from './view/daysList';
import {createEventEditingTemplate} from './view/eventEditing';
import {cteateFilterTemplate} from './view/filter';
import {createMenuTemplate} from './view/menu';
import {createPriceTemplate} from './view/price';
import {createSortingTemplate} from './view/sorting';
import {createTripTemplate} from './view/trip';
import {createTripInfoTemplate} from './view/tripInfo';
import {renderElement} from './utils/renderElement';
import {generateEvents} from './utils/mock';
import {sortEvents} from './utils/sort-events';

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

const daysListElement = document.querySelector(`.trip-days`);

renderElement(daysListElement, createDaysTemplate(sortEvents(events)), `beforeend`);
