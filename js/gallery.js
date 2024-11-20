import { mockPhotos } from './mock-photos.js';
import { getThumbnail } from './node-maker.js';
import { openPhoto } from './big-picture.js';
import './form-img-upload.js';


const picturesContainer = document.querySelector('.pictures');


/**
 * Вставляет превью фотографий на страницу.
 * @param {object} photos Список фотографий.
 */
const insertThumbnails = (photos) => {
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach((photoData) => {
    const thumbnail = getThumbnail(photoData);
    thumbnailsFragment.append(thumbnail);
  });

  picturesContainer.append(thumbnailsFragment);
};


insertThumbnails(mockPhotos);


// Отслеживает нажатие на миниатюру фотографии.
picturesContainer.addEventListener('click', (evt) => {
  const currentPhoto = evt.target.closest('.picture');

  if (currentPhoto) {
    evt.preventDefault();
    openPhoto(mockPhotos.find((photo) => photo.id === Number(currentPhoto.dataset.photoId)));
  }
});
