import Days from './view/day';
import DaysList from './view/daysList';
import EventEditing from './view/eventEditing';
import Filter from './view/filter';
import Menu from './view/menu'; // Нужно ли добавлять View к классам отображения?
import Price from './view/price';
import Sorting from './view/sorting';
import Trip from './view/trip';
import TripInfo from './view/tripInfo';
import {renderElement} from './utils/renderElement';
import {generateEvents} from './utils/mock';
import {sortEvents} from './utils/sort-events';
import Event from './view/event';
import Offers from './view/offers';


const events = generateEvents();

const infoContainerELement = document.querySelector(`.trip-main`);
const controlsContainerElement = document.querySelector(`.trip-controls`);
const eventsContainerElement = document.querySelector(`.trip-events`);

renderElement(infoContainerELement, new TripInfo().getElement());

const tripInfoContainerELement = document.querySelector(`.trip-main__trip-info`);

renderElement(tripInfoContainerELement, new Trip(events).getElement());
renderElement(tripInfoContainerELement, new Price(events).getElement(), `beforeend`);

renderElement(controlsContainerElement, new Menu().getElement());
renderElement(controlsContainerElement, new Filter().getElement(), `beforeend`);

renderElement(eventsContainerElement, new Sorting().getElement());

renderElement(eventsContainerElement, new DaysList().getElement(), `beforeend`);

const daysListElement = document.querySelector(`.trip-days`);

// const renderEventsByDay = () => {

const filteredEvents = sortEvents(events);

const renderEvent = (parentNode, eventInDay, offers) => {
  const offer = new Offers(offers).getTemplate();
  const event = new Event(eventInDay, offer);
  const editEvent = new EventEditing(eventInDay, new Offers(offers));

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
  let dayElement = new Days(event[0].timeInfo, i + 1).getElement(); // Создать элемент дня с информацией из первого элемента подмассива
  let container = dayElement.querySelector(`.trip-events__list`);

  renderElement(daysListElement, dayElement, `beforeend`);

  for (let eventInDay of event) {
    renderEvent(container, eventInDay, eventInDay.offers);
  }
}
