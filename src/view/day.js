import Event from './event';
import Offers from './offers';
import {createElement} from '../utils/create-element';
import EventEditing from './eventEditing';

export default class Days {
  constructor(event, dayNumber) {
    this._element = null;
    this._event = event;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return this._createDayTemplate(this._event, this._dayNumber);
  }

  // getTemplate() {
  //   return this._createDaysTemplate(this._events);
  // };

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  _createDaysTemplate(events) {
    const filteredEvents = this._getOneDayEvent(events);
    let result = ``;
    let oneDayEventsTemplate;
    let date = {
      month: ``,
      monthNumber: ``,
      day: ``,
      year: ``,
    };
    let collection = [];

    for (let i = 0; i < filteredEvents.length; i++) {
      oneDayEventsTemplate = ``;
      for (let j = 0; j < filteredEvents[i].length; j++) {
        let offerList = new Offers(filteredEvents[i][j].offers).getTemplate();
        // debugger
        let eventTemplate = new Event(filteredEvents[i][j], offerList).getElement();
        let eventEditingTemplate = new EventEditing(filteredEvents[i][j], offerList).getElement();
        // oneDayEventsTemplate = `${oneDayEventsTemplate}${eventTemplate}`;
        // console.log(oneDayEventsTemplate);
        collection.push(eventTemplate);
        collection.push(eventEditingTemplate);
      }

      let dayjs = filteredEvents[i][0].timeInfo.startDatetime.dayjs;

      date = {
        month: NUMBER_TO_MONTH[dayjs.month()],
        monthNumber: dayjs.month(),
        day: dayjs.date(),
        year: dayjs.year(),
      };

      result += this._createDayTemplate(i + 1, date, oneDayEventsTemplate);
    }

    return `<div>${result}</div>`;
  }

  // Возвращает массив событий, отфильтрованный по дням
  // _getOneDayEvent(events) {
  //   let filteredEvents = [[]];
  //   let date = events[0].timeInfo.startDatetime.dayjs;
  //   let i = 0;

  //   for (let event of events) {
  //     if (event.timeInfo.startDatetime.dayjs.isAfter(date, `day`)) {
  //       date = event.timeInfo.startDatetime.dayjs;
  //       i++;
  //       filteredEvents.push([event]);
  //     } else {
  //       filteredEvents[i].push(event);
  //     }
  //   }

  //   return filteredEvents;
  // };

  _createDayTemplate(event, dayNumber) {

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayNumber}</span>
          <time class="day__date" datetime="${event.startDatetime.year}-${event.startDatetime.monthNumber}-${event.startDatetime.day}">${event.startDatetime.month} ${event.startDatetime.day}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>`
    );
  }
  // _createDayTemplate(dayNumber, date, eventTemplate) {
  //   return (
  //     `<li class="trip-days__item  day">
  //       <div class="day__info">
  //         <span class="day__counter">${dayNumber}</span>
  //         <time class="day__date" datetime="${date.year}-${date.monthNumber}-${date.day}">${date.month} ${date.day}</time>
  //       </div>
  //       <ul class="trip-events__list">
  //         ${eventTemplate}
  //       </ul>
  //     </li>`
  //   );
  // };

  removeElement() {
    this._element = null;
  }
}
