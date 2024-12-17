const DEFAULT_EFFECT = 'none';


const effects = {
  none: {
    sliderSettings: {
      range: {
        min: 0,
        max: 0,
      },
      step: 0,
      start: 0,
    },
    getEffectCss: () => 'none'
  },
  chrome: {
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    getEffectCss: (value) => `grayscale(${value})`
  },
  sepia: {
    sliderSettings: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    getEffectCss: (value) => `sepia(${value})`
  },
  marvin: {
    sliderSettings: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    getEffectCss: (value) => `invert(${value}%)`
  },
  phobos: {
    sliderSettings: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    getEffectCss: (value) => `blur(${value}px)`
  },
  heat: {
    sliderSettings: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    getEffectCss: (value) => `brightness(${value})`
  }
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
    min: effects[DEFAULT_EFFECT].sliderSettings.range.min,
    max: effects[DEFAULT_EFFECT].sliderSettings.range.max,
  },
  step: effects[DEFAULT_EFFECT].sliderSettings.step,
  start: effects[DEFAULT_EFFECT].sliderSettings.range.max,
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


const setSliderSettings = () => {
  slider.noUiSlider.updateOptions(effects[currentEffect].sliderSettings);
  effectLevelInput.value = effects[currentEffect].sliderSettings.start;

  if (currentEffect === DEFAULT_EFFECT) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};


const updateEffect = () => {
  previewImg.style.filter = effects[currentEffect].getEffectCss(effectLevelInput.value);
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
