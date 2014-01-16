(function() {

  function SpinSystem(injector) {
    this.nodes = injector.inject("spinNodes", function() {
      throw new Error("missing spin nodes");
    });

    var tick = injector.inject("tick", function() {
      throw new Error("missing tick callbacks");
    });

    var that = this;

    var rotateNodes = function() {
      that.nodes.forEach(function(node) {
        node.worldTransform.rotation += 0.1;
      });
    }

    tick.push(function() {
      rotateNodes();
    });
  }

  SpinSystem.prototype = Object.create(System.prototype);
  SpinSystem.prototype.constructor = SpinSystem;

  this.SpinSystem = SpinSystem;

})();
