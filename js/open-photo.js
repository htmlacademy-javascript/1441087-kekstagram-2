import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const bodyNode = document.querySelector('body');

/**
 * Обрабатывает событие закрытия фотографии через иконку.
 * @param {object} evt Событие.
 */
const onPhotoCloseClick = (evt) => {
  evt.preventDefault();
  closePhoto();
};

/**
 * Обрабатывает событие закрытия фотографии через Escape.
 * @param {object} evt Событие.
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

/**
 * Закрывает полноэкранную фотографию.
 */
function closePhoto () {
  bigPicture.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onPhotoCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

/**
 * Открывает фотографию на весь экран.
 * @param {object} photo Фотография.
 */
function openPhoto (photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  socialCaption.textContent = photo.description;
  likesCount.textContent = photo.likes;
  bigPicture.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onPhotoCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

export { openPhoto };
