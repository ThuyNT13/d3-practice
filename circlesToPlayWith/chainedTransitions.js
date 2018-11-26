var margin = { top: 40, right: 40, bottom: 40, left: 40 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// sets y distance between circles
var y = d3.scalePoint()
  .domain(d3.range(10)) // range set with argument set as upper limit of elements
  .range([height, 10]);

// color RGB
var z = d3.scaleLinear()
  .domain([10, 0])
  .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
  .interpolate(d3.interpolateHcl);

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//
svg.selectAll("circle")
  .data(y.domain())
  .enter().append("circle")
  .attr("r", 25)
  .attr("cx", 0) // sets the starting point of elements rendered
  .attr("cy", y)
  .style("fill", function (d) { return z(Math.abs(d % 20 - 10)); })
  .transition()
  .duration(2000) // intervals in seconds
  .delay(function (d) { return d * 50; }) // delays elements following
  .on("start", slide);

//
function slide() {
  d3.active(this)
    .attr("cx", width)
    .transition()
    .attr("cx", 0) // function
    .transition()
    .on("start", slide);
}