import { isEscapeKey } from './util.js';
import { validateHashtags, errorHashtags } from './validate-hashtags.js';
import { validateDescription, errorDescription } from './validate-description.js';


const formImgUpload = document.querySelector('.img-upload__form');
const buttonImgUpload = formImgUpload.querySelector('.img-upload__submit');
const overlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImg = formImgUpload.querySelector('.img-upload__input');
const inputHashtags = formImgUpload.querySelector('.text__hashtags');
const inputDescription = formImgUpload.querySelector('.text__description');
const cancel = formImgUpload.querySelector('.img-upload__cancel');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');
const effectsPreviews = formImgUpload.querySelectorAll('.effects__preview');


// Добавление валидации к форме загрузки изображения.
const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});


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

  inputImg.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
  previewImg.src = '';
  pristine.reset();
  formImgUpload.reset();
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

    if (document.activeElement === inputHashtags || document.activeElement === inputDescription) {
      evt.stopPrepagation();
    } else {
      formImgUploadClose();
    }
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


/**
 * Обрабатывает ввод в инпут для описания.
 * @param {object} evt Событие.
 */
function onInputDescriptionInput () {
  if (pristine.validate()) {
    buttonImgUpload.disabled = false;
  } else {
    buttonImgUpload.disabled = true;
  }
}


pristine.addValidator(inputHashtags, validateHashtags, errorHashtags, 1, false);
inputHashtags.addEventListener('input', onInputHashtagsInput);

pristine.addValidator(inputDescription, validateDescription, errorDescription, 2, false);
inputDescription.addEventListener('input', onInputDescriptionInput);

// Событие загрузки изображения.
inputImg.addEventListener('input', () => {
  formImgUploadOpen();
});


// Событие отправки загруженного изображения.
formImgUpload.addEventListener('submit', () => {
  // evt.preventDefault();
});
