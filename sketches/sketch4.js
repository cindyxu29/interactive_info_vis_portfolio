// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  let lines = [];
  let showCount = 0;
  let dots = [];
  
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);

    // Text lines
    lines = [
      "CO2e = Carbon dioxide equivalent; unit for greenhouse gas emissions",
      "Produce 1 kg of Beef results in 60 kg CO2e",
      "With the same amount of CO2e, you can have:",
      "8.5 kg Pork",
      "9 kg Salmon",
      "10 kg Poultry",
      "12 kg Fish (farmed)",
      "13 kg Eggs",
      "15 kg Rice",
      "43 kg Wheat",
      "60 kg Corn",
      "67 kg Peas",
      "85 kg Bananas",
      "150 kg Root Vegetables",
      "200 kg Fruits"
    ];
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
      p.circle(d.x, d.y, 16);
    }

    // Draw text (centered)
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(24);
    let startY = p.height / 2 - showCount * 20;

    for (let i = 0; i < showCount; i++) {

      // Color rules
      if (i == 0) {
        p.fill(200); // gray
      }
      else if (i == 1) {
        p.fill(255, 0, 0); // red
      }
      else if (i == 2) {
        p.fill(255, 0, 0); // red
      }
      else {
        let colors = [
          [165, 229, 229],
          [242, 182, 181],
          [249, 218, 155],
          [247, 247, 156],
          [169, 237, 189]
        ];
        let c = colors[i % colors.length];
        p.fill(c[0], c[1], c[2]);
      }

      p.text(lines[i], p.width / 2, startY + i * 40);
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

    p.mouseClicked = function () {
      showCount++;

      // Last click clears, next click restarts
      if (showCount > lines.length) {
        showCount = 0;
      }
    };
  };
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
