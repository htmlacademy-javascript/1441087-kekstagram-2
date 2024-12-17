import { shuffleArray, debounce } from '../util.js';
import { showThumbnails } from './gallery.js';


const RANDOM_PICTURES_COUNT = 10;
const FILTER_TIMEOUT_DELAY = 500;


const imgFilters = document.querySelector('.img-filters');
const imgFilterButtons = imgFilters.querySelectorAll('.img-filters__button');


let picturesFromServer = [];


const compareByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;


const filters = {
  default: {
    doSort: (pictures) => pictures
  },
  random: {
    doSort: (pictures) => shuffleArray(pictures).slice(0, RANDOM_PICTURES_COUNT)
  },
  discussed: {
    doSort: (pictures) => pictures.sort(compareByComments)
  }
};


const showFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
};


const applyFilter = (filter = 'default', pictures = []) => {
  let filteredPictures = pictures.slice();
  filteredPictures = filters[filter].doSort(filteredPictures);

  showThumbnails(filteredPictures);
};


const initializeFilter = (pictures = []) => {
  picturesFromServer = pictures;

  if (picturesFromServer) {
    showFilter();
  }
};


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
