/*
Проверки после каждой функции оставлены для того,
чтобы не было ошибок о "неиспользовании" функций
и можно было сделать Pull Request.
*/

/**
 * Проверяет строку на соответствие допустимой длине.
 * @param {string} string - Строка для проверки.
 * @param {number} length - Допустимая длина строки.
 * @returns {boolean} Прошла ли строка проверку.
 * @author FortySixAnd2
 */
function checkLength (string = '', length = 1) {
  return string.length <= length;
}


/*
console.log(checkLength()); // true
console.log(checkLength('проверяемая строка', 20)); // true
console.log(checkLength('проверяемая строка', 18)); // true
console.log(checkLength('проверяемая строка', 10)); // false
*/


/**
 * Проверяет является ли строка палиндромом.
 * @param {string} string - Строка для проверки.
 * @returns {boolean} Является ли строка палиндромом.
 * @author FortySixAnd2
 */
function checkPalindrome (string = '') {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let l = normalizedString.length - 1; l >= 0; l--) {
    reversedString += normalizedString[l];
  }

  return normalizedString === reversedString;
}

/*
console.log(checkPalindrome()); // true
console.log(checkPalindrome('топот')); // true
console.log(checkPalindrome('ДовОд')); // true
console.log(checkPalindrome('Кекс')); // false
console.log(checkPalindrome('Лёша на полке клопа нашёл ')); // true
*/

/**
 * Принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
 * и возвращает их в виде целого положительного числа.
 * Если в строке нет ни одной цифры — возвращает NaN.
 * @param {string} string - Строка для обработки.
 * @returns {number} Целое число, состоящее из цифр в строке.
 * @author FortySixAnd2
 */
function getYear (string = '') {
  let year = '';
  string = string.toString(); // Преобразуем входной атрибут в строку, чтобы функция обрабатывала и числа.

  for (let l = 0; l < string.length; l++) {
    const parseLetter = parseInt(string[l], 10);
    const isNumber = !Number.isNaN(parseLetter);
    year = (isNumber) ? year += parseLetter : year;
  }

  return (parseInt(year, 10));
}


/*
console.log(getYear()); // NaN
console.log(getYear('2023 год')); // 2023
console.log(getYear('ECMAScript 2022')); // 2022
console.log(getYear('1 кефир, 0.5 батона')); // 105
console.log(getYear('агент 007')); // 7
console.log(getYear('а я томат')); // NaN
console.log(getYear(2023)); // 2023
console.log(getYear(-1)); // 1
console.log(getYear(1.5)); // 15
*/
