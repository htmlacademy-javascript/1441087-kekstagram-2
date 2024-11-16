import { getComment } from './get-comment.js';

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


const COMMENTS_SHOW_STEP = 5;
const socialCommentsFragment = document.createDocumentFragment();
const showComments = {
  from: 0,
  to: COMMENTS_SHOW_STEP
};






commentsLoader.addEventListener('click', onCommentsLoaderClick);

socialCommentTotalCount.textContent = photoData.comments.length;
socialCommentShownCount.textContent = COMMENTS_SHOW_STEP;

commentsLoader.addEventListener('click', () => {
  showMoreComments (photoData, showComments);
});



/**
 * Вставляет на страницу комментарии для переданной фотографии.
 * @param {object} photoData Данные фотографии.
 */
const insertComments = (photoData, commentsFrom, commentsTo) => {
  const commentsToDisplay = photoData.comments.slice(commentsFrom, commentsTo);

  commentsToDisplay.forEach((commentData) => {
    socialCommentsFragment.append(getComment(commentData));
  });

  socialComments.append(socialCommentsFragment);
};


const cleanComments = () => {
  socialComments.insertAdjacentHTML = '';
  socialCommentsFragment.insertAdjacentHTML = '';
  socialCommentTotalCount.textContent = '';
  socialCommentShownCount.textContent = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', insertComments);
};


function onCommentsLoaderClick (evt) {
  evt.preventDefault();
  showMoreComments (this.photoData, this.showComments);
}

export { insertComments, cleanComments };
