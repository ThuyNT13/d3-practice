const width = 500, height = 500;
const treeWidth = 400, treeHeight = 400;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(50, 50)");

const tree = d3.layout.tree()
  .size([400, 400]);

d3.json("tree.json", function(data) {
  const nodes = tree.nodes(data);
  const links = tree.links(nodes);

  const node = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
      .attr("class", "nodes")
      .attr("transform", function(d) { return "translate(" +d.x+ "," +d.y+ ")"; })

  node.append("circle")
    .attr("r", 5)
    .attr("fill", "steelblue");
})