var game = (function () {
 
    // Global vars
  var canvas,
            canvasCtx;
            // And so on...
 
    // Private methods
    function loop() {
        update();
        draw();
    }
 
    function update() {
    }
 
    function draw() {
        ctx.drawImage(buffer, 0, 0);
  }
 