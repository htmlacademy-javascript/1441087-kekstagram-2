import { isEscapeKey } from '../util.js';
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

const scaleControlSmaller = formImgUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = formImgUpload.querySelector('.scale__control--bigger');
const scaleControlValue = formImgUpload.querySelector('.scale__control--value');

// Создание экземпляра валидатора для формы загрузки изображения.
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
 * Изменяет масштаб для загружаемого изображения.
 * @param {number} factor
 */
const scaleUpdate = (factor = 1) => {
  const ScaleSettings = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  const currentScale = parseInt(scaleControlValue.value, 10);
  const newScale = currentScale + ScaleSettings.STEP * factor;

  if (newScale >= ScaleSettings.MIN && newScale <= ScaleSettings.MAX) {
    scaleControlValue.value = `${newScale.toString()}%`;
    previewImg.style.transform = `scale(${newScale / 100})`;
  }

  scaleControlSmaller.disabled = newScale <= ScaleSettings.MIN;
  scaleControlBigger.disabled = newScale >= ScaleSettings.MAX;
};


/**
 * Сбрасывает масштаб для загружаемого изображения.
 */
const scaleReset = () => {
  scaleControlValue.value = '100%';
  previewImg.style.transform = 'scale(1)';
  scaleControlSmaller.disabled = false;
  scaleControlBigger.disabled = false;
};


/**
 * Открывает форму загрузки изображения.
*/
const formImgUploadOpen = () => {
  const file = inputImg.files[0];
  showPreview(file);

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};


/**
 * Закрывает форму загрузки изображения.
*/
const formImgUploadClose = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  buttonImgUpload.disabled = false;

  inputImg.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
  previewImg.src = '';
  pristine.reset();
  formImgUpload.reset();

  scaleReset();
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

    if (evt.target.classList.contains('text__hashtags') ||
        evt.target.classList.contains('text__description')) {
      evt.stopPropagation();
    } else {
      formImgUploadClose();
    }

    // if (document.activeElement === inputHashtags ||
    //     document.activeElement === inputDescription) {
    //   evt.stopPropagation();
    // } else {
    //   formImgUploadClose();
    // }
  }
}


/**
 * Обрабатывает ввод в инпут для хэштегов.
 * @param {object} evt Событие.
 */
function onInputHashtagsInput () {
  buttonImgUpload.disabled = !pristine.validate();
}


/**
 * Обрабатывает ввод в инпут для описания.
 * @param {object} evt Событие.
 */
function onInputDescriptionInput () {
  buttonImgUpload.disabled = !pristine.validate();
}


// Загрузка изображения в инпут.
inputImg.addEventListener('input', () => {
  formImgUploadOpen();
});

// Изменение масштаба загружаемого изображения.
scaleControlSmaller.addEventListener('click', () => {
  scaleUpdate(-1);
});
scaleControlBigger.addEventListener('click', () => {
  scaleUpdate(1);
});

// Добавление валидации хэштегов.
pristine.addValidator(inputHashtags, validateHashtags, errorHashtags, 1, false);
inputHashtags.addEventListener('input', onInputHashtagsInput);

// Добавление валидации описания.
pristine.addValidator(inputDescription, validateDescription, errorDescription, 2, false);
inputDescription.addEventListener('input', onInputDescriptionInput);

// Закрытие формы загрузки изображения через иконку.
cancel.addEventListener('click', onCancelClick);

// Отправка изображения на сервер.
formImgUpload.addEventListener('submit', () => {});
