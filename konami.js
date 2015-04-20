'use strict';

var onKonami = (function () {
  //Key codes
  var ENTER = 13,
      ARROW_LEFT = 37,
      ARROW_UP = 38,
      ARROW_RIGHT = 39,
      ARROW_DOWN = 40,
      A = 65,
      B = 66;


  function KonamiHandler(callback, timeout) {
    this._callback = callback;
    this._currPosition = 0;
    this._timeout = timeout || 500;
    this._lastKeyPress = 0;
  }

  KonamiHandler.prototype._code = [
    ARROW_UP,
    ARROW_UP,
    ARROW_DOWN,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
    ARROW_LEFT,
    ARROW_RIGHT,
    B,
    A,
    ENTER
  ];

  KonamiHandler.prototype.handleKey = function (e) {
    var key = e && (e.keyCode || e.key);
    var now = Date.now();
    if (now - this._lastKeyPress > this._timeout) {
      this._currPosition = 0;
    }
    if (key === this._code[this._currPosition]) {
      if (++this._currPosition === this._code.length) {
        this._callback();
        this._currentPosition = 0;
      }
    } else {
      this._currPosition = 0;
    }
    this._lastKeyPress = now;
  };

  return function onKonami(callback) {
    var konamiHandler = new KonamiHandler(callback);
    window.addEventListener('keydown',
        konamiHandler.handleKey.bind(konamiHandler), true);
  };
})();
