const width = 700, height = 400;
const numNodes = 100;
const colorScale = ["orange", "lightblue", "#B19CD9"];
const xCenter = [100, 300, 500];

const nodes = d3.range(numNodes).map(function (d, i) {
  return { 
    radius: Math.random() * 25,
    category: i % 3
  }
})

// const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  // move group down 200, right 50
  .attr("transform", "translate(50, 200)");

// call forceSimulation(), passing array of objects
const simulation = d3.forceSimulation(nodes) 
  // attracting or repelling force: + attract; - repel; default -30
  .force("charge", d3.forceManyBody().strength(5))
  //  setting the center of the gravity force
  // towards an x-coordinate
  .force("x", d3.forceX().x(function(d) {
    return xCenter[d.category];
  }))
  .force("collision", d3.forceCollide().radius(function(d) { 
    return d.radius; } ))
  .on("tick", ticked);

//  joins the nodes array to circle elements and updates their positions:
function ticked() {
  const circles = svg.selectAll("circle")
    .data(nodes)
  
    circles.enter()
      .append("circle")
      .attr("fill", function(d) { return colorScale[d.category]; })
      .attr("r", function(d) { return d.radius; })
      .merge(circles)
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

    circles.exit().remove();
}