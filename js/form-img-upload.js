import { isEscapeKey } from './util.js';
import { validateHashtags } from './validate.js';


const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const inputImg = form.querySelector('.img-upload__input');
const inputHashtags = form.querySelector('.text__hashtags');
const inputDescription = form.querySelector('.text__description');
const cancel = form.querySelector('.img-upload__cancel');
const previewImg = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');


/**
 * Показывает превью загрузки изображения.
 * @param {object} file
 */
const previewFile = (file) => {
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
 * Очищает превью загруженного изображения.
 */
const cleanPreview = () => {
  inputImg.value = '';
  previewImg.src = '';
};


/**
 * Обрабатывает закрытие формы загрузки изображения через иконку.
 * @param {object} evt
 */
const onCancelClick = (evt) => {
  evt.preventDefault();
  formImgUploadClose();
};


/**
 * Обрабатывает закрытие формы загрузки изображения через Escape.
 * @param {object} evt Событие.
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    formImgUploadClose();
  }
};


/**
 * Открывает форму загрузки изображения.
*/
function formImgUploadOpen () {
  const file = inputImg.files[0];
  previewFile(file);

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  cancel.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
}


/**
 * Закрывает форму загрузки изображения.
*/
function formImgUploadClose () {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  cancel.removeEventListener('click', onCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  cleanPreview();
}


inputImg.addEventListener('change', () => {
  formImgUploadOpen();
});


// Добавление валидации к форме.
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  // successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

pristine.addValidator(
  inputHashtags,
  validateHashtags
);


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Валидировано');
  } else {
    console.log('Не валидировано');
  }
});


export {
  formImgUploadOpen,
  formImgUploadClose
};
