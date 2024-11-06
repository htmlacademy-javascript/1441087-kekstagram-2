const NAMES = [
  'Анна',
  'Михаил',
  'Екатерина',
  'Дмитрий',
  'Ольга',
  'Иван',
  'Светлана',
  'Алексей',
  'Наталья',
  'Кирилл',
  'Мария',
  'Сергей',
  'Татьяна',
  'Андрей',
  'Юлия',
  'Владимир',
  'Алина',
  'Павел',
  'Елена',
  'Николай'
];

const PHOTO_DESCRIPTIONS = [
  'Уютное кафе на берегу с видом на закатное море и людьми, наслаждающимися напитками.',
  'Счастливая семья с двумя детьми в осеннем парке, окруженном разноцветной листвой.',
  'Горы под снежным покровом в ясный зимний день, с ледяной рекой внизу.',
  'Портрет улыбающегося щенка на зеленой траве, с забавными ушами.',
  'Узкая средневековая улочка с домами, украшенными цветами в горшках на окнах.',
  'Вечерний городской пейзаж с огнями, отражающимися в воде, и современными зданиями.',
  'Пара на лодке на спокойном озере среди высоких сосен и голубого неба.',
  'Детская площадка в парке с детьми, катающимися на качелях и горках.',
  'Десерт с красными ягодами и мятой на фоне деревянного стола.',
  'Маленькая старинная церковь на холме, окруженная густым туманом.',
  'Большая группа друзей, смеющихся и обедающих за длинным столом на открытой террасе.',
  'Пышный тропический лес с густыми деревьями и солнечными лучами, пробивающимися через листву.',
  'Торжественное здание университета в неоклассическом стиле с колоннами и статуями.',
  'Рыбак на берегу моря на фоне заката, готовящий свои сети.',
  'Песчаный пляж с белым песком и чистыми голубыми волнами.',
  'Пожилая пара держится за руки на фоне заснеженного зимнего пейзажа.',
  'Озеро в окружении гор, отражающих в воде яркие осенние деревья.',
  'Маленький городок с красными крышами домов, окруженный зелеными холмами.',
  'Закуски и напитки на столе на фоне летнего пикника.',
  'Современная кухня в минималистичном стиле с белыми шкафами и деревянным столом.',
  'Цветочная клумба с яркими тюльпанами на фоне солнечного весеннего дня.',
  'Группа людей на вечерней прогулке по набережной, украшенной огнями.',
  'Детские игрушки, разбросанные на ковре в комнате с яркими обоями.',
  'Старый деревянный пирс, ведущий к тихому озеру с гладкой поверхностью воды.',
  'Городская улица с прохожими в ярких пальто на фоне старых зданий.'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATARS_COUNT = 6;
const COMMENTS_MAX = 30;
const COMMENTS_MAX_ID = 10000;


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


const generatePhotoId = createIdGenerator(PHOTO_COUNT);
const generateCommentId = createRandomIdFromRangeGenerator(1, COMMENTS_MAX_ID);


/**
 * Создаёт комментарий со случайным набором свойств.
 * @returns {object} Комментарий.
 */
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: getRandomArreyElement(COMMENT_MESSAGES),
  name: getRandomArreyElement(NAMES)
});


/**
 * Создаёт фото со случайным набором свойств.
 * @returns {object} Фото.
 */
const createPhoto = () => {
  const photoId = generatePhotoId();
  const photo = {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArreyElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: Array.from({length: getRandomInteger(0, COMMENTS_MAX)}, createComment)
  };

  return photo;
};

const photos = Array.from({length: PHOTO_COUNT}, createPhoto);
photos();
