import { openPhoto } from './open-photo.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Обрабатывает событие нажатия на миниатюру фотографии.
 * @param {object} evt
 */
const onThumbnailClick = (evt, photoData) => {
  evt.preventDefault();
  openPhoto(photoData);
};

/**
 * Создаёт превью фотографии по шаблону.
 * @param {object} photoData Фотография.
 * @returns
 */
const getThumbnail = (photoData) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailPicture = thumbnail.querySelector('.picture__img');
  thumbnailPicture.src = photoData.url;
  thumbnailPicture.alt = photoData.description;

  const thumbnailCommentsCount = thumbnail.querySelector('.picture__comments');
  thumbnailCommentsCount.textContent = photoData.comments.length;

  const thumbnailLikesCount = thumbnail.querySelector('.picture__likes');
  thumbnailLikesCount.textContent = photoData.likes;

  thumbnail.addEventListener('click', (evt) => {
    onThumbnailClick(evt, photoData);
  });

  return thumbnail;
};

export { getThumbnail };
