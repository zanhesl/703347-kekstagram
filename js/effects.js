(function(){
'use strict';
var sliderPin = document.querySelector('.effect-level__pin');
var slider = document.querySelector('.img-upload__effect-level');
var imagePreview = document.querySelector('.img-upload__preview');
var activeLength = document.querySelector('.effect-level__depth');
var fullLength = document.querySelector('.effect-level__line');
var depthLevel = document.querySelector('.effect-level__value');

var OFFSET_START = 21;
var MAX_PERCENT = 100;
var EFFECT_MULTIPLIER = 3;
var effectsMap = {
  'none' : function(effect){
    imagePreview.style.filter = 'none'
    slider.classList.add('hidden');
    depthLevel.value = effect;
  },

  'chrome' : function(effect){
    imagePreview.style.filter = 'grayscale(' + effect + ')';
    slider.classList.remove('hidden');
    depthLevel.value = effect;
  },

  'sepia' : function(effect){
    imagePreview.style.filter = 'sepia(' + effect + ')';
    slider.classList.remove('hidden');
    depthLevel.value = effect;
  },

  'marvin' : function(effect){
    imagePreview.style.filter = 'invert(' + effect * MAX_PERCENT + '%)';
    slider.classList.remove('hidden');
    depthLevel.value = effect;
  },

  'phobos' : function(effect){
    imagePreview.style.filter = 'blur(' + effect * EFFECT_MULTIPLIER + 'px)';
    slider.classList.remove('hidden');
    depthLevel.value = effect;
  },

  'heat' : function(effect){
    imagePreview.style.filter = 'brightness(' + effectDepth*EFFECT_MULTIPLIER + ')';
    slider.classList.remove('hidden');
    depthLevel.value = effect;
  }
}

var applyEffect = function(){
  var effectDepth = activeLength.offsetWidth/fullLength.offsetWidth;

  var effectType = document.querySelector('.effects__radio:checked').value;
  effectsMap[effectType](effectDepth);
}





sliderPin.addEventListener('mousedown', function(evt){
  evt.preventDefault();
  var cordX = evt.clientX;
  var onMouseMove = function(moveEvt){
    moveEvt.preventDefault();
    var shift = cordX - moveEvt.clientX;
    cordX = moveEvt.clientX;
    if (((sliderPin.offsetLeft - shift + OFFSET_START) > fullLength.offsetLeft)&&((sliderPin.offsetLeft - shift + OFFSET_START) < (fullLength.offsetLeft+fullLength.offsetWidth))){
      sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
      activeLength.style.width = (sliderPin.offsetLeft - shift) + 'px';
      applyEffect();
    }
  };

  var onMouseUp = function(upEvt){
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp)
})




var effectsArray = document.querySelectorAll('.effects__list > li');
for (var i = 0; i < effectsArray.length; i++){
  var effectRadio = effectsArray[i].querySelector('input');
  effectRadio.addEventListener('change', function(){
    applyEffect();
  });
}
})();
