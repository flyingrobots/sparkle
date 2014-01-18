(function() {

  this.Maths = {
    randomNumber: function(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }
  };

})();
