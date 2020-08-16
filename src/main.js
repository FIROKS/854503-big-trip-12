import DaysItemComponent from './view/days/item';
import DaysListComponent from './view/days/list';

import EventViewComponent from './view/event/view';
import EventEditComponent from './view/event/edit';
import EventOfferComponent from './view/event/offer';

import MenuFilterComponent from './view/menu/filter';
import MenuPresentationComponent from './view/menu/presentation';
import MenuSortingComponent from './view/menu/sorting';

import TripInfoComponent from './view/trip/info';

import {renderElement} from './utils/renderElement';
import {generateEvents} from './utils/mock';
import {groupEventsByDays} from './utils/group-events';


const events = generateEvents();

const infoContainerELement = document.querySelector(`.trip-main`);
const controlsContainerElement = document.querySelector(`.trip-controls`);
const eventsContainerElement = document.querySelector(`.trip-events`);

renderElement(infoContainerELement, new TripInfoComponent(events).getElement());

renderElement(controlsContainerElement, new MenuPresentationComponent().getElement());
renderElement(controlsContainerElement, new MenuFilterComponent().getElement(), `beforeend`);

renderElement(eventsContainerElement, new MenuSortingComponent().getElement());

renderElement(eventsContainerElement, new DaysListComponent().getElement(), `beforeend`);

const daysListElement = document.querySelector(`.trip-days`);

const eventDayGroups = groupEventsByDays(events);

const renderEvent = (parentNode, eventInDay) => {
  const offers = eventInDay.offers;
  const offerComponent = new EventOfferComponent(offers);
  const offerTemplate = offerComponent.getTemplate();

  const eventViewComponent = new EventViewComponent(eventInDay, offerTemplate);
  const eventEditComponent = new EventEditComponent(eventInDay, offerComponent);

  const replaceEventToEditing = () => {
    parentNode.replaceChild(eventEditComponent.getElement(), event.getElement());
  };

  const replaceEditingToEvent = () => {
    parentNode.replaceChild(eventViewComponent.getElement(), eventEditComponent.getElement());
  };

  eventViewComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEditing();
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEditingToEvent();
  });

  renderElement(parentNode, eventViewComponent.getElement(), `beforeend`);
};

eventDayGroups.forEach((eventDayGroup, i) => {
  const dayElement = new DaysItemComponent(eventDayGroup[0].timeInfo, i + 1).getElement();
  const container = dayElement.querySelector(`.trip-events__list`);

  renderElement(daysListElement, dayElement, `beforeend`);

  for (let eventDay of eventDayGroup) {
    renderEvent(container, eventDay);
  }
});
