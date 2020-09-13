
import {replaceElement} from '../utils/replaceElement';
import {renderElement} from '../utils/renderElement';

import EventViewComponent from '../view/event/view';
import EventEditComponent from '../view/event/edit';
import EventOfferComponent from '../view/event/offer';

export default class TripEvent {
  constructor(container, eventData) {

    this._container = container;
    this._eventData = eventData;
  }

  init() {
    const offers = this._eventData.offers;
    const offerComponent = new EventOfferComponent(offers);
    const offerTemplate = offerComponent.getTemplate();

    this._eventViewComponent = new EventViewComponent(this._eventData, offerTemplate);
    this._eventEditComponent = new EventEditComponent(this._eventData, offerComponent);

    this._setHandlers();
    this._renderEvent();
  }

  _renderEvent() {
    renderElement(this._container, this._eventViewComponent, `beforeend`);
  }

  _setHandlers() {
    this._eventViewComponent.setViewClickHandler(() => {
      this._replaceEventToEditing();
    });

    this._eventEditComponent.setEditClickHandlet(() => {
      this._replaceEditingToEvent();
    });
  }

  _replaceEventToEditing() {
    replaceElement(this._eventEditComponent, this._eventViewComponent);
  }

  _replaceEditingToEvent() {
    replaceElement(this._eventViewComponent, this._eventEditComponent);
  }
}
