// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let waveModes;
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.waveModes = [
      (a, t) => p.sin(a * 10 + t),
      (a, t) => p.sin(a * 20 + t),
      (a, t) => p.cos(a * 15 + t),
    ];
  };
  p.draw = function () {
    p.background(20);
    p.translate(p.width / 2, p.height / 2);

    // -------- REAL CLOCK TIME --------
    const h = p.hour();
    const m = p.minute();
    const s = p.second();
    const label = p.nf(h, 2) + ':' + p.nf(m, 2) + ':' + p.nf(s, 2);

    /// ---- MAP TIME TO WAVE ----
    let amp = p.map(s, 0, 59, 0, 80);   // seconds control wave height
    let r = p.width / 4;               // base vinyl radius
    let mode = p.waveModes[s % p.waveModes.length]; // change wave style every second
    let t = p.frameCount * 0.05;

    // -------- DRAW WAVY VINYL CIRCLE --------
    p.noFill();
    p.stroke(200);
    p.strokeWeight(2);

    p.beginShape();
    for (let a = 0; a < p.TWO_PI; a += 0.01) {
      let wave = mode(a, t) * amp;
      let x = (r + wave) * p.cos(a);
      let y = (r + wave) * p.sin(a);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);

    // ---- CENTER VINYL HOLE ----
    p.fill(20);
    p.noStroke();
    p.circle(0, 0, 40);

    // -------- CENTER LABEL --------
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.text("Second: " + s, 0, 0);

    // -------- CORNER CLOCK DISPLAY --------
    p.resetMatrix();
    p.fill(255);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(50);
    p.text(label, 12, 10);
    /*
    p.background(220);
    p.fill(100, 150, 240);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HWK #4. A', p.width / 2, p.height / 2);
    */
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
