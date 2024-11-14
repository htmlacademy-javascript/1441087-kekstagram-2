const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const bodyNode = document.querySelector('body');


//Объект с ссылками на элементы полноэкранной фотографии.
const fullPhotoNodes = {
  bigPicture: bigPicture,
  bigPictureImg: bigPictureImg,
  likesCount: likesCount,
  socialCommentShownCount: socialCommentShownCount,
  socialCommentTotalCount: socialCommentTotalCount,
  socialComments: socialComments,
  socialCaption: socialCaption
};


export {
  fullPhotoNodes,
  bodyNode
};
