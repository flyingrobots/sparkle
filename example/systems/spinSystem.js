(function() {

  function SpinSystem(injector) {
    this.nodes = injector.inject("spinNodes", function() {
      throw new Error("missing spin nodes");
    });

    var tick = injector.inject("tick", function() {
      throw new Error("missing tick callbacks");
    });

    var that = this;
    tick.push(function() {
      that.spin();
    });
  }

  SpinSystem.prototype.spin = function() {
    this.nodes.forEach(function(node) {
      node.worldTransform.rotation += 0.1;
    });
  };

  this.SpinSystem = SpinSystem;

})();
