
import {replaceElement} from '../utils/replaceElement';
import {renderElement} from '../utils/renderElement';
import {remove} from '../utils/remove';

import EventViewComponent from '../view/event/view';
import EventEditComponent from '../view/event/edit';
import EventOfferComponent from '../view/event/offer';

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class eventPresenter {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._mode = Mode.DEFAULT;

    this._eventViewComponent = null;
    this._eventEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  init(eventData) {
    this._eventData = eventData;

    const offers = this._eventData.offers;
    const offerComponent = new EventOfferComponent(offers);

    const prevViewComponent = this._eventViewComponent;
    const prevEditComponent = this._eventEditComponent;

    this._eventViewComponent = new EventViewComponent(this._eventData, offerComponent.getOffers());
    this._eventEditComponent = new EventEditComponent(this._eventData, offerComponent.getOffers());

    if (prevViewComponent === null || prevEditComponent === null) {
      this._setHandlers();
      this._renderEvent();

      return;
    }

    this._setHandlers();

    if (this._mode === Mode.DEFAULT) {
      replaceElement(this._eventViewComponent, prevViewComponent);
    }

    if (this._mode === Mode.EDITING) {
      replaceElement(this._eventEditComponent, prevEditComponent);
    }

    remove(prevViewComponent);
    remove(prevEditComponent);
  }

  destroy() {
    remove(this._eventViewComponent);
    remove(this._eventEditComponent);
  }

  _renderEvent() {
    renderElement(this._container, this._eventViewComponent, `beforeend`);
  }

  _setHandlers() {
    this._eventViewComponent.setEditClickHandler(() => {
      this._replaceEventToEditing();
    });

    this._eventEditComponent.setViewClickHandler(() => {
      this._replaceEditingToEvent();
    });

    this._eventEditComponent.setSubmitHandler(() => {
      this._replaceEditingToEvent();
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      this._favoriteClickHandler();
    });
  }

  _favoriteClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._eventData,
            {
              isFavorite: !this._eventData.isFavorite,
            }
        )
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._eventData);
      this._replaceEditingToEvent();
    }
  }

  _replaceEventToEditing() {
    replaceElement(this._eventEditComponent, this._eventViewComponent);
    this._mode = Mode.EDITING;

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceEditingToEvent() {
    replaceElement(this._eventViewComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

}
