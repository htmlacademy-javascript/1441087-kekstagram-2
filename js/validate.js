/**
 * Проверяет один хэштег.
 * @param {string} hashtag
 * @returns
 */
const validateOneHashtag = (hashtag) => {
  const regexpHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  return regexpHashtag.test(hashtag);
};


/**
 * Проверяет строку с хэштегами.
 * @param {string} stringHashtags Строка с хэштегами.
 * @returns
 */
const validateHashtags = (stringHashtags) => {
  const hashtags = stringHashtags.toLowerCase().split(' ');
  let result = false;
  let message = '';

  if (!stringHashtags) {
    return {
      result: true,
      message: 'Хэштеги пусты.'
    };
  } else if ((new Set(hashtags)).size !== hashtags.length) {
    return {
      result: false,
      message: 'Хэштеги не должны повторяться.'
    };
  } else if ((new Set(hashtags)).size > 5) {
    return {
      result: false,
      message: 'Хэштегов должно быть не больше 5.'
    };
  }

  result = hashtags.every(validateOneHashtag);
  message = (result) ? 'Все хэштеги допустимы' : 'Есть недопустимые хэштеги';

  return {
    result,
    message
  };
};


export {
  validateOneHashtag,
  validateHashtags
};
