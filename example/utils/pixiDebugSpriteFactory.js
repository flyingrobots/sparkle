(function() {

  function drawSprite(color, context, drawFunc) {
    var outlineWeight = 1.0;
    var outlineAlpha = 1.0;
    context.lineStyle(outlineWeight, color, outlineAlpha);
    var fillAlpha = 1.0;
    context.beginFill(color, fillAlpha);
    drawFunc();
    context.endFill();
    return context;
  }

  this.PixiDebugSpriteFactory = {
    createBox: function(width, height, color, context) {
      return drawSprite(color, context, function() {
        var halfWidth = width / 2.0;
        var halfHeight = height / 2.0;
        context.drawRect(-halfWidth, -halfHeight, width, height);
        context.moveTo(0, 0);
        context.lineTo(halfWidth, 0);
      });
    }
  };

})();
