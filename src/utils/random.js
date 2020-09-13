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

const OFFERS = new Map([
  [`addLuggage`, 30],
  [`comfortClass`, 100],
  [`addMeal`, 15],
  [`chooseSeats`, 5],
  [`travelByTrain`, 40],
]);

const generateRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const addRandomTimeDimension = (date, dimension, maxValue) => {
  return date.add(generateRandomInteger(0, maxValue), dimension);
};

export const getRandomItem = (items) => items[generateRandomInteger(0, items.length - 1)];

export const generateRandomDate = (initialDate) => {
  const fromDate = initialDate || dayjs();
  const randomPeriod = generateRandomInteger(0, 2);

  if (randomPeriod === 0) {
    return addRandomTimeDimension(fromDate, `hour`, MAX_HOUR);
  }
  if (randomPeriod === 1) {
    return addRandomTimeDimension(fromDate, `minute`, MAX_MINUTE);
  }

  return addRandomTimeDimension(fromDate, `day`, MAX_DAY);
};

export const generateTimeDuration = (timeStart, timeEnd) => {
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

export const generateRandomText = () => {
  const text = SAMPLE_TEXT.split(`. `);

  let string = ``;
  let amount = generateRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    string += `${text[generateRandomInteger(0, text.length)]}. `;
  }

  return string;
};

export const generateRandomPhotos = () => {
  const photos = [];
  let amount = generateRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
  }

  return photos;
};

export const generateRandomDestination = () => getRandomItem(DESTINATION);

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

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
