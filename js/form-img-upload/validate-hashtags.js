const HASHTAGS_MAX = 5;
const HASHTAG_SYMBOLS_MAX = 20;


let errorMessage = '';


const getErrorHashtags = () => errorMessage;


const validateHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа "#".',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять только из символа "#".',
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами.'
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэштеги не должны повторяться.'
    },
    {
      check: inputArray.some((item) => item.length > HASHTAG_SYMBOLS_MAX),
      error: `Максимальная длина одного хэштега ${HASHTAG_SYMBOLS_MAX} символов, включая символ "#".`
    },
    {
      check: inputArray.length > HASHTAGS_MAX,
      error: `Хэштегов должно быть не больше ${HASHTAGS_MAX}.`
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимый символ.'
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};


export { validateHashtags, getErrorHashtags };
