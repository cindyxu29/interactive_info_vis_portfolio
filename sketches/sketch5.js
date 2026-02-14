// Example 2
registerSketch('sk5', function (p) {
  // --- Data & Constants ---
  const covidData = [
    { country: "United States of America", values: [1699388140, 13081418892, 31397378136, 37557390868, 37857879414], color: '#e6194b' },
    { country: "China", values: [28554975, 41876315, 2327596150, 36128353056, 36366304752], color: '#3cb44b' },
    { country: "India", values: [1074019301, 9190544557, 15783389695, 16390462155, 16483905565], color: '#f58231' },
    { country: "Brazil", values: [875661710, 6175907136, 11550919390, 13630058907, 13729378070], color: '#4363d8' },
    { country: "France", values: [149840077, 1961827522, 10536950075, 14165793264, 14277201259], color: '#911eb4' },
    { country: "Germany", values: [112121258, 1365210276, 9585052828, 13980247134, 14068223526], color: '#f032e6' }
  ];

  const years = ["2020", "2021", "2022", "2023", "2024"];
  const events = [
    "2020: March 11 - WHO declares COVID-19 a global pandemic.",
    "2021: Vaccine rollout begins; Alpha and Delta variants emerge.",
    "2022: Omicron variant surges; many countries lift restrictions.",
    "2023: May 5 - WHO declares end of Global Health Emergency.",
    "2024: Focus shifts to Long-COVID and annual booster integration."
  ];

  const margin = 80;
  const rightMargin = 230; 
  const maxVal = 40000000000;

  p.setup = function () {
    p.createCanvas(800, 600);
  };

  p.draw = function () {
    p.background(255);

    let axisSpacing = (p.width - margin - rightMargin) / (years.length - 1);
    let hoveredPoint = null;
    let hoveredYear = null;

    // 1. Draw Overall Title
    p.textAlign(p.CENTER);
    p.textSize(18);
    p.fill(40);
    p.textStyle(p.BOLD);
    p.text("Parallel Coordinates: Cumulative COVID-19 Cases by Year", p.width / 2, 40);
    p.textStyle(p.NORMAL);

    // 2. Draw Y-Axis Scale
    p.stroke(180);
    p.line(margin - 5, margin, margin - 5, p.height - margin);
    p.textAlign(p.RIGHT);
    p.textSize(10);
    p.noStroke();
    p.fill(100);
    for (let i = 0; i <= 8; i++) {
      let val = i * 5000000000;
      let y = p.map(val, 0, maxVal, p.height - margin, margin);
      p.text((val / 1000000000) + "B", margin - 15, y + 4);
      p.stroke(230);
      p.line(margin - 10, y, margin - 5, y);
    }

    // 3. Draw Year Vertical Axes
    for (let i = 0; i < years.length; i++) {
      let x = margin + i * axisSpacing;
      p.stroke(210);
      p.strokeWeight(1);
      p.line(x, margin, x, p.height - margin);

      let labelY = p.height - margin + 25;
      let dLabel = p.dist(p.mouseX, p.mouseY, x, labelY);

      if (dLabel < 20) {
        hoveredYear = { year: years[i], event: events[i], x: x, y: labelY };
        p.fill(255, 0, 0);
      } else {
        p.fill(0);
      }

      p.noStroke();
      p.textAlign(p.CENTER);
      p.textSize(12);
      p.text(years[i], x, labelY);
    }

    // 4. Draw Country Trends
    for (let country of covidData) {
      p.noFill();
      p.stroke(country.color);
      p.strokeWeight(2);

      p.beginShape();
      for (let j = 0; j < country.values.length; j++) {
        let x = margin + j * axisSpacing;
        let y = p.map(country.values[j], 0, maxVal, p.height - margin, margin);
        p.vertex(x, y);
      }
      p.endShape();

      for (let j = 0; j < country.values.length; j++) {
        let x = margin + j * axisSpacing;
        let y = p.map(country.values[j], 0, maxVal, p.height - margin, margin);
        p.fill(country.color);
        p.noStroke();
        p.ellipse(x, y, 6, 6);

        if (p.dist(p.mouseX, p.mouseY, x, y) < 8) {
          hoveredPoint = { country: country.country, year: years[j], value: country.values[j], x: x, y: y, color: country.color };
        }
      }
    }

    // 5. Legends
    drawCountryLegend(p);
    drawAxisLegend(p);

    // 6. Tooltips
    if (hoveredPoint) {
      drawTooltip(p, hoveredPoint.x, hoveredPoint.y, `${hoveredPoint.country}\nYear: ${hoveredPoint.year}\nCases: ${hoveredPoint.value.toLocaleString()}`, hoveredPoint.color);
    } else if (hoveredYear) {
      drawTooltip(p, hoveredYear.x, hoveredYear.y - 40, hoveredYear.event, '#333');
    }
  };

  // --- Helper Functions in Instance Mode ---
  function drawCountryLegend(p) {
    p.push();
    let lx = p.width - 200;
    let ly = margin + 100;
    let itemH = 18;
    p.fill(250, 250, 250, 200);
    p.stroke(200);
    p.rect(lx - 10, ly - 10, 180, covidData.length * itemH + 10, 4);
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(10);
    for (let i = 0; i < covidData.length; i++) {
      p.fill(covidData[i].color);
      p.rect(lx, ly + (i * itemH), 12, 12);
      p.fill(50);
      p.text(covidData[i].country, lx + 20, ly + (i * itemH) + 6);
    }
    p.pop();
  }

  function drawAxisLegend(p) {
    p.push();
    let lx = p.width - 200;
    let ly = p.height - margin - 100;
    p.fill(250, 250, 250, 200);
    p.stroke(200);
    p.rect(lx - 10, ly, 190, 95, 4);
    p.noStroke();
    p.fill(50);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(10);
    p.textStyle(p.BOLD);
    p.text("Guide:", lx, ly + 5);
    p.textStyle(p.NORMAL);
    p.text("X-Axis: Timeline (2020-2024)", lx, ly + 20);
    p.text("Y-Axis: Total Cumulative Cases", lx, ly + 35);
    p.text("Unit 'B': Billions (1,000,000,000)", lx, ly + 50);
    p.fill(100, 0, 0);
    p.text("• Hover points to see case numbers", lx, ly + 65);
    p.text("• Hover years to see major events", lx, ly + 80);
    p.pop();
  }

  function drawTooltip(p, x, y, content, col) {
    p.push();
    p.textSize(11);
    let lines = content.split('\n');
    let tw = 0;
    for (let l of lines) tw = p.max(tw, p.textWidth(l) + 20);
    let th = lines.length * 18 + 10;
    let tx = x + 10;
    let ty = y - th / 2;
    if (tx + tw > p.width) tx = x - tw - 10;
    if (ty < 0) ty = 10;

    p.fill(255, 255, 235, 245);
    p.stroke(col);
    p.strokeWeight(1);
    p.rect(tx, ty, tw, th, 4);
    p.noStroke();
    p.fill(0);
    p.textAlign(p.LEFT, p.CENTER);
    for (let i = 0; i < lines.length; i++) {
      p.text(lines[i], tx + 10, ty + 10 + (i * 18));
    }
    p.pop();
  }
});