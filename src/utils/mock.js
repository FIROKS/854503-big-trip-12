import * as random from './random.js';

const EVENTS_AMOUNT = 20;

// export default class EventMock {
//   constructor() {
//     this._typeInfo = random.generateRandomType();
//     this._destination = random.generateRandomDestination();
//     this._optional = random.generateRandomOptional();
//     this._destinationInfo = random.generateRandomDestinationInfo();
//     this._timeInfo = random.generateTimeInfo();
//     this._price = random.generateEventInitialPrice();
//   };

//   get 
// }

const generateEvent = () => {
  return {
    typeInfo: random.generateRandomType(),
    destination: random.generateRandomDestination(),
    offers: random.generateRandomOffers(),
    destinationInfo: random.generateRandomDestinationInfo(),
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
