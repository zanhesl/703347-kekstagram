'use strict';
(function(){
var uploadField = document.querySelector('#upload-file');
var editForm = document.querySelector('.img-upload__overlay');
var closeButton = document.querySelector('.img-upload__cancel');
var submitForm = document.querySelector('.img-upload__form');
var MAX_HASH_LENGTH = 20;
var MAX_HASHTAGS = 5;


var showForm = function(){
  editForm.classList.remove('hidden')

  document.addEventListener('keydown', function(evt){
    if ((evt.keyCode == 27)&&(document.activeElement != document.querySelector('.text__hashtags'))&&(document.activeElement != document.querySelector('.text__description'))){
      hideForm();
    }
  });
}

var hideForm = function(){
  editForm.classList.add('hidden');
  uploadField.value = '';
}

uploadField.addEventListener('change', function(evt){
  showForm();
});

closeButton.addEventListener('click', function(evt){
  evt.preventDefault();
  hideForm();
});

closeButton.addEventListener('keydown', function(evt){
  if (evt.keyCode == 13){
    hideForm();
  }
});

var submitButton = document.querySelector('.img-upload__submit');
var hashInput = document.querySelector('.text__hashtags');

hashInput.addEventListener('input', function(evt){
  var error = '';
  if (hashInput.value){
    var hashInputText = hashInput.value.toUpperCase().split(' ');
    var errorMessage = ''
    if (hashInputText.length > MAX_HASHTAGS){
      hashInput.setCustomValidity('Не более пяти хэштэгов!');
    };

    for (let i = 0; i < hashInputText.length; i++){
      if (hashInputText[i]){
        if (hashInputText[i].indexOf('#') != 0){
          errorMessage = 'Неверный формат хэштега - он должен начинаться с решетки';
        };
        if (hashInputText[i].indexOf('#', 1) > 0){
          errorMessage = 'Хэштэги должны разделяться пробелом';
        }
        if (hashInputText.indexOf(hashInputText[i]) != hashInputText.lastIndexOf(hashInputText[i])){
          errorMessage = 'Хэштэги не должны повторяться';
        }
        if (hashInputText[i].length > MAX_HASH_LENGTH){
          errorMessage = 'Слишком длинный хэштэг ' + i;
        }
        if (hashInputText[i] == '#'){
          errorMessage = 'Сообщение не может состоять только из хэштэга';
        };
      }
    }
    hashInput.setCustomValidity(errorMessage);
  }
});


var errorBox = function(err){
  hideForm();
  var errorTemplate = document.querySelector('#error').content;
  var errorSection = errorTemplate.querySelector('section');
  var retryButton = errorTemplate.querySelector('.error__button');

  document.querySelector('body').appendChild(errorTemplate);

  retryButton.addEventListener('click', function(){
    errorSection.style['display'] = 'none';
  });
}

submitForm.addEventListener('submit', function(evt){
  window.backend.sendData(new FormData(submitForm), function(response){
    console.log('Success! ');
    console.log(response);
    hideForm();
  }, errorBox);

  evt.preventDefault();
});
})();
