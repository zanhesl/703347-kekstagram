(function(){
  var controlMinus = document.querySelector('.scale__control--smaller');
  var controlPlus = document.querySelector('.scale__control--bigger');
  var controlValue = document.querySelector('.scale__control--value');
  var image = document.querySelector('.img-upload__preview > img');

  var scalingMap = {
    'minus' : function(){
      if (controlValue.value != '0%'){
        var numberValue = parseInt(controlValue.value.split('%')[0]);
        image.style.transform = 'scale(' + (numberValue - 25)/100 + ')' ;
        console.log(image.style.transform);
        controlValue.value = numberValue - 25 + '%';
      }
    },

    'plus' : function(){
      if (controlValue.value != '100%'){
        var numberValue = parseInt(controlValue.value.split('%')[0]);
        image.style.transform = 'scale(' + (numberValue + 25)/100 + ')' ;
        console.log(image.style.transform);
        controlValue.value = numberValue + 25 + '%';
      }
    }
  }

  controlMinus.addEventListener('click', function(evt){
    evt.preventDefault();
    scalingMap['minus']();
  });

  controlMinus.addEventListener('keydown', function(evt){
    evt.preventDefault();
    if (evt.keyCode === 13){
      scalingMap['minus']();
    };
  });

  controlPlus.addEventListener('click', function(evt){
    evt.preventDefault();
    scalingMap['plus']();
  });

  controlPlus.addEventListener('keydown', function(evt){
    evt.preventDefault();
    if (evt.keyCode === 13){
      scalingMap['plus']();
    };
  });
})();
