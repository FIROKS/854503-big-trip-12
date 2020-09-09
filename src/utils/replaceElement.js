import Element from '../view/element';

export const replaceElement = (newChild, oldChild) => {
  if (newChild instanceof Element) {
    newChild = newChild.getElement();
  }

  if (oldChild instanceof Element) {
    oldChild = oldChild.getElement();
  }

  const parentElement = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parentElement.replaceChild(newChild, oldChild);
};
