const notifyTemplate = document.querySelector('#notify').content;

const notifyTypes = {
  getError: {
    sectionClass: 'data-error',
    h2Class: 'data-error__title',
    h2Text: 'Не удалось загрузить данные',
  },
};


const hideNotify = () => {
  document.querySelector('#notify-current').remove();
};


const showNotify = (notifyToShow) => {
  const notify = notifyTemplate.cloneNode(true);
  const notifyType = notifyTypes[notifyToShow];

  const notifySection = notify.querySelector('section');
  notifySection.classList.add(notifyType.sectionClass);

  const notifyTitle = notify.querySelector('h2');
  notifyTitle.classList.add(notifyType.h2Class);
  notifyTitle.textContent = notifyType.h2Text;

  document.body.append(notify);

  setTimeout(hideNotify, 5000);
};

showNotify('getError');

export { showNotify };
