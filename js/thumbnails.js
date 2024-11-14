import { generatedPhotos } from './generate-photos.js';
import { fullPhotoNodes, bodyNode } from './big-photo.js';


const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Открывает фотографию на весь экран.
 * @param {Node} thumbnail Миниатюра фотографии.
 */
const openPhoto = (photo) => {
  fullPhotoNodes.bigPictureImg.src = photo.url;
  fullPhotoNodes.bigPictureImg.alt = photo.description;
  fullPhotoNodes.socialCaption.textContent = photo.description;
  fullPhotoNodes.likesCount.textContent = photo.likes;
  fullPhotoNodes.bigPicture.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
};

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
const createThumbnail = (photo) => {
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
