(function() {
  
  function MultiMap() {
    this.keys = [];
    this.values = [];
  }

  MultiMap.prototype.insert = function(key, value) {
    var i = this.keys.indexOf(key);
    if (i < 0) {
      this.keys.push(key);
      this.values.push([value]);
    } else {
      this.values[i].push(value);
    }
  };

  MultiMap.prototype.shift = function(key) {
    var i = this.keys.indexOf(key);
    if (i < 0) {
      return null;
    } else {
      var a = this.values[i];
      if (a.length == 1) {
        var v = a[0];
        this.values.splice(i, 1);
        this.keys.splice(i, 1);
        return v;
      } else {
        return a.shift();
      }
    }
  };

  MultiMap.prototype.pop = function(key) {
    var i = this.keys.indexOf(key);
    if (i < 0) {
      return null;
    } else {
      var a = this.values[i];
      if (a.length == 1) {
        var v = a[0];
        this.values.splice(i, 1);
        this.keys.splice(i, 1);
        return a;
      } else {
        return a.pop();
      }
    }
  };

  MultiMap.prototype.clear = function(key) {
    this.keys = [];
    this.values = [];
  };

  MultiMap.prototype.find = function(key) {
    var i = this.keys.indexOf(key);
    if (i < 0) {
      return null;
    } else {
      return this.values[i];
    }
  };

  MultiMap.prototype.size = function() {
    var size = 0;
    var keys = this.keys.length;
    for (var k = 0; k < keys; k++) {
      size += this.values[k].length;
    }
    return size;
  };

  MultiMap.prototype.count = function(key) {
    var i = this.keys.indexOf(key);
    if (i < 0) {
      return 0;
    } else {
      return this.values[i].length;
    }
  };

  this.MultiMap = MultiMap;

})();
