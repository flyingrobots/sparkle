(function() {

  function drawSprite(color, context, drawFunc) {
    var outlineWeight = 1.0;
    var outlineAlpha = 1.0;
    context.lineStyle(outlineWeight, color, outlineAlpha);
    var fillAlpha = 0.8;
    context.beginFill(color, fillAlpha);
    drawFunc();
    context.endFill();
    return context;
  }

  this.PixiDebugSpriteFactory = {
    createBox: function(width, height, color, context) {
      return drawSprite(color, context, function() {
        var halfWidth = width * 0.5;
        var halfHeight = height * 0.5;
        context.drawRect(-halfWidth, -halfHeight, width, height);
        var quarterWidth = halfWidth * 0.5;
        var quarterHeight = halfHeight * 0.5;
        context.moveTo(-quarterWidth, 0);
        context.lineTo(quarterWidth, 0);
        context.moveTo(0, -quarterHeight);
        context.lineTo(0, quarterHeight);
      });
    }
  };

})();
