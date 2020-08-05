import {getRandomInteger} from '../utils/get-random-integer.js';

const getRandomText = () => {
  const text = SAMPLE_TEXT.split(`. `);
  let string = ``;
  let amount = getRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    string += `${text[getRandomInteger(0, text.length)]}. `;
  }

  return string;
};

const SAMPLE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`

const OPTIONAL = new Map([
  [`addLuggage`, 30],
  [`comfortClass`, 100],
  [`addMeal`, 15],
  [`chooseSeats`, 5],
  [`travelByTrain`, 40],
]);

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

const getRandomType = () => EVENT_TYPE[getRandomInteger(0, EVENT_TYPE.length - 1)];

const getRandomDestination = () => DESTINATION[getRandomInteger(0, DESTINATION.length - 1)];


const getRandomPhotos = () => {
  const photos = [];
  let amount = getRandomInteger(MINIMAL_AMOUNT, RANDOM_NUMBER);

  for (let i = 0; i < amount; i++) {
    photos.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`);
  }

  return photos;
};

const getRandomOptional = () => {
  let options = [];
  const amount = getRandomInteger(0, RANDOM_NUMBER);
  const of = Array.from(OPTIONAL);

  for (let i = 0; i < amount; i++) {
    options.push(of[i][0]);
  }

  return options;
};

export const generateEvent = () => {
  return {
    type: getRandomType(),
    destination: getRandomDestination(),
    optional: getRandomOptional(),
    destinationInfo: {
      description: getRandomText(),
      photos: getRandomPhotos(),
    },
    // timeInfo: {
    //   timeStart,
    //   timeEnd,
    //   duration,
    // }
  };
};

export const createEventTemplate = (event) => {
  return (
    `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event.type} to ${event.destination}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
          —
          <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
        </p>
        <p class="event__duration">30M</p>
      </div>

      <p class="event__price">
        €&nbsp;<span class="event__price-value">20</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          +
          €&nbsp;<span class="event__offer-price">20</span>
        </li>
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`
  );
};
