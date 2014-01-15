(function() {

  function Dictionary() {
    this.keys = [];
    this.values = [];
  }

  Dictionary.prototype.add = function(key, value) {
    var i = this.keys.indexOf(key);
    if (i < 0) {
      this.keys.push(key);
      this.values.push(value);
    } else {
      this.values[i] = value;
    }
  };

  Dictionary.prototype.remove = function(key) {
    var i = this.keys.indexOf(key);
    if (i >= 0) {
      this.keys.splice(i, 1);
      this.values.splice(i, 1);
    }
  };

  Dictionary.prototype.has = function(key) {
    return this.keys.indexOf(key) >= 0;
  };

  Dictionary.prototype.get = function(key) {
    var i = this.keys.indexOf(key);
    if (i < 0) {
      return null;
    } else {
      return this.values[i];
    }
  };

  this.Dictionary = Dictionary;

})();
