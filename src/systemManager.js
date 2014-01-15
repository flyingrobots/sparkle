(function() {

  function SystemManager() {
    this.systems = [];
  }

  SystemManager.prototype.add = function(system) {
    this.remove(system);
    this.systems.push(system);
    system.initialize();
  };

  SystemManager.prototype.remove = function(system) {
    var i = this.systems.indexOf(system);
    if (i >= 0) {
      this.systems[i].destroy();
      this.systems.splice(i, 1);
    }
  };

  this.SystemManager = SystemManager;

})();
