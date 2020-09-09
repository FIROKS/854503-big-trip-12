import MenuFilterComponent from './view/menu/filter';
import MenuPresentationComponent from './view/menu/presentation';

import TripInfoComponent from './view/trip/info';

import {renderElement} from './utils/renderElement';
import {generateEvents} from './utils/mock';

import Trip from './presenter/trip';


const events = generateEvents();

const infoContainerELement = document.querySelector(`.trip-main`);
const controlsContainerElement = document.querySelector(`.trip-controls`);
const eventsContainerElement = document.querySelector(`.trip-events`);

renderElement(infoContainerELement, new TripInfoComponent(events));

renderElement(controlsContainerElement, new MenuPresentationComponent());
renderElement(controlsContainerElement, new MenuFilterComponent(), `beforeend`);

const tripPresenter = new Trip(eventsContainerElement, events);

tripPresenter.init();
