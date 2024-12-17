import { isEscapeKey } from '../util.js';
import { showComments, removeComments } from './comments.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');


const toggleBigPicture = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};


const closePicture = () => {
  toggleBigPicture();
  removeComments();

  bigPictureImg.src = '';
  bigPictureImg.alt = '';
  socialCaption.textContent = '';
  likesCount.textContent = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};


const openPicture = (pictureData) => {
  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.description;
  socialCaption.textContent = pictureData.description;
  likesCount.textContent = pictureData.likes;

  showComments(pictureData);
  toggleBigPicture();

  document.addEventListener('keydown', onDocumentKeydown);
};


const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  closePicture();
};


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
}


bigPictureCancel.addEventListener('click', onBigPictureCancelClick);


export { openPicture };
