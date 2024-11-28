const DESCRIPTION_SYMBOLS_MAX = 140;

let errorMessage = '';


/**
 * Возвращает сообщение об ошибке при валидации описания.
 * @returns Сообщение об ошибке.
 */
const errorDescription = () => errorMessage;


/**
 * Проверяет описание на соответствие правилам.
 * @param {string} value Строка с описанием.
 * @returns {boolean} Прошла ли строка валидацию.
 */
const validateDescription = (value) => {
  errorMessage = '';

  const inputText = value;

  if (!inputText) {
    return true;
  }

  const rules = [
    {
      check: inputText.length > DESCRIPTION_SYMBOLS_MAX,
      error: `Максимальная длина описания ${DESCRIPTION_SYMBOLS_MAX} символов.`
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

export { validateDescription, errorDescription };
