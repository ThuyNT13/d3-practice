const width = 400, height = 400;
const numNodes = 100;

const nodes = d3.range(numNodes).map(function (d) {
  return { radius: Math.random() * 25 }
})

// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// call forceSimulation(), passing array of objects
const simulation = d3.forceSimulation(nodes) 
  // attracting or repelling force: + attract; - repel; default -30
  .force("charge", d3.forceManyBody().strength(5))
  //  setting the center of the gravity force
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(function(d) { 
    return d.radius; } ))
  .on("tick", ticked);

//  joins the nodes array to circle elements and updates their positions:
function ticked() {
  const circles = svg.selectAll("circle")
    .data(nodes)
  
    circles.enter()
      .append("circle")
      .attr("fill", "orange")
      .attr("r", function(d) { return d.radius; })
      .merge(circles)
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

    circles.exit().remove();
}