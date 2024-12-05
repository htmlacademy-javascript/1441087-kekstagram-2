const EFFECT_RADIX = 10; // Система счисления.
const EFFECT_STEP = 0.01;
const MAX_BLUR_VALUE = 3;
const MAX_BRIGHTNESS = 3;
const DEFAULT_EFFECT = 'none';
const DEFAULT_EFFECT_LEVEL = 100;

const SliderDefault = {
  MIN: 0,
  MAX: 100,
  STEP: 1
};

const formImgUpload = document.querySelector('.img-upload__form');
const effectLevel = formImgUpload.querySelector('.img-upload__effect-level');
const inputEffectLevel = formImgUpload.querySelector('.effect-level__value');
const slider = formImgUpload.querySelector('.effect-level__slider');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');

let currentEffect = DEFAULT_EFFECT;


// Создание экземпляра слайдера.
noUiSlider.create(slider, {
  range: {
    min: SliderDefault.MIN,
    max: SliderDefault.MAX,
  },
  step: SliderDefault.STEP,
  start: DEFAULT_EFFECT_LEVEL,
  connect: 'lower',
});


/**
 * Возвращает значение CSS-свойства для выбранного эффекта.
 */
const effects = {
  none: () => 'none',
  chrome: () => `grayscale(${parseInt(inputEffectLevel.value, EFFECT_RADIX) * EFFECT_STEP})`,
  sepia: () => `sepia(${parseInt(inputEffectLevel.value, EFFECT_RADIX) * EFFECT_STEP})`,
  marvin: () => `invert(${Math.floor(inputEffectLevel.value)}%)`,
  phobos: () => `blur(${(parseInt(inputEffectLevel.value, EFFECT_RADIX) * MAX_BLUR_VALUE) * EFFECT_STEP}px)`,
  heat: () => `brightness(${(parseInt(inputEffectLevel.value, EFFECT_RADIX) * MAX_BRIGHTNESS) * EFFECT_STEP})`
};


/**
 * Устанавливает слайдер в изначальное положение.
 */
const sliderReset = () => {
  slider.noUiSlider.set(DEFAULT_EFFECT_LEVEL);
  inputEffectLevel.value = DEFAULT_EFFECT_LEVEL;

  if (currentEffect === DEFAULT_EFFECT) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};


/**
 * Обновляет текущий эффект на изображении.
 */
const effectUpdate = () => {
  previewImg.style.filter = effects[currentEffect]();
};


/**
 * Устанавливает эффект по-умолчанию.
 */
const effectReset = () => {
  currentEffect = DEFAULT_EFFECT;
  sliderReset();
  effectUpdate();
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
    sliderReset();
    effectUpdate();
  }
};


/**
 * Обрабатывает изменение интенсивности эффекта.
 */
const onSliderUpdate = () => {
  inputEffectLevel.value = slider.noUiSlider.get();
  effectUpdate();
};


export { effectReset, onEffectsListClick, onSliderUpdate };
