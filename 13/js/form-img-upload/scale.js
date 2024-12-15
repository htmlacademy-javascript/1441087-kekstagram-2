const SCALE_RADIX = 10;
const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};


const formImgUpload = document.querySelector('.img-upload__form');
const previewImg = formImgUpload.querySelector('.img-upload__preview img');
const scaleSmaller = formImgUpload.querySelector('.scale__control--smaller');
const scaleBigger = formImgUpload.querySelector('.scale__control--bigger');
const scaleValueInput = formImgUpload.querySelector('.scale__control--value');


/**
 * Обновляет масштаб загружаемого изображения.
 * @param {number} factor \-1 для уменьшения, 1 для увеличения масштаба.
 */
const updateScale = (factor = 1) => {
  const currentScale = parseInt(scaleValueInput.value, SCALE_RADIX);
  const newScale = currentScale + Scale.STEP * factor;

  if (newScale >= Scale.MIN && newScale <= Scale.MAX) {
    scaleValueInput.value = `${newScale.toString()}%`;
    previewImg.style.transform = `scale(${newScale / 100})`;

    scaleSmaller.disabled = newScale <= Scale.MIN;
    scaleBigger.disabled = newScale >= Scale.MAX;
  }
};


/**
 * Сбрасывает масштаб загружаемого изображения.
 */
const resetScale = () => {
  scaleValueInput.value = '100%';
  previewImg.style.transform = 'scale(1)';
  scaleSmaller.disabled = false;
  scaleBigger.disabled = false;
};


const onScaleSmallerClick = () => {
  updateScale(-1);
};


const onScaleBiggerClick = () => {
  updateScale(1);
};


scaleSmaller.addEventListener('click', onScaleSmallerClick);
scaleBigger.addEventListener('click', onScaleBiggerClick);


export { resetScale };
