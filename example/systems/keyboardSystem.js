(function() {

  function KeyboardSystem() {
    this.keysDown = new Dictionary();
    this.onKeyDown = new Event();
    this.onKeyUp = new Event();
  }

  KeyboardSystem.prototype = Object.create(System.prototype);
  KeyboardSystem.constructor = KeyboardSystem;

  KeyboardSystem.prototype.initialize = function() {
    var that = this;
    
    function keydown(e) {
      that.keydown(e);
    }

    function keyup(e) {
      that.keyup(e);
    }

    if (document.addEventListener) {
      document.addEventListener("keydown", keydown, false);
      document.addEventListener("keyup", keyup, false);
    } else if (document.attachEvent) {
       document.attachEvent("onkeydown", keydown);
       document.attachEvent("onkeyup", keyup);
    } else {
       document.onkeydown = keydown;
       document.onkeypress = keypress;
    }
  };

  KeyboardSystem.prototype.keydown = function(e) {
    e = e || window.event;
    var key = e.keyCode;
    this.keysDown.add(key);
    this.onKeyDown.emit({key: key});
  };

  KeyboardSystem.prototype.keyup = function(e) {
    e = e || window.event;
    var key = e.keyCode;
    if (this.keysDown.has(key)) {
      this.keysDown.remove(key);
      this.onKeyUp.emit({key: key});
    }
  };

  this.KeyboardSystem = KeyboardSystem;

})();
