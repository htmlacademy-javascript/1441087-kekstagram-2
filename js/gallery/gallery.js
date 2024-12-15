import { openPicture } from '../big-picture/big-picture.js';


const picturesContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');


const getThumbnail = (pictureData) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailPicture = thumbnail.querySelector('.picture__img');
  thumbnailPicture.src = pictureData.url;
  thumbnailPicture.alt = pictureData.description;

  const thumbnailCommentsCount = thumbnail.querySelector('.picture__comments');
  thumbnailCommentsCount.textContent = pictureData.comments.length;

  const thumbnailLikesCount = thumbnail.querySelector('.picture__likes');
  thumbnailLikesCount.textContent = pictureData.likes;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPicture(pictureData);
  });

  return thumbnail;
};


const removeThumbnails = () => {
  const allPictures = picturesContainer.querySelectorAll('.picture');
  allPictures.forEach((picture) => picture.remove());
};


const showThumbnails = (pictures) => {
  removeThumbnails();

  const thumbnailsFragment = document.createDocumentFragment();

  pictures.forEach((photoData) => {
    const thumbnail = getThumbnail(photoData);
    thumbnailsFragment.append(thumbnail);
  });

  picturesContainer.append(thumbnailsFragment);
};


export { showThumbnails };
