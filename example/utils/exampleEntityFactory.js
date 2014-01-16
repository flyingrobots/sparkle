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

  function randomNumber(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function setSprite(sprite, width, height) {
    var randomColorIndex = randomNumber(0, colors.length - 1);
    var randomColor = colors[randomColorIndex];
    PixiDebugSpriteFactory.createBox(width, height, randomColor, sprite.context);
  }

  function setPosition(worldTransform, position) {
    worldTransform.position.x = position.x;
    worldTransform.position.y = position.y;
  }

  this.ExampleEntityFactory = {
    create: function(entityManager) {
      var entityConfig = new EntityConfig();
      entityConfig.add(PixiSpriteNodeSchema);

      var entity = entityManager.create(entityConfig);
      
      var size = {
        width : randomNumber(100, 200),
        height: randomNumber(100, 200)
      };

      var position = {
        x: randomNumber(0, window.innerWidth),
        y: randomNumber(0, window.innerHeight)
      };

      setSprite(entity.get("sprite"), size.width, size.height);
      setPosition(entity.get("worldTransform"), position);

      return entity;
    }
  };
  
})();
