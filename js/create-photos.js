import { getMockData } from './data.js';
import {
  getRandomInteger,
  getRandomArreyElement,
  createIdGenerator,
  createRandomIdFromRangeGenerator
} from './util.js';


const PHOTO_COUNT = 25;
const PHOTO_COMMENTS_MAX = 30;
const PHOTO_LIKES = {
  MIN: 15,
  MAX: 200
};
const COMMENTS_MAX_ID = 10000;
const AVATARS_COUNT = 6;
const {NAMES, PHOTO_DESCRIPTIONS, COMMENT_MESSAGES} = getMockData();


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


const generatePhotoId = createIdGenerator(PHOTO_COUNT);
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
    likes: getRandomInteger(PHOTO_LIKES.MIN, PHOTO_LIKES.MAX),
    comments: Array.from({length: getRandomInteger(0, PHOTO_COMMENTS_MAX)}, createComment)
  };

  return photo;
};

const createPhotos = Array.from({length: PHOTO_COUNT}, createPhoto);

export {createPhotos};
