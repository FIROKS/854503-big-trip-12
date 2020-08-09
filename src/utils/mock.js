import * as random from './random.js';
// import * as dayjs from 'dayjs';

export const generateEvent = () => {
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
