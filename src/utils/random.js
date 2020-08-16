import * as dayjs from 'dayjs';

const SAMPLE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const MINIMAL_AMOUNT = 1;
const RANDOM_NUMBER = 5;
const MIN_EVENT_PRICE = 20;
const MAX_EVENT_PRICE = 500;
const MAX_MINUTE = 60;
const MAX_HOUR = 24;
const MAX_DAY = 31;

const DESTINATION = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
];

const EVENT_TYPE = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const EVENT_TYPE_ARRIVAL = new Set([
  `check-in`,
  `sightseeing`,
  `restaurant`,
]);

const OFFERS = new Map([
  [`addLuggage`, 30],
  [`comfortClass`, 100],
  [`addMeal`, 15],
  [`chooseSeats`, 5],
  [`travelByTrain`, 40],
]);

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

const generateRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomItem = (items) => items[generateRandomInteger(0, items.length - 1)];

const addRandomTimeDimension = (dimension, maxValue) => {
  return dayjs().add(generateRandomInteger(0, maxValue), dimension);
};

const generateRandomDate = () => {
  const randomPeriod = generateRandomInteger(0, 2);

  if (randomPeriod === 0) {
    return addRandomTimeDimension(`hour`, MAX_HOUR);
  }
  if (randomPeriod === 1) {
    return addRandomTimeDimension(`minute`, MAX_MINUTE);
  }

  return addRandomTimeDimension(`day`, MAX_DAY);
};

const generateTimeDuration = (timeStart, timeEnd) => {
  const hourStart = timeStart.hour();
  const minuteStart = timeStart.minute();
  const hourEnd = timeEnd.hour();
  const minuteEnd = timeEnd.minute();

  let duration = ``;

  if ((hourEnd - hourStart) > 0) {
    duration = `${duration + (hourEnd - hourStart)}H`;

    if ((minuteEnd - minuteStart) > 0) {
      duration = `${duration} ${(minuteEnd - minuteStart)}M`;
    }
  } else {
    duration = `${duration + (minuteEnd - minuteStart)}M`;
  }

  return duration;
};

const formatingDate = (date) => {
  return date.toString().length < 2 ? `0${date}` : date;
};

const generateRandomText = () => {
  const text = SAMPLE_TEXT.split(`. `);

  let string = ``;
  let amount = generateRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    string += `${text[generateRandomInteger(0, text.length)]}. `;
  }

  return string;
};

const generateRandomPhotos = () => {
  const photos = [];
  let amount = generateRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
  }

  return photos;
};

export const generateTimeInfo = () => {
  const start = generateRandomDate();
  const end = generateRandomDate();
  const duration = generateTimeDuration(start, end);

  return {
    start: `${start.hour()}:${start.minute()}`,
    startDatetime: {
      year: formatingDate(start.get(`year`)),
      monthNumber: formatingDate(start.get(`month`)),
      month: NUMBER_TO_MONTH[parseInt(formatingDate(start.get(`month`)), 10)],
      day: formatingDate(start.get(`date`)),
      hour: formatingDate(start.get(`hour`)),
      minute: formatingDate(start.get(`minute`)),
      dayjs: start,
    },
    end: `${end.hour()}:${end.minute()}`,
    endDatetime: {
      year: formatingDate(end.get(`year`)),
      monthNumber: formatingDate(end.get(`month`)),
      month: NUMBER_TO_MONTH[parseInt(formatingDate(start.get(`month`)), 10)],
      day: formatingDate(end.get(`date`)),
      hour: formatingDate(end.get(`hour`)),
      minute: formatingDate(end.get(`minute`)),
      dayjs: end,
    },
    duration,
  };
};

export const generateRandomType = () => {
  const eventType = getRandomItem(EVENT_TYPE);
  let preposition = (EVENT_TYPE_ARRIVAL.has(eventType)) ? `at` : `to`;

  return {
    eventType,
    preposition,
  };
};

export const generateRandomDestination = () => getRandomItem(DESTINATION);

export const generateRandomDestinationInfo = () => {
  return {
    description: generateRandomText(),
    photos: generateRandomPhotos(),
  };
};

export const generateRandomOffers = () => {
  let options = [];
  const amount = generateRandomInteger(0, RANDOM_NUMBER);
  const of = Array.from(OFFERS);

  for (let i = 0; i < amount; i++) {
    options.push(of[i][0]);
  }

  return new Set(options);
};

export const generateEventInitialPrice = () => generateRandomInteger(MIN_EVENT_PRICE, MAX_EVENT_PRICE);
