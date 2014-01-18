(function() {

  function PixiRenderingSystem(injector) {
    var pixiConfig = injector.inject("pixiRenderingConfig");
    var nodes = injector.inject("pixiSpriteNodes");

    var stage = new PIXI.Stage(pixiConfig.clearColor);
    var renderer = PIXI.autoDetectRenderer(pixiConfig.width, pixiConfig.height);

    function updateSprites() {
      var nodeCount = nodes.length;
      for (var n = 0; n < nodeCount; n++) {
        var node = nodes[n];
        node.sprite.context.position.x = node.worldTransform.position.x;
        node.sprite.context.position.y = node.worldTransform.position.y;
        node.sprite.context.rotation = node.worldTransform.rotation;
      }
    }

    function draw() {
      renderer.render(stage);
    }

    var tick = injector.inject("tick");
    
    tick.push(function() {
      updateSprites();
      draw();
    });

    this.stage = stage;
    this.renderer = renderer;
  }

  PixiRenderingSystem.prototype = Object.create(System.prototype);
  PixiRenderingSystem.prototype.constructor = PixiRenderingSystem;

  PixiRenderingSystem.prototype.initialize = function() {
    document.body.appendChild(this.renderer.view);
  };

  PixiRenderingSystem.prototype.add = function(sprite) {
    this.stage.addChild(sprite.context);
  };

  PixiRenderingSystem.prototype.remove = function(sprite) {
    this.stage.removeChild(sprite.context);
  };

  this.PixiRenderingSystem = PixiRenderingSystem;

})();
