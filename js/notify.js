const NOTIFY_DELAY = 5000;


const notifyTemplate = document.querySelector('#notify').content;


const notifyTypes = {
  error: {
    sectionClass: 'data-error',
    h2Class: 'data-error__title',
  }
};


const removeCurrentNotify = () => {
  document.querySelector('#notify-current').remove();
};


const showNotify = (type, message) => {
  const notify = notifyTemplate.cloneNode(true);
  const notifyType = notifyTypes[type];

  const notifySection = notify.querySelector('section');
  notifySection.classList.add(notifyType.sectionClass);

  const notifyTitle = notify.querySelector('h2');
  notifyTitle.classList.add(notifyType.h2Class);
  notifyTitle.textContent = message;

  document.body.append(notify);

  setTimeout(removeCurrentNotify, NOTIFY_DELAY);
};


export { showNotify };
