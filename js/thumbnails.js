import {generatedPhotos} from './create-photos.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Создаёт превью фотографии по шаблону.
 * @param {object} photo Фотография.
 * @returns
 */
const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailPicture = thumbnail.querySelector('.picture__img');
  thumbnailPicture.src = photo.url;
  thumbnailPicture.alt = photo.description;

  const thumbnailCommentsCount = thumbnail.querySelector('.picture__comments');
  thumbnailCommentsCount.textContent = photo.comments.length;

  const thumbnailLikesCount = thumbnail.querySelector('.picture__likes');
  thumbnailLikesCount.textContent = photo.likes;

  return thumbnail;
};

/**
 * Вставляет превью фотографий на страницу.
 * @param {object} photos Список фотографий.
 */
const insertThumbnails = (photos) => {
  const pictures = document.querySelector('.pictures');
  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    thumbnailsFragment.append(thumbnail);
  });

  pictures.append(thumbnailsFragment);
};

insertThumbnails(generatedPhotos);
