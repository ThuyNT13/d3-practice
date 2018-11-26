const width = 500, height = 300;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("rect")
    .attr("x", 1)
    .attr("y", 1)
    .attr("height", 296)
    .attr("width", 496)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  radius = 15;

const circles = d3.range(20).map(function () {
  return {
    x: Math.round(Math.random() * (width - radius * 2) + radius),
    y: Math.round(Math.random() * (height - radius * 2) + radius)
  };
});

const color = d3.scaleOrdinal()
  .range(d3.schemeCategory20);

svg.selectAll("circle")
  .data(circles)
  .enter().append("circle")
  .attr("cx", function (d) {
    return d.x;
  })
  .attr("cy", function (d) {
    return d.y;
  })
  .attr("r", radius)
  .style("fill", function (d, i) {
    return color(i);
  })
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

// dragged function changes coordinates
function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("active", false);
}