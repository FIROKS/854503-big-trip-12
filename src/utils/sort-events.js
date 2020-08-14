// Возвращает массив событий, отфильтрованный по дням
export const sortEvents = (events) => {
  let sortedEvents = [[]];
  let date = events[0].timeInfo.startDatetime.dayjs;
  let i = 0;

  for (let event of events) {
    if (event.timeInfo.startDatetime.dayjs.isAfter(date, `day`)) {
      date = event.timeInfo.startDatetime.dayjs;
      i++;
      sortedEvents.push([event]);
    } else {
      sortedEvents[i].push(event);
    }
  }

  return sortedEvents;
};
