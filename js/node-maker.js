const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');


/**
 * Создаёт разметку комментария.
 * @param {object} commentData Данные комментария.
 * @returns {object} Комментарий.
*/
const getComment = (commentData) => {
  const comment = commentTemplate.cloneNode(true);
  const commentImg = comment.querySelector('img');
  const commentMessage = comment.querySelector('p');

  comment.dataset.commentId = commentData.id;
  commentImg.src = commentData.avatar;
  commentImg.alt = commentData.name;
  commentMessage.textContent = commentData.message;

  return comment;
};


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

export { getComment, getThumbnail };
