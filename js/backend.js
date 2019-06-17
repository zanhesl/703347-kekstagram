(function () {

  window.backend = {
    receiveData : function(onLoad, onError){
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/kekstagram/data';
      xhr.responseType = 'json';

      xhr.addEventListener('load', function(){
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
        else {
          onError('Статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function(){
        onError('Ошибка!');
      });

      xhr.addEventListener('timeout', function(){
        onError('Таймаут!');
      });

      xhr.timeout = 10000;

      try {
        xhr.open('GET', URL);
        xhr.send();
      } catch (err) {
          onError('err');
      }


    },

    sendData : function(data, onLoad, onError){
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/kekstagram';
      xhr.responseType = 'json';

      xhr.addEventListener('load', function(){
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
        else {
          onError('Статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function(){
        onError('Ошибка!');
      });

      xhr.addEventListener('timeout', function(){
        onError('Таймаут!');
      });

      xhr.timeout = 10000;
      xhr.open('POST', URL);
      try {
        xhr.send(data);
      } catch (err) {
        // onError('err')
      }

    },

    printError : function(err){
      console.log(err);
    }
  }
})();
