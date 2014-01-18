(function() {

  var colors = [
    0x2d2d2d,
    0x393939,
    0x515151,
    0x747369,
    0xa09f93,
    0xd3d0c8,
    0xe8e6df,
    0xf2f0ec,
    0xf2777a,
    0xf99157,
    0xffcc66,
    0x99cc99,
    0x66cccc,
    0x6699cc,
    0xcc99cc,
    0xd27b53
  ];

  function setSprite(entity, width, height) {
    var sprite = entity.get("sprite");
    var randomColorIndex = Maths.randomNumber(0, colors.length - 1);
    var randomColor = colors[randomColorIndex];
    PixiDebugSpriteFactory.createBox(width, height, randomColor, sprite.context);
  }

  function setPosition(entity, position) {
    var worldTransform = entity.get("worldTransform");
    worldTransform.position.x = position.x;
    worldTransform.position.y = position.y;
  }

  function setSpinSpeed(entity) {
    var spinSpeed = entity.get("spinSpeed");
    spinSpeed.speed = Maths.randomNumber(-5.0, 5.0);
  }

  var exampleEntityConfig = new EntityConfig();
  exampleEntityConfig.add(PixiSpriteNodeSchema);
  exampleEntityConfig.add(SpinSystemNodeSchema);

  this.ExampleEntityFactory = {
    create: function(entityManager) {
      var entity = entityManager.create(exampleEntityConfig);
      
      var size = {
        width: Maths.randomNumber(100, 200),
        height: Maths.randomNumber(100, 200)
      };

      var position = {
        x: Maths.randomNumber(0, window.innerWidth),
        y: Maths.randomNumber(0, window.innerHeight)
      };

      setSprite(entity, size.width, size.height);
      setPosition(entity, position);
      setSpinSpeed(entity);

      return entity;
    }
  };
  
})();
