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
const effectsList = formImgUpload.querySelector('.effects__list');
const effectLevel = formImgUpload.querySelector('.img-upload__effect-level');
const effectLevelInput = formImgUpload.querySelector('.effect-level__value');
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


const effects = {
  none: {
    getEffectCss: () => 'none'
  },
  chrome: {
    getEffectCss: () => `grayscale(${effectLevelInput.value})`
  },
  sepia: {
    getEffectCss: () => `sepia(${effectLevelInput.value})`
  },
  marvin: {
    getEffectCss: () => `invert(${effectLevelInput.value}%)`
  },
  phobos: {
    getEffectCss: () => `blur(${effectLevelInput.value}px)`
  },
  heat: {
    getEffectCss: () => `brightness(${effectLevelInput.value})`
  }
};


const setSliderSettings = () => {
  slider.noUiSlider.updateOptions(sliderSettings[currentEffect]);
  effectLevelInput.value = sliderSettings[currentEffect].start;

  if (currentEffect === DEFAULT_EFFECT) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};


const updateEffect = () => {
  previewImg.style.filter = effects[currentEffect].getEffectCss();
};


const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  setSliderSettings();
  updateEffect();
};


const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    currentEffect = target.classList[1].replace('effects__preview--', '');
    setSliderSettings();
    updateEffect();
  }
};


const onSliderUpdate = () => {
  effectLevelInput.value = slider.noUiSlider.get();
  updateEffect();
};


effectsList.addEventListener('click', onEffectsListClick);
slider.noUiSlider.on('update', onSliderUpdate);


export { resetEffect };
