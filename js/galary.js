import { mockPhotos } from './mock-photos.js';
import { getThumbnail } from './get-thumbnail.js';


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
