const width = 500, height = 500;

const data = [
  {"x": 10, "y": 20},
  {"x": 40, "y": 60},
  {"x": 50,"y": 70}
];

const line = d3.line()
  .x(function (d) { return d.x; })
  .y(function (d) { return d.y; });

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

const group = svg.append("g")
  .attr("transform", "translate(100,100)");

// d3.json("paths.js", function(error, data) {
//   if (error) {
//     console.error("Problem parsing json: " + error);
//   }

  group.selectAll("path")
    .data([data])
    .enter()
    .append("path")
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", 10);

// });

