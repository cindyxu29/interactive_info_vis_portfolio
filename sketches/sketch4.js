// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  let lines = [];
  let showCount = 0;
  let dots = [];
  
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    p.background(10);

    // Add a dot every second
    if (p.frameCount % 60 == 0) {
      dots.push({ x: p.random(p.width), y: p.random(p.height) });
    }

    // Clear dots every minute
    if (p.second() == 0) {
      dots = [];
    }

    // Draw dots
    p.fill(255);
    p.noStroke();
    for (let d of dots) {
      p.circle(d.x, d.y, 12);
    }


    // -------- CORNER CLOCK DISPLAY --------
    const h = p.hour();
    const m = p.minute();
    const s = p.second();
    const label = p.nf(h, 2) + ':' + p.nf(m, 2) + ':' + p.nf(s, 2);

    p.noStroke();
    p.fill(255);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(30);
    p.text(label, 12, 10); // top-left corner
  
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
