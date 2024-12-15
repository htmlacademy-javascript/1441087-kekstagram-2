const DEFAULT_EFFECT = 'none';

const sliderSettings = {
  none: {
    range: {
      min: 0,
      max: 0,
    },
    step: 0,
    start: 0,
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  sepia:{
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  marvin:{
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  phobos:{
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  heat:{
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
};

const formImgUpload = document.querySelector('.img-upload__form');
const effectLevel = formImgUpload.querySelector('.img-upload__effect-level');
const inputEffectLevel = formImgUpload.querySelector('.effect-level__value');
const slider = formImgUpload.querySelector('.effect-level__slider');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');

let currentEffect = DEFAULT_EFFECT;


noUiSlider.create(slider, {
  range: {
    min: sliderSettings[DEFAULT_EFFECT].range.min,
    max: sliderSettings[DEFAULT_EFFECT].range.max,
  },
  step: sliderSettings[DEFAULT_EFFECT].step,
  start: sliderSettings[DEFAULT_EFFECT].range.max,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value)
  }
});


/**
 * Возвращает значение CSS-свойства для выбранного эффекта.
 */
const getEffectCss = {
  none: () => 'none',
  chrome: () => `grayscale(${inputEffectLevel.value})`,
  sepia: () => `sepia(${inputEffectLevel.value})`,
  marvin: () => `invert(${inputEffectLevel.value}%)`,
  phobos: () => `blur(${inputEffectLevel.value}px)`,
  heat: () => `brightness(${inputEffectLevel.value})`,
};


/**
 * Устанавливает настройки слайдера для текущего эффекта.
 * @param {string} effect Эффект.
 */
const setSliderSettings = () => {
  slider.noUiSlider.updateOptions(sliderSettings[currentEffect]);
  inputEffectLevel.value = sliderSettings[currentEffect].start;

  if (currentEffect === DEFAULT_EFFECT) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};


/**
 * Обновляет текущий эффект на изображении.
 */
const updatePictureEffect = () => {
  previewImg.style.filter = getEffectCss[currentEffect]();
};


/**
 * Устанавливает эффект по-умолчанию.
 */
const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  setSliderSettings();
  updatePictureEffect();
};


/**
 * Обрабатывает нажатие на список эффектов.
 */
const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    currentEffect = target.classList[1].replace('effects__preview--', '');
    setSliderSettings();
    updatePictureEffect();
  }
};


/**
 * Обрабатывает обновление значений слайдера.
 */
const onSliderUpdate = () => {
  inputEffectLevel.value = slider.noUiSlider.get();
  updatePictureEffect();
};


export { resetEffect, onEffectsListClick, onSliderUpdate };
