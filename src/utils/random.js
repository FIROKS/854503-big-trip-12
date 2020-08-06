import {getRandomInteger} from './get-random-integer';

const SAMPLE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const generateRandomText = () => {
  const text = SAMPLE_TEXT.split(`. `);
  let string = ``;
  let amount = getRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    string += `${text[getRandomInteger(0, text.length)]}. `;
  }

  return string;
};

const MINIMAL_AMOUNT = 1;
const RANDOM_NUMBER = 5;

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

const OPTIONAL = new Map([
  [`addLuggage`, 30],
  [`comfortClass`, 100],
  [`addMeal`, 15],
  [`chooseSeats`, 5],
  [`travelByTrain`, 40],
]);

const getRandomFrom = (entity) => entity[getRandomInteger(0, entity.length - 1)];

export const generateRandomType = () => {
  const eventType = getRandomFrom(EVENT_TYPE);
  let preposition;

  if (EVENT_TYPE_ARRIVAL.has(eventType)) {
    preposition = `at`;
  } else {
    preposition = `to`;
  }

  return {
    eventType,
    preposition,
  };
};

export const generateRandomDestination = () => getRandomFrom(DESTINATION);

export const generateRandomPhotos = () => {
  const photos = [];
  let amount = getRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
  }

  return photos;
};

export const generateRandomOptional = () => {
  let options = [];
  const amount = getRandomInteger(0, RANDOM_NUMBER);
  const of = Array.from(OPTIONAL);

  for (let i = 0; i < amount; i++) {
    options.push(of[i][0]);
  }

  return options;
};
