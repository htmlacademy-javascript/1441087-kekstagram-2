import { isEscapeKey } from './util';

const alertTemplate = document.querySelector('#alert').content;

const alertTypes = {
  sendError: {
    sectionClass: 'error',
    divClass: 'error__inner',
    h2Class: 'error__title',
    h2Text: 'Ошибка загрузки файла',
    buttonClass: 'error__button',
    buttonText: 'Попробовать ещё раз'
  },
  sendSuccess: {
    sectionClass: 'success',
    divClass: 'success__inner',
    h2Class: 'success__title',
    h2Text: 'Изображение успешно загружено',
    buttonClass: 'success__button',
    buttonText: 'Круто!'
  }
};


const hideAlert = () => {
  document.querySelector('#alert-current').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideAlert();
  }
}


const showAlert = (alertType) => {
  const alert = alertTemplate.cloneNode(true);
  const currentAlertType = alertTypes[alertType];

  const alertSection = alert.querySelector('section');
  alertSection.classList.add(currentAlertType.sectionClass);

  const alertDiv = alert.querySelector('div');
  alertDiv.classList.add(currentAlertType.divClass);

  const alertTitle = alert.querySelector('h2');
  alertTitle.classList.add(currentAlertType.h2Class);
  alertTitle.textContent = currentAlertType.h2Text;

  const alertButton = alert.querySelector('button');
  alertButton.classList.add(currentAlertType.buttonClass);
  alertButton.textConetnt = currentAlertType.buttonText;

  alertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideAlert();
  });

  alertSection.addEventListener('click', () => {
    hideAlert();
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alert);
};

export { showAlert };
