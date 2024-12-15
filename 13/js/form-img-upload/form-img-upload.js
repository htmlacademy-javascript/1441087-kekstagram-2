import { isEscapeKey } from '../util.js';
import { resetScale } from './scale.js';
import { resetEffect } from './effects.js';
import { validateHashtags, getErrorHashtags } from './validate-hashtags.js';
import { validateDescription, getErrorDescription } from './validate-description.js';
import { sendData } from '../api.js';
import { showAlert } from '../alerts.js';
import { showNotify } from '../notify.js';


const SUCCESS_UPLOAD_MESSAGE = 'Изображение успешно загружено';
const WRONG_FILE_TYPE_MESSAGE = 'Недопустимый формат файла';
const ACCEPT_FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'gif'];


const formImgUpload = document.querySelector('.img-upload__form');
const imgUploadSubmit = formImgUpload.querySelector('.img-upload__submit');
const imgUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const overlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImg = formImgUpload.querySelector('.img-upload__input');
const inputHashtags = formImgUpload.querySelector('.text__hashtags');
const inputDescription = formImgUpload.querySelector('.text__description');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');
const effectsPreview = formImgUpload.querySelectorAll('.effects__preview');


const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});


/**
 * Отображает превью загружаемого изображения.
 * @param {object} file
 */
const showPreview = (file) => {
  const fileUrl = URL.createObjectURL(file);

  previewImg.src = fileUrl;

  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${fileUrl})`;
  });
};


/**
 * Сбрасывает превью загружаемого изображения.
 */
const resetPreview = () => {
  previewImg.src = '';

  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
};


/**
 * Переключает видимость формы загрузки изображения.
 */
const toggleFormImgUpload = () => {
  overlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};


/**
 * Открывает форму загрузки изображения.
*/
const openFormImgUpload = () => {
  toggleFormImgUpload();

  document.addEventListener('keydown', onDocumentKeydown);
};


/**
 * Закрывает форму загрузки изображения.
*/
const closeFormImgUpload = () => {
  toggleFormImgUpload();
  resetPreview();
  resetScale();
  resetEffect();
  pristine.reset();
  formImgUpload.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
};


const onInputImgInput = () => {
  const file = inputImg.files[0];
  const fileName = file.name.toLowerCase();
  const fileExtansion = fileName.split('.').pop();
  const matches = ACCEPT_FILE_TYPES.includes(fileExtansion);

  if (matches) {
    showPreview(file);
    openFormImgUpload();
  } else {
    showNotify('error', WRONG_FILE_TYPE_MESSAGE);
  }
};


const onCancelClick = (evt) => {
  evt.preventDefault();
  closeFormImgUpload();
};


function onDocumentKeydown (evt) {
  const currentAlert = document.querySelector('#alert-current');

  if (isEscapeKey(evt) &&
      !currentAlert &&
      document.activeElement !== inputHashtags &&
      document.activeElement !== inputDescription) {
    evt.preventDefault();
    closeFormImgUpload();
  }
}


const onInputHashtagsInput = () => {
  imgUploadSubmit.disabled = !pristine.validate();
};


const onInputDescriptionInput = () => {
  imgUploadSubmit.disabled = !pristine.validate();
};


const onFormImgUploadSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    imgUploadSubmit.disabled = true;
    inputHashtags.value = inputHashtags.value.trim().replaceAll(/\s+/g, ' ');
    const formData = new FormData(formImgUpload);

    sendData(formData)
      .then(() => {
        showAlert('success', SUCCESS_UPLOAD_MESSAGE);
        closeFormImgUpload();
      })
      .catch((err) => {
        showAlert('error', err.message);
      })
      .finally(() => {
        imgUploadSubmit.disabled = false;
      });
  }
};


pristine.addValidator(inputHashtags, validateHashtags, getErrorHashtags, 1, false);
pristine.addValidator(inputDescription, validateDescription, getErrorDescription, 2, false);


inputImg.addEventListener('input', onInputImgInput);
inputHashtags.addEventListener('input', onInputHashtagsInput);
inputDescription.addEventListener('input', onInputDescriptionInput);
imgUploadCancel.addEventListener('click', onCancelClick);
formImgUpload.addEventListener('submit', onFormImgUploadSubmit);
