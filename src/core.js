(function() {

  function Core(injector) {
    this.entityManager = injector.inject("entityManager", function() {return new EntityManager();});
    this.systemManager = injector.inject("systemManager", function() {return new SystemManager();});
    
    this.nodeToFamilyMap = {};
    this.componentToFamilyMap = new MultiMap();

    var that = this;

    this.entityManager.onEntityCreated.addListener(function(data) {
      data.entity.onComponentAdded.addListener(function(componentEventData) {
        that.entityComponentAdded(componentEventData);
      });
    });

    this.entityManager.onEntityDestroyed.addListener(function(data) {
      data.entity.onComponentRemoved.addListener(function(componentEventData) {
        that.entityComponentRemoved(componentEventData);
      });
    });
  }

  Core.prototype.createFamily = function(nodeConfig) {
    var family = new Family(nodeConfig);

    this.entityManager.entities.forEach(function(e) { 
      family.add(e);
    });

    this.entityManager.onEntityCreated.addListener(function(data) {
      family.add(data.entity);
    });

    this.entityManager.onEntityDestroyed.addListener(function(data) {
      family.remove(data.entity);
    });

    var that = this;
    Object.keys(nodeConfig.schema).forEach(function(key) {
      that.componentToFamilyMap.insert(key, family);
    });

    this.nodeToFamilyMap[nodeConfig] = family;

    return family;
  };

  Core.prototype.entityComponentAdded = function(data) {
    var families = this.componentToFamilyMap.find(data.key);
    if (families) {
      families.forEach(function(f) {
        f.add(data.entity);
      });
    }
  };

  Core.prototype.entityComponentRemoved = function(data) {
    var families = this.componentToFamilyMap.find(data.key);
    if (families) {
      families.forEach(function(f) {
        f.remove(data.entity);
      });
    }
  };

  this.Core = Core;

})();
