(function() {

  function Event() {
    this.listeners = [];
  }

  Event.prototype.emit = function(obj) {
    this.listeners.forEach(function(func) {
      func(obj);
    });
  };

  Event.prototype.addListener = function(func) {
    if (this.listeners.indexOf(func) < 0) {
      this.listeners.push(func);
    }
  };

  Event.prototype.removeListener = function(func) {
    var i = this.listeners.indexOf(func);
    if (i >= 0) {
      this.listeners.splice(i, 1);
    }
  };

  this.Event = Event;

})();
