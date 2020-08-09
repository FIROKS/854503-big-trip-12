

const OPTIONAL = new Map([
  [`addLuggage`, 30],
  [`comfortClass`, 100],
  [`addMeal`, 15],
  [`chooseSeats`, 5],
  [`travelByTrain`, 40],
]);

const createOptionalTemplate = (optional) => {
  return `<li class="event__offer">
  <span class="event__offer-title">${optional[0]}</span>
  +
  €&nbsp;<span class="event__offer-price">${optional[1]}</span>
  </li>`;
};

export const createOptionalList = (optional) => {

  let listTemplate = ``;
  let counter = 0;
  for (let option of OPTIONAL) {
    if (optional.has(option[0]) && counter < 3) {
      listTemplate = `${listTemplate}${createOptionalTemplate(option)}`;
      counter++;
    }
  }

  return listTemplate;
};
