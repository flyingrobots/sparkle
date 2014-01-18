(function() {

  function EntityConfig() {
    this.schema = {};
  }

  EntityConfig.prototype.add = function(schema) {
    var that = this;
    Object.keys(schema).forEach(function(k) {
      that.schema[k] = schema[k];
    });
    return this;
  };

  this.EntityConfig = EntityConfig;

})();
