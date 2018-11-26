const width = 300, height = 300;
let nodes = [{}, {}, {}, {}, {}]

// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// call forceSimulation(), passing array of objects
const simulation = d3.forceSimulation(nodes) 
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2))
  .on("tick", ticked);

//  joins the nodes array to circle elements and updates their positions:
function ticked() {
  const circles = svg.selectAll("circle")
    .data(nodes)
  
    circles.enter()
      .append("circle")
      .attr("fill", "cadetblue")
      .attr("r", 5)
      .merge(circles)
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

    circles.exit().remove();
}