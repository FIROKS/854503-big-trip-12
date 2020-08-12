const getPrice = (events) => {
  let price = 0;

  for (let event of events) {
    price += event.price;
  }

  return price;
};

export const createPriceTemplate = (events) => {
  return (
    `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${getPrice(events)}</span>
    </p>`
  );
};
