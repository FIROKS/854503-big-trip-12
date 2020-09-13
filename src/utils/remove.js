import abstractElement from '../view/abstract-element';

// @param component
export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof abstractElement)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
