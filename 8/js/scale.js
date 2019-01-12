'use strict';

(function () {
  // Изменяем масштаб фото

  var ScaleValue = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var smallerButton = document.querySelector('.scale__control--smaller');
  var biggerButton = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var scalePhoto = function (directionScale) {
    var currentScale = parseInt(scaleControlValue.value, 10);
    currentScale = currentScale + (ScaleValue.STEP * directionScale);
    if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
      scaleControlValue.value = currentScale + '%';
      window.form.preview.style.transform = 'scale(' + currentScale / 100 + ')';
    }
  };

  smallerButton.addEventListener('click', function () {
    scalePhoto(-1);
  });

  biggerButton.addEventListener('click', function () {
    scalePhoto(1);
  });
})();
