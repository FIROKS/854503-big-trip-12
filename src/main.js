import Days from './view/day';
import DaysList from './view/daysList';
// import EventEditing from './view/eventEditing';
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

const renderEventsByDay = () => {
  const daysListElement = document.querySelector(`.trip-days`);

  const filteredEvents = sortEvents(events);

  // const replaceEventToEditing = (parentNode, eventEditingElement, eventElement) => {
  //   parentNode.replaceChild(eventEditingElement, eventElement);
  // };

  // const replaceEditingToEvent = (parentNode, eventEditingElement, eventElement) => {
  //   parentNode.replaceChild(eventElement, eventEditingElement);
  // };

  for (let i = 0; i < filteredEvents.length; i++) {
    let event = filteredEvents[i];
    let dayElement = new Days(event[0].timeInfo, i + 1).getElement(); // Создать элемент дня с информацией из первого элемента подмассива
    let container = dayElement.querySelector(`.trip-events__list`);
    let eventElement;
    // let eventEditingElement;

    renderElement(daysListElement, dayElement, `beforeend`);

    for (let eventInDay of event) {
      let offers = new Offers(eventInDay.offers).getTemplate();

      eventElement = new Event(eventInDay, offers).getElement();
      renderElement(container, eventElement, `beforeend`);

      // eventEditingElement = new EventEditing(eventInDay, offers).getElement();
      // renderElement(container, eventEditingElement, `beforeend`);


      // eventElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      //   replaceEventToEditing(container, eventElement, eventEditingElement);
      // });

      // eventEditingElement.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      //   replaceEditingToEvent(container, eventElement, eventEditingElement);
      // });
    }
  }
};

renderEventsByDay();
