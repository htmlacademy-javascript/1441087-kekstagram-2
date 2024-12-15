import { shuffleArray, debounce } from '../util.js';
import { showThumbnails } from './gallery.js';


const RANDOM_PICTURES_COUNT = 10;
const FILTER_TIMEOUT_DELAY = 500;


const imgFilters = document.querySelector('.img-filters');
const imgFilterButtons = imgFilters.querySelectorAll('.img-filters__button');


let picturesFromServer = [];


/**
 * Сравнивает изображения по количеству комментариев.
 */
const compareByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;


/**
 * Сортирует изображения выбранным методом.
 */
const sortPictures = {
  default: (pictures) => pictures,
  random: (pictures) => shuffleArray(pictures).slice(0, RANDOM_PICTURES_COUNT),
  discussed: (pictures) => pictures.sort(compareByComments)
};


/**
 * Отображает фильтр.
 */
const showFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

/**
 * Применяет выбранный фильтр для изображений.
 * @param {string} filterType Фильтр.
 * @param {Array} pictures Изображения.
 */
const applyFilter = (filterType = 'default', pictures = []) => {
  let filteredPictures = pictures.slice();
  filteredPictures = sortPictures[filterType](filteredPictures);

  showThumbnails(filteredPictures);
};


/**
 * Инициализирует фильтр для изображений.
 * @param {Array} pictures Изображения.
 */
const initializeFilter = (pictures = []) => {
  picturesFromServer = pictures;

  if (picturesFromServer) {
    showFilter();
  }
};


/**
 * Отображает текущий активный фильтр.
 * @param {object} currentFilterButton Кнопка выбранного фильтра.
 */
const showCurrentFilter = (currentFilterButton) => {
  imgFilterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  currentFilterButton.classList.add('img-filters__button--active');
};


const setImgFiltersClick = (cb) => {
  imgFilters.addEventListener('click', (evt) => {
    if (evt.target.type === 'button') {
      const currentFilter = evt.target.id.replace('filter-', '');

      showCurrentFilter(evt.target);

      cb(currentFilter);
    }
  });
};


setImgFiltersClick(
  debounce((currentFilter) => applyFilter(currentFilter, picturesFromServer), FILTER_TIMEOUT_DELAY)
);


export { initializeFilter };
