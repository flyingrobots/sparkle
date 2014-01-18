(function(){

  function Game() {}

  Game.prototype.initialize = function() {
    var injector = new Injector();
    
    var core = new Core(injector);

    var tickCallbacks = [];
    injector.set("tick", tickCallbacks);

    function createPixiRenderingSystem() {
      var family = core.createFamily(new NodeConfig(PixiSpriteNodeSchema));

      injector.set("pixiSpriteNodes", family.nodes);

      injector.set("pixiRenderingConfig", {
        width: window.innerWidth,
        height: window.innerHeight,
        clearColor: 0x22222
      });

      var system = new PixiRenderingSystem(injector);

      family.onEntityAdded.addListener(function(data) {
        system.add(data.node.sprite);
      });

      family.onEntityRemoved.addListener(function(data){
        system.remove(data.node.sprite);
      });

      return system;
    }

    function createSpinSystem() {
      var family = core.createFamily(new NodeConfig(SpinSystemNodeSchema));
      injector.set("spinNodes", family.nodes);
      return new SpinSystem(injector);
    }

    core.systemManager.add(createPixiRenderingSystem());
    core.systemManager.add(createSpinSystem());

    var entityCount = Maths.randomNumber(75, 150);
    for(var b = 0; b < entityCount; b++) {
      ExampleEntityFactory.create(core.entityManager);
    }

    var ms = 16;
    ticker = window.setInterval(function() {
      tickCallbacks.forEach(function(func) {
        func();
      });
    }, ms);
  };

  this.Game = Game;

})();
