import { generatedPhotos } from './generate-photos.js';
import { getThumbnail } from './thumbnails.js';

/**
 * Вставляет превью фотографий на страницу.
 * @param {object} photos Список фотографий.
 */
const insertThumbnails = (photos) => {
  const pictures = document.querySelector('.pictures');
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = getThumbnail(photo);
    thumbnailsFragment.append(thumbnail);
  });

  pictures.append(thumbnailsFragment);
};

insertThumbnails(generatedPhotos);
