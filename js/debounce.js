(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (fun) {
    var lastTimeout = null;

    return function() {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }
})();
