import {createEventTemplate} from './event.js';
import {createOptionalListTemplate} from './optional-list.js';

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


const getOneDayEvent = (filteredEvents) => {
  let events = [[]];
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

export const createDaysTemplate = (filteredEvents) => {
  const days = getOneDayEvent(filteredEvents);
  let result = ``;

  let oneDayEventsTemplate;
  let month;
  let day;

  for (let i = 0; i < days.length; i++) {
    oneDayEventsTemplate = ``;
    for (let j = 0; j < days[i].length; j++) {
      let optionalList = createOptionalListTemplate(days[i][j].optional);
      let eventTemplate = createEventTemplate(days[i][j], optionalList);

      oneDayEventsTemplate = `${oneDayEventsTemplate}${eventTemplate}`;
    }
    let dayjs = days[i][0].timeInfo.startDatetime.dayjs;

    month = NUMBER_TO_MONTH[dayjs.month()];
    day = days[dayjs.date()];

    result += createDayTemplate(i + 1, month, day, oneDayEventsTemplate);
  }

  return result;
};
