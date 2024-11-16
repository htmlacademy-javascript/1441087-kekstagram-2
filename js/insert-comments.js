import { getComment } from './get-comment.js';

const socialComments = document.querySelector('.social__comments');
const socialCommentsFragment = document.createDocumentFragment();


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

export { insertComments };
