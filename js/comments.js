import { getComment } from './get-comment.js';

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


const COMMENTS_SHOW_STEP = 5;
let showComments = {
  from: 0,
  to: COMMENTS_SHOW_STEP
};
let comments = [];


const showMoreComments = () => {
  const commentsToDisplay = comments.slice(showComments.from, showComments.to);

  commentsToDisplay.forEach((commentData) => {
    socialComments.append(getComment(commentData));
  });

  showComments = {
    from: showComments.from += COMMENTS_SHOW_STEP,
    to: showComments.to += COMMENTS_SHOW_STEP
  };

  const CommentShownCount = socialComments.children.length;
  socialCommentShownCount.textContent = CommentShownCount;

  if (CommentShownCount === comments.length) {
    commentsLoader.classList.add('hidden');
  }
};


/**
 * Вставляет на страницу комментарии для переданной фотографии.
 * @param {object} photoData Данные фотографии.
 */
const insertComments = (photoData) => {
  comments = photoData.comments;

  socialCommentTotalCount.textContent = photoData.comments.length;
  showMoreComments();
};


const cleanComments = () => {
  showComments = {
    from: 0,
    to: COMMENTS_SHOW_STEP
  };
  comments = [];
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
  socialCommentTotalCount.textContent = '';
  socialCommentShownCount.textContent = '';
  commentsLoader.classList.remove('hidden');
};


export { insertComments, showMoreComments, cleanComments };
