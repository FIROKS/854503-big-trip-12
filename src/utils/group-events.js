import * as dayjs from 'dayjs';
import dayOfYearPlugin from 'dayjs/plugin/dayOfYear';

dayjs.extend(dayOfYearPlugin);

export const groupEventsByDays = (events) => {
  const dayGroups = new Map();

  events.sort((firstEvent, secondEvent) => firstEvent.timeInfo.startDate.dayjs.dayOfYear() - secondEvent.timeInfo.startDate.dayjs.dayOfYear());

  for (let event of events) {
    const dayOfYear = event.timeInfo.startDate.dayjs.dayOfYear();
    const dayGroup = dayGroups.get(dayOfYear);

    dayGroups.set(dayOfYear, dayGroup ? [...dayGroup, event] : [event]);
  }

  return Array.from(dayGroups.values());
};
