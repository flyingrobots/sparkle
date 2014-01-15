(function() {

  function Family(nodeConfig) {
    this.nodeConfig = nodeConfig;
    this.nodes = [];
    this.entityNodesMap = {};
    this.onEntityAdded = new Event();
    this.onEntityRemoved = new Event();

    var that = this;
    this.componentAddedCallback = function(obj) {
      that.componentAdded(obj);
    };
    this.componentRemovedCallback = function(obj) {
      that.componentRemoved(obj);
    }
  }

  Family.prototype.add = function(entity) {
    var node = this.nodeConfig.makeNode(entity);
    if (node) {
      this.nodes.push(node);
      this.entityNodesMap[entity] = node;

      entity.onComponentAdded.addListener(this.componentAddedCallback);
      entity.onComponentRemoved.addListener(this.componentRemovedCallback);

      this.onEntityAdded.emit({entity: entity, node: node});
    }
  };

  Family.prototype.remove = function(entity) {
    var node = this.entityNodesMap[entity];
    if (node) {
      var i = this.nodes.indexOf(node);
      if (i < 0) {
        throw new Error("missing node");
      } else {
        this.nodes.splice(i, 1);
        this.entityNodesMap[entity] = null;

        entity.onComponentAdded.removeListener(this.componentAddedCallback);
        entity.onComponentRemoved.removeListener(this.componentRemovedCallback);

        this.onEntityRemoved.emit({entity: entity, node: node});
      }
    }
  };

  Family.prototype.componentAdded = function(data) {
    if (this.nodeConfig.has(data.component)) {
      add(data.entity);
    }
  };

  Family.prototype.componentRemoved = function(component) {
    if (this.nodeConfig.has(data.component)) {
      remove(data.entity);
    }
  };

  Family.prototype.destroy = function() {
    Object.keys(this.entityNodesMap).forEach(function(entity){
      remove(entity);
    });
    this.nodes = [];
  };

  this.Family = Family;

})();
