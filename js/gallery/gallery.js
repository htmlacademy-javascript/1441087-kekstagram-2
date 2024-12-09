import { getData } from '../api.js';
import { showNotify } from '../notify.js';
import { openPicture } from './big-picture.js';


const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


/**
 * Создаёт разметку превью изображения.
 * @param {object} pictureData Данные изображения.
 * @returns {object} Превью изображения.
*/
const getThumbnail = (pictureData) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  // thumbnail.dataset.photoId = photoData.id;

  const thumbnailPicture = thumbnail.querySelector('.picture__img');
  thumbnailPicture.src = pictureData.url;
  thumbnailPicture.alt = pictureData.description;

  const thumbnailCommentsCount = thumbnail.querySelector('.picture__comments');
  thumbnailCommentsCount.textContent = pictureData.comments.length;

  const thumbnailLikesCount = thumbnail.querySelector('.picture__likes');
  thumbnailLikesCount.textContent = pictureData.likes;

  thumbnail.addEventListener('click', () => {
    openPicture(pictureData);
  });

  return thumbnail;
};


/**
 * Вставляет превью изображений на страницу.
 * @param {object} pictures Список изображений.
 */
const insertThumbnails = (pictures) => {
  const thumbnailsFragment = document.createDocumentFragment();

  pictures.forEach((photoData) => {
    const thumbnail = getThumbnail(photoData);
    thumbnailsFragment.append(thumbnail);
  });

  picturesContainer.append(thumbnailsFragment);
};


getData()
  .then((pictures) => insertThumbnails(pictures))
  .catch((err) => showNotify('danger', err.message));
