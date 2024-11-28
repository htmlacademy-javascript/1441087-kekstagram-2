import { isEscapeKey } from './util.js';
import { validateHashtags, errorHashtags } from './validate-hashtags.js';

const formImgUpload = document.querySelector('.img-upload__form');
const buttonImgUpload = formImgUpload.querySelector('.img-upload__submit');
const overlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImg = formImgUpload.querySelector('.img-upload__input');
const inputHashtags = formImgUpload.querySelector('.text__hashtags');
// const inputDescription = formImgUpload.querySelector('.text__description');
const cancel = formImgUpload.querySelector('.img-upload__cancel');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');
const effectsPreviews = formImgUpload.querySelectorAll('.effects__preview');


/**
 * Очищает превью загрузки изображения.
 */
const cleanPreview = () => {
  inputImg.value = '';
  previewImg.src = '';
};


/**
 * Заполняет превью загрузки изображения.
 * @param {object} file
 */
const showPreview = (file) => {
  const reader = new FileReader();

  reader.onload = (evt) => {
    previewImg.src = evt.target.result;

    for (const effectsPreview of effectsPreviews) {
      effectsPreview.style.backgroundImage = `url(${evt.target.result})`;
    }
  };
  reader.readAsDataURL(file);
};


/**
 * Закрывает форму загрузки изображения.
*/
const formImgUploadClose = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  cancel.removeEventListener('click', onCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  cleanPreview();
};


/**
 * Открывает форму загрузки изображения.
*/
const formImgUploadOpen = () => {
  const file = inputImg.files[0];
  showPreview(file);

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancel.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
};


// Добавление валидации к форме загрузки изображения.
const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  // successClass: '',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});
pristine.addValidator(inputHashtags, validateHashtags, errorHashtags, 2, false);
inputHashtags.addEventListener('input', onInputHashtagsInput);


// Событие загрузки изображения.
inputImg.addEventListener('input', () => {
  formImgUploadOpen();
});


// Событие отправки загруженного изображения.
formImgUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
});


/**
 * Обрабатывает закрытие формы загрузки изображения через иконку.
 * @param {object} evt Событие.
*/
function onCancelClick (evt) {
  evt.preventDefault();
  formImgUploadClose();
}


/**
 * Обрабатывает закрытие формы загрузки изображения через Escape.
 * @param {object} evt Событие.
*/
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    formImgUploadClose();
  }
}


/**
 * Обрабатывает ввод в инпут для хэштегов.
 * @param {object} evt Событие.
 */
function onInputHashtagsInput () {
  if (pristine.validate()) {
    buttonImgUpload.disabled = false;
  } else {
    buttonImgUpload.disabled = true;
  }
}
