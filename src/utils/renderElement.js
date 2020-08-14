const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place = renderPosition.AFTERBEGIN) => {
  // Другой способ вставки, принимающий обычную строку?
  if (place === renderPosition.AFTERBEGIN) {
    container.prepend(element);
  }
  if (place === renderPosition.BEFOREEND) {
    container.append(element);
  }
};
