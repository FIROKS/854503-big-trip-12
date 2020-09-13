import AbstractElement from '../view/abstract-element';

const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place = renderPosition.AFTERBEGIN) => {
  if (container instanceof AbstractElement) {
    container = container.getElement();
  }

  if (element instanceof AbstractElement) {
    element = element.getElement();
  }

  if (place === renderPosition.AFTERBEGIN) {
    container.prepend(element);
  }
  if (place === renderPosition.BEFOREEND) {
    container.append(element);
  }
};
