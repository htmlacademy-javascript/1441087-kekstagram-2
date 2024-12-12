const NOTIFY_DELAY = 5000;
const notifyTemplate = document.querySelector('#notify').content;
const notifyTypes = {
  error: {
    sectionClass: 'data-error',
    h2Class: 'data-error__title',
  }
};

/**
 * Убирает текущее уведомление со страницы.
 */
const removeNotify = () => {
  document.querySelector('#notify-current').remove();
};

/**
 * Показывает переданное сообщение в виде уведомления указанного типа.
 * @param {string} type Тип уведомления.
 * @param {string} message Сообщение.
 */
const showNotify = (type, message) => {
  const notify = notifyTemplate.cloneNode(true);
  const notifyType = notifyTypes[type];

  const notifySection = notify.querySelector('section');
  notifySection.classList.add(notifyType.sectionClass);

  const notifyTitle = notify.querySelector('h2');
  notifyTitle.classList.add(notifyType.h2Class);
  notifyTitle.textContent = message;

  document.body.append(notify);

  setTimeout(removeNotify, NOTIFY_DELAY);
};

export { showNotify };
