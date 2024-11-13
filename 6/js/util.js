/**
 * Возвращает случайное целое число из заданного диапазона.
 * @param {number} min - минимальное значение.
 * @param {number} max - максимальное значение.
 * @returns {number} случайное число из диапазона.
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};


/**
 * Возвращает случайный элемент из списка.
 * @param {array} elements - список элементов.
 * @returns случайный элемент из списка.
 */
const getRandomArreyElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


/**
 * Создаёт генератор ID по порядку от 1 до заданного значения.
 * Когда значения в диапазоне закончатся — будет возвращаться null.
 * @param {number} max - максимальное значение.
 * @returns {number} очередной ID по порядку.
 */
const createIdGenerator = (max) => {
  let currentValue = 0;

  return function () {
    if (currentValue >= max) {
      return null;
    }
    currentValue += 1;
    return currentValue;
  };
};


/**
 * Создаёт генератор случайных ID. Генератор принимает диапазон значений,
 * из которого он будет выбирать значения случайным образом. Когда значения в диапазоне
 * закончатся — будет возвращаться null.
 * @param {number} min - минимальное значение.
 * @param {number} max - максимальное значение.
 * @returns {number} уникальный ID из диапазона.
 */
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};


export {
  getRandomInteger,
  getRandomArreyElement,
  createIdGenerator,
  createRandomIdFromRangeGenerator
};
