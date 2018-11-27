// https://bl.ocks.org/d3indepth/fee5ce57c3fc3e94c3332577d1415df4

const width = 700, height = 200;
const numNodes = 50;
// const xCenter = [100, 300, 500];

const colorScale = ["orange", "lightblue", "#B19CD9"];

const xScale = d3.scaleLinear()
  .domain([0,1])
  .range([0,width-100]);

const nodes = d3.range(numNodes).map(function (d, i) {
  return { 
    radius: Math.random() * 25,
    category: i % 3,
    // color: "orange",
    value: Math.random()
  }
})

// const colorScale = d3.scaleOrdinal(d3.schemeCategory10); 

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  // move group down 100, right 50
  .attr("transform", "translate(50, 100)");

// call forceSimulation(), passing array of objects
const simulation = d3.forceSimulation(nodes) 
  // attracting or repelling force: + attract; - repel; default -30
  .force("charge", d3.forceManyBody().strength(5))
  //  setting the center of the gravity force
  // towards an x-coordinate
  .force("x", d3.forceX().x(function(d) {
    // return xCenter[d.category];
    return xScale(d.value);
  }))
  // gravity force towards y-coordinate
  .force("y", d3.forceY().y(function(d) {
    return 0;
  }))
  // deter elements overlapping 
  .force("collision", d3.forceCollide().radius(function(d) { 
    return d.radius; } ))
  .on("tick", ticked);

//  joins the nodes array to circle elements and updates their positions:
function ticked() {
  const circles = svg.selectAll("circle")
    .data(nodes)
  
    circles.enter().append("circle")
      .attr("fill", function(d) { return colorScale[d.category]; })
      // .attr("fill", function(d) { return d.color; })
      .attr("r", function(d) { return d.radius; })
      .merge(circles)
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

    circles.exit().remove();
}