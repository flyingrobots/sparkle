(function(){

  function Game() {
    this.core = null;
    this.ticker = null;
    this.tickCallbacks = [];
  }

  Game.prototype.initialize = function() {
    var injector = new Injector();

    this.core = new Core(injector);

    this.tickCallbacks = [];
    injector.set("tick", this.tickCallbacks);

    this.core.systemManager.add(this.createPixiRenderingSystem(injector));
    this.core.systemManager.add(this.createSpinSystem(injector));

    for(var b = 0; b < 100; b++) {
      ExampleEntityFactory.create(this.core.entityManager);
    }

    this.startTicker(16);
  };

  Game.prototype.createPixiRenderingSystem = function(injector) {
    var family = this.core.createFamily(new NodeConfig(PixiSpriteNodeSchema));

    injector.set("pixiSpriteNodes", family.nodes);

    injector.set("pixiRenderingConfig", {
      width: window.innerWidth,
      height: window.innerHeight,
      clearColor: 0x22222
    });

    var pixiRenderingSystem = new PixiRenderingSystem(injector);

    family.onEntityAdded.addListener(function(data) {
      pixiRenderingSystem.add(data.node.sprite);
    });

    family.onEntityRemoved.addListener(function(data){
      pixiRenderingSystem.remove(data.node.sprite);
    });

    return pixiRenderingSystem;
  };

  Game.prototype.createSpinSystem = function(injector) {
    var family = this.core.createFamily(new NodeConfig(SpinSystemNodeSchema));
    injector.set("spinNodes", family.nodes);
    return new SpinSystem(injector);
  }

  Game.prototype.startTicker = function(ms) {
    var ticks = this.tickCallbacks;
    this.ticker = window.setInterval(function() {
      ticks.forEach(function(func) {
        func();
      });
    }, ms);
  };

  this.Game = Game;

})();
