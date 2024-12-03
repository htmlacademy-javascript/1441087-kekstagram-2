const COMMENTS_SHOW_STEP = 5;

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsLimitCurrent = COMMENTS_SHOW_STEP;
let comments = [];


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
 * Выводит на экран очередную порцию комментариев для открытого изображения.
 */
const showMoreComments = () => {
  const commentsToDisplay = comments.slice(commentsLimitCurrent - COMMENTS_SHOW_STEP, commentsLimitCurrent);

  commentsToDisplay.forEach((commentData) => {
    socialComments.append(getComment(commentData));
  });

  commentsLimitCurrent += COMMENTS_SHOW_STEP;

  const CommentShownCount = socialComments.children.length;
  socialCommentShownCount.textContent = CommentShownCount;

  if (CommentShownCount === comments.length) {
    commentsLoader.classList.add('hidden');
  }
};


/**
 * Вставляет на страницу комментарии для переданного изображения.
 * @param {object} pictureData Данные изображения.
 */
const insertComments = (pictureData) => {
  comments = pictureData.comments;

  socialCommentTotalCount.textContent = pictureData.comments.length;
  showMoreComments();
};


/**
 * Очищает блок с комментариями для открытого изображения.
 */
const cleanComments = () => {
  commentsLimitCurrent = COMMENTS_SHOW_STEP;
  comments = [];
  socialComments.innerHTML = '';
  socialCommentTotalCount.textContent = '';
  socialCommentShownCount.textContent = '';
  commentsLoader.classList.remove('hidden');
};


export { insertComments, showMoreComments, cleanComments };
