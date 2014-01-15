(function() {

  function NodeConfig(schema) {
    this.schema = schema;
  }

  NodeConfig.prototype.makeNode = function(entity) {
    var node = new Node();
    node.entity = entity;
    var keys = Object.keys(this.schema);
    var length = keys.length;
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      var c = entity.get(key);
      if (c) {
        node[key] = c;
      } else {
        return null; // unable to complete the node, bail.
      }
    }
    return node;
  };

  NodeConfig.prototype.has = function(key) {
    return Object.keys(this.schema).indexOf(key) >= 0;
  };

  this.NodeConfig = NodeConfig;

})();
