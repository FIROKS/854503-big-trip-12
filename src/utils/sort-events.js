export const sortEvents = (events) => events.sort((a, b) => {
  if (a.timeInfo.startDatetime.dayjs.isBefore(b.timeInfo.startDatetime.dayjs)) {
    return -1;
  }

  if (a.timeInfo.startDatetime.dayjs.isAfter(b.timeInfo.startDatetime.dayjs)) {
    return 1;
  }

  return 0;
});
