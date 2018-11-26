const width = 500, height = 500;

const colorScale = d3.scale.category10(); 

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("family.json", function(data) {
  const treeMap = d3.layout.treemap()
    .size([width, height])
    .nodes(data);

  const cells = svg.selectAll(".cell")
    .data(treeMap)
    .enter()
      .append("g")
      .attr("class", "cell");

  // not rendering but objects are in html
  cells.append("rect")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.dx; })
    .attr("height", function(d) { return d.dy; })
    // only leaf nodes
    .attr("fill", function(d) { return d.children ? null : colorScale(d.parent.name); })
    .attr("stroke", "white");

  // not aligning with rect
  cells.append("text")
    .attr("x", function(d) { return (d.x + d.dx) / 2; })
    .attr("y", function (d) { return (d.y + d.dy) / 2; })
    .attr("text-anchor", "middle")
    .text(function(d) {return d.children ? null : d.name; })
})