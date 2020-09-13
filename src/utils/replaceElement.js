import AbstractElement from '../view/abstract-element';

export const replaceElement = (newChild, oldChild) => {
  if (newChild instanceof AbstractElement) {
    newChild = newChild.getElement();
  }

  if (oldChild instanceof AbstractElement) {
    oldChild = oldChild.getElement();
  }

  const parentElement = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parentElement.replaceChild(newChild, oldChild);
};
