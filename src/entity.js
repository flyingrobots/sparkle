(function() {

  function Entity() {
    this.components = new Dictionary();
    this.onComponentAdded = new Event();
    this.onComponentRemoved = new Event();
  }

  Entity.prototype.append = function(schema) {
    var keys = Object.keys(schema);
    var length = keys.length;
    for (var k = 0; k < length; k++) {
      var key = keys[k];
      var component = new schema[key]();
      this.add(key, component);
    }
  };

  Entity.prototype.add = function(key, component) {
    this.remove(key);
    this.components.add(key, component);
    
    this.onComponentAdded.emit({
      entity: this, 
      key: key, 
      component: component
    });
  };

  Entity.prototype.remove = function(key) {
    if (this.components.has(key)) {
      this.onComponentRemoved.emit({
        entity: this, 
        key: key, 
        component: this.components[i]
      });
      
      this.components.remove(key);
    }
  };

  Entity.prototype.has = function(key) {
    return this.components.has(key);
  };

  Entity.prototype.get = function(key) {
    return this.components.get(key);
  };

  this.Entity = Entity;

})();
