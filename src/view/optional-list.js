const MAX_SERVICES_NUMBER = 3;

const SERVICE_PRICES = new Map([
  [`addLuggage`, 30],
  [`comfortClass`, 100],
  [`addMeal`, 15],
  [`chooseSeats`, 5],
  [`travelByTrain`, 40],
]);

const createOptionalTemplate = (title, price) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +
      €&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

export const createOptionalListTemplate = (services) => {
  return Array.from(services)
    .slice(0, MAX_SERVICES_NUMBER)
    .map((service) => createOptionalTemplate(service, SERVICE_PRICES.get(service)))
    .join(``);
};
