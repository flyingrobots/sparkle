(function(){

  function Game() {
    this.core = null;
    this.ticker = null;
    this.tickCallbacks = [];
  }

  function randomNumber(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  Game.prototype.initialize = function() {
    var injector = new Injector();

    this.core = new Core(injector);

    this.tickCallbacks = [];
    injector.set("tick", this.tickCallbacks);

    this.pixiInit(injector);
    this.spinInit(injector);

    for(var b = 0; b < 10; b++) {
      var boxWidth = randomNumber(70, 100);
      var boxHeight = randomNumber(120, 220);
      var boxPosition = {
        x: randomNumber(0, window.innerWidth),
        y: randomNumber(0, window.innerHeight)
      };
      this.createBoxEntity(boxWidth, boxHeight, boxPosition);
    }

    this.startTicker(15);
  };

  Game.prototype.pixiInit = function(injector) {
    var family = this.core.createFamily(new NodeConfig(PixiSpriteNodeSchema));

    injector.set("pixiSpriteNodes", family.nodes);

    injector.set("pixiRenderingConfig", {
      width: window.innerWidth,
      height: window.innerHeight,
      clearColor: 0xff6666
    });

    var pixiRenderingSystem = new PixiRenderingSystem(injector);

    family.onEntityAdded.addListener(function(data) {
      pixiRenderingSystem.add(data.node.sprite);
    });

    family.onEntityRemoved.addListener(function(data){
      pixiRenderingSystem.remove(data.node.sprite);
    });

    this.core.systemManager.add(pixiRenderingSystem);
  };

  Game.prototype.spinInit = function(injector) {
    var family = this.core.createFamily(new NodeConfig(SpinSystemNodeSchema));
    injector.set("spinNodes", family.nodes);
    this.core.systemManager.add(new SpinSystem(injector));
  }

  Game.prototype.createBoxEntity = function(width, height, position) {
    var entityConfig = new EntityConfig();
    entityConfig.add(PixiSpriteNodeSchema);

    var entity = this.core.entityManager.create(entityConfig);

    function makeSprite() {
      var colors = [
        0xff0000,
        0x00ff00,
        0x0000ff
      ];
    
      var randomColorIndex = randomNumber(0, colors.length - 1);
      var randomColor = colors[randomColorIndex];

      var sprite = entity.get("sprite");
      PixiDebugSpriteFactory.createBox(width, height, randomColor, sprite.context);
    }

    function setWorldPosition() {
      var worldTransform = entity.get("worldTransform");
      worldTransform.position.x = position.x;
      worldTransform.position.y = position.y;
    }

    makeSprite();
    setWorldPosition();
  };

  Game.prototype.startTicker = function(hz) {
    var ticks = this.tickCallbacks;
    this.ticker = window.setInterval(function() {
      ticks.forEach(function(func) {
        func();
      });
    }, hz);
  };

  this.Game = Game;

})();
