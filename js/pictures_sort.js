(function(){
  var buttonsArray = document.querySelectorAll('.img-filters__button');

  buttonsArray.forEach(function(element){
    element.addEventListener('click', function(evt){
      evt.preventDefault();
      var activeButton = document.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      element.classList.add('img-filters__button--active');
      window.backend.receiveData(window.debounce(dataSortsMap[element.id]), window.backend.printError)
    })
  });

  var dataSortsMap = {
    'filter-popular' : function(data){
      window.pictureRemove();
      window.pictures(data);
      return data
    },

    'filter-new' : function(data){
      var dataCopy = data.slice();
      dataCopy.sort(function(a, b){
        return Math.random() - 0.5;
      });

      window.pictureRemove();
      window.pictures(dataCopy.slice(0, 10));

      return dataCopy.slice(0, 10);
    },

    'filter-discussed' : function(data){
      var dataCopy = data.slice();
      dataCopy.sort(function(a, b){
        return b.comments.length - a.comments.length;
      });

      window.pictureRemove();
      window.pictures(dataCopy);

      return dataCopy;
    }
  }

})();
