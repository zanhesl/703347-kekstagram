'use strict';

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

// Функция получающая случайный элементмассива

var getRandomElement = function (array) {
  var element = Math.floor(Math.random() * ((array.length) - 0)) + 0;
  return array[element];
};

// Создаём объект с данными для комментариев

var comments = [];

var getComments = function (count) {

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

getObjects(25);

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
    pictureElement.querySelector('.picture__comments').textContent = cardsData[i].comments[i].length;

    fragment.appendChild(pictureElement);
  }
  pictureListElement.appendChild(fragment);
};

createPictureElement(25);

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

var getBigPicture = function (item) {

  var userPicture = document.querySelector('.big-picture');
  userPicture.classList.remove('hidden');
  userPicture.querySelector('img').src = item.url;
  userPicture.querySelector('.likes-count').textContent = item.like;
  userPicture.querySelector('.comments-count').textContent = item.comments.length;
  userPicture.querySelector('.social__caption').textContent = item.description;
  createCommentElement(item.comments.length);
};

getBigPicture(cardsData[0]);

var commentCount = document.querySelector('.social__comment-count');
var commentLoad = document.querySelector('.comments-loader');

commentCount.classList.add('visually-hidden');
commentLoad.classList.add('visually-hidden');
