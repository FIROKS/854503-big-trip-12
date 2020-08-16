import DayComponent from './view/days-list/day';
import DaysListComponent from './view/days-list/daysList';
import EventComponent from './view/event/event';
import EventEditingComponent from './view/event/eventEditing';
import OffersComponent from './view/event/offers';
import FilterComponent from './view/menu/filter';
import PresentationComponent from './view/menu/presentation'; // Нужно ли добавлять View к классам отображения?
import PriceComponent from './view/trip-info/price';
import SortingComponent from './view/sorting/sorting';
import TripComponent from './view/trip-info/trip';
import TripInfoComponent from './view/trip-info/tripInfo';
import {renderElement} from './utils/renderElement';
import {generateEvents} from './utils/mock';
import {sortEvents} from './utils/sort-events';


const events = generateEvents();

const infoContainerELement = document.querySelector(`.trip-main`);
const controlsContainerElement = document.querySelector(`.trip-controls`);
const eventsContainerElement = document.querySelector(`.trip-events`);

renderElement(infoContainerELement, new TripInfoComponent().getElement());

const tripInfoContainerELement = document.querySelector(`.trip-main__trip-info`);

renderElement(tripInfoContainerELement, new TripComponent(events).getElement());
renderElement(tripInfoContainerELement, new PriceComponent(events).getElement(), `beforeend`);

renderElement(controlsContainerElement, new PresentationComponent().getElement());
renderElement(controlsContainerElement, new FilterComponent().getElement(), `beforeend`);

renderElement(eventsContainerElement, new SortingComponent().getElement());

renderElement(eventsContainerElement, new DaysListComponent().getElement(), `beforeend`);

const daysListElement = document.querySelector(`.trip-days`);

const filteredEvents = sortEvents(events);

const renderEvent = (parentNode, eventInDay, offers) => {
  const offer = new OffersComponent(offers).getTemplate();
  const event = new EventComponent(eventInDay, offer);
  const editEvent = new EventEditingComponent(eventInDay, new OffersComponent(offers));

  const replaceEventToEditing = () => {
    parentNode.replaceChild(editEvent.getElement(), event.getElement());
  };

  const replaceEditingToEvent = () => {
    parentNode.replaceChild(event.getElement(), editEvent.getElement());
  };

  event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToEditing();
  });

  editEvent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEditingToEvent();
  });

  renderElement(parentNode, event.getElement(), `beforeend`);
};

for (let i = 0; i < filteredEvents.length; i++) {
  let event = filteredEvents[i];
  let dayElement = new DayComponent(event[0].timeInfo, i + 1).getElement(); // Создать элемент дня с информацией из первого элемента подмассива
  let container = dayElement.querySelector(`.trip-events__list`);

  renderElement(daysListElement, dayElement, `beforeend`);

  for (let eventInDay of event) {
    renderEvent(container, eventInDay, eventInDay.offers);
  }
}
