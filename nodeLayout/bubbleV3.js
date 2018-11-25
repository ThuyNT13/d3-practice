const width = 800, height = 600;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50, 50)");

const pack = d3.layout.pack()
  .size([width, height - 50])
  .padding(10)

d3.json("familyFlat.json", function (data) {
  const nodes = pack.nodes(data);

  const node = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
    .attr("r", function (d) { return d.r; })
    .attr("fill", function (d) { return d.children ? "#fff" : "steelblue"; })
    .attr("opacity", 0.25)
    .attr("stroke", function (d) { return d.children ? "#fff" : "#ADADAD"; } )
    .attr("stroke-width", "2");

  node.append("text")
    // displaying just leaf nodes 
    .text(function (d) { return d.children ? "" : d.name; });
});