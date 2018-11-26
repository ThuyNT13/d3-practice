const data = d3.range(500).map(function () {
  return { xloc: 0, yloc: 0, xvel: 0, yvel: 0 };
});

const width = 960, height = 500;

// undefined
const xScale = d3.scaleLinear()
  .domain([-5, 5])
  .range([0, width]);

// undefined
const yScale = d3.scaleLinear()
  .domain([-5, 5])
  .range([0, height]);

let time0 = Date.now(),
  time1;

const fps = d3.select("#fps span");

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

const circle = svg.selectAll("circle")
  .data(data)
  .enter().append("circle")
    .attr("cx", 10)
    .attr("cy", 10)
    .attr("r", 1);

d3.timer(function () {

  data.forEach(function (d) {
    d.xloc += d.xvel;
    d.yloc += d.yvel;
    d.xvel += 0.04 * (Math.random() - .5) - 0.05 * d.xvel - 0.0005 * d.xloc;
    d.yvel += 0.04 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.yloc;
  });

  circle
    .attr("transform", function (d) { return "translate(" + xScale(d.xloc) + "," + yScale(d.yloc) + ")"; })
    .attr("r", function (d) { return Math.min(1 + 1000 * Math.abs(d.xvel * d.yvel), 10); });

  time1 = Date.now();
  fps.text(Math.round(1000 / (time1 - time0)));
  time0 = time1;
});