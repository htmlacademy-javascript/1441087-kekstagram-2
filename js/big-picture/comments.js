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
 * Возвращает HTMLElement комментария.
 * @param {object} commentData Комментарий.
 * @returns {object} HTMLElement Комментария.
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
 * Отображает очередную группу комментариев открытого изображения.
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
 * Отображает комментарии открытого изображения.
 * @param {object} pictureData Изображение.
 */
const showComments = (pictureData) => {
  comments = pictureData.comments;

  socialCommentTotalCount.textContent = pictureData.comments.length;
  showMoreComments();
};


/**
 * Убирает комментарии открытого изображения.
 */
const removeComments = () => {
  commentsLimitCurrent = COMMENTS_SHOW_STEP;
  comments = [];
  socialComments.innerHTML = '';
  socialCommentTotalCount.textContent = '';
  socialCommentShownCount.textContent = '';
  commentsLoader.classList.remove('hidden');
};


const onCommentsLoaderClick = () => {
  showMoreComments();
};


commentsLoader.addEventListener('click', onCommentsLoaderClick);


export { showComments, removeComments };
