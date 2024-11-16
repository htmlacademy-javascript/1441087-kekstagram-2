import { mockPhotos } from './mock-photos.js';
import { getThumbnail } from './get-thumbnail.js';
import { openPhoto } from './big-picture.js';


const picturesContainer = document.querySelector('.pictures');

// Отслеживает нажатие на миниатюру фотографии.
picturesContainer.addEventListener('click', (evt) => {
  const currentPhoto = evt.target.closest('.picture');

  if (currentPhoto) {
    evt.preventDefault();
    openPhoto(mockPhotos.find((photo) => photo.id === Number(currentPhoto.dataset.photoId)));
  }
});


/**
 * Вставляет превью фотографий на страницу.
 * @param {object} photos Список фотографий.
 */
const insertThumbnails = (photos) => {
  const pictures = document.querySelector('.pictures');
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach((photoData) => {
    const thumbnail = getThumbnail(photoData);
    thumbnailsFragment.append(thumbnail);
  });

  pictures.append(thumbnailsFragment);
};

insertThumbnails(mockPhotos);
