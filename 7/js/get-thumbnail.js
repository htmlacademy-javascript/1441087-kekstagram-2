import { openPhoto } from './big-photo.js';


const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


/**
 * Обрабатывает событие нажатия на превью фотографии.
 * @param {object} evt
 */
const onThumbnailClick = (evt, photoData) => {
  evt.preventDefault();
  openPhoto(photoData);
};


/**
 * Создаёт разметку превью фотографии.
 * @param {object} photoData Фотография.
 * @returns {object} Превью фотографии.
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
