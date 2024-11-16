import { isEscapeKey } from './util.js';
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
 * Обрабатывает закрытие фотографии через иконку.
 * @param {object} evt Событие.
 */
const onPhotoCloseClick = (evt) => {
  evt.preventDefault();
  closePhoto();
};


/**
 * Обрабатывает закрытие фотографии через Escape.
 * @param {object} evt Событие.
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
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
 * Закрывает окно с фотографией.
 */
function closePhoto () {
  bigPictureImg.src = '';
  bigPictureImg.alt = '';
  socialCaption.textContent = '';
  likesCount.textContent = '';

  cleanComments();

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', onPhotoCloseClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}


/**
 * Открывает окно с фотографией.
 * @param {object} photoData Данные фотографии.
 */
function openPhoto (photoData) {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  socialCaption.textContent = photoData.description;
  likesCount.textContent = photoData.likes;

  insertComments(photoData);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onPhotoCloseClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  document.addEventListener('keydown', onDocumentKeydown);
}


export { openPhoto };
