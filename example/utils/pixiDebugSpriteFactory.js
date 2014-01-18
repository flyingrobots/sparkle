(function() {

  function drawDebugShape(color, context, drawFunc) {
    var outlineWeight = 1.0;
    var outlineAlpha = 1.0;
    var fillAlpha = 0.8;
    
    context.lineStyle(outlineWeight, color, outlineAlpha);
    context.beginFill(color, fillAlpha);

    drawFunc();

    context.endFill();

    return context;
  }

  this.PixiDebugSpriteFactory = {
    createBox: function(width, height, color, context) {
      function drawBox() {
        var halfSize = {width: width * 0.5, height: height * 0.5};
        context.drawRect(-halfSize.width, -halfSize.height, width, height);
      }

      function drawAxes() {
        var quarterSize = {width: width * 0.25, height: height * 0.25};
        context.moveTo(-quarterSize.width, 0);
        context.lineTo(quarterSize.width, 0);
        context.moveTo(0, -quarterSize.height);
        context.lineTo(0, quarterSize.height);
      }

      return drawDebugShape(color, context, function() {
        drawBox();
        drawAxes();
      });
    }
  };

})();
