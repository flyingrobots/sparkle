(function() {

  function Injector() {
    this.objs = new Dictionary();
  }

  Injector.prototype.set = function(key, value) {
    this.objs.add(key, value);
  };

  Injector.prototype.inject = function(key, err) {
    var value = this.objs.get(key);
    if (value) {
      return value;
    } else {
      if (err) {
        return err();
      } else {
        throw new Error("[Injector] Missing dependency: " + key);
      }
    }
  };

  this.Injector = Injector;

})();
