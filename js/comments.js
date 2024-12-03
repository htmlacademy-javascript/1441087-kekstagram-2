import { getComment } from './node-maker.js';


const COMMENTS_SHOW_STEP = 5;


const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


let commentsLimitCurrent = COMMENTS_SHOW_STEP;
let comments = [];


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
