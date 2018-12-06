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

// Создаем массив объектов с даннми описывающими фото

var cardsData = [];

var getObjects = function (quantity) {
  for (var i = 1; i < quantity + 1; i++) {
    var object = {
      url: 'photos/' + i + '.jpg',
      like: getRandomInt(15, 200)
    };

    cardsData.push(object);
  }
  return cardsData;
};

getObjects(25);

// Создаем элементы в разметке

var pictureListElement = document.querySelector('.pictures');

var createPictureElement = function () {

  var fragment = document.createDocumentFragment();
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  for (var i = 0; i < 25; i++) {

    var picturesItems = document.createElement('div');

    var pictureElement = picture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = cardsData[i].url;
    pictureElement.querySelector('.picture__likes').textContent = cardsData[i].like;
    pictureElement.querySelector('.picture__comments').textContent = cardsData[i].message;

    picturesItems.appendChild(pictureElement);
    fragment.appendChild(picturesItems);
  }

  pictureListElement.appendChild(fragment);

};

createPictureElement();

// Создаём объект с данными для комментариев

var comments = [];

var getComments = function (count) {
  for (var i = 0; i < count; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: usersComments[getRandomInt(0, 5)],
      name: usersName[getRandomInt(0, 5)],
      commentsCount: getRandomInt(1, 200)
    };
  }
  comments.push(comment);
};

getComments(2);

// Показываем большое фото и вставляем комментарии в разметку

var getBigPictureComments = function (count) {

  var userPicture = document.querySelector('.big-picture');
  userPicture.classList.remove('hidden');
  userPicture.querySelector('img').src = cardsData[0].url;
  userPicture.querySelector('.likes-count').textContent = cardsData[0].like;
  userPicture.querySelector('.comments-count').textContent = comments[0].commentsCount;
  for (var i = 0; i < count; i++) {
    userPicture.querySelector('.social__comments .social__picture').src = comments[i].avatar;
    userPicture.querySelector('.social__comments .social__text').textContent = comments[i].message;
  }
};

getBigPictureComments(2);
