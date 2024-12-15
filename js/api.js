const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Ошибка загрузки файла',
};


/**
 * Выполняет вызов с помощью Fetch API.
 * @param {string} route Маршрутизация относительно базового URL.
 * @param {string} errorText Сообщение на случай ошибки.
 * @param {string} method Метод HTTP-запроса.
 * @param {object} body Данные для передачи.
 * @returns
 */
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });


const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);


const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);


export { getData, sendData };
