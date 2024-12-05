const EFFECT_RADIX = 10; // Система счисления.
const EFFECTS_STEP = 0.1;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;
const SliderDefault = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
  START: 100
};

const formImgUpload = document.querySelector('.img-upload__form');
const effectLevel = formImgUpload.querySelector('.img-upload__effect-level');
const inputEffectLevel = formImgUpload.querySelector('.effect-level__value');
const slider = formImgUpload.querySelector('.effect-level__slider');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');

let currentEffect = 'none';


// Создание экземпляра слайдера.
noUiSlider.create(slider, {
  range: {
    min: SliderDefault.MIN,
    max: SliderDefault.MAX,
  },
  step: SliderDefault.STEP,
  start: SliderDefault.START,
  connect: 'lower',
});


/**
 * Возвращает значение CSS-свойства для выбранного эффекта.
 */
const effects = {
  none: () => 'none',
  chrome: () => `grayscale(${parseInt(inputEffectLevel.value, EFFECT_RADIX) * EFFECTS_STEP})`,
  sepia: () => `sepia(${parseInt(inputEffectLevel.value, EFFECT_RADIX) * EFFECTS_STEP})`,
  marvin: () => `invert(${Math.floor(inputEffectLevel.value)}%)`,
  phobos: () => `blur(${(parseInt(inputEffectLevel.value, EFFECT_RADIX) * MAX_BLUR_VALUE) * EFFECTS_STEP}px)`,
  heat: () => `brightness(${(parseInt(inputEffectLevel.value, EFFECT_RADIX) * MAX_BRIGHTNESS) * EFFECTS_STEP})`
};


/**
 * Устанавливает слайдер в изначальное положение.
 */
const sliderReset = () => {
  slider.noUiSlider.set(SliderDefault.START);
  inputEffectLevel.value = SliderDefault.START;
};


/**
 * Применяет новый эффект.
 * @param {string} effect Эффект.
 */
const effectUpdate = (effect) => {
  if (effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
  previewImg.style.filter = effects[effect]();
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
    sliderReset();
    currentEffect = target.classList[1].replace('effects__preview--', '');
    effectUpdate(currentEffect);
  }
};


/**
 * Обрабатывает изменение интенсивности эффекта.
 */
const onSliderUpdate = () => {
  inputEffectLevel.value = slider.noUiSlider.get();
  effectUpdate(currentEffect);
};


export { effectUpdate, sliderReset, onEffectsListClick, onSliderUpdate };
