import * as random from './random.js';

const EVENTS_AMOUNT = 20;

const generateEvent = () => {
  return {
    typeInfo: random.generateRandomType(),
    destination: random.generateRandomDestination(),
    optional: random.generateRandomOptional(),
    destinationInfo: {
      description: random.generateRandomText(),
      photos: random.generateRandomPhotos(),
    },
    timeInfo: random.generateTimeInfo(),
    price: random.generateEventInitialPrice(),
  };
};

export const generateEvents = () => {
  let events = [];
  for (let i = 0; i < EVENTS_AMOUNT; i++) {
    events.push(generateEvent());
  }

  return events;
};
