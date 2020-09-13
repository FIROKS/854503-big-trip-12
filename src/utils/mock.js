import * as random from './random.js';
import {getFormatedDate} from './get-formated-date';

const EVENTS_AMOUNT = 20;

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

const generateTimeInfo = () => {
  const startDate = random.generateRandomDate();
  const endDate = random.generateRandomDate(startDate);
  const duration = random.generateTimeDuration(startDate, endDate);

  return {startDate, endDate, duration};
};

const generateRandomType = () => {
  const eventType = random.getRandomItem(EVENT_TYPE);
  let preposition = (EVENT_TYPE_ARRIVAL.has(eventType)) ? `at` : `to`;

  return {
    eventType,
    preposition,
  };
};

const generateRandomDestinationInfo = () => {
  return {
    description: random.generateRandomText(),
    photos: random.generateRandomPhotos(),
  };
};

const generateEvent = () => {
  return {
    id: random.generateId(),
    typeInfo: generateRandomType(),
    destination: random.generateRandomDestination(),
    offers: random.generateRandomOffers(),
    destinationInfo: generateRandomDestinationInfo(),
    timeInfo: getFormatedDate(generateTimeInfo()),
    price: random.generateEventInitialPrice(),
    isFavorite: false,
  };
};

export const generateEvents = () => {
  let events = [];
  for (let i = 0; i < EVENTS_AMOUNT; i++) {
    events.push(generateEvent());
  }

  return events;
};
