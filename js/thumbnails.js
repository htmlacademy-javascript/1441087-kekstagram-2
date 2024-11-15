import { openPhoto } from './open-photo.js';


const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


/**
 * Обрабатывает событие нажатия на миниатюру фотографии.
 * @param {object} evt
 */
const onThumbnailClick = (evt, photo) => {
  evt.preventDefault();
  openPhoto(photo);
};

/**
 * Создаёт превью фотографии по шаблону.
 * @param {object} photo Фотография.
 * @returns
 */
const getThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailPicture = thumbnail.querySelector('.picture__img');
  thumbnailPicture.src = photo.url;
  thumbnailPicture.alt = photo.description;

  const thumbnailCommentsCount = thumbnail.querySelector('.picture__comments');
  thumbnailCommentsCount.textContent = photo.comments.length;

  const thumbnailLikesCount = thumbnail.querySelector('.picture__likes');
  thumbnailLikesCount.textContent = photo.likes;

  thumbnail.addEventListener('click', (evt) => {
    onThumbnailClick(evt, photo);
  });

  return thumbnail;
};

export { getThumbnail };
