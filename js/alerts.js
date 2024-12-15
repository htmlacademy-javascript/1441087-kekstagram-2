import { isEscapeKey } from './util.js';


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


const removeCurrentAlert = () => {
  const currentAlert = document.querySelector('#alert-current');
  if (currentAlert) {
    document.body.removeChild(currentAlert);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};


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
    removeCurrentAlert();
  });

  alertSection.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.id === 'alert-current') {
      removeCurrentAlert();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(alert);
};


function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeCurrentAlert();
  }
}


export { showAlert };
