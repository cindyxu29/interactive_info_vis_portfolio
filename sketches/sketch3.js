// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.noStroke();
  };

  p.draw = function () {
    p.background(10, 10, 30);
    p.clock();
  };

  p.clock = function () {
    let h = p.hour();
    let m = p.minute();
    let s = p.second();

    // Ratios
    const rs = s / 60;
    const rm = m / 60;
    const rh = (h % 12) / 12;

    // Center + sizing
    p.translate(p.width / 2, p.height / 2);
    const R = p.min(p.width, p.height) * 0.35; // base radius

    // Guide circle
    p.noFill();
    p.stroke(60);
    p.strokeWeight(2);
    p.circle(0, 0, R * 2);

    // ===== CIRCLE RING (seconds) =====
    function ring(progress, radius, weight, col) {
      p.push();
      p.rotate(-90);
      p.stroke(col);
      p.strokeWeight(weight);
      p.strokeCap(p.SQUARE);
      p.noFill();

      p.stroke(40);
      p.arc(0, 0, radius * 2, radius * 2, 0, 360);

      p.stroke(col);
      p.arc(0, 0, radius * 2, radius * 2, 0, 360 * progress);
      p.pop();
    }

    // ===== SQUARE RING (minutes) =====
    function squareRing(progress, size, weight, col) {
      p.push();
      p.noFill();
      p.strokeWeight(weight);

      let half = size / 2;

      // background square
      p.stroke(40);
      p.square(-half, -half, size);

      // progress
      p.stroke(col);
      let perimeter = size * 4;
      let drawLen = perimeter * progress;

      function drawLine(x1, y1, x2, y2, len) {
        let d = p.dist(x1, y1, x2, y2);
        let t = p.min(1, len / d);
        p.line(x1, y1, p.lerp(x1, x2, t), p.lerp(y1, y2, t));
        return len - d;
      }

      let len = drawLen;

      // Start at TOP MIDDLE
      len = drawLine(0, -half, half, -half, len);
      if (len > 0) len = drawLine(half, -half, half, half, len);
      if (len > 0) len = drawLine(half, half, -half, half, len);
      if (len > 0) len = drawLine(-half, half, -half, -half, len);
      if (len > 0) drawLine(-half, -half, 0, -half, len);

      p.pop();
    }

    // ===== TRIANGLE RING (hours) =====
    function triangleRing(progress, size, weight, col) {
      p.push();
      p.noFill();
      p.strokeWeight(weight);

      let h = size * 0.866;
      let pts = [
        p.createVector(0, -h / 2),
        p.createVector(-size / 2, h / 2),
        p.createVector(size / 2, h / 2),
      ];

      p.stroke(40);
      p.beginShape();
      pts.forEach((v) => p.vertex(v.x, v.y));
      p.endShape(p.CLOSE);

      p.stroke(col);
      let edges = [
        [pts[0], pts[2]],
        [pts[2], pts[1]],
        [pts[1], pts[0]],
      ];

      let perimeter =
        p.dist(pts[0].x, pts[0].y, pts[2].x, pts[2].y) +
        p.dist(pts[2].x, pts[2].y, pts[1].x, pts[1].y) +
        p.dist(pts[1].x, pts[1].y, pts[0].x, pts[0].y);

      let drawLen = perimeter * p.min(progress, 0.999);

      for (let [a, b] of edges) {
        if (drawLen <= 0) break;
        let d = p.dist(a.x, a.y, b.x, b.y);
        let t = p.min(1, drawLen / d);
        p.line(a.x, a.y, p.lerp(a.x, b.x, t), p.lerp(a.y, b.y, t));
        drawLen -= d;
      }

      p.pop();
    }

    // ===== DRAW SHAPES =====
    ring(rs, R, 14, p.color(90, 180, 255));          // seconds circle
    squareRing(rm, R * 1.3, 14, p.color(255, 120, 160)); // minutes square
    triangleRing(rh, R * 1.1, 16, p.color(120, 255, 170)); // hours triangle

    // Seconds droplet
    p.push();
    const a = 360 * rs - 90;
    const x = p.cos(a) * R;
    const y = p.sin(a) * R;
    p.noStroke();
    p.fill(0, 114, 178);
    p.circle(x, y, 12);
    p.pop();

    // Labels
    p.fill(230);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    p.text(`${h}:${m}:${s}`, 0, 4);

    p.textSize(12);
    p.fill(160);
    p.text("HOUR • MIN • SEC", 0, 30);
  };

  /*
  p.draw = function () {
    p.background(240, 200, 200);
    p.fill(180, 60, 60);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HWK #4. B', p.width / 2, p.height / 2);
  };
  */

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
