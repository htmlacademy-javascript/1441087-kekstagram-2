import { isEscapeKey } from '../util.js';
import { scaleUpdate, scaleReset } from './scale.js';
import { effectReset, onEffectsListClick, onSliderUpdate } from './effects.js';
import { validateHashtags, errorHashtags } from './validate-hashtags.js';
import { validateDescription, errorDescription } from './validate-description.js';
import { sendData } from '../api.js';
import { showAlert } from '../alerts.js';

const SUCCESS_UPLOAD_MESSAGE = 'Изображение успешно загружено';

const formImgUpload = document.querySelector('.img-upload__form');
const imgUploadSubmit = formImgUpload.querySelector('.img-upload__submit');
const imgUploadCancel = formImgUpload.querySelector('.img-upload__cancel');
const overlay = formImgUpload.querySelector('.img-upload__overlay');
const inputImg = formImgUpload.querySelector('.img-upload__input');
const inputHashtags = formImgUpload.querySelector('.text__hashtags');
const inputDescription = formImgUpload.querySelector('.text__description');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');

const scaleControlSmaller = formImgUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = formImgUpload.querySelector('.scale__control--bigger');

const effectsList = formImgUpload.querySelector('.effects__list');
const effectsItems = formImgUpload.querySelectorAll('.effects__item');
const slider = formImgUpload.querySelector('.effect-level__slider');


// Создание экземпляра валидатора для формы загрузки изображения.
const pristine = new Pristine(formImgUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});


/**
 * Переключает видимость окна загрузки изображения.
 */
const formImgUploadToogle = () => {
  overlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};


/**
 * Заполняет превью загрузки изображения.
 * @param {object} file
 */
const showPreview = (file) => {
  const reader = new FileReader();

  reader.onload = (evt) => {
    previewImg.src = evt.target.result;

    effectsItems.forEach((effectItem) => {
      const effectImg = effectItem.querySelector('span');
      effectImg.style.backgroundImage = `url(${evt.target.result})`;
    });
  };

  reader.readAsDataURL(file);
};


/**
 * Открывает форму загрузки изображения.
*/
const formImgUploadOpen = () => {
  formImgUploadToogle();

  document.addEventListener('keydown', onDocumentKeydown);
};


/**
 * Закрывает форму загрузки изображения.
*/
const formImgUploadClose = () => {
  formImgUploadToogle();
  scaleReset();
  effectReset();
  pristine.reset();
  formImgUpload.reset();

  inputImg.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
  previewImg.src = '';
  imgUploadSubmit.disabled = false;

  document.removeEventListener('keydown', onDocumentKeydown);
};


/**
 * Обработчик загрузки изображения в инпут.
 */
const onInputImgInput = () => {
  const file = inputImg.files[0];

  showPreview(file);
  formImgUploadOpen();
};


/**
 * Обработчик закрытия формы загрузки изображения через иконку.
 * @param {object} evt Событие.
*/
const onCancelClick = (evt) => {
  evt.preventDefault();
  formImgUploadClose();
};


/**
 * Обработчик закрытия формы загрузки изображения через Escape.
 * @param {object} evt Событие.
*/
function onDocumentKeydown (evt) {
  const currentAlert = document.querySelector('#alert-current');

  if (isEscapeKey(evt) && !currentAlert) {
    evt.preventDefault();

    if (document.activeElement === inputHashtags ||
        document.activeElement === inputDescription) {
      evt.stopPropagation();
    } else {
      formImgUploadClose();
    }
  }
}


/**
 * Обработчик уменьшения масштаба изображения.
 */
const onScaleControlSmallerClick = () => {
  scaleUpdate(-1);
};


/**
 * Обработчик увеличения масштаба изображения.
 */
const onScaleControlBiggerClick = () => {
  scaleUpdate(1);
};


/**
 * Обработчик ввода в инпут для хэштегов.
 */
const onInputHashtagsInput = () => {
  imgUploadSubmit.disabled = !pristine.validate();
};


/**
 * Обработчик ввода в инпут для описания.
 */
const onInputDescriptionInput = () => {
  imgUploadSubmit.disabled = !pristine.validate();
};


/**
 * Обработчик отправки формы с изображением.
 * @param {object} evt Событие.
 */
const onFormImgUploadSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    inputHashtags.value = inputHashtags.value.trim().replaceAll(/\s+/g, ' ');
    const formData = new FormData(formImgUpload);

    sendData(formData)
      .then(() => {
        showAlert('success', SUCCESS_UPLOAD_MESSAGE);
        formImgUploadClose();
      })
      .catch((err) => {
        showAlert('error', err.message);
      });
  }
};


// Загрузка изображения в инпут.
inputImg.addEventListener('input', onInputImgInput);

// Изменение масштаба загружаемого изображения.
scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

// Применение эффектов.
effectsList.addEventListener('click', onEffectsListClick);

// Изменение интенсивности эффектов.
slider.noUiSlider.on('update', onSliderUpdate);

// Валидация хэштегов.
pristine.addValidator(inputHashtags, validateHashtags, errorHashtags, 1, false);
inputHashtags.addEventListener('input', onInputHashtagsInput);

// Валидация описания.
pristine.addValidator(inputDescription, validateDescription, errorDescription, 2, false);
inputDescription.addEventListener('input', onInputDescriptionInput);

// Закрытие формы загрузки изображения через иконку.
imgUploadCancel.addEventListener('click', onCancelClick);

// Отправка формы с изображением.
formImgUpload.addEventListener('submit', onFormImgUploadSubmit);
