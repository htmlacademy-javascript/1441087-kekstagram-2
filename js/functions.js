/**
 * Проверяет строку на соответствие допустимой длине.
 * @param {string} string - Строка для проверки.
 * @param {number} length - Допустимая длина строки.
 * @returns {boolean} Прошла ли строка проверку.
 * @author FortySixAnd2
 */
function checkLength (string, length) {
  return string.length <= length;
}


/**
 * Проверяет является ли строка палиндромом.
 * @param {string} string - Строка для проверки.
 * @returns {boolean} Является ли строка палиндромом.
 * @author FortySixAnd2
 */
function checkPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let l = normalizedString.length - 1; l >= 0; l--) {
    reversedString += normalizedString[l];
  }

  return normalizedString === reversedString;
}


/**
 * Принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
 * и возвращает их в виде целого положительного числа.
 * Если в строке нет ни одной цифры — возвращает NaN.
 * @param {string} string - Строка для обработки.
 * @returns {number} Целое число, состоящее из цифр в строке.
 * @author FortySixAnd2
 */
function getYear (string) {
  let year = '';
  string = string.toString(); // Преобразуем входной атрибут в строку, чтобы функция обрабатывала и числа.

  for (let l = 0; l < string.length; l++) {
    const parseLetter = parseInt(string[l], 10);
    const isNumber = !Number.isNaN(parseLetter);
    year = (isNumber) ? year += parseLetter : year;
  }

  return(parseInt(year, 10));
}
