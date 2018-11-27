const width = 400, height = 300;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

svg.append("g")
  .attr("class", "links")

svg.append("g")
  .attr("class", "nodes")

d3.queue()
  .defer(d3.json, "links.json")
  .defer(d3.json, "nodes.json")
  .await(loadData);

function loadData(error, links, nodes) {
  if (error) {
    return console.warn(error);
  }

  const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('link', d3.forceLink().links(links))
    .on('tick', ticked);

  function updateLinks() {
    const linkU = d3.select(".links")
      .selectAll("line")
      .data(links)

    linkU.enter().append("line")
      .merge(linkU)
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; })

    linkU.exit().remove();
  }

  function updateNodes() {
    const nodeU = d3.select(".nodes")
      .selectAll("text")
      .data(nodes)

    nodeU.enter().append("text")
      .text(function (d) { return d.name; })
      .merge(nodeU)
      .attr("x", function (d) { return d.x; })
      .attr("y", function (d) { return d.y; })
      .attr("dy", function (d) { return 5; })

    nodeU.exit().remove();
  }

  function ticked() {
    updateLinks()
    updateNodes()
  }
}


