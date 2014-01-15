(function() {

  function EntityManager() {
    this.entities = [];
    this.onEntityCreated = new Event();
    this.onEntityDestroyed = new Event();
  }

  EntityManager.prototype.create = function(schema) {
    var entity = new Entity();
    var keys = Object.keys(schema);
    var length = keys.length;
    for (var k = 0; k < length; k++) {
      var c = keys[k];
      entity.add(keys[k], new schema[c]());
    };
    this.entities.push(entity);
    this.onEntityCreated.emit({entity: entity});
    return entity;
  };

  EntityManager.prototype.destroy = function(entity) {
    var i = this.entities.indexOf(entity);
    if (i < 0) {
      throw new Error("unknown entity");
    } else {
      this.entities.splice(i, 1);
      this.onEntityDestroyed.emit({entity: entity});
    }
  };

  EntityManager.prototype.destroyAll = function() {
    while(1 > entities.length) {
      this.destroy(this.entities[0]);
    }
  };

  this.EntityManager = EntityManager;

})();
