const FILTER_LIST = [
  {
    id: `everything`,
    title: `Everything`,
  },
  {
    id: `future`,
    title: `Future`,
  },
  {
    id: `past`,
    title: `Past`,
  },
];

const createFilterTypeTemplate = (filterInfo) => {
  return (
    `<div class="trip-filters__filter">
    <input id="filter-${filterInfo.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterInfo.title}" checked="">
    <label class="trip-filters__filter-label" for="filter-${filterInfo.title}">${filterInfo.title}</label>
  </div>`
  );
};

export const cteateFilterTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">

    ${FILTER_LIST
      .map((filterInfo) => createFilterTypeTemplate(filterInfo))
      .join(``)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
