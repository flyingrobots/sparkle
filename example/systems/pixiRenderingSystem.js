(function() {

  function PixiRenderingSystem(injector) {
    this.stage = null;
    this.renderer = null;
    
    this.config = injector.inject("pixiRenderingConfig", function() {
      throw new Error("missing pixi rendering config");
    });
    
    this.spriteNodes = injector.inject("pixiSpriteNodes", function() {
      throw new Error("missing pixi stage nodes");
    });

    var tick = injector.inject("tick", function() {
      throw new Error("missing tick");
    });

    var that = this;
    tick.push(function() {
      that.render();
    });
  }

  PixiRenderingSystem.prototype = Object.create(System.prototype);
  PixiRenderingSystem.prototype.constructor = PixiRenderingSystem;

  PixiRenderingSystem.prototype.initialize = function() {
    this.stage = new PIXI.Stage(this.config.clearColor);
    this.renderer = PIXI.autoDetectRenderer(this.config.width, this.config.height);
    document.body.appendChild(this.renderer.view);
  };

  PixiRenderingSystem.prototype.add = function(sprite) {
    this.stage.addChild(sprite.context);
  };

  PixiRenderingSystem.prototype.remove = function(sprite) {
    this.stage.removeChild(sprite.context);
  };

  PixiRenderingSystem.prototype.render = function() {
    this.spriteNodes.forEach(function(node) {
      node.sprite.context.position.x = node.worldTransform.position.x;
      node.sprite.context.position.y = node.worldTransform.position.y;
      node.sprite.context.rotation = node.worldTransform.rotation;
    });

    this.renderer.render(this.stage);
  };

  this.PixiRenderingSystem = PixiRenderingSystem;

})();
