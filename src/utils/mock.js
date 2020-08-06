import * as random from './random.js';

export const generateEvent = () => {
  return {
    typeInfo: random.generateRandomType(),
    destination: random.generateRandomDestination(),
    optional: random.generateRandomOptional(),
    destinationInfo: {
      description: random.generateRandomText(),
      photos: random.generateRandomPhotos(),
    },
    // timeInfo: {
    //   timeStart,
    //   timeEnd,
    //   duration,
    // }
  };
};
