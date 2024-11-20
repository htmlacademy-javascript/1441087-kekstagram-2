import { isEscapeKey } from './util.js';

const Form = document.querySelector('.img-upload__form');
const Overlay = Form.querySelector('.img-upload__overlay');
const Input = Form.querySelector('.img-upload__input');
const Cancel = Form.querySelector('.img-upload__cancel');
const PreviewImg = Form.querySelector('.img-upload__preview img');
const EffectsPreviews = Form.querySelectorAll('.effects__preview');


/**
 * Показывает превью файла.
 * @param {object} file
 */
const previewFile = (file) => {
  const reader = new FileReader();

  reader.onload = (evt) => {
    PreviewImg.src = evt.target.result;

    for (const effectsPreview of EffectsPreviews) {
      effectsPreview.style.backgroundImage = `url(${evt.target.result})`;
    }
  };
  reader.readAsDataURL(file);
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
  const file = Input.files[0];
  previewFile(file);

  Overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  Cancel.addEventListener('click', onCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);


}


/**
 * Закрывает форму загрузки изображения.
*/
function formImgUploadClose () {
  Overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  Input.value = '';
  PreviewImg.src = '';

  Cancel.removeEventListener('click', onCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}


Input.addEventListener('change', () => {
  formImgUploadOpen();
});


export {
  formImgUploadOpen,
  formImgUploadClose
};
