export const getFormatedDate = ({startDate, endDate, duration}) => {
  return {
    startDate: getDate(startDate),
    endDate: getDate(endDate),
    duration,
  };
};

const getDate = (date) => {
  return {
    dayjs: date,
    day: date.format(`DD`),
    month: date.format(`MMM`),
    year: date.format(`YYYY`),
    monthNumber: date.format(`MM`),
    hour: date.format(`HH`),
    minute: date.format(`mm`),
  };
};
