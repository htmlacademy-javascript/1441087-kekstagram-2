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

  comment.dataset.id = commentData.id;
  commentImg.src = commentData.avatar;
  commentImg.alt = commentData.name;
  commentMessage.textContent = commentData.message;

  return comment;
};

export { getComment };
