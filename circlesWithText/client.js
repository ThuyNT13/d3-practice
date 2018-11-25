const width = 600, height = 400;
const cxAttr = 300, cyAttr = 200; rAttr = 50;

const colorScale = d3.scaleLinear()
  .domain([0,100])
  .range(["yellow", "#52154E"]);

const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range(["10%", "85%"]);

const yScale = d3.scaleLinear()
  .domain([0, 150])
  .range(["10%", "85%"]);

const svg = d3.select("body").append("svg")
  .attr("width", width).attr("height", height);

d3.json("data.json", function(error, data) {
  if (error) {
    console.error("Problem parsing json: " +error);
  }

  const circles = svg.selectAll("circle")
    .data(data)
    .enter()
      .append("circle")
      .attr("cx", function(d) { return xScale(Math.random() * d.cx); })
      .attr("cy", function(d) { return yScale(Math.random() * d.cy); })
      .attr("r", function (d) { return d.r; }) // enter
      .attr("fill", function (d) { return colorScale(d.r); });
    
});