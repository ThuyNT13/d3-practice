const width = 500, height = 500;
const clusterWidth = 400, clusterHeight = 400;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50, 50)");

  /* 
  difference between tree and cluster is
    - d3.layout.tree()
    - d3.layout.cluster() 
  */
const cluster = d3.layout.cluster()
  .size([400, 400]);

const diagonal = d3.svg.diagonal()
  .projection(function (d) { return [d.y, d.x]; });

d3.json("family.json", function (data) {
  const nodes = cluster.nodes(data);
  const links = cluster.links(nodes);

  const node = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "nodes")
    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
    .attr("r", 5)
    .attr("fill", "steelblue");

  node.append("text")
    .text(function (d) { return d.name; })

  svg.selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#ADADAD")
    .attr("d", diagonal);
})