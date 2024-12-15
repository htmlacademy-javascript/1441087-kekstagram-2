import { isEscapeKey } from '../util.js';
import {
  insertComments,
  showMoreComments,
  cleanComments
} from './comments.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.comments-loader');


/**
 * Переключает видимость окна с изображением.
 */
const toggleBigPicture = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};


/**
 * Закрывает изображение.
 */
const closePicture = () => {
  toggleBigPicture();
  cleanComments();

  bigPictureImg.src = '';
  bigPictureImg.alt = '';
  socialCaption.textContent = '';
  likesCount.textContent = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};


/**
 * Открывает изображение.
 * @param {object} pictureData Объект изображения.
 */
const openPicture = (pictureData) => {
  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.description;
  socialCaption.textContent = pictureData.description;
  likesCount.textContent = pictureData.likes;

  insertComments(pictureData);
  toggleBigPicture();

  document.addEventListener('keydown', onDocumentKeydown);
};


/**
 * Обрабатывает закрытие изображения через иконку.
 * @param {object} evt Событие.
 */
const onPictureCloseClick = (evt) => {
  evt.preventDefault();
  closePicture();
};


/**
 * Обрабатывает прогрузку очередных комментариев.
 * @param {object} evt Событие.
 */
const onCommentsLoaderClick = (evt) => {
  evt.preventDefault();
  showMoreComments();
};


/**
 * Обрабатывает закрытие изображения через Escape.
 * @param {object} evt Событие.
 */
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
}


bigPictureCancel.addEventListener('click', onPictureCloseClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);


export { openPicture };
