import Element from '../view/element';

const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place = renderPosition.AFTERBEGIN) => {
  if (container instanceof Element) {
    container = container.getElement();
  }

  if (element instanceof Element) {
    element = element.getElement();
  }

  if (place === renderPosition.AFTERBEGIN) {
    container.prepend(element);
  }
  if (place === renderPosition.BEFOREEND) {
    container.append(element);
  }
};
