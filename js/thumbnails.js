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
 * Создаёт список превью фотографий.
 * @param {object} photos Список фотографий.
 */
const createThumbnailList = (photos) => {
  const pictures = document.querySelector('.pictures');

  for (let i = 0; i < photos.length; i++) {
    const thumbnail = createThumbnail(photos[i]);
    pictures.append(thumbnail);
  }
};


createThumbnailList(generatedPhotos);

/*
+ 1. Заведите модуль, который будет отвечать за отрисовку миниатюр.
+ 2. На основе временных данных для разработки и шаблона `#picture` создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:
    + - Адрес изображения `url` подставьте как атрибут `src` изображения.
    + - Описание изображения `description` подставьте в атрибут `alt` изображения.
    + - Количество лайков `likes` выведите в блок `.picture__likes`.
    + - Количество комментариев `comments` выведите в блок `.picture__comments`.
+ 3. Отрисуйте сгенерированные DOM-элементы в блок `.pictures`. Для вставки элементов используйте `DocumentFragment`.
+ 4. Подключите модуль в проект.
*/
