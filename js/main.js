import { getData } from './api.js';
import { showThumbnails } from './gallery/gallery.js';
import { initializeFilter } from './gallery/filter.js';
import { showNotify } from './notify.js';
import './form-img-upload/form-img-upload.js';


const startApp = () => {
  getData()
    .then((pictures) => {
      showThumbnails(pictures);
      initializeFilter(pictures);
    })
    .catch((err) => showNotify('error', err.message));
};


startApp();
