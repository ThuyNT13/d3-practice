/* 
https://d3indepth.com/layouts/
https://bl.ocks.org/d3indepth/a6ca05860b7249ebe163a212a4abd9cf
*/

const width = 500, height = 500;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
    .append("g");

const treeMap = d3.treemap()
  .size([width, height])
  .paddingOuter(10);

d3.json("family.json", function (data) {

  const treeMap = d3.treemap()
    .size([width, height])
    .paddingTop(20)
    .paddingInner(2);

  const rootNode = d3.hierarchy(data)

  // traverses the tree and sets .value on each node to the sum of its children
  rootNode.sum(function (d) { return d.value; });

  treeMap(rootNode);

  const nodes = svg.selectAll('g')
    .data(rootNode.descendants())
      .enter()
        .append('g')
        .attr('transform', function (d) { 
          return 'translate(' + [d.x0, d.y0] + ')'; 
        });

  nodes.append('rect')
    .attr('width', function (d) { return d.x1 - d.x0; })
    .attr('height', function (d) { return d.y1 - d.y0; });

  nodes.append('text')
    .attr('dx', 4)
    .attr('dy', 14)
    .text(function (d) { return d.data.name; });
})
