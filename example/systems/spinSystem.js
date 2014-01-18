(function() {

  function SpinSystem(injector) {
    var nodes = injector.inject("spinNodes");
    var tick = injector.inject("tick");

    function rotateNodes() {
      nodes.forEach(function(n) {
        n.worldTransform.rotation += 0.01 * n.spinSpeed.speed;
      });
    };

    tick.push(rotateNodes);
  }

  SpinSystem.prototype = Object.create(System.prototype);
  SpinSystem.prototype.constructor = SpinSystem;

  this.SpinSystem = SpinSystem;

})();
