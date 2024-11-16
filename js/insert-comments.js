import { getComment } from './get-comment';


const socialComments = document.querySelector('.social__comments');
const socialCommentsFragment = document.createDocumentFragment();


/**
 * Вставляет на страницу комментарии для переданной фотографии.
 * @param {object} photoData Данные фотографии.
 */
const insertComments = (photoData) => {
  // Очищаем разметку от комментариев, которые есть в вёрстке.
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }

  photoData.comments.forEach((commentData) => {
    socialCommentsFragment.append(getComment(commentData));
  });

  socialComments.append(socialCommentsFragment);
};

export { insertComments };
