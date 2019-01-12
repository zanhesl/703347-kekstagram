'use strict';

(function () {

  var WIDTH_SCALE = 450;
  var BORDERS_OF_BRIGHTNESS = 2;
  var BORDERS_OF_BLUR = 3;
  var PERCENT = 100;
  var EFFECT_LEVEL_MAX = 1;
  var EFFECT_LEVEL_MIN = 0;
  var ORIGINAL = 'none';

  // открываем и закрываем форму редактирования изображения

  var textDescription = document.querySelector('.text__description');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadFileClose = uploadOverlay.querySelector('#upload-cancel');

  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  var onUploadPopupEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      if (window.util.hashTagsInput !== document.activeElement && textDescription !== document.activeElement) {
        closeUploadPopup();
      }
    }
  };

  var openUploadPopup = function () {
    uploadOverlay.classList.remove('hidden');
    getNone();
    document.addEventListener('keydown', onUploadPopupEscPress);
  };

  var closeUploadPopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadPopupEscPress);
    uploadFile.value = '';
  };

  uploadFile.addEventListener('change', function () {
    openUploadPopup();
  });

  uploadFileClose.addEventListener('click', function () {
    closeUploadPopup();
  });

  // Применение эффекта для изображения

  // Функции для эффектов (ползунок)

  var getNone = function () {
    slider.classList.add('hidden');
    for (var i = 1; i < effectNames.length - 1; i++) {
      effectsDirectory[effectNames[i]](EFFECT_LEVEL_MIN);
    }
  };

  var getChrome = function (grayScale) {
    preview.style.filter = 'grayscale(' + grayScale + ')';
  };

  var getSepia = function (sepia) {
    preview.style.filter = 'sepia(' + sepia + ')';
  };

  var getMarvin = function (invert) {
    preview.style.filter = 'invert(' + invert * PERCENT + '%)';
  };

  var getPhobos = function (blur) {
    preview.style.filter = 'blur(' + blur * BORDERS_OF_BLUR + 'px)';
  };

  var getHeat = function (brightness) {
    preview.style.filter = 'brightness(' + (brightness * BORDERS_OF_BRIGHTNESS + 1) + ')';
  };

  // Объект с вызовами фенкций для эффектов

  var effectsDirectory = {
    none: getNone,
    chrome: getChrome,
    sepia: getSepia,
    marvin: getMarvin,
    phobos: getPhobos,
    heat: getHeat
  };

  // Применение эффекта для изображения (иконки)

  var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var preview = document.querySelector('.img-upload__preview');
  var effectItems = document.querySelectorAll('.effects__radio');
  var currentFilter;
  var sliderEffectLevel = document.querySelector('.effect-level__pin');
  var sliderEffectDepth = document.querySelector('.effect-level__depth');
  var sliderEffectValue = document.querySelector('.effect-level__value');
  var slider = document.querySelector('.effect-level');
  var effectsDirectoryFilter;

  // функция которая устанавливает значения для ползунка

  var getSliderValue = function (value) {
    sliderEffectLevel.style.left = value + '%';
    sliderEffectDepth.style.width = value + '%';
    sliderEffectValue.value = value;
  };

  var addEffectListClickHandler = function (effects, effectName) {
    effects.addEventListener('click', function () {
      getSliderValue(PERCENT);
      preview.classList.remove(currentFilter);
      currentFilter = 'effects__preview--' + effectName;
      preview.classList.add(currentFilter);
      effectsDirectoryFilter = effectName;
      if (effectsDirectoryFilter === ORIGINAL) {
        getNone();
      } else {
        slider.classList.remove('hidden');
        effectsDirectory[effectsDirectoryFilter](EFFECT_LEVEL_MAX);
      }
    });
  };

  for (var j = 0; j < effectItems.length; j++) {
    addEffectListClickHandler(effectItems[j], effectNames[j]);
  }

  // Перетаскивание ползунка

  sliderEffectLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var movePin = sliderEffectLevel.offsetLeft - shift.x;

      if (movePin >= 0 && movePin <= WIDTH_SCALE) {
        var effectLevel = movePin / WIDTH_SCALE;
        var valuePin = effectLevel * PERCENT;
        getSliderValue(valuePin);
        effectsDirectory[effectsDirectoryFilter](effectLevel);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.form = {
    preview: preview
  };
})();
