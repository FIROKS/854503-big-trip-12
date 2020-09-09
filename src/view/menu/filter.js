import Element from '../element';

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

export default class MenuFilterComponent extends Element {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return this._cteateFilterTemplate();
  }

  _createFilterTypeTemplate(filterInfo) {
    return (
      `<div class="trip-filters__filter">
        <input id="filter-${filterInfo.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterInfo.title}" checked="">
        <label class="trip-filters__filter-label" for="filter-${filterInfo.title}">${filterInfo.title}</label>
      </div>`
    );
  }

  _cteateFilterTemplate() {
    return (
      `<form class="trip-filters" action="#" method="get">

      ${FILTER_LIST
        .map((filterInfo) => this._createFilterTypeTemplate(filterInfo))
        .join(``)}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }
}
