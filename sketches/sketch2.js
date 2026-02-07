// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
  };
  p.draw = function () {
    p.background(20);
    p.translate(p.width / 2, p.height / 2);

    // -------- REAL CLOCK TIME --------
    const h = p.hour();
    const m = p.minute();
    const s = p.second();
    const label = p.nf(h, 2) + ':' + p.nf(m, 2) + ':' + p.nf(s, 2);

    // -------- WAVE CLOCK PARAMETERS --------
    let baseRadius = p.min(p.width, p.height) * 0.3;

    // seconds control wave growth (0 → flat, 59 → big waves)
    let waveStrength = p.map(s, 0, 59, 0, baseRadius * 0.4);

    // waveform style changes every second
    let mode = s % 3;

    p.noFill();
    p.stroke(200);
    p.strokeWeight(2);

    // -------- DRAW WAVY VINYL CIRCLE --------
    p.beginShape();
    for (let a = 0; a < 360; a += 2) {
      let wave = 0;

      // smooth sine
      if (mode === 0) {
        wave = p.sin(a * 4) * waveStrength;
      }
      // faster vibration
      else if (mode === 1) {
        wave = p.sin(a * 10) * waveStrength;
      }
      // organic noise wave
      else {
        wave = p.noise(a * 0.05, s * 0.1) * waveStrength * 2 - waveStrength;
      }

      let r = baseRadius + wave;
      let x = r * p.cos(a);
      let y = r * p.sin(a);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);

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
    p.textSize(40);
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
