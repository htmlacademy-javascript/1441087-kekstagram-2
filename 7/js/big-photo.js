import { insertComments } from './insert-comments.js';
import { isEscapeKey } from './util.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCaption = bigPicture.querySelector('.social__caption');
const bodyNode = document.querySelector('body');

// Прячем блоки для другого ДЗ.
commentsLoader.classList.add('hidden');


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
  bigPictureImg.src = '';
  bigPictureImg.alt = '';
  socialCaption.textContent = '';
  likesCount.textContent = '';
  socialCommentTotalCount.textContent = '';
  socialCommentShownCount.textContent = '';

  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  bigPicture.classList.add('hidden');
  bodyNode.classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', onPhotoCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}


/**
 * Открывает фотографию на весь экран.
 * @param {object} photoData Данные фотографии.
 */
function openPhoto (photoData) {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  socialCaption.textContent = photoData.description;
  likesCount.textContent = photoData.likes;
  socialCommentTotalCount.textContent = photoData.comments.length;
  socialCommentShownCount.textContent = photoData.comments.length;

  insertComments(photoData);

  bigPicture.classList.remove('hidden');
  bodyNode.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onPhotoCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

export { openPhoto };
