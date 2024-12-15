const DEFAULT_DEBOUNCE_DELAY = 500;


const shuffleArray = (array) => {
  array.sort(() => 0.5 - Math.random());
  return array;
};


const isEscapeKey = (evt) => evt.key === 'Escape';


const debounce = (callback, timeoutDelay = DEFAULT_DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  shuffleArray,
  isEscapeKey,
  debounce
};
