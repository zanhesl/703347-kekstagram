'use strict';
(function(){
window.pictures = function(photos){

var MAX_COMMENTS = 5;
var commentsBlock = document.querySelector('.social__comment-count');
var commentsCount = document.querySelector('.social__comment-count > .comments-count');
var loadCount = document.querySelector('.social__comments-loader');
var pictureBlock = document.querySelector('.pictures');

var createTemplate = function(photo){
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureFinal = pictureTemplate.cloneNode(true);

  var image = pictureFinal.querySelector('.picture__img');
  image['src'] = photo['url'];

  var likes = pictureFinal.querySelector('.picture__likes');
  likes.textContent = photo['likes'];

  var comments = pictureFinal.querySelector('.picture__comments');
  comments.textContent = photo['comments'].length;

  return pictureFinal
}


var fillPhotos = function(){
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++){
    var photoBlock = createTemplate(photos[i]);
    fragment.appendChild(photoBlock);
  }

  pictureBlock.appendChild(fragment);

  //Скрытие кнопки добавления комментариев в случае, если их меньше 5
var checkComments = function(){
  var commentsMaxStatus = (parseInt(commentsCount.textContent) >= MAX_COMMENTS) ? '' : 'hidden';
  var commentsMax = (commentsMaxStatus === '') ? MAX_COMMENTS : parseInt(commentsCount.textContent);
  var commentsMaxClone = commentsMax;
  if (commentsMaxStatus){
    loadCount.classList.add(commentsMaxStatus)
  }

  return commentsMax
}

  var fillBigPicture = function(photos, j){
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');

    var image = bigPicture.querySelector('.big-picture__img > img');
    // console.log(photos[2]);
    image['src'] = photos[j]['url'];

    var comments = bigPicture.querySelector('.comments-count');
    comments.innerHTML = '';
    comments.textContent = photos[j]['comments'].length;
    var commentsContainer = bigPicture.querySelector('.social__comments');
    commentsContainer.innerHTML = '';
    var fragment = document.createDocumentFragment();
    var commentsTemplate = document.querySelector('#comments').content;

    for (var i = 0; i < checkComments(); i++){
      var commentFragment = commentsTemplate.cloneNode(true);
      var fragmentImg = commentFragment.querySelector('img');
      fragmentImg['src'] = photos[j]['comments'][i]['avatar'];

      var commentText = commentFragment.querySelector('p');
      commentText.textContent = photos[j]['comments'][i]['message'];
      fragment.appendChild(commentFragment);
    }
    commentsContainer.appendChild(fragment);

    var description = bigPicture.querySelector('.social__caption');
    description.innerHTML = '';
    description.textContent = photos[j]['description'];

    var likesPhoto = document.querySelector('.likes-count');
    likesPhoto.textContent = photos[j]['likes'];

    document.addEventListener('keydown', function(evt){
      if ((evt.keyCode == 27)&&(document.activeElement != document.querySelector('.social__footer-text'))){
        closeBig();
      }
    })

    // loadCount.addEventListener('click', function(){
    //   if(checkComments()+5 <= )
    // })
  };


  var completeBigPictures = function(){

    var pictureBlock = document.querySelector('.pictures');
    var picturesArray = pictureBlock.querySelectorAll('.picture');
    for (let i = 0; i < picturesArray.length; i++){
      picturesArray[i].addEventListener('click', function(){
        fillBigPicture(photos, i);
        document.querySelector('body').classList.add('modal-open');
      });
      picturesArray[i].addEventListener('keydown', function(evt){
        if (evt.keyCode == 13){
          illBigPicture(photos, i);
          document.querySelector('body').classList.add('modal-open');
        }
      });
    }
  }
  completeBigPictures();

  var bigPictureClose = document.querySelector('.big-picture__cancel');

  var closeBig = function(){
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  };

  bigPictureClose.addEventListener('click', function(){
    closeBig();
  });
  bigPictureClose.addEventListener('keydown', function(evt){
    if (evt.keyCode == 13){
      closeBig();
    }
  });

  var imageFilter = document.querySelector('.img-filters');
  imageFilter.classList.remove('img-filters--inactive');

  return pictureBlock
};

fillPhotos();
};

window.pictureRemove = function(){
  var pictureBlock = document.querySelector('.pictures');
  var pictures = document.querySelectorAll('.picture');
  pictures.forEach(function(element){
  pictureBlock.removeChild(element);
  });
};

window.backend.receiveData(window.pictures, window.backend.printError);


})();
