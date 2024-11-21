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
// const validateHashtags = (stringHashtags) => {
//   const hashtags = stringHashtags.toLowerCase().split(' ');
//   let result = false;
//   let message = '';

//   if (!stringHashtags) {
//     return {
//       result: true,
//       message: 'Хэштеги пусты.'
//     };
//   } else if ((new Set(hashtags)).size !== hashtags.length) {
//     return {
//       result: false,
//       message: 'Хэштеги не должны повторяться.'
//     };
//   } else if ((new Set(hashtags)).size > 5) {
//     return {
//       result: false,
//       message: 'Хэштегов должно быть не больше 5.'
//     };
//   }

//   result = hashtags.every(validateOneHashtag);
//   message = (result) ? 'Все хэштеги допустимы' : 'Есть недопустимые хэштеги';

//   return {
//     result,
//     message
//   };
// };


/**
 * Проверяет строку с хэштегами.
 * @param {string} stringHashtags Строка с хэштегами.
 * @returns
 */
// const validateHashtagsNew = (stringHashtags) => {
//   const hashtags = stringHashtags.toLowerCase().split(' ');

//   if (!stringHashtags) {
//     return true;
//   } else if ((new Set(hashtags)).size !== hashtags.length) {
//     return false;
//   } else if ((new Set(hashtags)).size > 5) {
//     return false;
//   }

//   return hashtags.every(validateOneHashtag);
// };

/**
 * Проверяет количество хэштегов.
 * @param {string} stringHashtags
 * @returns
 */
const validateHashtagsCount = (stringHashtags) => {
  if (!stringHashtags) {
    return true;
  }
  const hashtags = stringHashtags.toLowerCase().split(' ');
  return (new Set(hashtags)).size <= 5;
};

/**
 * Проверяет уникальность хэштегов.
 * @param {string} stringHashtags
 * @returns
 */
const validateHashtagsUnique = (stringHashtags) => {
  if (!stringHashtags) {
    return true;
  }
  const hashtags = stringHashtags.toLowerCase().split(' ');
  return (new Set(hashtags)).size === hashtags.length;
};

/**
 * Проверяет каждый хэштеги на соответствие маске.
 * @param {string} stringHashtags
 * @returns
 */
const validateHashtagsRegexp = (stringHashtags) => {
  if (!stringHashtags) {
    return true;
  }
  const hashtags = stringHashtags.toLowerCase().split(' ');
  return hashtags.every(validateOneHashtag);
};


export {
  validateHashtagsCount,
  validateHashtagsUnique,
  validateHashtagsRegexp
};
