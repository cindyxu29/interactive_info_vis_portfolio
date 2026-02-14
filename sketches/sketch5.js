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
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(250);


  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
