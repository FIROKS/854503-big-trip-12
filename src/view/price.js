export const createPriceTemplate = (price) => {
  return (
    `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};
