import { isEscapeKey } from './util';

const alertTemplate = document.querySelector('#alert').content;

const alertTypes = {
  error: {
    sectionClass: 'error',
    divClass: 'error__inner',
    h2Class: 'error__title',
    buttonClass: 'error__button',
    buttonText: 'Попробовать ещё раз'
  },
  success: {
    sectionClass: 'success',
    divClass: 'success__inner',
    h2Class: 'success__title',
    buttonClass: 'success__button',
    buttonText: 'Круто!'
  }
};


const removeAlert = () => {
  document.querySelector('#alert-current').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeAlert();
  }
}


const showAlert = (type, message) => {
  const alert = alertTemplate.cloneNode(true);
  const alertType = alertTypes[type];

  const alertSection = alert.querySelector('section');
  alertSection.classList.add(alertType.sectionClass);

  const alertDiv = alert.querySelector('div');
  alertDiv.classList.add(alertType.divClass);

  const alertTitle = alert.querySelector('h2');
  alertTitle.classList.add(alertType.h2Class);
  alertTitle.textContent = message;

  const alertButton = alert.querySelector('button');
  alertButton.classList.add(alertType.buttonClass);
  alertButton.textContent = alertType.buttonText;

  alertButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    removeAlert();
  });

  alertSection.addEventListener('click', () => {
    removeAlert();
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alert);
};

export { showAlert };
