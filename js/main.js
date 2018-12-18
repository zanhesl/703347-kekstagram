'use strict';

var ESC_KEYCODE = 27;
var QUANTITY_ELEMENTS = 25;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
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

// Функция получающая случайный элемент массива

var getRandomElement = function (array) {
  var element = Math.floor(Math.random() * array.length);
  return array[element];
};

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

var cardsData = [];

var getObjects = function (quantity) {
  for (var i = 1; i < quantity + 1; i++) {
    var object = {
      url: 'photos/' + i + '.jpg',
      like: getRandomInt(15, 200),
      comments: getComments(6),
      description: 'Тестим новую камеру!'
    };

    cardsData.push(object);
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
    pictureElement.querySelector('.picture__img').src = cardsData[i].url;
    pictureElement.querySelector('.picture__likes').textContent = cardsData[i].like;
    pictureElement.querySelector('.picture__comments').textContent = cardsData[i].comments.length;

    fragment.appendChild(pictureElement);
  }
  pictureListElement.appendChild(fragment);
};

createPictureElement(cardsData.length);

// Создаём элементы для комментариев

var commentListItems = document.querySelector('.social__comments');

var createCommentElement = function (number) {

  var fragment = document.createDocumentFragment();
  var liForComment = document.querySelector('.social__comment');


  for (var i = 0; i < number; i++) {
    var commentElement = liForComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = cardsData[0].comments[i].avatar;
    commentElement.querySelector('.social__text').textContent = cardsData[0].comments[i].message;

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
  addPictureClickHandler(pictureItems[i], cardsData[i]);
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
    closeUploadPopup();
  }
};

var openUploadPopup = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadPopupEscPress);
};

var closeUploadPopup = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadPopupEscPress);
  preview.setAttribute('class', 'img-upload__preview');
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
/*
var getChrome = function (grayScale) {
  preview.style.filter = 'grayscale(' + grayScale + ')';
};

var getSepia = function (sepia) {
  preview.style.filter = 'sepia(' + sepia + ')';
};

var getMarvin = function (invert) {
  preview.style.filter = 'invert(' + invert + ')';
};

var getPhobos = function (blur) {
  preview.style.filter = 'blur(' + blur + ')';
};

var getHeat = function (brightness) {
  preview.style.filter = 'brightness(' + brightness + ')';
};

// Объект с вызовами фенкций для эффектов

var effectsDirectory = {
  chrome: getChrom(effectLevel),
  sepia: getSepia(effectLevel),
  marvin: getMarvin(effectLevel * 100),
  phobos: getPhobos(effectLevel * 5),
  heat: getHeat(effectLevel * 3)
}; */
// Применение эффекта для изображения (иконки)

var effectNames = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
var preview = document.querySelector('.img-upload__preview');
var effectList = document.querySelectorAll('.effects__radio');

var addEffectListClickHandler = function (effects, effectName) {
  effects.addEventListener('click', function () {
    preview.setAttribute('class', 'img-upload__preview');
    preview.classList.add('effects__preview--' + effectName);
  });

/* sliderEffectLevel.addEventListener('mouseup', function () {
  var effectLevel = offsetLeft / offsetWidthb * 100;
}); */
};

for (var j = 0; j < effectList.length; j++) {
  addEffectListClickHandler(effectList[j], effectNames[j]);
}
