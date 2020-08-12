import {createDaysListTemplate} from './daysList.js';
import {createEventTemplate} from './event.js';
import {createOptionalList} from './optional-list.js';
import {renderElement} from '../utils/renderElement.js';

const NUMBER_TO_MONTH = {
  0: `JAN`,
  1: `FEB`,
  2: `MAR`,
  3: `APR`,
  4: `MAY`,
  5: `JUN`,
  6: `JUL`,
  7: `AUG`,
  8: `SEP`,
  9: `OCT`,
  10: `NOV`,
  11: `DEC`,
};

const filterEvents = (events) => {

  return events.sort((a, b) => {
    if (a.timeInfo.startDatetime.dayjs.isBefore(b.timeInfo.startDatetime.dayjs)) {
      return -1;
    }

    if (a.timeInfo.startDatetime.dayjs.isAfter(b.timeInfo.startDatetime.dayjs)) {
      return 1;
    }
  });
};

const getOneDayEvent = (filteredEvents) => {
  let events = [];
  events[0] = [];
  let date = filteredEvents[0].timeInfo.startDatetime.dayjs;
  let i = 0;
  for (let event of filteredEvents) {
    if (event.timeInfo.startDatetime.dayjs.isAfter(date, `day`)) {
      date = event.timeInfo.startDatetime.dayjs;
      i++;
      events.push([event]);
    } else {
      events[i].push(event);
    }
  }
  return events;
};

const createDayTemplate = (dayNumber, month, day, eventTemplate) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="2019-03-18">${month} ${day}</time>
      </div>
      <ul class="trip-events__list">
        ${eventTemplate}
      </ul>
    </li>`
  );
};

const eventsContainerElement = document.querySelector(`.trip-events`);

renderElement(eventsContainerElement, createDaysListTemplate(), `beforeend`);
const daysListElement = document.querySelector(`.trip-days`);

const createDaysTemplate = (filteredEvents) => {
  const days = getOneDayEvent(filteredEvents);

  let dayTemplate;
  let oneDayEventsTemplate;
  let month;
  let day;
  for (let i = 0; i < days.length; i++) {
    oneDayEventsTemplate = ``;
    for (let j = 0; j < days[i].length; j++) {
      oneDayEventsTemplate = `${oneDayEventsTemplate}${createEventTemplate(days[i][j], createOptionalList(days[i][j].optional))}`;
    }
    month = NUMBER_TO_MONTH[days[i][0].timeInfo.startDatetime.dayjs.month()];
    day = days[i][0].timeInfo.startDatetime.dayjs.date();

    dayTemplate = createDayTemplate(i + 1, month, day, oneDayEventsTemplate);

    renderElement(daysListElement, dayTemplate, `beforeend`);
  }
};

export const generateDay = (events) => {
  const filteredEvents = filterEvents(events);

  createDaysTemplate(filteredEvents);
};
