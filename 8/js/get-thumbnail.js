const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


/**
 * Создаёт разметку превью фотографии.
 * @param {object} photoData Данные фотографии.
 * @returns {object} Превью фотографии.
 */
const getThumbnail = (photoData) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.dataset.photoId = photoData.id;

  const thumbnailPicture = thumbnail.querySelector('.picture__img');
  thumbnailPicture.src = photoData.url;
  thumbnailPicture.alt = photoData.description;

  const thumbnailCommentsCount = thumbnail.querySelector('.picture__comments');
  thumbnailCommentsCount.textContent = photoData.comments.length;

  const thumbnailLikesCount = thumbnail.querySelector('.picture__likes');
  thumbnailLikesCount.textContent = photoData.likes;

  return thumbnail;
};

export { getThumbnail };
