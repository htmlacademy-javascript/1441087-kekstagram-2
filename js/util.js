/**
 * Перемешивает элементы массива в случайном порядке.
 * @param {array} array Массив.
 * @returns
 */
const shuffleArray = (array) => {
  array.sort(() => 0.5 - Math.random());
  return array;
};


/**
 * Проверяет является ли нажатая в событии клавиша клавишей Escape.
 * @param {object} evt Событие.
 * @returns
 */
const isEscapeKey = (evt) => evt.key === 'Escape';


/**
 * Планирует запуск функции с указанной задержкой, отменяя предыдущий запуск.
 * @param {object} callback Функция для запуска.
 * @param {number} timeoutDelay Задержка перед запуском функции.
 * @returns Экземпляр функции с установленной задержкой запуска.
 */
const debounce = (callback, timeoutDelay = 500) => {
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
