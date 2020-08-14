export const createElement = (template) => {
  const newElement = document.createElement(`div`); // ?? Зачем? Почему template не интерпретируется как domstring изначально?

  newElement.innerHTML = template;

  return newElement.firstChild;
};
