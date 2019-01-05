'use strict';

var ESC_KEYCODE = 27;
var QUANTITY_ELEMENTS = 25;
var QUANTITY_HASH_TAG = 5;
var HASH_TAG_LENGTH = 20;
var WIDTH_SCALE = 450;
var ScaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

// Функция получающая случайный элемент массива

var getRandomElement = function (array) {
  var element = getRandomInt(0, array.length);
  return array[element];
};

var usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var usersName = ['Акакий', 'Зигмунд', 'Апполинарий', 'Дормидонт', 'Сигизмунд', 'Феофан'];

// Создаём объект с данными для комментариев

var getComments = function (count) {
  var comments = [];

  for (var i = 0; i < count; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: getRandomElement(usersComments),
      name: getRandomElement(usersName)
    };
    comments.push(comment);
  }
  return comments;
};

// Создаем массив объектов с даннми описывающими фото

var cards = [];

var getObjects = function (quantity) {
  for (var i = 1; i < quantity + 1; i++) {
    var object = {
      url: 'photos/' + i + '.jpg',
      like: getRandomInt(15, 200),
      comments: getComments(6),
      description: 'Тестим новую камеру!'
    };

    cards.push(object);
  }
};

getObjects(QUANTITY_ELEMENTS);

// Создаем элементы для маленьких фото в разметке

var pictureListElement = document.querySelector('.pictures');

var createPictureElement = function (number) {

  var fragment = document.createDocumentFragment();
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  for (var i = 0; i < number; i++) {

    var pictureElement = picture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = cards[i].url;
    pictureElement.querySelector('.picture__likes').textContent = cards[i].like;
    pictureElement.querySelector('.picture__comments').textContent = cards[i].comments.length;

    fragment.appendChild(pictureElement);
  }
  pictureListElement.appendChild(fragment);
};

createPictureElement(cards.length);

// Создаём элементы для комментариев

var commentListItems = document.querySelector('.social__comments');

var createCommentElement = function (number) {

  var fragment = document.createDocumentFragment();
  var liForComment = document.querySelector('.social__comment');


  for (var i = 0; i < number; i++) {
    var commentElement = liForComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = cards[0].comments[i].avatar;
    commentElement.querySelector('.social__text').textContent = cards[0].comments[i].message;

    fragment.appendChild(commentElement);
  }
  commentListItems.appendChild(fragment);
};

// Показываем большое фото

var userPicture = document.querySelector('.big-picture');

var getBigPicture = function (item) {

  userPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
  userPicture.querySelector('img').src = item.url;
  userPicture.querySelector('.likes-count').textContent = item.like;
  userPicture.querySelector('.comments-count').textContent = item.comments.length;
  userPicture.querySelector('.social__caption').textContent = item.description;
  createCommentElement(item.comments.length);
};

var pictureItems = document.querySelectorAll('.picture');

var addPictureClickHandler = function (pictureItem, dataCard) {
  pictureItem.addEventListener('click', function () {
    getBigPicture(dataCard);
  });
};

for (var i = 0; i < pictureItems.length; i++) {
  addPictureClickHandler(pictureItems[i], cards[i]);
}

// Закрываем большое фото

var bigPictureCansel = document.querySelector('#picture-cancel');

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  userPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

bigPictureCansel.addEventListener('click', function () {
  closeBigPicture();
});

// прячем блоки счётчика комментариев и загрузки новых комментариев

var commentCount = document.querySelector('.social__comment-count');
var commentLoad = document.querySelector('.comments-loader');

commentCount.classList.add('visually-hidden');
commentLoad.classList.add('visually-hidden');

// открываем и закрываем форму редактирования изображения

var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadFileClose = uploadOverlay.querySelector('#upload-cancel');

var onUploadPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (hashTagsInput !== document.activeElement) {
      if (textDescription !== document.activeElement) {
        closeUploadPopup();
      }
    }
  }
};

var openUploadPopup = function () {
  uploadOverlay.classList.remove('hidden');
  effectsDirectory.none();
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

// Применение эффекта для изображения (ползунок)

// Функции для эффектов

var getNone = function () {
  slider.classList.add('hidden');
};

var getChrome = function (grayScale) {
  preview.style.filter = 'grayscale(' + grayScale + ')';
};

var getSepia = function (sepia) {
  preview.style.filter = 'sepia(' + sepia + ')';
};

var getMarvin = function (invert) {
  preview.style.filter = 'invert(' + invert * 100 + '%)';
};

var getPhobos = function (blur) {
  preview.style.filter = 'blur(' + blur * 5 + 'px)';
};

var getHeat = function (brightness) {
  preview.style.filter = 'brightness(' + (brightness * 2 + 1) + ')';
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
var sliderEffectdepth = document.querySelector('.effect-level__depth');
var sliderEffectValue = document.querySelector('.effect-level__value');
var sliderEffectline = document.querySelector('.effect-level__line');
var slider = document.querySelector('.effect-level');
var effectsDirectoryFilter;

var addEffectListClickHandler = function (effects, effectName) {
  effects.addEventListener('click', function () {
    sliderEffectLevel.style.left = 100 + '%';
    sliderEffectdepth.style.width = 100 + '%';
    slider.classList.remove('hidden');
    preview.classList.remove(currentFilter);
    currentFilter = 'effects__preview--' + effectName;
    preview.classList.add(currentFilter);
    effectsDirectoryFilter = effectName;
    if (effectName === 'none') {
      effectsDirectory.none();
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
    var coordsPin = movePin + 'px';

    if (movePin >= 0 && movePin <= WIDTH_SCALE) {
      sliderEffectLevel.style.left = coordsPin;
      sliderEffectdepth.style.width = coordsPin;
      var effectLevel = sliderEffectLevel.offsetLeft / sliderEffectline.offsetWidth;
      effectsDirectory[effectsDirectoryFilter](effectLevel);
      sliderEffectValue.value = effectLevel * 100;
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

// Изменяем масштаб фото

var smallerButton = document.querySelector('.scale__control--smaller');
var biggerButton = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');

var scalePhoto = function (directionScale) {
  var currentScale = parseInt(scaleControlValue.value, 10);
  currentScale = currentScale + (ScaleValue.STEP * directionScale);
  if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
    scaleControlValue.value = currentScale + '%';
    preview.style.transform = 'scale(' + currentScale / 100 + ')';
  }
};

smallerButton.addEventListener('click', function () {
  scalePhoto(-1);
});

biggerButton.addEventListener('click', function () {
  scalePhoto(1);
});

// Валидация формы
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы

var hashTagsInput = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');

// Хэш-тэги
// Функция считающая хэш-тэги

var getCountHashTag = function (text) {
  var count = 0;
  var pos = text.indexOf('#');

  while (pos !== -1) {
    count++;
    pos = text.indexOf('#', pos + 1);
  }
  return count;
};

// Функция которая ищет одинаковые хэш-тэги

var removeSameElement = function (elements) {
  var obj = {};
  for (var u = 0; u < elements.length; u++) {
    var element = elements[u];
    obj[element] = true; // запомнить строку в виде свойства объекта
  }
  return Object.keys(obj);
};

hashTagsInput.addEventListener('input', function () {
  var hashTagText = hashTagsInput.value.trim();
  var hashTags = hashTagText.toLowerCase().split(' ');
  var errorMessage = '';
  if (getCountHashTag(hashTagText) > QUANTITY_HASH_TAG) {
    errorMessage = 'Нельзя указать больше пяти хэш-тегов';
  }

  if (removeSameElement(hashTags).length < hashTags.length) {
    errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
  }

  for (var I = 0; I < hashTags.length; I++) {
    var hashTag = hashTags[I];
    if (hashTag[0] !== '#') {
      errorMessage = 'Хэш-тег должен начинаться с решетки #';
    } else if (hashTag.length === 1) {
      errorMessage = 'Хеш-тег не может состоять только из одной решётки';
    } else if (hashTag.length > HASH_TAG_LENGTH) {
      errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    } else if (hashTag.indexOf('#', 1) > 1) {
      errorMessage = 'Хэштеги должны разделяться пробелами';
    }
  }
  if (hashTag === '') {
    errorMessage = '';
  }

  hashTagsInput.setCustomValidity(errorMessage);
});
