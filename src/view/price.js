const getPrice = (events) => {
  const initialValue = 0;
  return events.reduce((total, current) => total + current.price, initialValue);
};

export const createPriceTemplate = (events) => {
  return (
    `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${getPrice(events)}</span>
    </p>`
  );
};
